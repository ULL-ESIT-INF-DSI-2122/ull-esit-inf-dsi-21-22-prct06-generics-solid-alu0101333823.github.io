import {Combat} from './combat';
import {powerStats} from './figther';
import {Pokemon} from './pokemon';
import {SuperSayajin} from './superSayajin';

const pikachuStats: powerStats = {
  attack: 84,
  defense: 78,
  speed: 100,
  hp: 78,
};
const Pikachu = new Pokemon('Pikachu', 90.5, 1.7, 'fuego', pikachuStats, 'pika pika PIKACHU');

const gokuStats: powerStats = {
  attack: 12,
  defense: 2,
  speed: 1000000,
  hp: 50,
};
const Goku = new SuperSayajin('Goku', 74.2, 1.5, gokuStats);


const fight = new Combat(Goku, Pikachu);
fight.start();
