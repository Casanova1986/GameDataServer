"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignRewardModel = exports.TypeBox = exports.TypeCoin = void 0;
const mongoose = require("mongoose");
var TypeCoin;
(function (TypeCoin) {
    TypeCoin[TypeCoin["RDG"] = 1] = "RDG";
    TypeCoin[TypeCoin["RDR"] = 2] = "RDR";
})(TypeCoin = exports.TypeCoin || (exports.TypeCoin = {}));
var TypeBox;
(function (TypeBox) {
    TypeBox[TypeBox["CommonBox"] = 3] = "CommonBox";
    TypeBox[TypeBox["EpicBox"] = 4] = "EpicBox";
    TypeBox[TypeBox["LegendBox"] = 5] = "LegendBox";
})(TypeBox = exports.TypeBox || (exports.TypeBox = {}));
const CampaignRewardSchema = new mongoose.Schema({
    stageId: { type: Number, default: 0 },
    boxNormalFirstPlay: { type: Number, default: 0 },
    boxNormalRelay: { type: Number, default: 0 },
    RDGFirstPlay: { type: Number, default: 0 },
    RDGRePlay: { type: Number, default: 0 },
});
exports.CampaignRewardModel = mongoose.model('Reward', CampaignRewardSchema);
