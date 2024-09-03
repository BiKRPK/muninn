import {
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../../logic/AppWindow";
import { kHotkeys, kWindowNames, kGamesFeatures } from "../../logic/Consts";

import WindowState = overwolf.windows.WindowStateEx;

import  $ from "jquery";

import {getNameFromOverwolfID} from '../../logic/TypeUtils';
import {updateAgentInUI, updateSceneInUI, updateSideInUI, initialize} from '../FrontFunctions';
import { Agent } from "../../logic/Agent";
import { Side } from "../../logic/Enums";
import { Scene } from "../../logic/Scene";


// The window displayed in-game while a game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.

class InGame extends AppWindow {
  private static _instance: InGame;
  private _gameEventsListener: OWGamesEvents;
  // private _eventsLog: HTMLElement;
  // private _infoLog: HTMLElement;
  private currentAgent: Agent;
  private currentScene: Scene;
  private currentSide: Side;

  private constructor() {
    super(kWindowNames.inGame);

    // this._eventsLog = document.getElementById('eventsLog');
    // this._infoLog = document.getElementById('infoLog');

    this.setToggleHotkeyBehavior();
    // this.setToggleHotkeyText();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public async run() {
    const gameClassId = await this.getCurrentGameClassId();

    const gameFeatures = kGamesFeatures.get(gameClassId);

    if (gameFeatures && gameFeatures.length) {
      this._gameEventsListener = new OWGamesEvents(
        {
          onInfoUpdates: this.onInfoUpdates.bind(this),
          onNewEvents: this.onNewEvents.bind(this)
        },
        gameFeatures
      );

      this._gameEventsListener.start();

    }
  }

  // private resetAgent() {
  //   this.currentAgent = undefined;
  //   this.updateAgentInUI();
  // }

  // private resetScene() {
  //   this.currentScene = undefined;
  //   this.updateSceneInUI();
  // }

  // private resetSide() {
  //   this.currentSide = undefined;
  //   this.updateSideInUI();
  // }

  private inGameAgentReaded(readedAgentIN) {
    //let agent = infoJSON.me.agent;
    console.log('update agent');
    let agentName = getNameFromOverwolfID(readedAgentIN) || undefined;
    if (agentName) {
      this.currentAgent = Agent.getInstance(
        agentName,
        readedAgentIN
      );
      console.log('AGENTE: ' + this.currentAgent.name);
      updateAgentInUI(this.currentAgent);
    } 
  }

  private inGameSceneReaded(readedSceneIN) {
    //let scene = infoJSON.game_info.scene;
    console.log('update scene');
    let sceneName = getNameFromOverwolfID(readedSceneIN) || undefined;
    if (sceneName) {
      this.currentScene = {
        name: sceneName,
        overwolfID: readedSceneIN
      }
      console.log('MAPA: '  + this.currentScene.name);
      updateSceneInUI(this.currentScene);
    }
  }

  private inGameSideReaded(readedSideIN) {
    //let team = infoJSON.match_info.team;
    this.currentSide =  readedSideIN.charAt(0).toUpperCase() + readedSideIN.slice(1);
    console.log('LADO: '  + this.currentSide);
    updateSideInUI(this.currentSide as Side);
  }


  private onInfoUpdates(info) {
      let infoJSON = JSON.parse(JSON.stringify(info));
      console.log('update: ' + infoJSON);
      if(this.isAgent(infoJSON)) {
        this.inGameAgentReaded(infoJSON.me.agent);
      } else if(this.isScene(infoJSON)) {
        this.inGameSceneReaded(infoJSON.game_info.scene);
      } else if((this.isTeam(infoJSON))) {
        this.inGameSideReaded(infoJSON.match_info.team);
      }
      
  }

  // private addInfo(info: String) {
  //   this.logLine(this._infoLog, info, false);
  // }

  // private addEvent(event: String) {
  //   this.logLine(this._eventsLog, event, true);
  // }
  private isAgent(infoJSON): boolean {return !this.isUndefinedOrNull(infoJSON.me) && !this.isUndefinedOrNull(infoJSON.me.agent);}
  private isScene(infoJSON): boolean {return !this.isUndefinedOrNull(infoJSON.game_info) && !this.isUndefinedOrNull(infoJSON.game_info.scene);}
  private isTeam(infoJSON): boolean {return !this.isUndefinedOrNull(infoJSON.match_info) && !this.isUndefinedOrNull(infoJSON.match_info.team);}
  private isUndefinedOrNull(obj): boolean {return obj === undefined || obj === null;}

  private matchEnded() {
    console.log('TERMINA LA PARTIDA');
    // this.resetAgent();
    // this.resetScene();
    // this.resetSide();
    // document.getElementById("waitingScreen").style.display = ""; 
    // document.getElementById("matchScreen").style.display = "none"; 
  }

  private matchStarted() {
    console.log('EMPIEZA LA PARTIDA');
    // document.getElementById("waitingScreen").style.display = "none"; 
    // document.getElementById("matchScreen").style.display = ""; 
  }

  // Special events will be highlighted in the event log
  private onNewEvents(e) {
    console.log(e);
    e.events.some(event => {
      if (event.name === 'match_start') {
        this.matchStarted();
      }
      if (event.name === 'match_end') {
        this.matchEnded();
      }
    });
  }

  // Displays the toggle minimize/restore hotkey in the window header
  // private async setToggleHotkeyText() {
  //   const gameClassId = await this.getCurrentGameClassId();
  //   const hotkeyText = await OWHotkeys.getHotkeyText(kHotkeys.toggle, gameClassId);
  //   const hotkeyElem = document.getElementById('hotkey');
  //   hotkeyElem.textContent = hotkeyText;
  // }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (
      hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent
    ): Promise<void> => {
      console.log(`pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(kHotkeys.toggle, toggleInGameWindow);
  }

  private async getCurrentGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();

    return (info && info.isRunning && info.classId) ? info.classId : null;
  }
}

InGame.instance().run();
document.addEventListener( 'DOMContentLoaded', initialize);
