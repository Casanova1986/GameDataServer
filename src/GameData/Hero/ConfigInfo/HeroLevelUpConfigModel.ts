import mongoose = require('mongoose');

export interface IHeroLevelUpConfig{
    idHero: number,
    atk: number,
    atkSpeed: number,
    critChance: number,
    critDamage: number,
    Hp: number,
    armor: number,
    magicRes: number
}

export interface IHeroLevelUpConfigModel extends IHeroLevelUpConfig, mongoose.Document{};

export const HeroLevelUpSchema = new mongoose.Schema({
    idHero: {type: Number, require: true},
    atk: {type: Number, require: true},
    atkSpeed: {type: Number, require: true},
    critChance: {type: Number, require: true},
    critDamage: {type: Number, require: true},
    Hp: {type: Number, require: true},
    armor: {type: Number, require: true},
    magicRes: {type: Number, require: true},
});

export const heroLevelUpConfig = mongoose.model<IHeroLevelUpConfigModel>('hero_level_config', HeroLevelUpSchema);