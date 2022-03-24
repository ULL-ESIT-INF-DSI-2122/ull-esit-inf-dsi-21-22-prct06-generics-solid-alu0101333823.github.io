
/**
 * Esta interfaz será la responsable de ser implementada en todas las clases
 * para crear DSIflix. Deberá poder añadir items, así como eliminarlos, y podrá
 * obtenerse una peli, serie o documental por nombre. Podrá devolverse el 
 * número de contenido digital total.
 */
export interface Stremeable<T> {
  /**
   * @param item item a añadir
   */
  addItem(item: T): void;
  
  /**
   * @param name nombre del item a devolver
   * @returns item 
   * @returns undefined en caso de no encontrarse 
   */
  getItemByName(name: string): T | undefined;

  /**
   * Dado un item lo elimina de la lista
   * @param name nombre del item a eliminar
   */
  removeItemByName(name: string): void;

  /**
   * Devuelve el número de items totales
   */
  getAllItems(): number;
}
