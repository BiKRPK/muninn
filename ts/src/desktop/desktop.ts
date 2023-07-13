import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../Consts";
import { initialize } from '../FrontFunctions';
import { saveVideoToIndexedDB, retrieveVideoFromIndexedDB } from '../UserStorage';
import { Target } from 'puppeteer';

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

document.addEventListener( 'DOMContentLoaded', initialize);

$( function () {
    const videoInput = $("#videoInput");

    videoInput.on("change", handleVideoSelection);
  
    function handleVideoSelection(this: HTMLInputElement) {
      const selectedFile = this.files?.[0];
      if (selectedFile) {
        saveVideoToIndexedDB(selectedFile);
      }
    }
});

$(function () {
    const videoElement = $("#videoElement")[0] as HTMLVideoElement;
  
    playVideoFromIndexedDB();
  
    function playVideoFromIndexedDB() {
        retrieveVideoFromIndexedDB()
            .then((videoFile) => {
            const videoURL = URL.createObjectURL(videoFile);
            videoElement.src = videoURL;
            videoElement.play();
        })
            .catch((error) => {
            console.error("Failed to retrieve video from IndexedDB:", error);
        });
    }
});