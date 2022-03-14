"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastleModel = exports.CastleSchema = exports.infoCastleSchema = void 0;
const mongoose = require("mongoose");
;
exports.infoCastleSchema = new mongoose.Schema({
    armor: { type: Number, default: 0 },
    magicResistance: { type: Number, default: 0 },
    HP: { type: Number, default: 0 },
});
exports.CastleSchema = new mongoose.Schema({
    cost: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    name: { type: String, default: "woody castle" },
    avatar: { type: String, default: "1" },
    maxLevel: { type: Number, default: 100 },
    tier: { type: String, default: "Common" },
    infoCastle: {
        type: Object,
        of: exports.infoCastleSchema
    }
});
exports.CastleModel = mongoose.model('Castle', exports.CastleSchema);
