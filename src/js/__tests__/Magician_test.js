import Magician from '../Magician'

let magician;

beforeEach(() => {
    magician = new Magician('Anna', 'Magician');
});

test('должен корректно создавать объект Magician', () => {
    const correct = {
        health: 100,
        level: 1,
        attack: 10,
        defence: 40,
        _name: 'Anna',
        _type: 'Magician', 
    };
    expect(magician).toEqual(correct);
});

test('должен корректно присваивать свойства name и type', () => {
    const correct = {
        name: 'Anna',
        type: 'Magician', 
    };
    expect(magician.name).toBe(correct.name);
    expect(magician.type).toBe(correct.type);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Magician('A', 'Magician')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Magician('AnnaAnnaAnnaAAAAA', 'Magician')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Magician('Anna', 'Magister')).toThrow('Недопустимый тип: Magister. Допустимые типы: bowman, swordsman, magician, daemon, undead, zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    magician.levelUp();
    expect(magician.level).toBe(2);
    expect(magician.attack).toBe(12); // 10 * 1.2
    expect(magician.defence).toBe(48); // 40 * 1.2
    expect(magician.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    magician.health = 0;
    expect(() => magician.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    magician.damage(20);
    expect(magician.health).toBe(88); // 100 - 20 * (1 - 40 / 100)

    magician.health = 100;
    magician.damage(166.66);
    expect(magician.health).toBeCloseTo(0); // 100 - 166.66 * (1 - 40 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    magician.damage(1000)
    expect(magician.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    magician.health = 0;
    expect(() => magician.damage(20)).toThrow('Не бей мертвого!');
});
