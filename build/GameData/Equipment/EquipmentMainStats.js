"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentMainStats = exports.DataEquipmentConfigSchema = void 0;
const mongoose = require("mongoose");
exports.DataEquipmentConfigSchema = new mongoose.Schema({
    idEquipment: Number,
    stats: {
        type: Array,
        of: new mongoose.Schema({
            _id: { type: mongoose.Types.ObjectId, require: false },
            type: { type: String, default: 'Atk' },
            valueMin: { type: Number, default: 0 },
            valueMax: { type: Number, default: 0 },
            step: { type: Number, default: 0 },
        }),
    },
});
exports.EquipmentMainStats = mongoose.model('equipment_main_stats', exports.DataEquipmentConfigSchema);
