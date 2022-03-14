"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModel = exports.EquipmentSchema = void 0;
const mongoose = require("mongoose");
exports.EquipmentSchema = new mongoose.Schema({
    tokenId: { type: String, default: '' },
    idEquipment: { type: Number, default: 0 },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    type: { type: String, default: '' },
    tier: { type: String, default: '' },
    level: { type: Number, default: 0 },
    levelMax: { type: Number, default: 20 },
    image: { type: String, default: '' },
    mainStats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            typeStats: { type: String, default: 'Atk' },
            valueStats: { type: Number, default: 0 },
            step: { type: Number, default: 0 },
        }),
    },
    subStats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            type: String,
            value: Number,
            tier: String,
        }),
    },
    originMainStats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            typeStats: { type: String, default: 'Atk' },
            valueStats: { type: Number, default: 0 },
            step: { type: Number, default: 0 },
        }),
    },
    originSubStats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            type: String,
            value: Number,
            tier: String,
        }),
    },
    fuseRate: { type: Number, default: 100 },
    numSubStatsMin: { type: Number, default: 0 },
    numSubStatsMax: { type: Number, default: 0 },
    costBaseLevelUpRDG: { type: Number, default: 100, },
    costLevelUpRDG: { type: Number, default: 100, },
    heroEquippedId: { type: mongoose.Types.ObjectId },
    timeCreated: { type: Date },
    isNFT: { type: Boolean, default: false }
});
exports.EquipmentModel = mongoose.model('Equipment', exports.EquipmentSchema);
