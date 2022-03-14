"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroInfo = exports.entitySchema = exports.fightSchema = exports.typeHero = exports.Tier = void 0;
const mongoose = require("mongoose");
const HeroConfig = require("./HeroConfig");
const Equipment = require("../Equipment/EquipmentModel");
const HeroGeneralInfoModel_1 = require("./HeroGeneralInfo/HeroGeneralInfoModel");
const SkillInfoModel_1 = require("../Skill/SkillInfo/SkillInfoModel");
exports.Tier = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary'];
exports.typeHero = ['Mage', 'Warrior', 'Support', 'Ranger', 'Defender'];
exports.fightSchema = new mongoose.Schema({
    attackSpeed: { type: Number, default: 40 },
    minAttackRange: { type: Number, default: 0 },
    maxAttackRange: { type: Number, default: 8 },
    damage: {
        type: Object,
        of: new mongoose.Schema({
            critRate: { type: Number, default: 0 },
            critDamage: { type: Number, default: 200 },
            physicDamage: { type: Number, default: 0 },
            magicDamage: { type: Number, default: 20 },
            pureDamage: { type: Number, default: 0 }
        })
    },
    typeBullet: { type: String, default: "BulletInfo" },
});
exports.entitySchema = new mongoose.Schema({
    armor: { type: Number, default: 5 },
    magicResistance: { type: Number, default: 15 },
    lifeSteal: { type: Number, default: 0 },
    HP: { type: Number, default: 100 },
    reflect: {
        type: Number,
        default: 0,
    },
    energy: {
        type: Number,
        default: 0,
    },
    maxEnergy: {
        type: Number,
        default: HeroConfig.Entity.MAXENERGY,
    },
    energyRegeneration: {
        type: Number,
        default: HeroConfig.Entity.ENERGYREGENERATION,
    },
});
const HeroSchema = new mongoose.Schema({
    idHero: Number,
    tokenID: String,
    equipments: {
        type: Array,
        of: Equipment.EquipmentSchema
    },
    skills: {
        type: Array,
        of: SkillInfoModel_1.SkillInfoSchema
    },
    generalHeroInfo: {
        type: Object,
        of: HeroGeneralInfoModel_1.GeneralHeroInfoDataSchema
    },
    fightInfo: {
        type: Object,
        of: exports.fightSchema
    },
    entityInfo: {
        type: Object,
        of: exports.entitySchema,
    },
    originFightInfo: {
        type: Object,
        of: exports.fightSchema
    },
    originEntityInfo: {
        type: Object,
        of: exports.entitySchema,
    },
    timeCreated: { type: Date, default: new Date() },
    isNFT: { type: Boolean, default: false }
});
HeroSchema.index({
    idHero: 1,
});
HeroSchema.index({
    tier: 'text',
});
exports.heroInfo = mongoose.model('Hero', HeroSchema);
