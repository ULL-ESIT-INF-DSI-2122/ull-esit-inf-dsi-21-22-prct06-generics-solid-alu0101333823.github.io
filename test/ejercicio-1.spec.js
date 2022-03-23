"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const pokemon_1 = require("../src/ejercicio-1/pokemon");
const figther_1 = require("../src/ejercicio-1/figther");
const superSayajin_1 = require("../src/ejercicio-1/superSayajin");
const charizardStats = {
    attack: 84,
    defense: 78,
    speed: 100,
    hp: 78,
};
const Charizard = new pokemon_1.Pokemon('Charizard', 90.5, 1.7, 'fuego', charizardStats, 'chaaaaaaaaaaaaaaaaaaarizard');
const vegetaStats = {
    attack: 12,
    defense: 2,
    speed: 1000000,
    hp: 50,
};
const Vegeta = new superSayajin_1.SuperSayajin('Vegeta', 74.2, 1.5, vegetaStats);
describe('Pruebas de las clases del Ejercicio 1', () => {
    // Pruebas Pokémon
    it('Pokémon es instancia de Fighter', () => {
        (0, chai_1.expect)(Charizard).to.be.instanceOf(figther_1.Fighter);
    });
    it('Pokémon es instancia de Pokemon', () => {
        (0, chai_1.expect)(Charizard).to.be.instanceOf(pokemon_1.Pokemon);
    });
    it('Pokémon tiene un método para decir su nombre', () => {
        (0, chai_1.expect)(Charizard.secretAbility).to.be.exist;
    });
    // Pruebas SuperSayan
    it('SuperSayajin es instancia de Fighter', () => {
        (0, chai_1.expect)(Vegeta).to.be.instanceOf(figther_1.Fighter);
    });
    it('SuperSayajin es instancia de SuperSayajin', () => {
        (0, chai_1.expect)(Vegeta).to.be.instanceOf(superSayajin_1.SuperSayajin);
    });
    it('SuperSayajin tiene en su poder la KameHameHa', () => {
        (0, chai_1.expect)(Vegeta.secretAbility).to.be.exist;
    });
    it('SuperSayajin tiene un bool para decir si ha usado la KameHameHa', () => {
        (0, chai_1.expect)(Vegeta.getGodMode).to.be.exist;
    });
    // Clase Combat
});
