import {BasicStremeableCollection} from './basicStremeableCollection';


export class Movie {
  /**
   * @param name nombre de la película
   * @param duration duración en minutos de la misma
   */
  constructor(public name: string, public duration: number) {
  }
}

export class MoviesCollection extends BasicStremeableCollection<Movie> {
  constructor() {
    super();
  }

  /**
   * Elimina una Movie de la base de datos
   * @param name nombre de la Movie
   */
  removeItemByName(name: string): void {
    this.items.forEach((element, index) => {
      if (element.name === name) {
        this.items = this.items.splice(index, 1);
      }
    });
  }
  
  /**
   * Busca y devuelve una Movie de la base de datos por
   * su nombre
   * @param name 
   * @returns 
   */
  getItemByName(name: string): Movie | undefined {
    this.items.forEach((element) => {
      if (element.name === name) {
        return element;
      }
    });
    return undefined;
  }
}
