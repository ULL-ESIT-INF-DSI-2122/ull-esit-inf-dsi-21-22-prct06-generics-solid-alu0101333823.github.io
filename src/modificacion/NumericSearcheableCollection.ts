import {SearcheableCollection} from './searcheableCollection';
/**
 * Clase concreta que representa una colección de valores numéricos que permite almacenar
 * y buscar dichos valores
 */
export class NumericSearcheableCollection extends SearcheableCollection<number> {
  constructor(items: number[]) {
    super(items);
  }

  search(item: number): number[] {
    const result: number[] = [];
    this.items.forEach(element => {
      if (element === item) result.push(element);
    });
    return result;
  }
}