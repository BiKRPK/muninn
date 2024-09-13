import { Ability } from "./Ability";
import { AbKey } from "./Enums";
import { Scene } from "./Scene";
import { getAllAbKeys, getAllAgentsNames, getAllAgentsOverwolfIDs, OverwolfIDToAgentName } from "./TypeUtils";

  const agentOverwolfIDs = getAllAgentsOverwolfIDs();
  type AgentOverwolfID = (typeof agentOverwolfIDs)[number];

  const agentNames = getAllAgentsNames();
  type AgentName = (typeof agentNames)[number];

  export class Agent {
    private static instances: Map<string, Agent> = new Map();
    private constructor(public name?: AgentName, public overwolfID?: AgentOverwolfID) {}
  
    public static getInstance(name?: AgentName, overwolfID?: AgentOverwolfID): Agent {
      const instanceKey: string = `${name}-${overwolfID}`; 
  
      if (!Agent.instances.has(instanceKey)) {
        Agent.instances.set(instanceKey, new Agent(name, overwolfID));
      }
  
      return Agent.instances.get(instanceKey)!;
    }

    public static getAllAgents(): Agent[] {
      let agents: Array<Agent> = [];
      for (let key of OverwolfIDToAgentName.keys()) {
        const agent = Agent.getInstance(OverwolfIDToAgentName.get(key), key);
        agents.push(agent);
      }
      return agents;
    }

    public getAgentAbilities(): Ability[] {
      let agentAbilities: Array<Ability> = [];
      for (const key of getAllAbKeys()) {
        console.log(key);
        agentAbilities.push(Ability.getInstance(key, this));
      }
      return agentAbilities;
    }

  }