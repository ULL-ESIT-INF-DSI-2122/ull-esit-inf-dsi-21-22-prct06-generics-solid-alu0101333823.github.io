import {SearcheableCollection} from './searcheableCollection';

/**
 * Clase concreta que representa una colección de valores de tipo string que
 * permite almacenar y buscar dichos valores
 */
export class StringSearcheableCollection extends SearcheableCollection<string> {
  constructor(items: string[]) {
    super(items);
  }

  search(item: string): string[] {
    const result: string[] = [];
    this.items.forEach(element => {
      if (element === item) result.push(element);
    });
    return result;
  }
}
