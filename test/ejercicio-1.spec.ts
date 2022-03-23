import 'mocha';
import {expect} from 'chai';
import {Pokemon} from '../src/ejercicio-1/pokemon'; 
import {Fighter, powerStats} from '../src/ejercicio-1/fighter'; 
import {SuperSayajin} from '../src/ejercicio-1/superSayajin';

const charizardStats: powerStats = {
  attack: 84,
  defense: 78,
  speed: 100,
  hp: 78,
};
const Charizard = new Pokemon('Charizard', 90.5, 1.7, 'fuego', charizardStats, 'chaaaaaaaaaaaaaaaaaaarizard');

const vegetaStats: powerStats = {
  attack: 12,
  defense: 2,
  speed: 1000000,
  hp: 50,
};
const Vegeta = new SuperSayajin('Vegeta', 74.2, 1.5, vegetaStats);

describe('Pruebas de las clases del Ejercicio 1', () => {
  // Pruebas Pokémon
  it('Pokémon es instancia de Fighter', () => {
    expect(Charizard).to.be.instanceOf(Fighter);
  });

  it('Pokémon es instancia de Pokemon', () => {
    expect(Charizard).to.be.instanceOf(Pokemon);
  });

  it('Pokémon tiene un método para decir su nombre', () => {
    expect(Charizard.secretAbility).to.be.exist;
  });

  // Pruebas SuperSayan
  it('SuperSayajin es instancia de Fighter', () => {
    expect(Vegeta).to.be.instanceOf(Fighter);
  });

  it('SuperSayajin es instancia de SuperSayajin', () => {
    expect(Vegeta).to.be.instanceOf(SuperSayajin);
  });

  it('SuperSayajin tiene en su poder la KameHameHa', () => {
    expect(Vegeta.secretAbility).to.be.exist;
  });

  it('SuperSayajin tiene un bool para decir si ha usado la KameHameHa', () => {
    expect(Vegeta.getGodMode).to.be.exist;
  });

  // Clase Combat
});
