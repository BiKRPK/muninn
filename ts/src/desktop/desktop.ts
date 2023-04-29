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


    
