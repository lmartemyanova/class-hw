import Swordsman from '../Swordsman'

let swordsman;

beforeEach(() => {
    swordsman = new Swordsman('Anna', 'Swordsman');
});

test('должен корректно создавать объект Swordsman', () => {
    const correct = {
        health: 100,
        level: 1,
        attack: 40,
        defence: 10,
        _name: 'Anna',
        _type: 'Swordsman', 
    };
    expect(swordsman).toEqual(correct);
});

test('должен корректно присваивать свойства name и type', () => {
    const correct = {
        name: 'Anna',
        type: 'Swordsman', 
    };
    expect(swordsman.name).toBe(correct.name);
    expect(swordsman.type).toBe(correct.type);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Swordsman('A', 'Swordsman')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Swordsman('AnnaAnnaAnnaAAAAA', 'Swordsman')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Swordsman('Anna', 'Warrior')).toThrow('Недопустимый тип: Warrior. Допустимые типы: bowman, swordsman, magician, daemon, undead, zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    swordsman.levelUp();
    expect(swordsman.level).toBe(2);
    expect(swordsman.attack).toBe(48); // 40 * 1.2
    expect(swordsman.defence).toBe(12); // 10 * 1.2
    expect(swordsman.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    swordsman.health = 0;
    expect(() => swordsman.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    swordsman.damage(20);
    expect(swordsman.health).toBe(82); // 100 - 20 * (1 - 10 / 100)

    swordsman.health = 100;
    swordsman.damage(111.11);
    expect(swordsman.health).toBeCloseTo(0); // 100 - 111.11 * (1 - 10 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    swordsman.damage(1000)
    expect(swordsman.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    swordsman.health = 0;
    expect(() => swordsman.damage(20)).toThrow('Не бей мертвого!');
});
