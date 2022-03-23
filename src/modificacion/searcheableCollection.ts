import {Collectable} from './collectable';
import {Searcheable} from './searcheable';

/**
 * Clase abstracta que junta las interfaces Searcheable y Collectable para
 * crear una plantilla para las clases para que tenga las funcionalidades de ambas
 * interfaces
 */
export abstract class SearcheableCollection<T> implements Collectable<T>, Searcheable<T> {
  constructor(protected items: T[]) {    
  }

  /**
   * Añade un item a la clase
   * @param newItem item que añade
   */
  addItem(newItem: T) {
    this.items.push(newItem);
  }

  /**
   * Devuelve el item deseado según la posición que le digamos
   * @param pos posición del item que retorna
   */
  getItem(pos: number): T {
    return this.items[pos];
  }

  /**
   * Quita un item de la posición especificada
   * @param pos posición del item a quitar
   */
  removeItem(pos: number): void {
    this.items = this.items.slice(pos, 1);
  }

  /**
   * Devuelve el número de elementos que tiene guardado
   */
  getNumbersOfItems(): number {
    return this.items.length;
  }

  /**
   * Busca un elemento en la lista de elementos guardados
   * @param item item a buscar
   */
  abstract search(item: T): T[];
}
