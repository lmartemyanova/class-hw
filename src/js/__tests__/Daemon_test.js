import Daemon from '../Daemon'

let daemon;

beforeEach(() => {
    daemon = new Daemon('Anna', 'Daemon');
});

test('должен корректно создавать объект Daemon', () => {
    expect(daemon.name).toBe('Anna');
    expect(daemon.type).toBe('Daemon');
    expect(daemon.health).toBe(100);
    expect(daemon.level).toBe(1);
    expect(daemon.attack).toBe(10);
    expect(daemon.defence).toBe(40);
});

test('должен выбрасывать ошибку при слишком коротком имени', () => {
    expect(() => new Daemon('A', 'Daemon')).toThrow('Имя слишком короткое.');
});

test('должен выбрасывать ошибку при слишком длинном имени', () => {
    expect(() => new Daemon('AnnaAnnaAnnaAAAAA', 'Daemon')).toThrow('Имя слишком длинное.');
});

test('должен выбрасывать ошибку при недопустимом типе', () => {
    expect(() => new Daemon('Anna', 'Diamon')).toThrow('Недопустимый тип: Diamon. Допустимые типы: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
});

test('должен корректно обрабатывать метод levelUp', () => {
    daemon.levelUp();
    expect(daemon.level).toBe(2);
    expect(daemon.attack).toBe(12); // 10 * 1.2
    expect(daemon.defence).toBe(48); // 40 * 1.2
    expect(daemon.health).toBe(100);
});

test('должен выбрасывать ошибку при попытке levelUp мертвого персонажа', () => {
    daemon.health = 0;
    expect(() => daemon.levelUp()).toThrow('К сожалению, вы умерли.');
});

test('должен корректно обрабатывать метод damage при получении health >= 0', () => {
    daemon.damage(20);
    expect(daemon.health).toBe(88); // 100 - 20 * (1 - 40 / 100)

    daemon.health = 100;
    daemon.damage(166.66);
    expect(daemon.health).toBeCloseTo(0); // 100 - 166.66 * (1 - 40 / 100) // Не должно быть меньше 0
});

test('должен корректно обрабатывать метод damage при получении health <= 0 (health = 0)', () => {
    daemon.damage(1000)
    expect(daemon.health).toBe(0);
});

test('должен выбрасывать ошибку при попытке применить метод damage к персонажу с health < 0', () => {
    daemon.health = 0;
    expect(() => daemon.damage(20)).toThrow('Не бей мертвого!');
});
