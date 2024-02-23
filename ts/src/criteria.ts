import {Agent, Scene, AbKey, Ability, Side, Site, ContentType, Video} from './Types';
import {isFav} from './FrontFunctions';

interface Criteria {
    meetsCriteria(video: Video): boolean;
  }
  
 export class MapCriteria implements Criteria {
    constructor(private selectedMap: Scene) {}
  
    meetsCriteria(video: Video): boolean {
      return video.map.internalName == this.selectedMap.internalName;
    }
  }
  
  export class AgentCriteria implements Criteria {
    constructor(private selectedAgent: Agent) {}
  
    meetsCriteria(video: Video): boolean {
      return video.agent.internalName == this.selectedAgent.internalName;
    }
  }
  
  export class SideCriteria implements Criteria {
    constructor(private selectedSides: Side[]) {}
  
    meetsCriteria(video: Video): boolean {
      if ( !$('.card.sidecard:not(.selected)') ) {return true;}
      return  this.selectedSides.some(selectedSide => selectedSide == video.side);
    }
  }
  
  export class SiteCriteria implements Criteria {
    constructor(private selectedSites: Site[]) {}
  
    meetsCriteria(video: Video): boolean {
      if ( !$('.card.sitecard:not(.selected)') ) {return true;}
      return this.selectedSites.some(selectedSite => selectedSite == video.site);
    }
  }
  
  export class AbilityCriteria implements Criteria {
    constructor(private selectedAbilities: Ability[]) {}
  
    meetsCriteria(video: Video): boolean {
      if ( !$('.card.abilitycard:not(.selected)') ) {return true;}
      return  video.abilities.some(
        ability => this.selectedAbilities.some(
          selectedAbility => selectedAbility.agent.internalName == ability.agent.internalName && selectedAbility.key == ability.key
        )
      );
    }
  }
  
  export class ContentTypeCriteria implements Criteria {
    constructor(private selectedContentTypes: ContentType[]) {}
  
    meetsCriteria(video: Video): boolean {
      if ( !$('.card.ContentTypecard:not(.selected)') ) {return true;}
      return  this.selectedContentTypes.some(selectedContentType => selectedContentType == video.type);
    }
  }

  export class FavoriteCriteria implements Criteria {
    constructor(private isFav: string) {}
  
    meetsCriteria(video: Video): boolean {
      return  isFav(video.id);
    }
  }
  