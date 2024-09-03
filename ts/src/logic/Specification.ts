import { Ability } from "./Ability";
import { Agent } from "./Agent";
import { ContentType, Side, Site } from "./Enums";
import { Scene } from "./Scene";
import { Video } from "./Video";


export interface ISpecification {
  isSatisfiedBy(object: unknown): boolean;
  and(other: ISpecification): ISpecification;
  or(other: ISpecification): ISpecification;
  not(): ISpecification;
}

export abstract class CompositeSpecification implements ISpecification {
  abstract isSatisfiedBy(object: unknown): boolean;

  and(other: ISpecification): ISpecification {
    return new AndSpecification(this, other);
  }

  or(other: ISpecification): ISpecification {
    return new OrSpecification(this, other);
  }

  not(): ISpecification {
    return new NotSpecification(this);
  }
}

  export class AndSpecification extends CompositeSpecification {
    constructor(private left: ISpecification, private right: ISpecification) {super();}

    isSatisfiedBy(object: unknown): boolean {
        return this.left.isSatisfiedBy(object) && this.right.isSatisfiedBy(object);
    }
  }

  export class OrSpecification extends CompositeSpecification {
    constructor(private left: ISpecification, private right: ISpecification) {super();}

    isSatisfiedBy(object: unknown): boolean {
        return this.left.isSatisfiedBy(object) || this.right.isSatisfiedBy(object);
    }
  }

  export class NotSpecification extends CompositeSpecification {
    constructor(private specification: ISpecification) {super();}

    isSatisfiedBy(object: unknown): boolean {
        return !this.specification.isSatisfiedBy(object);
    }
  }
  
 export class SceneSpecification extends CompositeSpecification {
    constructor(private selectedScene: Scene) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return video.scene == this.selectedScene;
    }
  }
  
  export class AgentSpecification extends CompositeSpecification {
    constructor(private selectedAgent: Agent) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return video.type === ContentType.WallBang || video.agent == this.selectedAgent;
    }
  }
  
  export class SideSpecification extends CompositeSpecification {
    constructor(private selectedSides: Side[]) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return  this.selectedSides.some(selectedSide => selectedSide == video.side);
    }
  }
  
  export class SiteSpecification extends CompositeSpecification {
    constructor(private selectedSites: Site[]) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return this.selectedSites.some(selectedSite => selectedSite == video.site);
    }
  }
  
  export class AbilitySpecification extends CompositeSpecification {
    constructor(private selectedAbilities: Ability[]) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return  video.abilities.some(
        ability => this.selectedAbilities.some(
          selectedAbility => selectedAbility == ability
        )
      );
    }
  }
  
  export class ContentTypeSpecification extends CompositeSpecification {
    constructor(private selectedContentTypes: ContentType[]) {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return  this.selectedContentTypes.some(selectedContentType => selectedContentType == video.type);
    }
  }

  export class FavoriteSpecification extends CompositeSpecification {
    constructor() {super();}

    isSatisfiedBy(video: Video): boolean {
      return  video.isFav();
    }
  }

  export class UserSpecification extends CompositeSpecification {
    constructor() {super();}
  
    isSatisfiedBy(video: Video): boolean {
      return  video.isFromUser;
    }
  }





  