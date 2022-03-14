"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroLevelUpConfig = exports.HeroLevelUpSchema = void 0;
const mongoose = require("mongoose");
;
exports.HeroLevelUpSchema = new mongoose.Schema({
    idHero: { type: Number, require: true },
    atk: { type: Number, require: true },
    atkSpeed: { type: Number, require: true },
    critChance: { type: Number, require: true },
    critDamage: { type: Number, require: true },
    Hp: { type: Number, require: true },
    armor: { type: Number, require: true },
    magicRes: { type: Number, require: true },
});
exports.heroLevelUpConfig = mongoose.model('hero_level_config', exports.HeroLevelUpSchema);
