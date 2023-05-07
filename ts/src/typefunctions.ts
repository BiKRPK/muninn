import {Agent, abKey, Ability } from './types';

  export function getIconFromAbility(ability: Ability): string {
    return '../../icons/' + ability.agent.internalName + '-' + ability.key; 
  }

  const I2Eagent = new Map<string, string>([
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
  
  const E2Iagent = new Map(Array.from(I2Eagent, entry => [entry[1], entry[0]]))

  //All posible scene values, internalName -> name
  const I2EScene = new Map<string, string>([
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

  const E2IScene = new Map(Array.from(I2EScene, entry => [entry[1], entry[0]]))

  export function getInternalNameFromName(internalName: string) :string {
    return E2Iagent.get(internalName) || E2IScene.get(internalName);
  }

  export function getNameFromInternalName(internalName: string) :string {
    return I2Eagent.get(internalName) || I2EScene.get(internalName);
  }

  export function getAbilityName(agent: Agent, key: abKey): string {
    return "asdasd";
  }