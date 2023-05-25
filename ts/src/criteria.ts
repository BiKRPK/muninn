import {Agent, Scene, abKey, Ability, Side, Site, contentType, Video} from './types';

interface Criteria {
    meetsCriteria(video: Video): boolean;
  }
  
 export class MapCriteria implements Criteria {
    constructor(private selectedMap: Scene) {}
  
    meetsCriteria(video: Video): boolean {
      // console.log("video.map.internalName: " + video.map.internalName + " - this.selectedMap.internalName: " + this.selectedMap.internalName);
      // console.log("comparison result: " + video.map.internalName == this.selectedMap.internalName);
      // return true;
      return video.map.internalName == this.selectedMap.internalName;
    }
  }
  
  export class AgentCriteria implements Criteria {
    constructor(private selectedAgent: Agent) {}
  
    meetsCriteria(video: Video): boolean {
      // console.log("video.agent.internalName: " + video.agent.internalName + " - this.selectedAgent.internalName: " + this.selectedAgent.internalName);
      // console.log(video.agent + "agent criteria: " + video.agent.internalName == this.selectedAgent.internalName);
      // return true;
      return video.agent.internalName == this.selectedAgent.internalName;
    }
  }
  
  export class SideCriteria implements Criteria {
    constructor(private selectedSides: Side[]) {}
  
    meetsCriteria(video: Video): boolean {
      // let sides = "";
      // this.selectedSides.forEach(selectedside => sides += selectedside + ", ");
      // console.log("selected sides: " + sides + "  - video.side " + video.side);
      // console.log("side criteria: " + ($('.card.sidecard:not(.selected)').length  !== 0 || this.selectedSides.some(selectedSide => selectedSide == video.side)));
      // return true;
      if ( !$('.card.sidecard:not(.selected)') ) {return true;}
      return  this.selectedSides.some(selectedSide => selectedSide == video.side);
    }
  }
  
  export class SiteCriteria implements Criteria {
    constructor(private selectedSites: Site[]) {}
  
    meetsCriteria(video: Video): boolean {
      // let sites = "";
      // this.selectedSites.forEach(selectedsite => sites += selectedsite + ", ");
      // console.log("selected sites: " + sites + "  - video.site " + video.site);
      // console.log(video.site + "site criteria: " + ($('.card.sitecard:not(.selected)').length  !== 0 || this.selectedSites.some(selectedSite => selectedSite == video.site)));
      // return true;
      if ( !$('.card.sitecard:not(.selected)') ) {return true;}
      return this.selectedSites.some(selectedSite => selectedSite == video.site);
    }
  }
  
  export class AbilityCriteria implements Criteria {
    constructor(private selectedAbilities: Ability[]) {}
  
    meetsCriteria(video: Video): boolean {
      // console.log( "ability criteria: " + ($('.card.abilitycard:not(.selected)').length  !== 0  || video.abilities.some));
      if ( !$('.card.abilitycard:not(.selected)') ) {return true;}
      return  video.abilities.some(
        ability => this.selectedAbilities.some(
          selectedAbility => selectedAbility.agent.internalName == ability.agent.internalName && selectedAbility.key == ability.key
        )
      );
    }
  }
  
  export class ContentTypeCriteria implements Criteria {
    constructor(private selectedContentTypes: contentType[]) {}
  
    meetsCriteria(video: Video): boolean {
      // let ContentTypes = "";
      // this.selectedContentTypes.forEach(selectedContentType => ContentTypes += selectedContentType + ", ");
      // console.log("selected contentTypes: " + ContentTypes + "  - video.type " + video.type);
      // console.log(video.type + "type criteria: " + ($('.card.contenttypecard:not(.selected)').length  !== 0  || this.selectedContentTypes.some(selectedContentType => selectedContentType == video.type)));
      // return true;
      if ( !$('.card.contenttypecard:not(.selected)') ) {return true;}
      return  this.selectedContentTypes.some(selectedContentType => selectedContentType == video.type);
    }
  }
  