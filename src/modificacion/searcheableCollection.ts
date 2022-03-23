import {Collectable} from './collectable'
import {Searcheable} from './searcheable'

/**
 * Clase abstracta que junta las interfaces Searcheable y Collectable para
 * crear una plantilla para las clases para que tenga las funcionalidades de ambas
 * interfaces
 */
export abstract class SearcheableCollection<T> implements Collectable<T>, Searcheable<T> {
  constructor(protected items: T[]) {    
  }

  addItem(newItem: T) {
    this.items.push(newItem);
  }

  getItem(pos: number): T {
    return this.items[pos];
  }

  removeItem(pos: number): void {
    this.items.slice(pos, 1);
  }

  getNumbersOfItems(): number {
    return this.items.length;
  }

  abstract search(item: T): T[];
}
