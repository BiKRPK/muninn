import { Ability } from "./Ability";
import { Agent } from "./Agent";
import { ContentType, Side, Site } from "./Enums";
import { Scene } from "./Scene";
import { getContentTypeName } from "./TypeUtils";

  export class Video {
    constructor(
      public id: string,
      public title: string,
      public scene: Scene,
      public side: Side,
      public site: Site,
      public type: ContentType,
      public src: string,
      public isFromUser: boolean,
      public description?: string,
      public agent?: Agent,
      public abilities?: Ability[]
    ) {
      if (abilities.length > 4 ) {
        throw new Error('Error: trying to create a video with more than 4 abilities');
      } 
      if (type !== ContentType.WallBang) {
        if(!agent) {
          throw new Error(`Error: trying to create a ${getContentTypeName(type)} video with no agent`);
        }
        if(!abilities) {
          throw new Error(`Error: trying to create a ${getContentTypeName(type)} video with no abilities`);
        }
      } 
    }

    public isFav(): boolean {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.indexOf(this.id) > -1;
    }
  }
  