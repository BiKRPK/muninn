export interface RawVideo {
    id: string;
    agent: string;
    map: string;
    side: string;
    title: string;
    description: string;
    ability: string;
    type: string;
    src: string;
    site: string;
}
  
  const videos: RawVideo[] = [

    {
        "id": "5ee918e8-b9e8-455d-bc99-c52b7fb06afa",
        "agent": "Raze",
        "map": "Haven",
        "side": "Attack",
        "title": "How to Fight Garage Doors With Boom Bot",
        "description": "Peek Garage Doors like so with your Boom Bot, as it clears any Defender in the Link between Garage and C Site. Peeking with the Boom Bot will make it very difficult for Defenders to target both you and your utility.",
        "ability": "C",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/raze-haven-atk-garage-garage-roomba_1.mp4#t=0.1",
        "site": "C"
    },
    {
        "id": "c77d1604-3b68-4b61-b78c-74b84eedb8d0",
        "agent": "Viper",
        "map": "Ascent",
        "side": "Attack",
        "title": "B Site One Way Smoke for Defender Spawn",
        "description": "This smoke allows you to see the feet of anyone pushing through the CT door to B Site.",
        "ability": "Q",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/viper-ascent-offense-bSite-bSiteCT-oneWaySmoke.mp4#t=0.1",
        "site": "B"
    },
    {
        "id": "ea6acef8-8754-423a-9304-9b71da543a92",
        "agent": "Omen",
        "map": "Icebox",
        "side": "Defense",
        "title": "B Oranges to B Tube Dark Cover",
        "description": "This is a good one way smoke to get an advantageous angle on your enemy as they are pouring through under B Tube.",
        "ability": "E",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/omen-icebox-def-boranges-btube-darkcover.mp4#t=0.1",
        "site": "B"
    },
    {
        "id": "8cc2fbaf-fa87-4939-b8e7-09ca2355a9b6",
        "agent": "Sage",
        "map": "Icebox",
        "side": "Attack",
        "title": "A Nest To A Site Slow Orb",
        "description": "This slow orb lineup is useful for slowing down players peeking the left window of the tower on A Site.",
        "ability": "Q",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/sage-icebox-atk-asitetower-anest-sloworb.mp4#t=0.1",
        "site": "A"
    },
    {
        "id": "3b24e336-e9e6-437a-aeb9-390f323fdb7a",
        "agent": "Breach",
        "map": "Breeze",
        "side": "Defense",
        "title": "Mid Wooden Doors to Bottom Mid Flashpoint",
        "description": "This is a good Flashpoint for Bottom Mid from Mid Wooden Doors to flash enemies and allow you to swing on them.",
        "ability": "Q",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/(22)breach-breeze-def-midbottom-doubledoors-flashpoint.mp4#t=0.1",
        "site": "MID"
    },
    {
        "id": "a251f1b5-03bb-47d4-a670-f13f2af5c1f6",
        "agent": "Killjoy",
        "map": "Haven",
        "side": "Defense",
        "title": "B Site Turret + Garage Alarmbot",
        "description": "Here's a simple, yet effective Killjoy setup to cover Mid on Haven.",
        "ability": "E",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/killjoy-haven-def-bsite-bsite-turret_1.mp4#t=0.1",
        "site": "B"
    },
    {
        "id": "9380d920-aa34-4a52-ac5e-5d50b1a4d4db",
        "agent": "Killjoy",
        "map": "Pearl",
        "side": "Defense",
        "title": "Art + Mid Doors Full Utility Hold",
        "description": "Here's a full utility setup that allows you to primarily hold Art, while leaving utility at Mid Doors to let your team know if enemies push through Doors.",
        "ability": "E",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/killjoy-pearl-def-aart-midconnector-turret.mp4#t=0.1",
        "site": "MID"
    },
    {
        "id": "fb6d7935-6c3d-4cc7-9c61-26838d793ff4",
        "agent": "Yoru",
        "map": "Haven",
        "side": "Defense",
        "title": "A Link to B Site Blindside",
        "description": "This is a good blindside to retake B Site from A Link.",
        "ability": "Q",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/(7)yoru-haven-def-bsite-alink-blindside.mp4#t=0.1",
        "site": "B"
    },
    {
        "id": "b9efcf6f-0959-437b-9e6d-b19ea2d1b63e",
        "agent": "Astra",
        "map": "Pearl",
        "side": "Attack",
        "title": "Early Round Mid Doors Aggression from Mid Shops",
        "description": "Here are two stars you can use to take space in and around Mid Doors at the beginning of the round from Mid Shops.",
        "ability": "C",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/astra-pearl-atk-midplaza-midshops-gravitywell.mp4#t=0.1",
        "site": "MID"
    },
    {
        "id": "3c8ba7c1-b696-4919-96f9-330d1e5bffd2",
        "agent": "Neon",
        "map": "Pearl",
        "side": "Defense",
        "title": "Mid Connector/Mid Link Full Utility Delay Setups",
        "description": "From either Mid Connector, or Mid Link - here are two ways that you can delay the enemy team's push into A Site.",
        "ability": "C",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/neon-pearl-def-aartandasite-midconnector-fastlane.mp4#t=0.1",
        "site": "A"
    },
    {
        "id": "e7f11a42-0972-4c68-8109-748706fff502",
        "agent": "Harbor",
        "map": "Icebox",
        "side": "Attack",
        "title": "Early Round Mid Aggression Cove Lineup",
        "description": "Use this Cove lineup at the beginning of the round to pressure Mid, and / or push under Tube with your team. As an alternative, you could also use your Cascade ability for the same purpose.",
        "ability": "E",
        "type": "LU",
        "src": "https://blitz-cdn-videos.blitz.gg/valorant/guides/harbor-icebox-atk-btube-midblue-cove.mp4#t=0.1",
        "site": "B"
    }
  ];
  
  export function getVideos(): RawVideo[] {
    return videos;
  }