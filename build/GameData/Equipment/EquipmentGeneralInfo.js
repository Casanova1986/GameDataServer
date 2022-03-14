"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentGeneralInfo = exports.GeneralEquipmentInfoDataSchema = void 0;
const mongoose = require("mongoose");
exports.GeneralEquipmentInfoDataSchema = new mongoose.Schema({
    idEquipment: { type: Number, default: 0 },
    name: { type: String, default: "Training Sword" },
    description: { type: String, default: "Training Sword description" },
    type: { type: String, default: "Weapon" },
    tier: { type: String, default: "Common" },
    image: { type: String, default: "Weapon" },
    fuseRate: { type: Number, default: 100 },
    numSubStatsMin: { type: Number, default: 0 },
    numSubStatsMax: { type: Number, default: 0 },
});
exports.EquipmentGeneralInfo = mongoose.model('equipment_general_info', exports.GeneralEquipmentInfoDataSchema);
