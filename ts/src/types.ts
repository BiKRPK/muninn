  
  export type Agent = {
    name?: string;
    internalName?: string;
  }
  
  export type Scene = {
    name?: string;
    internalName?: string;
  }
  
  export const allAbKeyOptions = ["C", "Q", "E", "X"] as const; 

  export type AbKey = typeof allAbKeyOptions[number];
  
  export type Ability = {
    name?: string;
    key: AbKey;
    agent: Agent;
  }
  
  export const allSideOptions = ["Defense", "Attack", null] as const; 

  export type Side =  typeof allSideOptions[number];
  
  export const allSiteOptions = ["A", "B", "C", "MID"] as const; 

  export type Site = typeof allSiteOptions[number];
  
  export const allContentTypeOptions = ["LU", "SU", "WB", "SP"] as const;
  // LU -> Line-Up | SU -> Set-Up | WB -> WallBang | SP -> Sniper Peek
  export type ContentType = typeof allContentTypeOptions[number];

  export type Video = {
    id: string;
    title: string;
    description?: string;
    map: Scene;
    agent: Agent;
    abilities?:  Ability[];
    side: Side;
    site: Site;
    type: ContentType;
    url: string;
   //author: string;
  }

  