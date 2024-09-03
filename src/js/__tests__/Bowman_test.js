import Bowman from '../Bowman'

let bowman;

beforeEach(() => {
    bowman = new Bowman('Anna', 'Bowman');
});

test('должен корректно создавать объект Bowman', () => {
    expect(bowman.name).toBe('Anna');
    expect(bowman.type).toBe('Bowman');
    expect(bowman.health).toBe(100);
    expect(bowman.level).toBe(1);
    expect(bowman.attack).toBe(25);
    expect(bowman.defence).toBe(25);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Bowman('A', 'Bowman')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Bowman('AnnaAnnaAnnaAAAAA', 'Bowman')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Bowman('Anna', 'Warrior')).toThrow('Недопустимый тип: Warrior. Допустимые типы: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    bowman.levelUp();
    expect(bowman.level).toBe(2);
    expect(bowman.attack).toBe(30); // 25 * 1.2
    expect(bowman.defence).toBe(30); // 25 * 1.2
    expect(bowman.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    bowman.health = 0;
    expect(() => bowman.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    bowman.damage(20);
    expect(bowman.health).toBe(85); // 100 - 20 * (1 - 25 / 100)

    bowman.health = 100;
    bowman.damage(133.33);
    expect(bowman.health).toBeCloseTo(0); // 100 - 133.33 * (1 - 25 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    bowman.damage(1000)
    expect(bowman.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    bowman.health = 0;
    expect(() => bowman.damage(20)).toThrow('Не бей мертвого!');
});
