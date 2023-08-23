import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../Consts";
import {getAllAgents, getAllScenes, getAllSides, getAllSites, getAllContentTypes, getContentTypeName, getNameFromInternalName} from '.././TypeFunctions';
import {Agent} from '.././Types';
import {storeVideo} from '.././UserStorage';
import { RawVideo } from '../Vids';


function loadSelectScene () {
 let mapSelect = $('#mapSelect');
 getAllScenes().forEach(scene => {
    mapSelect.append($('<option>', { 
        value: scene.internalName,
        text : scene.name 
    }));   
 });
}

function loadSelectAgent () {
    let agentSelect = $('#agentSelect');
    getAllAgents().forEach(agent => {
       agentSelect.append($('<option>', { 
           value: agent.internalName,
           text : agent.name 
       }));   
    });
}

function loadSelectAbility () {
    let agentSelected: Agent = {
        internalName: $('#agentSelect').val() as string,
        name: $('#agentSelect').text()
    }
}

function updateAbilitiesHandler () {
    
    $('#agentSelect').on({
        change: function() {
            $('#abilitySelect').prop('disabled', false);
            cleanSelectAbility();
            loadSelectAbility();
        }
    });

}

function cleanSelectAbility () {
    $('#agentSelect').empty();
} 

function loadSelectSide () {
    let sideSelect = $('#sideSelect');
    getAllSides().forEach(side => {
    if (side != null ) {
        sideSelect.append($('<option>', { 
            value: side,
            text : side + " side" 
        }));  
    } 
        
    });
}

function loadSelectSite () {
    let siteSelect = $('#siteSelect');
    getAllSites().forEach(site => {
       siteSelect.append($('<option>', { 
            value: site,
            text : site + " site" 
       }));   
    });
}

function loadSelectContentType () {
    let ctSelect = $('#contentTypeSelect');
    getAllContentTypes().forEach(ct => {
        ctSelect.append($('<option>', { 
             value: ct,
             text : getContentTypeName(ct) + " - " + ct 
        }));   
     });
}

function validateForm(): boolean {
    let isValid: boolean = true;
    // si input.length == 0 false
    return isValid;
}

// Generates a new RawVideo object from the upload form
function generateNewRawVideo(): RawVideo {
    const videoInput: HTMLInputElement = document.getElementById('videoInput') as HTMLInputElement;
    const videoFile: File = videoInput.files[0];
    
    const blob = new Blob([videoFile], { type: videoFile.type });
    let newRawVideo: RawVideo = {
        id: '0', //TODO: Create generateUUID method in VideoFunctions
        title: $('#titleInput').text(),
        description: $('#descriptionInput').text(),
        ability: $('#abilitySelect').val() as string,
        // agent: $('#agentSelect').val() as string, 
        // map: $('#mapSelect').val() as string,
        //temporary solution
        agent: $('#agentSelect').text() as string, 
        map: $('#mapSelect').text() as string,

        side: $('#sideSelect').val() as string,
        site: $('#siteSelect').val() as string,
        src: blob,
        type: $('#contentTypeSelect').val() as string 
    }
    //TODO: CHANGE vids to have internalName or raw to pure video conversion to accept both posibilities
    return newRawVideo;
}

function uploadVideoButtonHandler () {
    $('#uploadButton').on({
        click: function() {
          if(validateForm()){
            let err: boolean = false;
            try {
                storeVideo(generateNewRawVideo());
            } catch (error) {
                err = true;
                console.log(error);
                window.alert("We found a problem uploading your video :S")
            }
            if (!err) {
                window.confirm("Video Uploaded Succesfully :)");
                cleanForm();
            }
          }
        }
      });
}

function cleanForm () {
    const form: HTMLFormElement = document.getElementById('#videoUpload') as HTMLFormElement;
    form.reset();
}

function closeWindowButtonHandler () {
    $('#closeButton').on({
        click: function() {
            console.log('closing');
          window.close();
        }
      });
}

function initializeUploadWindow() {
    loadSelectScene();
    loadSelectAbility();
    loadSelectAgent();
    updateAbilitiesHandler();
    loadSelectContentType();
    loadSelectSide();
    loadSelectSite();
    uploadVideoButtonHandler();
    closeWindowButtonHandler();
}

document.addEventListener( 'DOMContentLoaded', initializeUploadWindow);