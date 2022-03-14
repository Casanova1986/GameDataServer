"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankModel = exports.RankSchema = exports.RankName = void 0;
const mongoose = require("mongoose");
var RankName;
(function (RankName) {
    RankName[RankName["BRONZE"] = 0] = "BRONZE";
    RankName[RankName["SILVER"] = 1] = "SILVER";
    RankName[RankName["GOLD"] = 2] = "GOLD";
    RankName[RankName["PLATINUM"] = 3] = "PLATINUM";
    RankName[RankName["DIAMOND"] = 4] = "DIAMOND";
    RankName[RankName["ELITE"] = 5] = "ELITE";
    RankName[RankName["MASTER"] = 6] = "MASTER";
    RankName[RankName["EMPEROR"] = 7] = "EMPEROR";
})(RankName = exports.RankName || (exports.RankName = {}));
;
exports.RankSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },
    score: { type: Number, default: 0 },
    wave: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    bestWave: { type: Number, default: 0 },
    collectable: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    team: { type: Array, of: Number, default: [] },
});
exports.RankModel = mongoose.model('rank_data', exports.RankSchema);
