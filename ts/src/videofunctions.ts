import { MapCriteria, AgentCriteria, SideCriteria, SiteCriteria, AbilityCriteria, ContentTypeCriteria } from './Criteria';
import { Agent, Scene, AbKey, Ability, Side, Site, ContentType, Video } from './Types';
import {getInternalNameFromName, getAbilityName} from './TypeFunctions';
import { getSelectedMap, getSelectedAgent, getSelectedAbilities, getSelectedSides, getSelectedSites, getSelectedContentTypes } from './FrontFunctions'
import { RawVideo, getVideos } from './Vids'
import {retrieveVideosIDB} from './UserStorage';


var selectedMap: Scene;
var selectedAgent: Agent;
var selectedAbilities: Ability[];
var selectedSides: Side[];
var selectedSites: Site[];
var selectedContentTypes: ContentType[];
const tempURLs = [];


let allVideos: Array<Video> = [];
let filteredVideos: Array<Video> = [];
let initializationPromise: Promise<void> | null = null;

export async function init() {
    if (!initializationPromise) {
        initializationPromise = new Promise<void>(async (resolve, reject) => {
            try {
                allVideos = await loadVideos();
                filteredVideos = allVideos;
                // Call other initialization functions here...
                // Start your application after all asynchronous operations are complete...
                resolve(); // Resolve the promise once initialization is complete
            } catch (error) {
                console.error('Error initializing application:', error);
                reject(error); // Reject the promise if an error occurs during initialization
            }
        });
    }
}

init();




export async function loadVideos():  Promise<Array<Video>>{
    let videos: Array<Video> = [];
    cleanTempURLs(); 
    console.log("dentro de loadvideos");
     try {
        

        const loopPromise = new Promise<void>((resolve) => {
            const rawVideos: Array<RawVideo> = getVideos();
            if (rawVideos.length == 0) {resolve();}
            rawVideos.forEach((rawVideo: RawVideo, index: number) => {
                try {  
                    const video: Video = buildVideo(rawVideo);
                    videos.push(video);
                    if (index === rawVideos.length - 1) { resolve(); }
                } catch (error) {
                console.error(`Error reading ${rawVideo.id}:`, error);
                }
            });
        });
        await loopPromise

        // rawVideos.forEach((rawVideo: RawVideo) => {
        //     try {  
        //         const video: Video = buildVideo(rawVideo);
        //         videos.push(video);
        //     } catch (error) {
        //     console.error(`Error reading ${rawVideo.id}:`, error);
        //     }
        //   });
          
        const localRawVideos: Array<RawVideo> = await retrieveVideosIDB(); // Wait for the promise to resolve
        
        // localRawVideos.forEach((localRawVideo: RawVideo) => {
        //     try {  
        //         const localVideo: Video = buildVideo(localRawVideo);
        //         console.log(localVideo.id);
        //         videos.push(localVideo);
        //     } catch (error) {
        //     console.error(`Error reading IDB value ${localRawVideo.id}:`, error);
        //     }
        //   });

        const localLoopPromise = new Promise<void>((resolve) => {
            if (localRawVideos.length == 0) {resolve();}
            localRawVideos.forEach((localRawVideo: RawVideo, index: number) => {
                try {  
                    const localVideo: Video = buildVideo(localRawVideo);
                    console.log(localVideo.id);
                    videos.push(localVideo);
                    if (index === localRawVideos.length - 1) { resolve(); }
                } catch (error) {
                console.error(`Error reading IDB value ${localRawVideo.id}:`, error);
                }
            });
        });
        await localLoopPromise;

     } catch (error) {
        console.error(`Error calling getVideos:`, error);
     }
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
        url: rawVideo.src instanceof Blob ? createTempURL(rawVideo.src as Blob) : rawVideo.src  as string,
        //url: rawVideo.src as string,
    }
    if (rawVideo.src instanceof Blob) {console.log(video.url)} ; 
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

  
export async function filterVideos() {
    await initializationPromise;
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
