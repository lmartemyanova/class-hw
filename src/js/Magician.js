import Character from './Character';

export default class Magician extends Character {
    constructor(name, type, health, level, attack = 10, defence = 40) {
        super(name, type, health, level);
        this.attack = attack;
        this.defence = defence;
    };
}