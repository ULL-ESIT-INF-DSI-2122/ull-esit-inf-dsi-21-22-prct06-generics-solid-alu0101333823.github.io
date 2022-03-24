import 'mocha';
import {expect} from 'chai';
// import {BasicStremeableCollection} from '../src/ejercicio-2/basicStremeableCollection';
import {Serie, SeriesCollection} from '../src/ejercicio-2/series';
import {BasicStremeableCollection} from '../src/ejercicio-2/basicStremeableCollection';
import {Movie, MoviesCollection} from '../src/ejercicio-2/movies';
import {Documentary, DocumentaryCollection} from '../src/ejercicio-2/documentary';

const serie1 = new Serie('Lost', 50, 120);
const movie1 = new Movie('1917', 117);
const documentary1 = new Documentary('WWII a color', 800);
const series = new SeriesCollection();
const movies = new MoviesCollection();
const documentaries = new DocumentaryCollection();

describe('Pruebas de las clases del Ejercicio 2', () => {
  describe('Pruebas de la clase BasicStremeableCollection', () => {
    it('Puede añadir items', () => {
      expect(series.addItem(serie1)).to.be.eql(undefined);
      expect(movies.addItem(movie1)).to.be.eql(undefined);
      expect(documentaries.addItem(documentary1)).to.eql(undefined);
    });

    it('Puede decirnos cuantos items tiene guardados', () => {
      expect(series.getAllItems()).to.be.eq(1);
      expect(movies.getAllItems()).to.be.eq(1);
      expect(documentaries.getAllItems()).to.eq(1);
    });
  });

  describe('Pruebas de la clase Serie', () => {
    it('Series es instancia de BasicStremeableCollection', () => {
      expect(series).to.be.instanceOf(BasicStremeableCollection);
    });

    it('Series es instancia de SeriesCollection', () => {
      expect(series).to.be.instanceOf(SeriesCollection);
    });

    it('Series tiene un método para buscar por nombre una serie', () => {
      expect(series.getItemByName('Lost')).to.not.eql(serie1);
      expect(series.getItemByName('Castle')).to.be.eql(undefined);
    });

    it('Series tiene un método para eliminar por nombre una serie', () => {
      expect(series.removeItemByName('Lost')).to.be.eql(undefined);
    });
  });

  describe('Pruebas de la clase MovieCollection', () => {
    it('MoviesCollection es instancia de BasicStremeableCollection', () => {
      expect(movies).to.be.instanceOf(BasicStremeableCollection);
    });

    it('MoviesCollection es instancia de MoviesCollection', () => {
      expect(movies).to.be.instanceOf(MoviesCollection);
    });

    it('MoviesCollection tiene un método para buscar por nombre una película', () => {
      expect(movies.getItemByName('1917')).to.not.eql(movie1);
      expect(movies.getItemByName('El padrino')).to.be.eql(undefined);
    });

    it('MoMoviesCollectionvie tiene un método para eliminar por nombre una película', () => {
      expect(movies.removeItemByName('1917')).to.be.eql(undefined);
    });
  });

  describe('Pruebas de la clase DocumentaryCollection', () => {
    it('DocumentaryCollection es instancia de BasicStremeableCollection', () => {
      expect(documentaries).to.be.instanceOf(BasicStremeableCollection);
    });

    it('DocumentaryCollection es instancia de DocumentaryCollection', () => {
      expect(documentaries).to.be.instanceOf(DocumentaryCollection);
    });

    it('DocumentaryCollection tiene un método para buscar por nombre un documental', () => {
      expect(documentaries.getItemByName('WWII a color')).to.not.eql(documentary1);
      expect(documentaries.getItemByName('El espacio')).to.be.eql(undefined);
    });

    it('DocumentaryCollection tiene un método para eliminar por nombre un documental', () => {
      expect(documentaries.removeItemByName('WWII a color')).to.be.eql(undefined);
    });
  });
});
