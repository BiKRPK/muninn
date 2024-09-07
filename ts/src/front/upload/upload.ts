import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme

// import {storeVideo, } from '../../persistance/UserStorage';
// import {RawVideo} from '../../persistance/Vids';
// import {v4 as uuidv4} from 'uuid';
// import { initialize } from '../FrontFunctions';
// import { Agent } from '../../logic/Agent';
// import { ContentType } from '../../logic/Enums';
// import { getNameFromOverwolfID, getAllSides, getAllSites, getAllContentTypes, getContentTypeName } from '../../logic/TypeUtils';
import { Scene } from '../../logic/Scene';

function loadSelectScene () {
 let mapSelect = $('#mapSelect');
 Scene.getAllScenes().forEach(scene => {
    mapSelect.append($('<option>', { 
        value: scene.overwolfID,
        text : scene.name 
    }));   
 });
}

// function loadSelectAgent () {
//     let agentSelect = $('#agentSelect');
//     Agent.getAllAgents().forEach(agent => {
//        agentSelect.append($('<option>', { 
//            value: agent.overwolfID,
//            text : agent.name 
//        }));   
//     });
//     updateAbilitiesHandler();
// }

// function getSelectedAgent() : Agent {
//     let agentSelectedId: string = getAgentValue();
//     if (agentSelectedId.length == 0) { agentSelectedId = Agent.getAllAgents()[0].overwolfID; }
//     let agentSelected = Agent.getInstance(getNameFromOverwolfID(agentSelectedId), agentSelectedId);
//     return agentSelected;
// }

// function loadSelectAbility () {
//     let abilitySelect = $('#abilitySelect');
//     getSelectedAgent().getAgentAbilities().forEach(ability => {
//         abilitySelect.append($('<option>', { 
//             value: ability.key,
//             text : ability.getAbilityName() + ' (' + ability.key + ')'
//         }));   
//      });
// }

// function updateAbilitiesHandler () {
    
//     $('#agentSelect').on({
//         change: function() {
//             $('#abilitySelect').prop('disabled', false);
//             cleanSelectAbility();
//             loadSelectAbility();
//         }
//     });

// }

// function cleanSelectAbility () {
//     $('#abilitySelect').empty();
// } 

// function loadSelectSide () {
//     let sideSelect = $('#sideSelect');
//     getAllSides().forEach(side => {
//     if (side != null ) {
//         sideSelect.append($('<option>', { 
//             value: side,
//             text : side + " side" 
//         }));  
//     } 
        
//     });
// }

// function loadSelectSite () {
//     let siteSelect = $('#siteSelect');
//     getAllSites().forEach(site => {
//         console.log(site);
//        siteSelect.append($('<option>', { 
//             value: site,
//             text : site + " site" 
//        }));   
//     });
// }

// function loadSelectContentType () {
//     let ctSelect = $('#contentTypeSelect');
//     getAllContentTypes().forEach(ct => {
//         console.log(ct + " - " + getContentTypeName(ct as ContentType));
//         ctSelect.append($('<option>', { 
//              value: ct,
//              text : getContentTypeName(ct as ContentType)
//         }));   
//      });
// }

// type validateTuple = [boolean, string];



// function validateForm(): validateTuple{
//     let err: string = "";
//     err += validateTitle();
//     err += validateDescription();
//     err += validateAbility();
//     err += validateAgent();
//     err += validateMap();
//     err += validateSide();
//     err += validateSite();
//     err += validateType();
//     err += validateFile();
//     let isValid: boolean = err === "";
//     return [isValid, err];
// }

// const messageTemplate = " is Empty \n";

// function validateTitle(): string {
//     let err: string = "Title" + messageTemplate;
//     let isValid: boolean = getTitleValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateDescription(): string {
//     let err: string = "Description" + messageTemplate;
//     let isValid: boolean = getDescriptionValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateAbility(): string {
//     let err: string = "Ability" + messageTemplate;
//     let isValid: boolean = getAbilityValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateAgent(): string {
//     let err: string = "Agent" + messageTemplate;
//     let isValid: boolean = getAgentValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateMap(): string {
//     let err: string = "Map" + messageTemplate;
//     let isValid: boolean = getMapValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateSide(): string {
//     let err: string = "Side" + messageTemplate;
//     let isValid: boolean = getSideValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateSite(): string {
//     let err: string = "Site" + messageTemplate;
//     let isValid: boolean = getSiteValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateType(): string {
//     let err: string = "Type" + messageTemplate;
//     let isValid: boolean = getTypeValue().length > 0;
//     if (isValid) {err="";}
//     return err;
// }

// function validateFile(): string {
//     let err: string = "No file has been selected";
//     let isValid: boolean = getVideo() != null;
//     if (isValid) {err="";}
//     return err;
// }

    

// function getTitleValue(): string {
//     return (<HTMLInputElement> document.getElementById('titleInput')).value;
// }

// function getDescriptionValue(): string {
//     return (<HTMLInputElement> document.getElementById('descriptionInput')).value;
// }

// function getAbilityValue(): string {
//     return (<HTMLInputElement> document.getElementById('abilitySelect')).value;
// }

// function getAgentValue(): string {
//     return (<HTMLInputElement> document.getElementById('agentSelect')).value;
// }

// function getMapValue(): string {
//     return (<HTMLInputElement> document.getElementById('mapSelect')).value;
// }

// function getSideValue(): string {
//     return (<HTMLInputElement> document.getElementById('sideSelect')).value;
// }

// function getSiteValue(): string {
//     return (<HTMLInputElement> document.getElementById('siteSelect')).value;
// }

// function getTypeValue(): string {
//     return (<HTMLInputElement> document.getElementById('contentTypeSelect')).value;
// }

// function getVideo(): File {
//     const videoInput: HTMLInputElement = document.getElementById('videoInput') as HTMLInputElement;
//     if (videoInput.files.length == 0) {return null;}
//     const videoFile: File = videoInput.files[0];
//     return videoFile;
// }


// function generateBlob(): Blob {
//     const videoFile: File= getVideo();
//     return new Blob([videoFile], { type: videoFile.type });
// }

// // Generates a new RawVideo object from the upload form
// function generateNewRawVideo(): RawVideo {
    
//     const newRawVideo: RawVideo = {
//         id: uuidv4(), //TODO: Create generateUUID method in VideoFunctions
//         title: getTitleValue(),
//         description: getDescriptionValue(),
//         ability: getAbilityValue(),
//         agent: getNameFromOverwolfID(getAgentValue()), 
//         map: getNameFromOverwolfID(getMapValue()),
//         side: getSideValue(),
//         site: getSiteValue(),
//         src: generateBlob(),
//         //src: 'a',
//         type: getTypeValue() 
//     }
//     //TODO: youtube video as a source
//     printRawVideo(newRawVideo);
//     return newRawVideo;
// }

// function printRawVideo(rawVideo: RawVideo) {
//     console.log("Raw video: ");
//     console.log("id - " + rawVideo.id);
//     console.log("title - " + rawVideo.title);
//     console.log("description - " + rawVideo.description);
//     console.log("ability - " + rawVideo.ability);
//     console.log("agent - " + rawVideo.agent);
//     console.log("map - " + rawVideo.map);
//     console.log("side - " + rawVideo.side);
//     console.log("site - " + rawVideo.site);
//     console.log("type - " + rawVideo.type);
//     console.log("src - " + rawVideo.src);
// }

// function uploadVideoButtonHandler () {
//     $('#uploadButton').on({
//         click: async function() {
//           let validation: validateTuple = validateForm();
//           console.log(validation[0] + " - " + validation[1]);
//           if(validation[0]){
//             let err: boolean = false;
//             let video: RawVideo = generateNewRawVideo();
//             try {
//                 console.log("here we go");
//                 await storeVideo(video);
//                 await initialize();
//             } catch (error) {
//                 err = true;
//                 console.log(error);
//                 window.alert("We found a problem uploading your video :S")
//             }
//             if (!err) {
//                 window.alert("Video Uploaded Succesfully :)");
//                 //cleanForm();
//             }
//           } else {
//             window.alert(validation[1]);
//           }
//         }
//       });
// }

// function cleanForm () {
//     const form: HTMLFormElement = document.getElementById('#videoUpload') as HTMLFormElement;
//     form.reset();
// }

// function closeWindowButtonHandler () {
//     $('#closeButton').on({
//         click: function() {
//             console.log('closing');
//           window.close();
//         }
//       });
// }

// function initializeUploadWindow() {
//     loadSelectScene();
//     loadSelectAbility();
//     loadSelectAgent();
//     updateAbilitiesHandler();
//     loadSelectContentType();
//     loadSelectSide();
//     loadSelectSite();
//     uploadVideoButtonHandler();
//     closeWindowButtonHandler();
    
//     //testAddingVideo();
// }



// document.addEventListener( 'DOMContentLoaded', initializeUploadWindow);