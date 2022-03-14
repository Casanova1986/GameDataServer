"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataEnemy = exports.EnemyConfigSchema = void 0;
const mongoose = require("mongoose");
exports.EnemyConfigSchema = new mongoose.Schema({
    nameEnemy: { String, default: "" },
    data: {
        type: Array, of: new mongoose.Schema({
            fightInfo: {
                attackSpeed: Number,
                minAttackRange: Number,
                maxAttackRange: Number,
                damage: {
                    critRate: { type: Number, default: 0 },
                    critDamage: { type: Number, default: 0 },
                    physicDamage: { type: Number, default: 0 },
                    magicDamage: { type: Number, default: 0 },
                    pureDamage: { type: Number, default: 0 }
                },
                typeBullet: { String, default: "" },
            },
            npcCharaterInfo: {
                targetRange: { type: Number, default: 0 },
                speed: { type: Number, default: 0 },
            },
            entityInfo: {
                armor: { type: Number, default: 0 },
                magicResistance: { type: Number, default: 0 },
                lifeSteal: { type: Number, default: 0 },
                HP: { type: Number, default: 0 },
            },
            skills: {
                type: Array, of: new mongoose.Schema({
                    skillName: { type: String, default: "" },
                    level: { type: Number, default: 0 },
                }),
            },
        }),
    },
});
exports.DataEnemy = mongoose.model('enemy_data', exports.EnemyConfigSchema);
