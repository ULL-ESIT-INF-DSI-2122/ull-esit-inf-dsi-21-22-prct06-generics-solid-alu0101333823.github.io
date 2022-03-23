import {Fighter, powerStats} from './fighter';

/**
 * Esta clase representa a los luchadores de la popular franquicia
 * Street Fighter de la compañía Capcom. Su habilidad secreta será
 * realizar el famoso Hadōken y aumentar en 10 su daño.
 */
export class StreetFighterCapcom extends Fighter {
  constructor(public name: string, public weight: number,
    public height: number, 
    public stats:powerStats, public godMode: boolean = false) {
    super(name, weight, height, stats);    
  }
  /**
   * Habilidad secreta Hadōken que realiza un ataque reforzado
   */
  public secretAbility() {
    console.log('HADOOKEN');
    this.getStats().attack += 10;
  }
}
