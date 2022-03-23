import {Combat} from './combat';
import {powerStats} from './fighter';
import {Pokemon} from './pokemon';
import {StreetFighterCapcom} from './streetFighter';
import {SuperSayajin} from './superSayajin';

/**
 * Simulación de dos combates entre Universos y el mismo Universo
 */

console.log('Primer Combate: ');
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
fight.start();

console.log('Segundo Combate: ');

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
secondFight.start();
