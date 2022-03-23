import {Fighter} from './fighter';

/**
 * Clase que almacena luchadores de cualquier universo
 */
export class Pokedex {
  private fighters: Fighter[];
  constructor() {
  }

  /**
   * Añade un luchador a la base de datos
   * @param fighter luchador a añadir
   */
  add(fighter: Fighter) {
    this.fighters.push(fighter);
  }

  /**
   * Elimina un luchador de una posición dada
   * @param pos posición que queremos eliminar
   */
  remove(pos: number) {
    this.fighters = this.fighters.slice(pos, 1);
  }
}
