"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralHeroInfoModel = exports.GeneralHeroInfoDataSchema = void 0;
const mongoose = require("mongoose");
exports.GeneralHeroInfoDataSchema = new mongoose.Schema({
    idHero: { type: Number, default: 0 },
    name: { type: String, default: "Aridus" },
    description: { type: String, default: "Aridus description" },
    className: { type: String, default: "Aridus classname" },
    type: { type: String, default: "Mage" },
    tier: { type: String, default: "Common" },
    avatar: { type: String, default: "Aridus" },
    level: { type: Number, default: 0 },
    star: { type: Number, default: 0 },
});
exports.GeneralHeroInfoModel = mongoose.model('GeneralHeroInfo', exports.GeneralHeroInfoDataSchema);
