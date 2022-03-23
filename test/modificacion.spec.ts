import {expect} from 'chai';
import 'mocha';
import {NumericSearcheableCollection} from '../src/modificacion/NumericSearcheableCollection'
import { StringSearcheableCollection } from '../src/modificacion/StringSearcheableCollection';

const nItems: number[] = [];
const nCollection = new NumericSearcheableCollection(nItems);
nCollection.addItem(2);

const sItems: string[] = [];
const sCollection = new StringSearcheableCollection(sItems);
sCollection.addItem('a');

describe('Pruebas de la clase NumericSearcheableCollection', () => {
  it('nCollection es de la clase NumericSear...', () => {
    expect(nCollection).to.be.instanceOf(NumericSearcheableCollection);
  });

  it('nCollection tiene el método addItem', () => {
    expect(nCollection.addItem).to.be.exist;
  });

  it('nCollection tiene el método removeItem', () => {
    expect(nCollection.removeItem).to.be.exist;
  });

  it('nCollection tiene el método search', () => {
    expect(nCollection.search).to.be.exist;
  });

  it('nCollection tiene el método getNumbersOfItems', () => {
    expect(nCollection.getNumbersOfItems).to.be.exist;
  });
  
  it('El método search funciona', () => {
    expect(nCollection.search(2)).to.eql([2]);
  });
});

describe('Pruebas de la clase StringSearcheableCollection', () => {
  it('sCollection es de la clase StringSear...', () => {
    expect(sCollection).to.be.instanceOf(StringSearcheableCollection);
  });

  it('sCollection tiene el método addItem', () => {
    expect(sCollection.addItem).to.be.exist;
  });

  it('sCollection tiene el método removeItem', () => {
    expect(sCollection.removeItem).to.be.exist;
  });

  it('sCollection tiene el método search', () => {
    expect(sCollection.search).to.be.exist;
  });

  it('sCollection tiene el método getNumbersOfItems', () => {
    expect(sCollection.getNumbersOfItems).to.be.exist;
  });
  
  it('El método search funciona', () => {
    expect(sCollection.search('a')).to.eql(['a']);
  });
});