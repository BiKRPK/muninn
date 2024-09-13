import {
  OWGames,
  OWGameListener,
  OWWindow
} from '@overwolf/overwolf-api-ts';

import { kWindowNames, kGameClassIds } from "../logic/Consts";

import RunningGameInfo = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

import { initialize } from '../front/FrontFunctions';

// The background controller holds all of the app's background logic - hence its name. it has
// many possible use cases, for example sharing data between windows, or, in our case,
// managing which window is currently presented to the user. To that end, it holds a dictionary
// of the windows available in the app.
// Our background controller implements the Singleton design pattern, since only one
// instance of it should exist.
export class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, OWWindow> = {};
  private _gameListener: OWGameListener;

  private constructor() {
    // Populating the background controller's window dictionary
    this._windows[kWindowNames.upload] = new OWWindow(kWindowNames.upload);
    this._windows[kWindowNames.list] = new OWWindow(kWindowNames.list);
    this._windows[kWindowNames.desktop] = new OWWindow(kWindowNames.desktop);
    this._windows[kWindowNames.inGame] = new OWWindow(kWindowNames.inGame);

    // When a a supported game game is started or is ended, toggle the app's windows
    this._gameListener = new OWGameListener({
      onGameStarted: this.toggleWindows.bind(this),
      onGameEnded: this.toggleWindows.bind(this)
    });

    overwolf.extensions.onAppLaunchTriggered.addListener(
      e => this.onAppLaunchTriggered(e)
    );

    overwolf.windows.onStateChanged.addListener((state) => this.onWindowStateChanged(state));
  };

  // Implementing the Singleton design pattern
  public static instance(): BackgroundController {
    if (!BackgroundController._instance) {
      BackgroundController._instance = new BackgroundController();
    }

    return BackgroundController._instance;
  }

  // When running the app, start listening to games' status and decide which window should
  // be launched first, based on whether a supported game is currently running
  public async run() {
    this._gameListener.start();

    const currWindowName = (await this.isSupportedGameRunning())
      ? kWindowNames.inGame
      : kWindowNames.desktop;

      overwolf.windows.setTopmost("upload", true, () => {
        overwolf.windows.setTopmost("list", true, () => {
          this._windows[currWindowName].restore();
        });
      });
    
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    console.log('onAppLaunchTriggered():', e);

    if (!e || e.origin.includes('gamelaunchevent')) {
      return;
    }

    if (await this.isSupportedGameRunning()) {
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.inGame].restore();
      document.addEventListener( 'DOMContentLoaded', initialize);
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.inGame].close();
    }
  }

  private toggleWindows(info: RunningGameInfo) {
    if (!info || !this.isSupportedGame(info)) {
      return;
    }

    if (info.isRunning) {
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.inGame].restore();
      document.addEventListener( 'DOMContentLoaded', initialize);
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.inGame].close();
    }
  }

  private async isSupportedGameRunning(): Promise<boolean> {
    const info = await OWGames.getRunningGameInfo();

    return info && info.isRunning && this.isSupportedGame(info);
  }

  // Identify whether the RunningGameInfo object we have references a supported game
  private isSupportedGame(info: RunningGameInfo) {
    return kGameClassIds.includes(info.classId);
  }

  public openListWindow() {
    if (this._windows[kWindowNames.list]) {
      console.log("openlist");
      overwolf.windows.obtainDeclaredWindow('list', (result) => {
        if (result.success) {
          console.log(result.window.name);
          //overwolf.windows.setTopmost(result.window.id, true, () => {          
            overwolf.windows.restore(result.window.id, () => {
              //this._windows[kWindowNames.desktop].maximize();
              this._windows[kWindowNames.list].restore();
            });
          //});
        }
      });
    }
  }

  public openUploadWindow(id?: string) {
    if (this._windows[kWindowNames.upload]) {
      console.log("openupload");
      this.closeListWindow();
      
      overwolf.windows.obtainDeclaredWindow('upload', (result) => {
        if (result.success) {
          //overwolf.windows.setTopmost(result.window.id, true, () => {
            overwolf.windows.restore(result.window.id, (restoreResult) => {
              this._windows[kWindowNames.upload].restore();
              if (restoreResult.success && id) {
                overwolf.windows.sendMessage(result.window.id, 'open-upload', id, (response) => {
                  if (response.success) {
                    console.log('Message sent successfully:', response);
                  } else {
                    console.error('Failed to send message:', response);
                  }
                });
              }
            });
          //});
          
        }
      });
    }
  }

  private closeListWindow() {
    if (this._windows[kWindowNames.list]) {
      console.log("closelist");
      this._windows[kWindowNames.list].close();
    }
  }

  public closeUploadWindow() {
    if (this._windows[kWindowNames.upload]) {
      console.log("uploadlist");
      this._windows[kWindowNames.upload].close();
    }
  }

  // Function to handle window state changes
  private onWindowStateChanged(state: overwolf.windows.WindowStateChangedEvent) {
    // Check if the upload window was closed
    if (state.window_name === kWindowNames.list && state.window_state === "closed") {
      console.log("list closed");
      initialize();
    }

    if (state.window_name === kWindowNames.upload && state.window_state === "closed") {
      console.log("upload closed");
      this.openListWindow();
    }
  }

}

BackgroundController.instance().run();
