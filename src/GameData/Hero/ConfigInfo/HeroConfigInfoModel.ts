import mongoose = require('mongoose');

export interface IDataHeroConfig{
    idHero: number,
    physicDamageMin: number,
    physicDamageMax: number,
    magicDamageMin: number,
    magicDamageMax: number,
    pureDamageMin: number,
    pureDamageMax: number,
    atkSpeedMin: number,
    atkSpeedMax: number,
    atkRangeMin: number,
    atkRangeMax: number,
    critChanceMin: number,
    critChanceMax: number,
    critDamageMin: number,
    critDamageMax: number,
    hpMin: number,
    hpMax: number,
    armorMin: number,
    armorMax: number,
    magicResMin: number,
    magicResMax: number,
    lifeSteal: number,
}

export interface IDataHeroConfigDocument extends IDataHeroConfig, mongoose.Document{};

export const DataHeroConfigSchema = new mongoose.Schema({
    idHero: {type: Number, default: 0},
    physicDamageMin: {type: Number, default: 20},
    physicDamageMax: {type: Number, default: 20},
    magicDamageMin: {type: Number, default: 20},
    magicDamageMax: {type: Number, default: 20},
    pureDamageMin: {type: Number, default: 20},
    pureDamageMax: {type: Number, default: 20},
    atkSpeedMin: {type: Number, default: 20},
    atkSpeedMax: {type: Number, default: 20},
    atkRangeMin: {type: Number, default: 20},
    atkRangeMax: {type: Number, default: 20},
    critChanceMin: {type: Number, default: 20},
    critChanceMax: {type: Number, default: 20},
    critDamageMin: {type: Number, default: 20},
    critDamageMax: {type: Number, default: 20},
    hpMin: {type: Number, default: 20},
    hpMax: {type: Number, default: 20},
    armorMin: {type: Number, default: 20},
    armorMax: {type: Number, default: 20},
    magicResMin: {type: Number, default: 20},
    magicResMax: {type: Number, default: 20},
    lifeSteal: {type: Number, default: 20},
});

export const DataHeroConfig = mongoose.model<IDataHeroConfigDocument>('data_hero_config', DataHeroConfigSchema);
