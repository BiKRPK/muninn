export interface RawAbilities {
    agentName: string;
    agentAbilities: {
        [key: string]: RawAbility;
      };
}

export interface RawAbility {
    title: string;
    src: string;
}
  
  const abilities: RawAbilities[] = [
    {
    "agentName":"Astra",
    "agentAbilities":{
        "C":{
        "title":"Gravity Well",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/349065fc-6635-48ce-a8e7-10089ce74f08.svg"},
    "Q":{
        "title":"Nova Pulse",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/d7a6d634-7fc9-4453-b5bf-23903b8976ea.svg"},
    "E":{
        "title":"Nebula",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a33c684d-6225-48f9-98f4-7dbcddb8aeab.svg"},
    "X":{
        "title":"Cosmic Divide",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/90e4be57-839f-4b49-aa78-bd8a24f51da8.svg"}
        }
    },
    {
    "agentName":"Breach",
    "agentAbilities":{
        "C":{
        "title":"Aftershock",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/f98ac414-a87c-4bbc-a1fb-a485c6f130dc.svg"},
    "Q":{
        "title":"Flashpoint",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/063fe034-e1e1-4fbe-be9b-0e6e6f3623d9.svg"},
    "E":{
        "title":"Fault Line",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/78b31a24-896e-487d-8c34-1af012268198.svg"},
    "X":{
        "title":"Rolling Thunder",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/5a5302aa-9df1-4e7c-89f1-61ee24d0ae9a.svg"}
        }
    },
    {
    "agentName":"Brimstone",
    "agentAbilities":{
        "C":{
        "title":"Stim Beacon",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/08ca373f-12f7-4d41-86c9-8845a335baf4.svg"},
    "Q":{
        "title":"Incendiary",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/794983ca-4dc0-4d25-b69d-02dfd022d7f5.svg"},
    "E":{
        "title":"Sky Smoke",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/150b2b21-1001-46eb-afdc-33043f382759.svg"},
    "X":{
        "title":"Orbital Strike",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/8a970636-faef-492c-b746-df5a77e06c9b.svg"}
        }
    },
    {
    "agentName":"Chamber",
    "agentAbilities":{
        "C":{
        "title":"Trademark",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0baa9ac8-b582-4037-ac2b-33f611ec8051.svg"},
    "Q":{
        "title":"Headhunter",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/780fd402-15c2-41e4-ba56-e80c525d31e7.svg"},
    "E":{
        "title":"Rendezvous",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/cab1e405-ecd4-43e0-a880-76fe36c500e0.svg"},
    "X":{
        "title":"Tour De Force",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/4c56e722-66d5-41e9-b9c9-3393040ffbb2.svg"}
        }
    },
    {
    "agentName":"Cypher",
    "agentAbilities":{
        "C":{
        "title":"Trapwire",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/b24913f7-cb84-4aec-a4ee-99316008413d.svg"},
    "Q":{
        "title":"Cyber Cage",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/f04638b2-f448-4539-9eb4-46459490db5a.svg"},
    "E":{
        "title":"Spycam",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/5541c7c1-ecce-4aef-835f-577ac857899d.svg"},
    "X":{
        "title":"Neural Theft",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/1fa49297-29f9-4391-b39e-0f3dcf9ab77d.svg"}
        }
    },
    {
    "agentName":"Fade",
    "agentAbilities":{
        "C":{
        "title":"Prowler",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/79ef3819-4408-473d-be98-abab2a2e8ee8.svg"},
    "Q":{
        "title":"Seize",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/07057183-5e24-4527-bd23-c155746e2302.svg"},
    "E":{
        "title":"Haunt",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/2e6d5bab-9467-4bff-a768-ec7f5e8af369.svg"},
    "X":{
        "title":"Nightfall",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/1402a666-df65-4ea2-8345-6abef9e547e2.svg"}
        }
    },
    {
    "agentName":"Gekko",
    "agentAbilities":{
        "C":{
        "title":"Mosh Pit",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/513bb077-c34e-4a28-b80f-9359cd23fc5f.svg"},
    "Q":{
        "title":"Wingman",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/3baf3cc9-59a1-44fe-b6a1-f4d5caaa6d7d.svg"},
    "E":{
        "title":"Dizzy",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/fb62e2e6-47ad-475d-b443-a95f1e183240.svg"},
    "X":{
        "title":"Thrash",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/d2f9a927-15fe-4826-8349-1f18d5704e15.svg"}
        }
    },
    {
    "agentName":"Harbor",
    "agentAbilities":{
        "C":{
        "title":"Mosh Pit",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/513bb077-c34e-4a28-b80f-9359cd23fc5f.svg"},
    "Q":{
        "title":"Wingman",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/3baf3cc9-59a1-44fe-b6a1-f4d5caaa6d7d.svg"},
    "E":{
        "title":"Dizzy",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/fb62e2e6-47ad-475d-b443-a95f1e183240.svg"},
    "X":{
        "title":"Thrash",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/d2f9a927-15fe-4826-8349-1f18d5704e15.svg"}
        }
    },
    {
    "agentName":"Jett",
    "agentAbilities":{
        "C":{
        "title":"Cloudburst",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/84fd08c7-a933-4a69-9ada-ac28599da870.svg"},
    "Q":{
        "title":"Updraft",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/1e74d511-41f9-4157-ab5a-3ad961cc39e5.svg"},
    "E":{
        "title":"Tailwind",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/ea6e71e9-8f73-4aa7-99da-ced514e3c4eb.svg"},
    "X":{
        "title":"Blade Storm",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/5ca8493c-5fe6-4af0-aee9-2a5f5a29366b.svg"}
        }
    },
    {
    "agentName":"KAY/O",
    "agentAbilities":{
        "C":{
        "title":"FRAG/MENT",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/359104d2-8825-450e-9834-f3ab6a5cdf15.svg"},
    "Q":{
        "title":"FLASH/DRIVE",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/8396db72-6b72-4983-ba11-5fb1d6fbdf3b.svg"},
    "E":{
        "title":"ZERO/POINT",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/abc20b45-908c-457d-9ac3-a1fa2acdef60.svg"},
    "X":{
        "title":"NULLCMD",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/3d4e0902-4feb-48be-a0cd-1319cead01c9.svg"}
        }
    },
    {
    "agentName":"Neon",
    "agentAbilities":{
        "C":{
        "title":"Fast Lane",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/69568c07-e4e1-4eb1-833f-594e6022a178.svg"},
    "Q":{
        "title":"Relay Bolt",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/82a94f7d-fb74-4e13-b0a4-e3d906529a2e.svg"},
    "E":{
        "title":"High Gear",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0ba1390e-9046-43d3-8f95-499e9ef529a6.svg"},
    "X":{
        "title":"Overdrive",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/675ee672-46ab-4e60-b7e4-e0283f2d8cf5.svg"}
        }
    },
    {
    "agentName":"Killjoy",
    "agentAbilities":{
        "C":{
        "title":"Nanoswarm",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/2de16edf-f775-426c-8ac2-e3632b4ad5f7.svg"},
    "Q":{
        "title":"Alarmbot",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0eee8bd1-e974-4fd3-9131-15a764c5c0b7.svg"},
    "E":{
        "title":"Turret",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/593fd135-d97d-4f44-83d0-d9dd1e0423fb.svg"},
    "X":{
        "title":"Lockdown",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0273f388-3903-436a-ab43-80042fb4ab17.svg"}
        }
    },
    {
    "agentName":"Omen",
    "agentAbilities":{
        "C":{
        "title":"Shrouded Step",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0ecc9bb8-a98e-4396-bcb3-dbc98098b81f.svg"},
    "Q":{
        "title":"Paranoia",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/bc69441e-f619-485d-adcd-56c15105c2e4.svg"},
    "E":{
        "title":"Dark Cover",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/3f312411-6c40-4aff-b386-2706211516d4.svg"},
    "X":{
        "title":"From the Shadows",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/7540ec62-620a-44e2-9d7f-65594159d9a2.svg"}
        }
    },
    {
    "agentName":"Phoenix",
    "agentAbilities":{
        "C":{
        "title":"Blaze",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/3d604907-26f0-4ab0-85d6-63dc50b9aca7.svg"},
    "Q":{
        "title":"Curveball",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a6895ce8-f876-46bc-84b2-72ef56eacdc3.svg"},
    "E":{
        "title":"Hot Hands",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a9772092-4e74-40cd-a175-b5daa4e78700.svg"},
    "X":{
        "title":"Run it Back",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/9c48b99e-4b1b-4948-a95d-3209f648e7bf.svg"}
        }
    },
    {
    "agentName":"Raze",
    "agentAbilities":{
        "C":{
        "title":"Boom Bot",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/e0aa5fb4-5de0-4a87-96c5-4db2b4f523ed.svg"},
    "Q":{
        "title":"Blast Pack",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/e03f3f2c-a03e-4631-ba08-8f0b6b550af1.svg"},
    "E":{
        "title":"Paint Shells",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/4ef47aa0-f185-4fb1-9072-1a2f1d2d28b6.svg"},
    "X":{
        "title":"Showstopper",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/6d1189e4-2441-40dd-b0bc-23bcfc3cb490.svg"}
        }
    },
    {
    "agentName":"Reyna",
    "agentAbilities":{
        "C":{
        "title":"Leer",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/e8f2a06c-92cd-4d7a-9ffa-2fdfaae5ccf1.svg"},
    "Q":{
        "title":"Devour",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/55c62277-8964-4825-b884-5fb594aa8d4c.svg"},
    "E":{
        "title":"Dismiss",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/984a09dc-4b53-4a47-9079-cd4bfd996448.svg"},
    "X":{
        "title":"Empress",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/0acd08ed-f137-49dd-9457-478cfe6b79f2.svg"}
        }
    },
    {
    "agentName":"Sage",
    "agentAbilities":{
        "C":{
        "title":"Barrier Orb",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/4d19af2b-2c68-49f3-bbda-e384c9cb73eb.svg"},
    "Q":{
        "title":"Slow Orb",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a9d66cbf-f6e4-483b-83c3-081e73bb3e59.svg"},
    "E":{
        "title":"Resurrection",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/08a729d0-8ecc-4cf4-8dfa-c291b80de969.svg"},
    "X":{
        "title":"Heal Orb",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/9e8f4e56-c2f1-43f5-b920-c44f21f3ca06.svg"}
        }
    },
    {
    "agentName":"Skye",
    "agentAbilities":{
        "C":{
        "title":"Regrowth",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/bf255d60-6f82-4f8a-a143-2c1b41d20060.svg"},
    "Q":{
        "title":"Trailblazer",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a7ab3c8d-da4d-44ec-a66b-861837811287.svg"},
    "E":{
        "title":"Guiding Light",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/afe34a44-e802-475a-aaab-548540e2d2a7.svg"},
    "X":{
        "title":"Seekers",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/e3e9304f-0a63-4377-b955-7c64934b6811.svg"}
        }
    },
    {
    "agentName":"Sova",
    "agentAbilities":{
        "C":{
        "title":"Owl Drone",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/2a5343bc-7a46-482e-9032-494aec306df7.svg"},
    "Q":{
        "title":"Shock Dart",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/e7237899-2093-4f19-b135-cc8e1dbd9766.svg"},
    "E":{
        "title":"Recon Dart",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/f1938d98-b4fe-4d09-96fe-6b431cd492ac.svg"},
    "X":{
        "title":"Hunter's Fury",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/a492ee66-d545-4ef7-ab76-e6057da235d8.svg"}
        }
    },
    {
    "agentName":"Viper",
    "agentAbilities":{
        "C":{
        "title":"Snake Bite",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/b8962063-d246-4085-8d7b-7b1a9b33478e.svg"},
    "Q":{
        "title":"Poison Cloud",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/93a59f60-497c-450c-83ba-a6bed003c1b8.svg"},
    "E":{
        "title":"Toxic Screen",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/2b450953-6072-43b1-bf7a-c5024b402741.svg"},
    "X":{
        "title":"Viper's Pit",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/97692712-5cf9-4f5f-89c7-2ca8294cd603.svg"}
        }
    },
    {
    "agentName":"Yoru",
    "agentAbilities":{
        "C":{
        "title":"Fakeout",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/c16de461-0c8a-4bbe-9c42-ec5c978800cc.svg"},
    "Q":{
        "title":"Blindside",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/db917c41-f5e1-4bdc-a480-883d15b8f9b2.svg"},
    "E":{
        "title":"Gatecrash",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/b040f60c-b893-4478-a5f5-8d15992b9118.svg"},
    "X":{
        "title":"Dimensional Drift",
        "src":"https://s3-us-east-2.amazonaws.com/strats-gg/images/cc5f4f25-581a-4b95-a601-ebc4b636eb10.svg"}
        }
    }
];
  
  export function getAbilities(agentName: string, key: string): RawAbility {
    const agent: RawAbilities = abilities.find((ability) => ability.agentName === agentName);
    if (agent) {
        return agent.agentAbilities[key];
    } else {
        return undefined;
    }
  }