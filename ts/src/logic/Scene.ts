import { getAllScenesNames, getAllScenesOverwolfIDs, OverwolfIDToSceneName, SceneNameToOverwolfID } from "./TypeUtils";

  const sceneOverwolfIDs = getAllScenesOverwolfIDs();
  type ScenesOverwolfID = (typeof sceneOverwolfIDs)[number];

  const scenesNames = getAllScenesNames();
  type SceneName = (typeof scenesNames)[number];

  export class Scene {
    private static instances: Map<string, Scene> = new Map();
    private constructor(public name?: SceneName, public overwolfID?: ScenesOverwolfID) {}
  
    public static getInstance(name?: SceneName, overwolfID?: ScenesOverwolfID): Scene {
      const instanceKey: string = `${name}-${overwolfID}`; 
  
      if (!Scene.instances.has(instanceKey)) {
        Scene.instances.set(instanceKey, new Scene(name, overwolfID));
      }
  
      return Scene.instances.get(instanceKey)!;
    }

    public static getAllScenes(): Scene[] {
      let scenes: Array<Scene> = [];
      for (let key of OverwolfIDToSceneName.keys()) {
        const scene: Scene = {
          overwolfID: key,
          name: OverwolfIDToSceneName.get(key),
        }
        scenes.push(scene);
      }
      return scenes;
    }

  }