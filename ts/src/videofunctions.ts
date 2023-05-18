import { MapCriteria, AgentCriteria, SideCriteria, SiteCriteria, AbilityCriteria, ContentTypeCriteria } from './criteria';
import { Agent, Scene, abKey, Ability, Side, Site, contentType, Video } from './types';
import {getInternalNameFromName, getNameFromInternalName, getAbilityName, getIconFromAbility, getAgentAbilities} from './typefunctions';
import { getSelectedMap, getSelectedAgent, getSelectedAbilities, getSelectedSides, getSelectedSites, getSelectedContentTypes } from './frontfunctions'
import { RawVideo, getVideos } from './vids'


var selectedMap: Scene;
var selectedAgent: Agent;
var selectedAbilities: Ability[];
var selectedSides: Side[];
var selectedSites: Site[];
var selectedContentTypes: contentType[];

var allVideos: Array<Video> = loadVideos();
var filteredVideos: Array<Video> = allVideos;

export function loadVideos():  Array<Video>{
    let videos: Array<Video> = [];
    console.log("dentro de loadvideos");
     try {
         const rawVideos: Array<RawVideo> = getVideos();

         rawVideos.forEach((rawVideo: RawVideo) => {
            try {
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
                    const abkey: abKey = rawability as abKey;
                    const ability: Ability = {
                        agent: agent,
                        key: abkey,
                        name: getAbilityName(agent, abkey)
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
                    type: rawVideo.type as contentType,
                    url: rawVideo.src as string,

                }
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
