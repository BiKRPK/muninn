import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../Consts";
import { initialize } from '../Frontfunctions';

import { Target } from 'puppeteer';


// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

document.addEventListener( 'DOMContentLoaded', initialize);

const openUploadButton = document.getElementById('openUploadWindowButton');
const modalOverlay = document.getElementById('modalOverlay');

openUploadButton.onclick = () => {

    modalOverlay.style.display = 'block';

    const uploadWindow = window.open('upload.html', '_blank', 'resizable=0,height=700,width=600');
    
    uploadWindow.onbeforeunload = () => {
        console.log('Upload window closed.');
        initialize();
        modalOverlay.style.display = 'none';
        return null;
    }
    
}


// $( function () {
//     const videoInput = $("#videoInput");

//     videoInput.on("change", handleVideoSelection);
  
//     function handleVideoSelection(this: HTMLInputElement) {
//       const selectedFile = this.files?.[0];
//       if (selectedFile) {
//         saveVideoToIndexedDB(selectedFile);
//       }
//     }
// });

// $(function () {
//     const videoElement = $("#videoElement")[0] as HTMLVideoElement;
  
//     playVideoFromIndexedDB();
  
//     function playVideoFromIndexedDB() {
//         retrieveVideoFromIndexedDB()
//             .then((videoFile) => {
//             const videoURL = URL.createObjectURL(videoFile);
//             videoElement.src = videoURL;
//             videoElement.play();
//         })
//             .catch((error) => {
//             console.error("Failed to retrieve video from IndexedDB:", error);
//         });
//     }
// });