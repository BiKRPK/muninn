import {Agent, Scene, abKey, Ability, Side, Site, contentType, Video} from './types';

interface Criteria {
    meetsCriteria(video: Video): boolean;
  }
  
 export class MapCriteria implements Criteria {
    constructor(private selectedMap: Scene) {}
  
    meetsCriteria(video: Video): boolean {
      return video.map.internalName === this.selectedMap.internalName;
    }
  }
  
  export class AgentCriteria implements Criteria {
    constructor(private selectedAgent: Agent) {}
  
    meetsCriteria(video: Video): boolean {
      return video.agent.internalName === this.selectedAgent.internalName;
    }
  }
  
  export class SideCriteria implements Criteria {
    constructor(private selectedSides: Side[]) {}
  
    meetsCriteria(video: Video): boolean {
      return  $('.card.sidecard:not(.selected)').length  !== 0 || this.selectedSides.some(selectedSide => selectedSide === video.side);
    }
  }
  
  export class SiteCriteria implements Criteria {
    constructor(private selectedSites: Site[]) {}
  
    meetsCriteria(video: Video): boolean {
      return $('.card.sitecard:not(.selected)').length  !== 0 || this.selectedSites.some(selectedSite => selectedSite === video.site);
    }
  }
  
  export class AbilityCriteria implements Criteria {
    constructor(private selectedAbilities: Ability[]) {}
  
    meetsCriteria(video: Video): boolean {
      return $('.card.abilitycard:not(.selected)').length  !== 0  || video.abilities.some(
        ability => this.selectedAbilities.some(
          selectedAbility => selectedAbility.agent.internalName === ability.agent.internalName && selectedAbility.key === ability.key
        )
      );
    }
  }
  
  export class ContentTypeCriteria implements Criteria {
    constructor(private selectedContentTypes: contentType[]) {}
  
    meetsCriteria(video: Video): boolean {
      return $('.card.contenttypecard:not(.selected)').length  !== 0  || this.selectedContentTypes.some(selectedContentType => selectedContentType === video.type);
    }
  }
  