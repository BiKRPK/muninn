import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import '@splidejs/splide/css';

import Splide from '@splidejs/splide';
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

var agentMap = new Map<string, string>([
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
  ["Mage_PC_C", "Harbor"]
]);

//All posible scene values, internalName -> name
var sceneMap = new Map<string, string>([
  // ["MainMenu", "Main menu"],
  ["Triad", "Haven"],
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

var selectedMap: Scene;
var selectedAgent: Agent;
var selectedAbilities: Ability[];
var selectedSides: Side[];
var selectedSites: Site[];
var selectedContentTypes: contentType[];


type Agent = {
  name?: string;
  internalName?: string;
}

type Scene = {
  name?: string;
  internalName?: string;
}

type abKey = "C" | "Q" | "E" | "X";

type Ability = {
  name?: string;
  key: abKey;
  agent: Agent;
}

function getIconFromAbility(ability: Ability): string{
  return '../../icons/' + ability.agent.internalName + '-' + ability.key; 
}

type Side = "defense" | "attack" | null;

type Site = "A" | "B" | "C" | "MID";

// LU -> Line-Up | SU -> Set-Up | WB -> WallBang | SP -> Sniper Peek
type contentType = "LU" | "SU" | "WB" | "SP";

type Video = {
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

var allVideos: Array<Video> = loadVideos();

var filteredVideos: Array<Video> = allVideos;

function loadSplide() {

  var main = new Splide( '#main-carousel', {
    fixedHeight  : '80%',
    type      : 'fade',
    rewind    : true,
    pagination: false,
    arrows    : true
  } );

  var thumbnails = new Splide( '#thumbnail-carousel', {
    fixedHeight  : '20%',
    fixedWidth : 'auto',
    gap         : 10,
    rewind      : true,
    pagination  : false,
    isNavigation: true,
    // breakpoints : {
    //   600: {
    //     fixedWidth : 60,
    //     fixedHeight: 44,
    //   },
    // },
  } );

  main.sync( thumbnails );
  main.mount();
  thumbnails.mount();
} 

function initialize() {
  initializeSelectedVariables();
  loadVideos();
  filterVideos();
  addVideosInScreen();
  loadSplide();
}

function initializeSelectedVariables() {
  selectedMap = getSelectedMap();
  selectedAgent = getSelectedAgent();
  selectedAbilities = getSelectedAbilities();
  selectedSides = getSelectedSides();
  selectedSites = getSelectedSites();
  selectedContentTypes = getSelectedContentTypes();
}

function getSelectedMap(): Scene {
  let selectedMapID = $('.card.mapcard.selected').attr('id');
  let selectedScene: Scene = {
    internalName: selectedMapID,
    name: sceneMap[selectedMapID],
  }
  return selectedScene;
}

function getSelectedAgent(): Agent {
  let selectedAgentID = $('.card.agentcard.selected').attr('id');
  let selectedAgent: Agent = {
    internalName: selectedAgentID,
    name: agentMap[selectedAgentID],
  }
  return selectedAgent;
}

function getSelectedAbilities(): Ability[] {
  let selectedAbilities: Ability[];
  $('.card.abilitycard.selected').each(
    function() {
      let currentAgent = getSelectedAgent();
      let selectedKey: abKey = $(this).attr('id') as abKey;
      let selectedAbility: Ability = {
        agent: currentAgent,
        key: selectedKey,
        name: getAbilityName(currentAgent, selectedKey),
      }
      selectedAbilities.push(selectedAbility);
    }
  );
  return selectedAbilities;
}

function getAbilityName(agent: Agent, key: abKey): string {
  return "asdasd";
}

function getSelectedSides(): Side[] {
  let selectedSides: Side[];
   $('.card.sidecard.selected').each(
    function() {
      let selectedSide: Side = $(this).attr('id') as Side;
      selectedSides.push(selectedSide);
    }
  );
  return selectedSides;
}

function getSelectedSites(): Site[] {
  let selectedSites: Site[];
   $('.card.sitecard.selected').each(
    function() {
      let selectedSite: Site = $(this).attr('id') as Site;
      selectedSites.push(selectedSite);
    }
  );
  return selectedSites;
}

function getSelectedContentTypes(): contentType[] {
  let selectedContentTypes: contentType[];
   $('.card.contenttypecard.selected').each(
    function() {
      let selectedContentType: contentType = $(this).attr('id') as contentType;
      selectedContentTypes.push(selectedContentType);
    }
  );
  return selectedContentTypes;
}

document.addEventListener( 'DOMContentLoaded', initialize);


 
$(document).on({
  mouseenter: function (e) {
    const vid = e.target
    vid.muted = true
    vid.play()
  },
  mouseleave: function (e) {
    const vid = e.target
    vid.muted = false
    vid.currentTime = 0
    vid.pause()
  }
}, "#thumbnail-carousel > div > ul > li > video");

$('.agentcard').on({
  click:  function() {
    var oldSelected = $('.agentcard.selected');
    $('.agentcard').removeClass('selected');
    $(this).toggleClass('selected');
    swap(oldSelected, $(this));
    //$(".agentcard.selected").prependTo(".agentgrid.grid");
    //sacar agente a partir del this
    //llamar a actualiza habilidades
    //llamar a actualizar filtros
  }
});

function swap(a, b) {
  a = $(a); b = $(b);
  var tmp = $('<span>').hide();
  a.before(tmp);
  b.before(a);
  tmp.replaceWith(b);
};

$('.mapcard').on({
  click:  function() {
    var oldSelected = $('.mapcard.selected');
    $('.mapcard').removeClass('selected');
    $(this).toggleClass('selected');
    swap(oldSelected, $(this));
    // $(".mapcard.selected").prependTo(".mapgrid.grid");
    //sacar agente a partir del this
    //llamar a actualizar filtros
  }
});

$('.sidecard').on({
  click:  function() {
    $(this).toggleClass('selected');
    //sacar agente a partir del this
    //llamar a actualizar filtros
  }
});

$('.sitecard').on({
  click:  function() {
    $(this).toggleClass('selected');
    //sacar agente a partir del this
    //llamar a actualizar filtros
  }
});

$('.abilitycard').on({
  click:  function() {
    $(this).toggleClass('selected');
    //sacar agente a partir del this
    //llamar a actualizar filtros
  }
});

$('.contenttypecard').on({
  click:  function() {
    $(this).toggleClass('selected');
    //sacar agente a partir del this
    //llamar a actualizar filtros
  }
});


function loadVideos() {
  //read csv/JSON
  return null;
}

function filterVideos() {
  filteredVideos = allVideos.filter(
    function(video: Video) {
      meetsCriteria(video)
    }
  );
}

function meetsCriteria(video: Video): boolean {
  return meetsMapCriteria(video.map) &&  meetsAgentCriteria(video.agent) && meetsSideCriteria(video.side) && meetsSiteCriteria(video.site) && meetsAbilityCriteria(video.abilities) && meetsContentTypeCriteria(video.type);
}


function meetsMapCriteria(map: Scene): boolean {
  return map.internalName === selectedMap.internalName;
}

function meetsAgentCriteria(agent: Agent): boolean {
  return agent.internalName === selectedAgent.internalName;
}

function meetsSideCriteria(side: Side): boolean {
  if( !$('.card.sidecard:not(.selected)').length) {return true;}
  return selectedSides.some(
    function(selectedSideElement: Side): boolean {
      return selectedSideElement === side;
    }
  );
}

function meetsSiteCriteria(site: Site): boolean {
  if( !$('.card.sitecard:not(.selected)').length) {return true;}
  return selectedSites.some(
    function(selectedSiteElement: Site): boolean {
      return selectedSiteElement === site;
    }
  );
}

function meetsAbilityCriteria(abilities: Ability[]): boolean {
  if( !$('.card.abilitycard:not(.selected)').length) {return true;}
  return selectedAbilities.some(
    function(selectedAbilityElement: Ability): boolean{
      return abilities.some(
        function (abilityElement): boolean {
          return selectedAbilityElement.agent.internalName === abilityElement.agent.internalName && selectedAbilityElement.key === abilityElement.key;
        }
      );
    }
  );
}


function meetsContentTypeCriteria(contentType: contentType): boolean {
  if( !$('.card.contenttypecard:not(.selected)').length) {return true;}
  return selectedContentTypes.some(
    function(selectedContentTypeElement: contentType): boolean {
      return selectedContentTypeElement === contentType;
    }
  );
}


function addVideosInScreen() {
  $('thumbnail-carousel > div > ul').empty();
  $('main-carousel > div > ul').empty();

  filteredVideos.forEach(
    function(video) {
      $('thumbnail-carousel > div > ul').append(getThumbnailHTML(video));
      $('main-carousel > div > ul').append(getVideoHTML(video));
    }
  );
}

function getThumbnailHTML(video: Video): string{
  return '<li class="splide__slide h-100 text-bg-secondary thumbnail-carousel-item rounded">' +
    '<div class="h-10"> ' + video.title + '</div>' +
    '<video src="' + video.url + '" controlslist="nodownload noremoteplayback" loop="loop" class="h-85"></video>' +
    '<div class="h-20"> ' +
      '<table>' +
        '<tr>' +
          '<td> ' + video.description + ' </td>' +
        '</tr>' +
        '<tr>' +
          '<th> Ability: </th> <td> ' + 'ABILITATS SOMEHOW' + ' </td>' +
          '<th> Side: </th> <td> ' + video.side + ' </td>' +
        '</tr>' +
        '<tr>  ' +
          '<th> Site: </th> <td> ' + video.site + ' </td>' +
          '<th> Type: </th> <td> ' + video.type + ' </td>  ' +
        '</tr>' +
      '</table>' +
    '</div>' +
  '</li>' 
}

function getVideoHTML(video: Video): string{
  return '<li class="splide__slide h-100 main-carousel-item">'+ 
    ' <video src="' + video.url + '" controlslist="nodownload noremoteplayback" loop="loop" controls="controls" autoplay="autoplay" ></video> ' +
  '</li>';
}


