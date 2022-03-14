"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSubStats = exports.EquipmentConfigSchema = void 0;
const mongoose = require("mongoose");
exports.EquipmentConfigSchema = new mongoose.Schema({
    tier: String,
    stats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            type: { type: String, default: 'Atk' },
            valueMin: { type: Number, default: 0 },
            valueMax: { type: Number, default: 0 },
        }),
    },
    costBaseLevelUpRDG: { type: Number, default: 0 },
    costTierUpRDG: { type: Number, default: 0 },
    costTierUpRDR: { type: Number, default: 0 },
});
exports.EquipmentSubStats = mongoose.model('equipment_sub_stats', exports.EquipmentConfigSchema);
