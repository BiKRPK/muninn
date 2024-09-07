import {Video} from '../logic/Video';
import {filterVideos, getfilteredVideos, init, initializeSelectedVariables} from '../logic/VideoFunctions';
import {getNameFromOverwolfID} from '../logic/TypeUtils';
import $ from 'jquery';

import '@splidejs/splide/css';
import Splide from '@splidejs/splide';
import { Scene } from '../logic/Scene';
import { Agent } from '../logic/Agent';
import { Ability } from '../logic/Ability';
import { AbKey, ContentType, Side, Site } from '../logic/Enums';

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
          filterVideos().then(() => { // Wait for filterVideos() to complete
            addVideosInScreen();
            loadSplide();
            if (selector === '.agentcard') {updateIconsInUI();}
          }).catch(error => {
              console.error('Error filtering videos:', error);
          });
        }
    }
  });
}

function handleClickMultiOptionFilter(selector: string) {
  $(selector).on({
    click: function() {
      $(this).toggleClass('selected');
        filterVideos().then(() => { // Wait for filterVideos() to complete
          addVideosInScreen();
          loadSplide();
        }).catch(error => {
            console.error('Error filtering videos:', error);
        });
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
    let selectedScene: Scene = Scene.getInstance(
      getNameFromOverwolfID(selectedMapID),
      selectedMapID
    );
    return selectedScene;
  }
  
 export function getSelectedAgent(): Agent {
    let selectedAgentID: string = $('.card.agentcard.selected').attr('id') as string;
    let selectedAgent: Agent = Agent.getInstance(
      getNameFromOverwolfID(selectedAgentID),
      selectedAgentID
    );
    return selectedAgent;
  }
  
  export function getSelectedAbilities(): Ability[] {
    let selectedAbilities: Ability[] = [];
    $('.card.abilitycard.selected').each(
      function() {
        let currentAgent = getSelectedAgent();
        let selectedKey: AbKey = $(this).attr('id') as AbKey;
        let selectedAbility: Ability = Ability.getInstance(
          selectedKey,
          currentAgent,
        );
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
    $('#thumbnail-carousel > div > ul').empty();
    $('#main-carousel > div > ul').empty();
    
    let i = 0;
    getfilteredVideos().forEach(
      function(video) {
        $('#thumbnail-carousel > div > ul').append(getThumbnailHTML(video));
        $('#main-carousel > div > ul').append(getVideoHTML(video));
      }
    );
  }
  
  function getThumbnailHTML(video: Video): string{
    return `
    <li class="splide__slide text-bg-secondary thumbnail-carousel-item rounded thumbnail h-100">
        <div id="${video.id}" class="cta">
            <div class="favorite-button ${video.isFav() ? "isFav" : ""}" ></div>
            <video src="${video.src}" controlslist="nodownload noremoteplayback" muted loop="loop" ></video>
            <div class="text"> 
            <h5>${video.title}</h5>
            <p>${video.description}</p>
            </div> 
        </div> 
    </li>`
  }

  
  
  function getVideoHTML(video: Video): string{
    return `
    <li class="splide__slide h-100 main-carousel-item">
      <video src="${video.src}" controlslist="nodownload noremoteplayback" loop="loop" controls="controls" autoplay="autoplay" muted></video>
    </li>`;
  }

  function initializeFilterClickFunctions() {
    handleClickSingleOptionFilter('.agentcard');
    handleClickSingleOptionFilter('.mapcard');
    handleClickMultiOptionFilter('.sidecard');
    handleClickMultiOptionFilter('.sitecard');
    handleClickMultiOptionFilter('.abilitycard');
    handleClickMultiOptionFilter('.ContentTypecard');
    handleClickMultiOptionFilter('.personalcard');
    handleClickFavButton();
  }

  // export function initialize() {
  //   initializeSelectedVariables();
  //   initializeFilterClickFunctions();
  //   init().then(() => {
  //     filterVideos().then(() => { // Wait for filterVideos() to complete
  //       addVideosInScreen();
  //       loadSplide(); 
  //       startThumbnailPreview();
  //     }).catch(error => {
  //         console.error('Error filtering videos:', error);
  //     });
  //   });
    
  // }

  export function initialize(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      initializeSelectedVariables();
      initializeFilterClickFunctions();
      init()
        .then(() => {
          filterVideos()
            .then(() => { // Wait for filterVideos() to complete
              addVideosInScreen();
              loadSplide(); 
              startThumbnailPreview();
              resolve(); // Resolve the promise once all tasks are completed
            })
            .catch(error => {
              console.error('Error filtering videos:', error);
              reject(error); // Reject the promise if an error occurs
            });
        })
        .catch(error => {
          console.error('Error initializing:', error);
          reject(error); // Reject the promise if an error occurs during initialization
        });
    });
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
    if (!$('#'+agent.overwolfID).hasClass('selected')) {
      var oldSelected = $('.agentcard.selected');
      $('.agentcard').removeClass('selected');
      $('#'+agent.overwolfID).toggleClass('selected');
      swap(oldSelected, $('#'+agent.overwolfID));
      updateIconsInUI();
      filterVideos().then(() => { // Wait for filterVideos() to complete
        addVideosInScreen();
        loadSplide();
      }).catch(error => {
          console.error('Error filtering videos:', error);
      });
    }   
  }

  export function updateSceneInUI(scene: Scene) {
    if (!$('#'+scene.overwolfID).hasClass('selected')) {
      var oldSelected = $('.mapcard.selected');
      $('.mapcard').removeClass('selected');
      $('#'+scene.overwolfID).toggleClass('selected');
      swap(oldSelected, $('#'+scene.overwolfID));

      filterVideos().then(() => { // Wait for filterVideos() to complete
        addVideosInScreen();
        loadSplide();
      }).catch(error => {
          console.error('Error filtering videos:', error);
      });
    } 
  }

  export function updateSideInUI(side: Side) {
    $('.sidecard').removeClass('selected');
    $('#'+side).toggleClass('selected');
    filterVideos().then(() => { // Wait for filterVideos() to complete
      addVideosInScreen();
      loadSplide();
    }).catch(error => {
        console.error('Error filtering videos:', error);
    });
  }

  function updateIconsInUI() {
    let newAgent: Agent = getSelectedAgent();
    let newAgentAbilities: Ability[] = newAgent.getAgentAbilities();
    newAgentAbilities.forEach(function(ability: Ability) {
      let key = ability.key;
      let name = ability.agent.name;
      $('#' + key + ' > .cardimg').attr('src', ability.getIcon());
      $('#' + key + ' > .cardimg').attr('alt', key + ' - ' + name);
      $('#' + key + ' > .cardname').val(key + ' - ' + name);
      $('#' + key + ' > .cardname').text(key + ' - ' + name);
    });
    $('#C').attr('src', '');
    
  }