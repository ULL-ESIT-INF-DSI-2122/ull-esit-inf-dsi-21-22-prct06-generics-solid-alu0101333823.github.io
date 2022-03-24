import 'mocha';
import {expect} from 'chai';
import {Pokemon} from '../src/ejercicio-1/pokemon'; 
import {Fighter, powerStats} from '../src/ejercicio-1/fighter'; 
import {SuperSayajin} from '../src/ejercicio-1/superSayajin';
import {Combat} from '../src/ejercicio-1/combat';
import {StreetFighterCapcom} from '../src/ejercicio-1/streetFighter';
import {Pokedex} from '../src/ejercicio-1/pokedex';

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

const pikachuStats: powerStats = {
  attack: 84,
  defense: 78,
  speed: 100,
  hp: 78,
};
const Pikachu = new Pokemon('Pikachu', 90.5, 1.7, 'fuego', pikachuStats, 'pika pika PIKACHU');

const gokuStats: powerStats = {
  attack: 40,
  defense: 2,
  speed: 1000000,
  hp: 50,
};
const Goku = new SuperSayajin('Goku', 74.2, 1.5, gokuStats);
const fight = new Combat(Goku, Pikachu);

const ryuStats: powerStats = {
  attack: 40,
  defense: 30,
  speed: 100,
  hp: 100,
};
const Ryu = new StreetFighterCapcom('Ryu', 83.0, 1.78, ryuStats);

const kenStats: powerStats = {
  attack: 40,
  defense: 30,
  speed: 100,
  hp: 100,
};
const Ken = new StreetFighterCapcom('Ken', 80.2, 1.8, kenStats);
const secondFight = new Combat(Ryu, Ken);
const thirdFight = new Combat(Pikachu, Goku);
const pokedex = new Pokedex();

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
    expect(Vegeta.getGodMode()).to.be.false;
  });

  // Pruebas StreetFighter
  it('StreetFighterCapcom es instancia de Fighter', () => {
    expect(Ryu).to.be.instanceOf(Fighter);
  });

  it('StreetFighterCapcom es instancia de StreetFighterCapcom', () => {
    expect(Ryu).to.be.instanceOf(StreetFighterCapcom);
  });

  it('StreetFighterCapcom tiene en su poder el Hadōken', () => {
    expect(Ryu.secretAbility()).to.eql(undefined);
  });

  // Pruebas métodos de Fighter
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
  it('Un combate tiene el método de comenzar un combate', () => {
    expect(fight.start()).to.be.eql(undefined);
    expect(secondFight.start()).to.be.eql(undefined);
    expect(thirdFight.start()).to.be.eql(undefined);
  });

  // Pruebas Pokédex
  it('Pokédex es instancia de Pokédex', () => {
    expect(pokedex).to.be.instanceOf(Pokedex);
  });
  
  it('Pokédex tiene un método que añade luchadores de varios universos', () => {
    expect(pokedex.add).to.be.exist;
  });
  
  it('Pokédex puede eliminar luchadores de su base de datos', () => {
    expect(pokedex.remove).to.be.exist;
  });
});
