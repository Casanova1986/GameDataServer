"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataEquipmentConfig = exports.DataEquipmentConfigSchema = void 0;
const mongoose = require("mongoose");
;
exports.DataEquipmentConfigSchema = new mongoose.Schema({
    idEquiptment: Number,
    stats: {
        type: Array,
        of: new mongoose.Schema({
            type: { type: String, default: "Atk" },
            valueMin: { type: Number, default: 0 },
            valueMax: { type: Number, default: 0 }
        })
    }
});
exports.DataEquipmentConfig = mongoose.model('DataEquipmentConfig', exports.DataEquipmentConfigSchema);
