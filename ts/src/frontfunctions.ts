import {Agent, Scene, abKey, Ability, Side, Site, contentType, Video} from './types';
import {filterVideos, getfilteredVideos, loadVideos, initializeSelectedVariables} from './videofunctions';
import {getNameFromInternalName, getAbilityName, getIconFromAbility, getAgentAbilities} from './typefunctions';
import $ from 'jquery';

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
          if (selector === '.agentcard') {updateIconsInUI();}
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
  if(getfilteredVideos().length) {
    console.log("loading Splide");
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
  
    

    function handleVideoPlayback() {
      const activeVideo = main.Components.Elements.slides[main.index].querySelector('video');
      const videos = main.Components.Elements.slides.map(slide => slide.querySelector('video'));
    
      videos.forEach(video => {
        if (video === activeVideo) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
    
    main.on('move', handleVideoPlayback);
    
    main.on('mounted', () => {
      handleVideoPlayback();
    });

    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  } else {
    //load sorry screen
    console.log("SPLIDE: NO VIDEOS TO LOAD :(");
  }
}


export function getSelectedMap(): Scene {
    let selectedMapID: string = $('.card.mapcard.selected').attr('id') as string;
    console.log('selected map: ' +  selectedMapID);
    let selectedScene: Scene = {
      internalName: selectedMapID,
      name: getNameFromInternalName(selectedMapID),
    }
    return selectedScene;
  }
  
 export function getSelectedAgent(): Agent {
    let selectedAgentID: string = $('.card.agentcard.selected').attr('id') as string;
    console.log('selected agent: ' +  selectedAgentID);
    let selectedAgent: Agent = {
      internalName: selectedAgentID,
      name: getNameFromInternalName(selectedAgentID),
    }
    return selectedAgent;
  }
  
  export function getSelectedAbilities(): Ability[] {
    let selectedAbilities: Ability[] = [];
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
    let selectedSides: Side[] = [];
     $('.card.sidecard.selected').each(
      function() {
        let selectedSide: Side = $(this).attr('id') as Side;
        selectedSides.push(selectedSide);
      }
    );
    return selectedSides;
  }
  
  export function getSelectedSites(): Site[] {
    let selectedSites: Site[] = [];
     $('.card.sitecard.selected').each(
      function() {
        let selectedSite: Site = $(this).attr('id') as Site;
        selectedSites.push(selectedSite);
      }
    );
    return selectedSites;
  }
  
  export function getSelectedContentTypes(): contentType[] {
    let selectedContentTypes: contentType[] = [];
     $('.card.contenttypecard.selected').each(
      function() {
        let selectedContentType: contentType = $(this).attr('id') as contentType;
        selectedContentTypes.push(selectedContentType);
      }
    );
    return selectedContentTypes;
  }
  
  function addVideosInScreen() {
    console.log('en addVideosInScreen');
    $('#thumbnail-carousel > div > ul').empty();
    $('#main-carousel > div > ul').empty();
    
    let i = 0;
    getfilteredVideos().forEach(
      function(video) {
        console.log("filteredvideotoscreen " + i + ": " + video.id);
        $('#thumbnail-carousel > div > ul').append(getThumbnailHTML(video));
        $('#main-carousel > div > ul').append(getVideoHTML(video));
      }
    );
  }
  
  function getThumbnailHTML(video: Video): string{
    return '<li class="splide__slide h-100 text-bg-secondary thumbnail-carousel-item rounded">' +
      '<div class="h-10"> ' + video.title + '</div>' +
      '<video src="' + video.url + '" controlslist="nodownload noremoteplayback" muted loop="loop" class="h-85"></video>' +
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
      ' <video src="' + video.url + '" controlslist="nodownload noremoteplayback" loop="loop" controls="controls" autoplay="autoplay" muted></video> ' +
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


  export function updateAgentInUI(agent: Agent) {
    if (!$('#'+agent.internalName).hasClass('selected')) {
      var oldSelected = $('.agentcard.selected');
      $('.agentcard').removeClass('selected');
      $('#'+agent.internalName).toggleClass('selected');
      swap(oldSelected, $('#'+agent.internalName));
      updateIconsInUI();
      filterVideos();
      addVideosInScreen();
      loadSplide();
    }   
  }

  export function updateSceneInUI(scene: Scene) {
    if (!$('#'+scene.internalName).hasClass('selected')) {
      var oldSelected = $('.mapcard.selected');
      $('.mapcard').removeClass('selected');
      $('#'+scene.internalName).toggleClass('selected');
      swap(oldSelected, $('#'+scene.internalName));

      filterVideos();
      addVideosInScreen();
      loadSplide();
    } 
  }

  export function updateSideInUI(side: Side) {
    $('.sidecard').removeClass('selected');
    $('#'+side).toggleClass('selected');
    filterVideos();
    addVideosInScreen();
    loadSplide();
  }

  function updateIconsInUI() {
    let newAgent: Agent = getSelectedAgent();
    let newAgentAbilities: Ability[] = getAgentAbilities(newAgent);
    newAgentAbilities.forEach(function(ability: Ability) {
      let key = ability.key;
      let name = ability.name;
      $('#' + key + ' > .cardimg').attr('src', getIconFromAbility(ability));
      $('#' + key + ' > .cardimg').attr('alt', key + ' - ' + name);
      $('#' + key + ' > .cardname').val(key + ' - ' + name);
      $('#' + key + ' > .cardname').text(key + ' - ' + name);
    });
    $('#C').attr('src', '');
    
  }