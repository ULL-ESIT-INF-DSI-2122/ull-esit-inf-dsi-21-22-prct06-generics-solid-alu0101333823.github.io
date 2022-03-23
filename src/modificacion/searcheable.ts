/**
 * Interfaz genérica que representa una clase que busque los items
 * que deseemos con el único método que posee
 */
export interface Searcheable<T> {
  search(item: T): T[];
};
