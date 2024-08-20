import { getAbilities, RawAbility } from "./Abilities";
import { Agent } from "./Agent";
import { AbKey } from "./Enums";

export class Ability {
    private static instances: Map<string, Ability> = new Map();
    private constructor(public key: AbKey, public agent: Agent) {}
    
    public static getInstance(key: AbKey, agent: Agent): Ability {
      const instanceKey: string = `${key}-${agent.name}-${agent.overwolfID}`; 
  
      if (!Ability.instances.has(instanceKey)) {
        Ability.instances.set(instanceKey, new Ability(key, agent));
      }
  
      return Ability.instances.get(instanceKey)!;
    }

    public static getAllAbilities(): Map<Agent, Ability[]> {
      let abilities: Map<Agent, Ability[]> = new Map<Agent, Ability[]>();
      Agent.getAllAgents().forEach(function(agent: Agent) {
        abilities.set(agent, agent.getAgentAbilities());
      });
      return abilities;
    }

    public getAbilityName(): string {
      const rawAbility: RawAbility = getAbilities(this.agent.name, this.key);
      if (rawAbility) {
        return rawAbility.title;
      } 
      return "Uknown";
    }

    public getIcon(): string {
      const rawAbility: RawAbility = getAbilities(this.agent.name, this.key);
      if (rawAbility) { return rawAbility.src;}
      return '';
    }

  }
