import Character from './Character.js';

export default class Bowman extends Character {
    constructor(name, type, health, level, attack = 25, defence = 25) {
        super(name, type, health, level);
        this.attack = attack;
        this.defence = defence;
    };
}