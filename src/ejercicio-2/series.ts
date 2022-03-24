import {BasicStremeableCollection} from './basicStremeableCollection';


export class Serie {
  /**
     * @param name nombre de la serie
     * @param duration duración medio de cada capítulo
     * @param chapterNum número total de capítulos
     */
  constructor(public name: string, public duration: number, public chapterNum: number) {
  }
}

/**
 * Clase que guarda una colección de Series
 */
export class SeriesCollection extends BasicStremeableCollection<Serie> {
  constructor() {
    super();
  }

  /**
   * Elimina una serie de la base de datos
   * @param name nombre de la serie
   */
  removeItemByName(name: string): void {
    this.items.forEach((element, index) => {
      if (element.name === name) {
        this.items = this.items.splice(index, 1);
      }
    });
  }
  
  /**
   * Busca y devuelve una serie de la base de datos por
   * su nombre
   * @param name 
   * @returns 
   */
  getItemByName(name: string): Serie | undefined {
    this.items.forEach((element) => {
      if (element.name === name) {
        return element;
      }
    });
    return undefined;
  }
}
