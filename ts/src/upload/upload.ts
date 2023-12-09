import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../AppWindow";
import {getAllAgents, getAllScenes, getAllSides, getAllSites, getAllContentTypes, getContentTypeName, getNameFromInternalName, getAgentAbilities} from '.././TypeFunctions';
import {Agent, ContentType} from '.././Types';
import {getVideos, saveVideoToIndexedDB, storeVideo, testAddingVideo} from '.././UserStorage';
import {RawVideo} from '../Vids';
import {v4 as uuidv4} from 'uuid';

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
    updateAbilitiesHandler();
}

function getSelectedAgent() {
    let agentSelectedId: string = getAgentValue();
    if (agentSelectedId.length == 0) { agentSelectedId = getAllAgents()[0].internalName; }
    let agentSelected: Agent = {
        internalName: agentSelectedId,
        name: getNameFromInternalName(agentSelectedId)
    }
    return agentSelected;
}

function loadSelectAbility () {
    let abilitySelect = $('#abilitySelect');
    getAgentAbilities(getSelectedAgent()).forEach(ability => {
        abilitySelect.append($('<option>', { 
            value: ability.key,
            text : ability.name + ' (' + ability.key + ')'
        }));   
     });
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
    $('#abilitySelect').empty();
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
             text : getContentTypeName(ct as ContentType)
        }));   
     });
}

function validateForm(): boolean {
    let isValid: boolean = true;
    // si input.length == 0 false
    return isValid;
}


function getTitleValue(): string {
    return (<HTMLInputElement> document.getElementById('agentSelect')).value;
}

function getDescriptionValue(): string {
    return (<HTMLInputElement> document.getElementById('abilitySelect')).value;
}

function getAbilityValue(): string {
    return (<HTMLInputElement> document.getElementById('abilitySelect')).value;
}

function getAgentValue(): string {
    return (<HTMLInputElement> document.getElementById('agentSelect')).value;
}

function getMapValue(): string {
    return (<HTMLInputElement> document.getElementById('mapSelect')).value;
}

function getSideValue(): string {
    return (<HTMLInputElement> document.getElementById('sideSelect')).value;
}

function getSiteValue(): string {
    return (<HTMLInputElement> document.getElementById('siteSelect')).value;
}

function getTypeValue(): string {
    return (<HTMLInputElement> document.getElementById('contentTypeSelect')).value;
}

function getVideo(): File {
    const videoInput: HTMLInputElement = document.getElementById('videoInput') as HTMLInputElement;
    const videoFile: File = videoInput.files[0];
    return videoFile;
}


function generateBlob(): Blob {
    const videoFile: File= getVideo();
    return new Blob([videoFile], { type: videoFile.type });
}

// Generates a new RawVideo object from the upload form
function generateNewRawVideo(): RawVideo {
    
    const newRawVideo: RawVideo = {
        id: uuidv4(), //TODO: Create generateUUID method in VideoFunctions
        title: getTitleValue(),
        description: getDescriptionValue(),
        ability: getAbilityValue(),
        agent: getAgentValue(), 
        map: getMapValue(),
        side: getSideValue(),
        site: getSiteValue(),
        src: generateBlob(),
        //src: 'a',
        type: getTypeValue() 
    }
    //TODO: youtube video as a source
    printRawVideo(newRawVideo);
    return newRawVideo;
}

function printRawVideo(rawVideo: RawVideo) {
    console.log("Raw video: ");
    console.log("id - " + rawVideo.id);
    console.log("title - " + rawVideo.title);
    console.log("description - " + rawVideo.description);
    console.log("ability - " + rawVideo.ability);
    console.log("agent - " + rawVideo.agent);
    console.log("map - " + rawVideo.map);
    console.log("side - " + rawVideo.side);
    console.log("site - " + rawVideo.site);
    console.log("type - " + rawVideo.type);
    console.log("src - " + rawVideo.src);
}

function uploadVideoButtonHandler () {
    $('#uploadButton').on({
        click: function() {
          if(validateForm()){
            let err: boolean = false;
            try {
                storeVideo(generateNewRawVideo());
                saveVideoToIndexedDB(getVideo());
            } catch (error) {
                err = true;
                console.log(error);
                window.alert("We found a problem uploading your video :S")
            }
            if (!err) {
                window.alert("Video Uploaded Succesfully :)");
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
    printAddress();
    //testAddingVideo();
}

const printAddress = async () => {
    const a = await getVideos();
    console.log(printRawVideo(a[0]));
  };
  

document.addEventListener( 'DOMContentLoaded', initializeUploadWindow);