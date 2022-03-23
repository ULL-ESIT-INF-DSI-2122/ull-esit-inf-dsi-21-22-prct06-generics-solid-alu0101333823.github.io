import {Fighter, powerStats} from './fighter';

/**
 * Esta clase representa a los contendientes Super Sayan que podrán
 * entablar combate con otro contendiente. Cuando un Super Sayan está 
 * a punto de morir, (vida 1 o menor), podrá activar la kamehameha, 
 * esquivando una muerte segura y aumentando a 9999 su estadística de 
 * ataque. Esto pasará solo una vez, se comprobará con un boolean
 */
export class SuperSayajin extends Fighter {
  constructor(public name: string, public weight: number,
    public height: number, 
    public stats:powerStats, public godMode: boolean = false) {
    super(name, weight, height, stats);    
  }

  public getGodMode(): boolean {
    return this.godMode;
  }

  public secretAbility(): void {
    this.stats.attack = 9999;
    this.stats.hp = 1;
    this.godMode = true;
    console.log('Pensabas que habías ganado pero... KAMEHAMEHA');
  } 
} 
