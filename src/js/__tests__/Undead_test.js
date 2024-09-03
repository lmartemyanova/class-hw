import Undead from '../Undead'

let undead;

beforeEach(() => {
    undead = new Undead('Anna', 'Undead');
});

test('должен корректно создавать объект Undead', () => {
    expect(undead.name).toBe('Anna');
    expect(undead.type).toBe('Undead');
    expect(undead.health).toBe(100);
    expect(undead.level).toBe(1);
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Undead('A', 'Undead')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Undead('AnnaAnnaAnnaAAAAA', 'Undead')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Undead('Anna', 'Undied')).toThrow('Недопустимый тип: Undied. Допустимые типы: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    undead.levelUp();
    expect(undead.level).toBe(2);
    expect(undead.attack).toBe(30); // 25 * 1.2
    expect(undead.defence).toBe(30); // 25 * 1.2
    expect(undead.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    undead.health = 0;
    expect(() => undead.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    undead.damage(20);
    expect(undead.health).toBe(85); // 100 - 20 * (1 - 25 / 100)

    undead.health = 100;
    undead.damage(133.33);
    expect(undead.health).toBeCloseTo(0); // 100 - 133.33 * (1 - 25 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    undead.damage(1000)
    expect(undead.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    undead.health = 0;
    expect(() => undead.damage(20)).toThrow('Не бей мертвого!');
});
