"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralEquipmentInfoModel = exports.GeneralEquipmentInfoDataSchema = void 0;
const mongoose = require("mongoose");
exports.GeneralEquipmentInfoDataSchema = new mongoose.Schema({
    idEquipment: { type: Number, default: 0 },
    name: { type: String, default: "Training Sword" },
    description: { type: String, default: "Training Sword description" },
    type: { type: String, default: "Weapon" },
    tier: { type: String, default: "Common" },
    image: { type: String, default: "Weapon" }
});
exports.GeneralEquipmentInfoModel = mongoose.model('GeneralEquipmentInfoModel', exports.GeneralEquipmentInfoDataSchema);
