export default class Character {
    constructor(name, type, health = 100, level = 1, attack, defence) {
        this.name = name;
        this.type = type;
        this.health = health;
        this.level = level;
        this.attack = attack;
        this.defence = defence;
    };

    static allowedTypes = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

    get name() {
        return this._name;
    };
    
    set name(value) {
        if (value.length < 2) {
            throw new Error("Имя слишком короткое.");
        }
        if (value.length > 10) {
            throw new Error("Имя слишком длинное.");
        }
        this._name = value;
    };

    get type() {
        return this._type;
    };

    set type(value) {
        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        if (Character.allowedTypes.includes(formattedValue)) {
            this._type = formattedValue;
        } else {
            throw new Error(`Недопустимый тип: ${value}. Допустимые типы: ${Character.allowedTypes.join(', ')}`);
        }
    };

    levelUp() {
        if (this.health > 0) {
            this.level += 1;
            this.attack *= 1.2;
            this.defence *= 1.2;
            this.health = 100;
        } else {
            throw new Error("К сожалению, вы умерли.");
        };
    };

    damage(points) {
        if (this.health > 0) {
            this.health -= points * (1 - this.defence / 100)
            this.health >= 0 ? this.health : this.health = 0
        } else {
            throw new Error("Не бей мертвого!")
        }
    }
}
