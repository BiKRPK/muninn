  
  export type Agent = {
    name?: string;
    internalName?: string;
  }
  
  export type Scene = {
    name?: string;
    internalName?: string;
  }
  
  export type abKey = "C" | "Q" | "E" | "X";
  
  export type Ability = {
    name?: string;
    key: abKey;
    agent: Agent;
  }
  
  export type Side = "Defending" | "Attacking" | null;
  
  export type Site = "A" | "B" | "C" | "MID";
  
  // LU -> Line-Up | SU -> Set-Up | WB -> WallBang | SP -> Sniper Peek
  export type contentType = "LU" | "SU" | "WB" | "SP";
  
  export type Video = {
    id: string;
    title: string;
    description?: string;
    map: Scene;
    agent: Agent;
    abilities?:  Ability[];
    side: Side;
    site: Site;
    type: contentType;
    url: string;
   //author: string;
  }

  