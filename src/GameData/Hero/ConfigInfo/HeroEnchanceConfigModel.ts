import mongoose = require('mongoose');

export interface IHeroEnchanceConfig{
    tier: string,
    star: number,
    atk: number,
    atkSpeed: number,
    critChance: number,
    critDamage: number,
    Hp: number,
    armor: number,
    magicRes: number
}

export interface IHeroEnchanceConfigModel extends IHeroEnchanceConfig, mongoose.Document{};

export const HeroEnchanceSchema = new mongoose.Schema({
    tier: {type: String, require: true},
    star: {type: Number, require: true},
    atk: {type: Number, require: true},
    atkSpeed: {type: Number, require: true},
    critChance: {type: Number, require: true},
    critDamage: {type: Number, require: true},
    Hp: {type: Number, require: true},
    armor: {type: Number, require: true},
    magicRes: {type: Number, require: true},
});

export const heroEnchanceConfig = mongoose.model<IHeroEnchanceConfigModel>('hero_enchance_config', HeroEnchanceSchema);