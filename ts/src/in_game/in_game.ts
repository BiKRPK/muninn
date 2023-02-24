import {
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../AppWindow";
import { kHotkeys, kWindowNames, kGamesFeatures } from "../consts";

import WindowState = overwolf.windows.WindowStateEx;

import  $ from "jquery";



// The window displayed in-game while a game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
type Agent = {
  name?: string;
  internalName?: string;
}

type Scene = {
  name?: string;
  internalName?: string;
}

type Side = "defense" | "attack" | null; 

//All posible agent values, internalName -> name
var agentMap = new Map<string, string>([
  ["Clay_PC_C",  "Raze"],
  ["Pandemic_PC_C", "Viper"],
  ["Wraith_PC_C", "Omen"],
  ["Hunter_PC_C", "Sova"],
  ["Thorne_PC_C", "Sage"],
  ["Phoenix_PC_C", "Phoenix"],
  ["Wushu_PC_C", "Jett"],
  ["Gumshoe_PC_C", "Cypher"],
  ["Sarge_PC_C", "Brimstone"],
  ["Breach_PC_C", "Breach"],
  ["Vampire_PC_C", "Reyna"],
  ["Killjoy_PC_C", "Killjoy"],
  ["Guide_PC_C", "Skye"],
  ["Stealth_PC_C", "Yoru"],
  ["Rift_PC_C", "Astra"],
  ["Grenadier_PC_C", "KAY/O"],
  ["Deadeye_PC_C", "Chamber"],
  ["Sprinter_PC_C", "Neon"],
  ["BountyHunter_PC_C", "Fade"],
  ["Mage_PC_C", "Harbor"]
]);

//All posible scene values, internalName -> name
var sceneMap = new Map<string, string>([
  // ["MainMenu", "Main menu"],
  ["Triad", "Haven"],
  ["Bonsai", "Split"],
  ["Ascent", "Ascent"],
  ["Port", "Icebox"],
  ["Foxtrot", "Breeze"],
  ["Canyon", "Fracture"],
  ["Pitt", "Pearl"],
  ["Jam", "Lotus"],
  // ["Range", "Practice Range"],
  // ["CharacterSelectPersistentLevel", "Character Selection"]
]);

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
    this.setToggleHotkeyText();
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

  private resetAgent() {
    this.currentAgent = undefined;
    this.updateAgentInUI();
  }

  private resetScene() {
    this.currentScene = undefined;
    this.updateSceneInUI();
  }

  private resetSide() {
    this.currentSide = undefined;
    this.updateSideInUI();
  }

  private updateAgent(agent) {
    //let agent = infoJSON.me.agent;
    console.log('update agent');
    let agentName = agentMap.get(agent) || undefined;
    if (agentMap) {
      this.currentAgent = {
        name: agentName,
        internalName: agent
      }
      console.log('AGENTE: ' + this.currentAgent.name);
      this.updateAgentInUI();
    }  
  }

  private updateScene(scene) {
    //let scene = infoJSON.game_info.scene;
    console.log('update scene');
    let sceneName = sceneMap.get(scene) || undefined;
    if (sceneName) {
      this.currentScene = {
        name: sceneName,
        internalName: scene
      }
      console.log('MAPA: '  + this.currentScene.name);
      this.updateSceneInUI();
    }
  }

  private updateSide(side) {
    //let team = infoJSON.match_info.team;
    this.currentSide = side;
    console.log('LADO: '  + this.currentSide);
    this.updateSideInUI();
  }

  private updateAgentInUI() {
    let text = 'waiting...';
    if(this.currentAgent) {
      text = this.currentAgent.name;
    } 
    $('#Agente').text(text);
    document.getElementById("Agente").innerHTML = text;
  }

  private updateSceneInUI() {
    let text = 'waiting...';
    if(this.currentScene) {
      text = this.currentScene.name;
    } 
    $('#Mapa').text(text);
    document.getElementById("Mapa").innerHTML = text;
  }

  private updateSideInUI() {
    let text = 'waiting...';
    if(this.currentSide) {
      text = this.currentSide;
    } 
    $('#Lado').text(text);
    document.getElementById("Lado").innerHTML = text;
  }


  private onInfoUpdates(info) {
      let infoJSON = JSON.parse(JSON.stringify(info));
      console.log('update: ' + infoJSON);
      if(this.isAgent(infoJSON)) {
        this.updateAgent(infoJSON.me.agent);
      } else if(this.isScene(infoJSON)) {
        this.updateScene(infoJSON.game_info.scene);
      } else if((this.isTeam(infoJSON))) {
        this.updateSide(infoJSON.match_info.team);
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
    this.resetAgent();
    this.resetScene();
    this.resetSide();
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
  private async setToggleHotkeyText() {
    const gameClassId = await this.getCurrentGameClassId();
    const hotkeyText = await OWHotkeys.getHotkeyText(kHotkeys.toggle, gameClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

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

  // Appends a new line to the specified log
  private logLine(log: HTMLElement, data, highlight) {
    const line = document.createElement('pre');
    line.textContent = JSON.stringify(data);

    if (highlight) {
      line.className = 'highlight';
    }

    // Check if scroll is near bottom
    const shouldAutoScroll =
      log.scrollTop + log.offsetHeight >= log.scrollHeight - 10;

    log.appendChild(line);

    if (shouldAutoScroll) {
      log.scrollTop = log.scrollHeight;
    }
  }

  private async getCurrentGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();

    return (info && info.isRunning && info.classId) ? info.classId : null;
  }
}

InGame.instance().run();
