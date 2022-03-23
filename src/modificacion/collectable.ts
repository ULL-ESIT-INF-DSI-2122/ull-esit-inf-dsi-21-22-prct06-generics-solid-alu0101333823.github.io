/**
 * Interfaz que representa una clase que almacena Items de cualquier
 * tipo con los 4 métodos indicados
 */
export interface Collectable<T> {
  addItem(newItem: T): void;
  getItem(pos: number): T;
  removeItem(pos: number): void;
  getNumbersOfItems(): number;
};
