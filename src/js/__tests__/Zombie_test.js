import Zombie from '../Zombie'

let zombie;

beforeEach(() => {
    zombie = new Zombie('Anna', 'Zombie');
});

test('должен корректно создавать объект Zombie', () => {
    const correct = {
        health: 100,
        level: 1,
        attack: 40,
        defence: 10,
        _name: 'Anna',
        _type: 'Zombie', 
    };
    expect(zombie).toEqual(correct);
});

test('должен корректно присваивать свойства name и type', () => {
    const correct = {
        name: 'Anna',
        type: 'Zombie', 
    };
    expect(zombie.name).toBe(correct.name);
    expect(zombie.type).toBe(correct.type);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Zombie('A', 'Zombie')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Zombie('AnnaAnnaAnnaAAAAA', 'Zombie')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Zombie('Anna', 'Zombee')).toThrow('Недопустимый тип: Zombee. Допустимые типы: bowman, swordsman, magician, daemon, undead, zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    zombie.levelUp();
    expect(zombie.level).toBe(2);
    expect(zombie.attack).toBe(48); // 40 * 1.2
    expect(zombie.defence).toBe(12); // 10 * 1.2
    expect(zombie.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    zombie.health = 0;
    expect(() => zombie.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    zombie.damage(20);
    expect(zombie.health).toBe(82); // 100 - 20 * (1 - 10 / 100)

    zombie.health = 100;
    zombie.damage(111.11);
    expect(zombie.health).toBeCloseTo(0); // 100 - 111.11 * (1 - 10 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    zombie.damage(1000)
    expect(zombie.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    zombie.health = 0;
    expect(() => zombie.damage(20)).toThrow('Не бей мертвого!');
});
