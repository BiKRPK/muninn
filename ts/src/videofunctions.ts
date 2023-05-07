import { MapCriteria, AgentCriteria, SideCriteria, SiteCriteria, AbilityCriteria, ContentTypeCriteria } from './criteria';
import { Agent, Scene, abKey, Ability, Side, Site, contentType, Video } from './types';
import { getSelectedMap, getSelectedAgent, getSelectedAbilities, getSelectedSides, getSelectedSites, getSelectedContentTypes } from './frontfunctions'


var selectedMap: Scene;
var selectedAgent: Agent;
var selectedAbilities: Ability[];
var selectedSides: Side[];
var selectedSites: Site[];
var selectedContentTypes: contentType[];

var allVideos: Array<Video> = loadVideos();
var filteredVideos: Array<Video> = allVideos;

export function loadVideos() {
    //read csv/JSON
    return null;
}
  
export function filterVideos() {
    const criteriaArray = [
      new MapCriteria(selectedMap),
      new AgentCriteria(selectedAgent),
      new SideCriteria(selectedSides),
      new SiteCriteria(selectedSites),
      new AbilityCriteria(selectedAbilities),
      new ContentTypeCriteria(selectedContentTypes),
    ];
  
    filteredVideos = allVideos.filter(video => criteriaArray.every(criteria => criteria.meetsCriteria(video)));
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
