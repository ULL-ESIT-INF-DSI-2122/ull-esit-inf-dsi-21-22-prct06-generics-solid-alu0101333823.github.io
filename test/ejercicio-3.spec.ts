import 'mocha';
import {expect} from 'chai';
import {Cifrado} from '../src/ejercicio-3/cifrado';

const cifrado = new Cifrado(5, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz');
const firstMsg = cifrado.cifrar('Hola, como estas');

describe('Pruebas del ejercicio 3', () => {
  describe('Pruebas clase Cifrado', () => {
    it('Cifrado es instancia de Cifrado', () => {
      expect(cifrado).to.be.instanceOf(Cifrado);
    });

    it('Cifrado tiene un método para cifrar', () => {
      expect(cifrado.cifrar('Hola, como estas')).to.be.eq(firstMsg);
    });

    it('Cifrado tiene un método para descifrar', () => {
      expect(cifrado.descifrar(firstMsg)).to.be.eq('Hola, como estas');
    });
  });   
});
