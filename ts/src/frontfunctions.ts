import {Agent, Scene, AbKey, Ability, Side, Site, ContentType, Video} from './Types';
import {filterVideos, getfilteredVideos, loadVideos, initializeSelectedVariables} from './Videofunctions';
import {getNameFromInternalName, getAbilityName, getIconFromAbility, getAgentAbilities} from './Typefunctions';
import $ from 'jquery';

import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

function handleClickUploadVideo() {
  const videoElement = $("#videoElement")[0] as HTMLVideoElement;
  const uploadButton = $("#uploadButton");

  // uploadButton.on("click", openFileUploadWindow);
}

// function openFileUploadWindow() {
//   const fileInput = $("<input type='file'>");
//   fileInput.on("change", handleFileSelection);
//   fileInput.trigger("click");
// }

function handleClickSingleOptionFilter(selector: string) {
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

function handleClickMultiOptionFilter(selector: string) {
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

function handleClickFavButton() {
  // Necesito delegar el evento a un elemento que exista en el DOM antes
  // que los thumbnails sean cargados
  $('#thumbnail-carousel').on('click', '.favorite-button', function(this) {
    toggleFavorite(this);
  });
}

function toggleFavorite(button) {
  const videoId = $(button).parent().attr('id');
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.indexOf(videoId);
  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(videoId);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  $(button).toggleClass('isFav');
}

export function loadSplide() {
  if(getfilteredVideos().length) {
    displayVideos();
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
    displayNoVideosMessage();
  }
}

function displayNoVideosMessage() {
  $('#main-carousel').hide();
  $('#thumbnail-carousel').hide();
  $('#no-content-screen').show();
}

function displayVideos() {
  $('#main-carousel').show();
  $('#thumbnail-carousel').show();
  $('#no-content-screen').hide();
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
        let selectedKey: AbKey = $(this).attr('id') as AbKey;
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
  
  export function getSelectedContentTypes(): ContentType[] {
    let selectedContentTypes: ContentType[] = [];
     $('.card.ContentTypecard.selected').each(
      function() {
        let selectedContentType: ContentType = $(this).attr('id') as ContentType;
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
    return `
    <li class="splide__slide text-bg-secondary thumbnail-carousel-item rounded thumbnail h-100">
        <div id="${video.id}" class="cta">
            <div class="favorite-button ${isFav(video.id) ? "isFav" : ""}" ></div>
            <video src="${video.url}" controlslist="nodownload noremoteplayback" muted loop="loop" ></video>
            <div class="text"> 
            <h5>${video.title}</h5>
            <p>${video.description}</p>
            </div> 
        </div> 
    </li>`
  }

  export function isFav(videoID: string) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.indexOf(videoID) > -1;
  }
  
  function getVideoHTML(video: Video): string{
    return `
    <li class="splide__slide h-100 main-carousel-item">
      <video src="${video.url}" controlslist="nodownload noremoteplayback" loop="loop" controls="controls" autoplay="autoplay" muted></video>
    </li>`;
  }

  function initializeFilterClickFunctions() {
    handleClickSingleOptionFilter('.agentcard');
    handleClickSingleOptionFilter('.mapcard');
    handleClickMultiOptionFilter('.sidecard');
    handleClickMultiOptionFilter('.sitecard');
    handleClickMultiOptionFilter('.abilitycard');
    handleClickMultiOptionFilter('.ContentTypecard');
    handleClickFavButton();
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
        const vid = e.target;
        vid.play()
      },
      mouseleave: function (e) {
        const vid = e.target;
        vid.currentTime = 0
        vid.pause()
      }
    }, "#thumbnail-carousel > div > ul > li > div > video");
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