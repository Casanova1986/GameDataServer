"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDataModel = exports.MapDataSchema = void 0;
const mongoose = require("mongoose");
;
exports.MapDataSchema = new mongoose.Schema({
    name: { type: String, default: "DVA_1" },
    avatar: { type: String, default: "DVA_1" },
    description: { type: String, default: "DVA_1" },
    number_stage: { type: Number, default: 0 }
});
exports.MapDataModel = mongoose.model('maps_data', exports.MapDataSchema);
