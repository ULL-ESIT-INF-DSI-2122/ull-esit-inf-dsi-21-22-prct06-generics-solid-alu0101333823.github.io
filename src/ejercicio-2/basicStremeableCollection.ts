import {Stremeable} from './stremeable';

/**
 * Esta clase abstracta genérica es la base para desarrollar
 * las diferentes colecciones en la plataforma.
 */
export abstract class BasicStremeableCollection<T> implements Stremeable<T> {
  protected items: T[] = [];
  constructor() {
  }
  
  /** 
   * @param item item a añadir
   */
  addItem(item: T): void {
    this.items.push(item);
  }
  
  /**
   * Devuelve el número de items totales
   */
  getAllItems(): number {
    return this.items.length;
  }

  /**
   * Dado un item lo elimina de la lista
   * @param name nombre del item a eliminar
   */
  abstract removeItemByName(name: string): void;

  /**
   * @param name nombre del item a devolver
   * @returns item 
   * @returns undefined en caso de no encontrarse 
   */
  abstract getItemByName(name: string): T | undefined;
}
