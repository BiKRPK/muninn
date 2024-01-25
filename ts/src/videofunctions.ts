import { MapCriteria, AgentCriteria, SideCriteria, SiteCriteria, AbilityCriteria, ContentTypeCriteria } from './Criteria';
import { Agent, Scene, AbKey, Ability, Side, Site, ContentType, Video } from './Types';
import {getInternalNameFromName, getNameFromInternalName, getAbilityName, getIconFromAbility, getAgentAbilities} from './Typefunctions';
import { getSelectedMap, getSelectedAgent, getSelectedAbilities, getSelectedSides, getSelectedSites, getSelectedContentTypes } from './Frontfunctions'
import { RawVideo, getVideos } from './Vids'


var selectedMap: Scene;
var selectedAgent: Agent;
var selectedAbilities: Ability[];
var selectedSides: Side[];
var selectedSites: Site[];
var selectedContentTypes: ContentType[];
const tempURLs = [];

var allVideos: Array<Video> = loadVideos();
var filteredVideos: Array<Video> = allVideos;

// async function receiveVideos() {
//     try {
//         allVideos = await loadVideos();
//         filteredVideos = allVideos;
//       } catch (error) {
//         console.error("Error loading videos:", error);
//       }
// }
// receiveVideos();

export function loadVideos():  Array<Video>{
    let videos: Array<Video> = [];
    cleanTempURLs(); 
    console.log("dentro de loadvideos");
     try {
         const rawVideos: Array<RawVideo> = getVideos();
         //TODO: Get LocalVideos
         rawVideos.forEach((rawVideo: RawVideo) => {
            try {  
                const video: Video = buildVideo(rawVideo);
                videos.push(video);
            } catch (error) {
            console.error(`Error reading ${rawVideo.id}:`, error);
            }
          });

     } catch (error) {
        console.error(`Error calling getVideos:`, error);
     }
     let i = 0;
     videos.forEach(video => {
        console.log("unfilteredvideo " + i + ": " + video.id);
     });
     return videos;
 }

 function buildVideo(rawVideo: RawVideo): Video {
    const agentName: string = rawVideo.agent;
    const agent: Agent = {
        name: agentName,
        internalName: getInternalNameFromName(agentName)
    }
    const mapName: string = rawVideo.map;
    const map: Scene = {
        name: mapName,
        internalName: getInternalNameFromName(mapName)
    }
    const rawAbilities: string = rawVideo.ability;
    const abilities: Array<Ability> = [];
    rawAbilities.split(',').forEach((rawability: string) => {
        const AbKey: AbKey = rawability as AbKey;
        const ability: Ability = {
            agent: agent,
            key: AbKey,
            name: getAbilityName(agent, AbKey)
        }
        abilities.push(ability);
        });

    const videoSource: string = rawVideo.src as string;
    const videoBlob: Blob = new Blob([videoSource], { type: "video/mp4" });
    const videoURL: string = createTempURL(videoBlob);
    const video: Video = {
        id: rawVideo.id,
        title: rawVideo.title,
        description: rawVideo.description,
        map: map,
        agent: agent,
        abilities:  abilities,
        side: rawVideo.side as Side,
        site: rawVideo.site as Site,
        type: rawVideo.type as ContentType,
        url: videoSource.startsWith('http') ? rawVideo.src  as string : videoURL,

    }
    return video;
 }

 function createTempURL(blob: Blob): string {
    const url = URL.createObjectURL(blob);
    tempURLs.push(url);
    return url;
 }

 function cleanTempURLs() {
    for (const url of tempURLs) {
        URL.revokeObjectURL(url);
    }
    tempURLs.length = 0;
 }

//  export function loadVideos(): Promise<Array<Video>> {
//     return new Promise((resolve, reject) => {
//       console.log("inside loadVideos");
//       const rawVideos: Array<RawVideo> = getVideos();
//       const promises: Promise<Video>[] = [];
  
//       rawVideos.forEach((rawVideo: RawVideo) => {
//         try {
//           const agentName: string = rawVideo.agent;
//           const agent: Agent = {
//             name: agentName,
//             internalName: getInternalNameFromName(agentName),
//           };
//           const mapName: string = rawVideo.map;
//           const map: Scene = {
//             name: mapName,
//             internalName: getInternalNameFromName(mapName),
//           };
//           const rawAbilities: string = rawVideo.ability;
//           const abilities: Array<Ability> = [];
//           rawAbilities.split(",").forEach((rawability: string) => {
//             const AbKey: AbKey = rawability as AbKey;
//             const ability: Ability = {
//               agent: agent,
//               key: AbKey,
//               name: getAbilityName(agent, AbKey),
//             };
//             abilities.push(ability);
//           });
  
//           const videoSource: string = rawVideo.src;
//           let videoURL: string;
  
//           if (videoSource.startsWith('http')) {
//             videoURL = videoSource; // Remote URL, assign directly
//           } else {
//             const promise = fetch(videoSource)
//               .then(response => response.blob())
//               .then(blob => {
//                 videoURL = URL.createObjectURL(blob); // Local file, create object URL
//                 const video: Video = {
//                   id: rawVideo.id,
//                   title: rawVideo.title,
//                   description: rawVideo.description,
//                   map: map,
//                   agent: agent,
//                   abilities: abilities,
//                   side: rawVideo.side as Side,
//                   site: rawVideo.site as Site,
//                   type: rawVideo.type as ContentType,
//                   url: videoURL,
//                 };
//                 return video;
//               })
//               .catch(error => {
//                 console.error(`Error reading local video ${rawVideo.id}:`, error);
//                 return null;
//               });
  
//             promises.push(promise);
//           }
//         } catch (error) {
//           console.error(`Error reading ${rawVideo.id}:`, error);
//         }
//       });
  
//       Promise.all(promises)
//         .then(videos => {
//           const filteredVideos = videos.filter(video => video !== null);
//           resolve(filteredVideos);
//         })
//         .catch(error => {
//           console.error("Error loading videos:", error);
//           reject(error);
//         });
//     });
//   }
  
  
export function filterVideos() {
    console.log('en filterVideos');
    initializeSelectedVariables();
    const criteriaArray = [
      new MapCriteria(selectedMap),
      new AgentCriteria(selectedAgent),
      new SideCriteria(selectedSides),
      new SiteCriteria(selectedSites),
      new AbilityCriteria(selectedAbilities),
      new ContentTypeCriteria(selectedContentTypes),
    ];
    
    filteredVideos = (allVideos ?? []).filter(video => criteriaArray.every(criteria => criteria.meetsCriteria(video)));
    let i = 0;
    filteredVideos.forEach(video => {
        console.log("filteredvideo " + i + ": " + video.id);
     });
}

export function initializeSelectedVariables() {
    selectedMap = getSelectedMap();
    selectedAgent = getSelectedAgent();
    selectedAbilities = getSelectedAbilities();
    selectedSides = getSelectedSides();
    selectedSites = getSelectedSites();
    selectedContentTypes = getSelectedContentTypes();
}

export const getfilteredVideos = (): Array<Video> => filteredVideos;
