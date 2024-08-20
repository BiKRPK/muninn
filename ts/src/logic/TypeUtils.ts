import { VideoOrigin, Side, Site, ContentType, AbKey} from './Enums';

  export const OverwolfIDToAgentName = new Map<string, string>([
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
  
 export const AgentNameToOverwolfID = new Map(Array.from(OverwolfIDToAgentName, entry => [entry[1], entry[0]]))

  //All posible scene values, overwolfID -> name
 export const OverwolfIDToSceneName = new Map<string, string>([
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

  export const SceneNameToOverwolfID = new Map(Array.from(OverwolfIDToSceneName, entry => [entry[1], entry[0]]))

  export function getoverwolfIDFromName(overwolfID: string): string {
    return AgentNameToOverwolfID.get(overwolfID) || SceneNameToOverwolfID.get(overwolfID);
  }

  export function getNameFromOverwolfID(overwolfID: string): string {
    return OverwolfIDToAgentName.get(overwolfID) || OverwolfIDToSceneName.get(overwolfID);
  }

  export function getAllAgentsOverwolfIDs(): string[] {
    return Array.from(OverwolfIDToAgentName.keys());
  }

  export function getAllAgentsNames(): string[] {
    return Array.from(AgentNameToOverwolfID.keys());
  }
  
  export function  getAllScenesOverwolfIDs(): string[] {
    return Array.from(OverwolfIDToSceneName.keys());
  }

  export function  getAllScenesNames(): string[] {
    return Array.from(SceneNameToOverwolfID.keys());
  }

  export function getAllSides(): Side[] {
    return Object.values(Side);
  }

  export function getAllSites(): Site[] {
    return Object.values(Site);
  }

  export function getAllContentTypes(): ContentType[] {
    return Object.values(ContentType);
  }

  export function getAllVideoOrigins(): VideoOrigin[] {
    return Object.values(VideoOrigin);
  }

  export function getAllAbKeys(): AbKey[] {
    return Object.values(AbKey);
  }

  export function getContentTypeName(ct: ContentType): string | undefined {
    switch (ct) {
      case ContentType.LineUp:
        return "LineUp";
      case ContentType.SetUp:
        return "SetUp";
      case ContentType.WallBang:
        return "WallBang";
      default:
        return undefined;
    }
  }

