import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../../logic/AppWindow";
import { kWindowNames } from "../../logic/Consts";
import { initialize } from '../FrontFunctions';
import { BackgroundController } from '../../background/background';

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

document.addEventListener( 'DOMContentLoaded', initialize);

const openUploadButton = document.getElementById('openUploadWindowButton');
openUploadButton.onclick = () => {
    console.log("im here");
    //overwolf.windows.obtainDeclaredWindow("in_game", { useDefaultSizeAndLocation: true }, function openWindow() {overwolf.windows.restore("in_game")});
    BackgroundController.instance().openListWindow();
    // modalOverlay.style.display = 'block';

    // const uploadWindow = window.open('upload.html', '_blank', 'resizable=0,height=700,width=600');
    
    // uploadWindow.onbeforeunload = async () => {
    //     console.log('Upload window closed.');
    //     await initialize();
    //     modalOverlay.style.display = 'none';
    //     return null;
    // }
    
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