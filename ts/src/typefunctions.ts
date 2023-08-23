import {Agent, AbKey, Ability, Side, Site, Scene, ContentType, allContentTypeOptions, allSideOptions, allSiteOptions } from './Types';
import {getAbilities, RawAbility} from './Abilities';

  export function getIconFromAbility(ability: Ability): string {
    const rawAbility: RawAbility = getAbilities(ability.agent.name, ability.key);
    if (rawAbility) { return rawAbility.src;}
    return '';
  }

  const I2EAgent = new Map<string, string>([
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
    ["Mage_PC_C", "Harbor"],
    ["AggroBot_PC_C", "Gekko"]
  ]);
  
  const E2Iagent = new Map(Array.from(I2EAgent, entry => [entry[1], entry[0]]))

  //All posible scene values, internalName -> name
  const I2EScene = new Map<string, string>([
    // ["MainMenu", "Main menu"],
    ["Triad", "Haven"],
    ["Duality", "Bind"],
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

  const E2IScene = new Map(Array.from(I2EScene, entry => [entry[1], entry[0]]))

  export function getInternalNameFromName(internalName: string): string {
    return E2Iagent.get(internalName) || E2IScene.get(internalName);
  }

  export function getNameFromInternalName(internalName: string): string {
    return I2EAgent.get(internalName) || I2EScene.get(internalName);
  }

  export function getAbilityName(agent: Agent, key: AbKey): string {
    const rawAbility: RawAbility = getAbilities(agent.name, key);
    if (rawAbility) {
      return rawAbility.title;
    } 
    return "Uknown";
  }

  export function getAgentAbilities(agent: Agent): Ability[] {
    let cAb: Ability = {
      agent: agent,
      key: 'C' as AbKey,
      name: getAbilityName(agent, 'C' as AbKey)
    }
    let qAb: Ability = {
      agent: agent,
      key: 'Q' as AbKey,
      name: getAbilityName(agent, 'Q' as AbKey)
    }
    let eAb: Ability = {
      agent: agent,
      key: 'E' as AbKey,
      name: getAbilityName(agent, 'E' as AbKey)
    }
    let xAb: Ability = {
      agent: agent,
      key: 'X' as AbKey,
      name: getAbilityName(agent, 'X' as AbKey)
    }
    return [cAb, qAb, eAb, xAb];
  }



  export function getAllSides(): Side[] {
    let sideOptions: Array<Side> = [];
    allSideOptions.forEach(function(side) {
      sideOptions.push(side as Side);
    });
    return sideOptions;
  }

  export function getAllSites(): Site[] {
    let siteOptions: Array<Site> = [];
    allSiteOptions.forEach(function(site) {
      siteOptions.push(site as Site);
    });
    return siteOptions;
  }

  export function getAllContentTypes(): ContentType[] {
    let ContentTypeOptions: Array<ContentType> = [];
    allContentTypeOptions.forEach(function(contentType) {
      ContentTypeOptions.push(contentType as ContentType);
    });
    return ContentTypeOptions;
  }

  const CTnameMap = new Map<ContentType, string>([
    // LU -> Line-Up | SU -> Set-Up | WB -> WallBang | SP -> Sniper Peek
    ['LU' as ContentType, 'Line-Up'],
    ['SU' as ContentType, 'Set-Up'],
    ['WB' as ContentType, 'WallBang'],
    ['SP' as ContentType, 'Sniper Peek']
  ]); 

  export function getContentTypeName(ct: ContentType): string {
    return CTnameMap[ct];
  }

  export function getAllScenes(): Scene[] {
    let scenes: Array<Scene> = [];
    for (let key of I2EScene.keys()) {
      const scene: Scene = {
        internalName: key,
        name: I2EScene.get(key),
      }
      scenes.push(scene);
    }
    return scenes;
  }

  export function getAllAgents(): Agent[] {
    let agents: Array<Agent> = [];
    for (let key of I2EAgent.keys()) {
      const Agent: Agent = {
        internalName: key,
        name: I2EAgent.get(key),
      }
      agents.push(Agent);
    }
    return agents;
  }

  export function getAllAbilities(): Map<Agent, Ability[]> {
    let abilities: Map<Agent, Ability[]> = new Map<Agent, Ability[]>();
    getAllAgents().forEach(function(agent: Agent) {
      abilities.set(agent, getAgentAbilities(agent));
    });
    return abilities;
  }

