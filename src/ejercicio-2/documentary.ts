import {BasicStremeableCollection} from './basicStremeableCollection';

export class Documentary {
  /**
   * @param name nombre del documental
   * @param duration duración en minutos del mismo
   */
  constructor(public name: string, public duration: number) {
  }
}

export class DocumentaryCollection extends BasicStremeableCollection<Documentary> {
  /**
   * @param name nombre del documental
   * @param duration duración en minutos del mismo
   */
  constructor() {
    super();
  }

  /**
   * Elimina una Documentary de la base de datos
   * @param name nombre de la Documentary
   */
  removeItemByName(name: string): void {
    this.items.forEach((element, index) => {
      if (element.name === name) {
        this.items = this.items.splice(index, 1);
      }
    });
  }
  
  /**
   * Busca y devuelve una Documentary de la base de datos por
   * su nombre
   * @param name 
   * @returns 
   */
  getItemByName(name: string): Documentary | undefined {
    this.items.forEach((element) => {
      if (element.name === name) {
        return element;
      }
    });
    return undefined;
  }
}
