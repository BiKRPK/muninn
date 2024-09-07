import { Ability } from "./Ability";
import { Agent } from "./Agent";
import { ContentType, Side, Site } from "./Enums";
import { Scene } from "./Scene";

  export class Video {
    constructor(
      public id: string,
      public title: string,
      public scene: Scene,
      public agent: Agent,
      public abilities: Ability[],
      public side: Side,
      public site: Site,
      public type: ContentType,
      public src: string,
      public isFromUser: boolean,
      public description?: string
    ) {
      if (abilities.length > 4 ) {
        throw new Error('Error: trying to create a video with more than 4 abilities');
      } 
    }

    public isFav(): boolean {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.indexOf(this.id) > -1;
    }
  }
  