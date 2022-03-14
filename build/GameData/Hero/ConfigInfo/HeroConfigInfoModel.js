"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataHeroConfig = exports.DataHeroConfigSchema = void 0;
const mongoose = require("mongoose");
;
exports.DataHeroConfigSchema = new mongoose.Schema({
    idHero: { type: Number, default: 0 },
    physicDamageMin: { type: Number, default: 20 },
    physicDamageMax: { type: Number, default: 20 },
    magicDamageMin: { type: Number, default: 20 },
    magicDamageMax: { type: Number, default: 20 },
    pureDamageMin: { type: Number, default: 20 },
    pureDamageMax: { type: Number, default: 20 },
    atkSpeedMin: { type: Number, default: 20 },
    atkSpeedMax: { type: Number, default: 20 },
    atkRangeMin: { type: Number, default: 20 },
    atkRangeMax: { type: Number, default: 20 },
    critChanceMin: { type: Number, default: 20 },
    critChanceMax: { type: Number, default: 20 },
    critDamageMin: { type: Number, default: 20 },
    critDamageMax: { type: Number, default: 20 },
    hpMin: { type: Number, default: 20 },
    hpMax: { type: Number, default: 20 },
    armorMin: { type: Number, default: 20 },
    armorMax: { type: Number, default: 20 },
    magicResMin: { type: Number, default: 20 },
    magicResMax: { type: Number, default: 20 },
    lifeSteal: { type: Number, default: 20 },
});
exports.DataHeroConfig = mongoose.model('data_hero_config', exports.DataHeroConfigSchema);
