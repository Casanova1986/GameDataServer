"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelDatalCastle = exports.ILevelCastleDataSchema = void 0;
const mongoose = require("mongoose");
exports.ILevelCastleDataSchema = new mongoose.Schema({
    level: { type: Number, default: 0 },
    HP: { type: Number, default: 0 },
    armor: { type: Number, default: 0 },
    magicRes: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    tier: { type: String, default: "Common" }
});
exports.levelDatalCastle = mongoose.model('castle_level_config', exports.ILevelCastleDataSchema);
