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



type Agent = {
  name?: string;
  internalName?: string;
}

type Scene = {
  name?: string;
  internalName?: string;
}

type abKey = "c" | "q" | "e" | "x";

type Ability = {
  name?: string;
  key: abKey;
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


document.addEventListener( 'DOMContentLoaded', function () {

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
} );

 
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


function loadVideos(): Array<Video> {
  //read csv/JSON
  return null;
}

function filterVideos(): Array<Video> {
  let res: Array<Video> = null;
  allVideos.forEach(
    function(video) {
      //if(video.meetCriteria()) {res.push(video);}
    }
  );
  return null;
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


