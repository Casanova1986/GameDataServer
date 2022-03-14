"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroEnchanceConfig = exports.HeroEnchanceSchema = void 0;
const mongoose = require("mongoose");
;
exports.HeroEnchanceSchema = new mongoose.Schema({
    tier: { type: String, require: true },
    star: { type: Number, require: true },
    atk: { type: Number, require: true },
    atkSpeed: { type: Number, require: true },
    critChance: { type: Number, require: true },
    critDamage: { type: Number, require: true },
    Hp: { type: Number, require: true },
    armor: { type: Number, require: true },
    magicRes: { type: Number, require: true },
});
exports.heroEnchanceConfig = mongoose.model('hero_enchance_config', exports.HeroEnchanceSchema);
