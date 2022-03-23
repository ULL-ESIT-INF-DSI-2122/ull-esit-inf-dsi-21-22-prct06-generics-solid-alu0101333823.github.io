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
    expect(Vegeta.secretAbility).to.exist;
  });

  it('SuperSayajin tiene un bool para decir si ha usado la KameHameHa', () => {
    expect(Vegeta.getGodMode()).to.eq(true);
  });

  // Pruebas métpdps de Fighter
  it('Un luchador tiene el método getName', () => {
    expect(Charizard.getName()).to.be.eq('Charizard');
  });
  it('Un luchador tiene el método getHeight', () => {
    expect(Charizard.getHeight()).to.be.eq(1.7);
  });
  
  it('Un luchador tiene el método getWeight', () => {
    expect(Charizard.getWeight()).to.be.eq(90.5);
  });
  
  it('Un luchador tiene el método getStats', () => {
    expect(Charizard.getStats().hp).to.eq(78);
  });

  // Clase Combat
});
