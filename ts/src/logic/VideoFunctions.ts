import { SceneSpecification, AgentSpecification, SideSpecification, SiteSpecification, AbilitySpecification, ContentTypeSpecification, FavoriteSpecification, AndSpecification, UserSpecification, ISpecification } from './Specification';
import { getSelectedMap, getSelectedAgent, getSelectedAbilities, getSelectedSides, getSelectedSites, getSelectedContentTypes } from '../front/FrontFunctions'
import { RawVideo, getVideos } from '../persistance/Vids'
import { retrieveVideosIDB } from '../persistance/UserStorage';
import { Scene } from './Scene';
import { Ability } from './Ability';
import { Agent } from './Agent';
import { Side, Site, ContentType, VideoOrigin, AbKey } from './Enums';
import { getoverwolfIDFromName } from './TypeUtils';
import { Video } from './Video';



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
     try {
        

        const loopPromise = new Promise<void>((resolve) => {
            const rawVideos: Array<RawVideo> = getVideos();
            if (rawVideos.length == 0) {resolve();}
            rawVideos.forEach((rawVideo: RawVideo, index: number) => {
                try {  
                    const video: Video = buildVideo(rawVideo, VideoOrigin.Application);
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
                    const localVideo: Video = buildVideo(localRawVideo, VideoOrigin.User);
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

 function buildVideo(rawVideo: RawVideo, videoOrigin: VideoOrigin): Video {
    const agentName: string = rawVideo.agent;
    const agent: Agent = Agent.getInstance(agentName, getoverwolfIDFromName(agentName));

    const mapName: string = rawVideo.map;
    const scene: Scene = Scene.getInstance(mapName, getoverwolfIDFromName(mapName));

    const rawAbilities: string = rawVideo.ability;
    const abilities: Array<Ability> = [];
    rawAbilities.split(',').forEach((rawability: string) => {
        const abKey: AbKey = rawability as AbKey;
        abilities.push(Ability.getInstance(abKey, agent));
    });

    const video: Video = new Video(
        rawVideo.id,
        rawVideo.title,
        scene,
        rawVideo.side as Side,
        rawVideo.site as Site,
        rawVideo.type as ContentType,
        rawVideo.src instanceof Blob ? createTempURL(rawVideo.src as Blob) : rawVideo.src  as string,
        videoOrigin === VideoOrigin.User,    
        rawVideo.description,
        rawVideo.type === ContentType.WallBang ? undefined : agent,
        rawVideo.type === ContentType.WallBang ? undefined : abilities
    );
    if (rawVideo.src instanceof Blob) {console.log(video.src)} ; 
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
    initializeSelectedVariables();
    const isSideFiltered: boolean = $('.card.sidecard:not(.selected)').length > 0;
    const isSiteFiltered: boolean = $('.card.sitecard:not(.selected)').length > 0;
    const isAbilityFiltered: boolean = $('.card.abilitycard:not(.selected)').length > 0;
    const isTypeFiltered: boolean = $('.card.ContentTypecard:not(.selected)').length > 0;
    const isFavoriteFiltered: boolean = $('.card.favoritecard.selected').length > 0;
    const isUserContentFiltered: boolean = $('.card.ownvideocard.selected').length > 0;

    const sceneSpec: SceneSpecification = new SceneSpecification(selectedMap);
    const agentSpec: AgentSpecification = new AgentSpecification(selectedAgent);
    const sideSpec: SideSpecification = new SideSpecification(selectedSides);
    const siteSpec: SiteSpecification = new SiteSpecification(selectedSites);
    const abilitySpec: AbilitySpecification = new AbilitySpecification(selectedAbilities);
    const contentTypeSpec: ContentTypeSpecification = new ContentTypeSpecification(selectedContentTypes);
    const favoriteSpec: FavoriteSpecification = new FavoriteSpecification();
    const userContentSpec: UserSpecification = new UserSpecification();

    const specs: ISpecification[] = [sceneSpec, agentSpec];

    if (isSideFiltered) {
        specs.push(sideSpec);
    }
    if (isSiteFiltered) {
        specs.push(siteSpec);
    }
    if (isAbilityFiltered) {
        specs.push(abilitySpec);
    }
    if (isTypeFiltered) {
        specs.push(contentTypeSpec);
    }
    if (isFavoriteFiltered) {
        specs.push(favoriteSpec);
    }
    if (isUserContentFiltered) {
        specs.push(userContentSpec);
    }

    const combinedSpec = specs.reduce((acc, spec) => acc.and(spec));

    filteredVideos = allVideos.filter(video => combinedSpec.isSatisfiedBy(video));

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
