import {Fighter, powerStats} from './figther';

/**
 * Esta clase Pokémon representa a un Contendiente del universo
 * Pokémon. La cualidad que tienen es que además de tener con su tipo
 * independientemente de los demás tipos de contendientes, gritará su 
 * nombre antes de atacar
 */
export class Pokemon extends Fighter {
  constructor(public name: string, public weight: number,
    public height: number, public type: string, 
    public stats:powerStats, public phrase: string) {
    super(name, weight, height, stats);    
  }

  public secretAbility(): void {
    console.log(this.phrase); 
  }
} 

