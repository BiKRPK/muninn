import {Agent, Scene, abKey, Ability, Side, Site, contentType, Video} from './types';
import {filterVideos, getfilteredVideos, loadVideos, initializeSelectedVariables} from './videofunctions';
import {getNameFromInternalName, getAbilityName} from './typefunctions';

import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

export function handleClickSingleOptionFilter(selector: string) {
  $(selector).on({
    click: function() {
      if (!$(this).hasClass('selected')) {
          var oldSelected = $(selector + '.selected');
          $(selector).removeClass('selected');
          $(this).toggleClass('selected');
          swap(oldSelected, $(this));
          filterVideos();
          addVideosInScreen();
          loadSplide();
      }
    }
  });
}

export function handleClickMultiOptionFilter(selector: string) {
  $(selector).on({
    click: function() {
      $(this).toggleClass('selected');
      filterVideos();
      addVideosInScreen();
      loadSplide();
    }
  });
}

function swap(a, b) {
  a = $(a); b = $(b);
  var tmp = $('<span>').hide();
  a.before(tmp);
  b.before(a);
  tmp.replaceWith(b);
};

export function loadSplide() {

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


export function getSelectedMap(): Scene {
    let selectedMapID = $('.card.mapcard.selected').attr('id');
    let selectedScene: Scene = {
      internalName: selectedMapID,
      name: getNameFromInternalName(selectedMapID),
    }
    return selectedScene;
  }
  
 export function getSelectedAgent(): Agent {
    let selectedAgentID = $('.card.agentcard.selected').attr('id');
    let selectedAgent: Agent = {
      internalName: selectedAgentID,
      name: getNameFromInternalName(selectedAgentID),
    }
    return selectedAgent;
  }
  
  export function getSelectedAbilities(): Ability[] {
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
  export function getSelectedSides(): Side[] {
    let selectedSides: Side[];
     $('.card.sidecard.selected').each(
      function() {
        let selectedSide: Side = $(this).attr('id') as Side;
        selectedSides.push(selectedSide);
      }
    );
    return selectedSides;
  }
  
  export function getSelectedSites(): Site[] {
    let selectedSites: Site[];
     $('.card.sitecard.selected').each(
      function() {
        let selectedSite: Site = $(this).attr('id') as Site;
        selectedSites.push(selectedSite);
      }
    );
    return selectedSites;
  }
  
  export function getSelectedContentTypes(): contentType[] {
    let selectedContentTypes: contentType[];
     $('.card.contenttypecard.selected').each(
      function() {
        let selectedContentType: contentType = $(this).attr('id') as contentType;
        selectedContentTypes.push(selectedContentType);
      }
    );
    return selectedContentTypes;
  }
  
  function addVideosInScreen() {
    $('thumbnail-carousel > div > ul').empty();
    $('main-carousel > div > ul').empty();
    
    getfilteredVideos().forEach(
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

  function initializeFilterClickFunctions() {
    handleClickSingleOptionFilter('.agentcard');
    handleClickSingleOptionFilter('.mapcard');
    handleClickMultiOptionFilter('.sidecard');
    handleClickMultiOptionFilter('.sitecard');
    handleClickMultiOptionFilter('.abilitycard');
    handleClickMultiOptionFilter('.contenttypecard');
  }

  export function initialize() {
    initializeSelectedVariables();
    initializeFilterClickFunctions();
    loadVideos();
    filterVideos();
    addVideosInScreen();
    loadSplide();
    startThumbnailPreview();
  }

  function startThumbnailPreview() {
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
  }