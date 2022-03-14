"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillInfoDataModel = exports.SkillInfoSchema = void 0;
const mongoose = require("mongoose");
exports.SkillInfoSchema = new mongoose.Schema({
    idHero: { type: Number, default: 0 },
    name: { type: String, default: "Laser Beam" },
    skillName: { type: String, default: "OrderofLightAdrius_Skill0" },
    skillType: { type: String, default: "Active" },
    avatar: { type: String, default: "adrius_skill_1" },
    description: { type: String, default: "Unleash a powerful laser beam. Inflicts magical damage on enemies by <color=green>125%</color> Atk every 0.25 second. Duration: <color=green>4</color> second. <color=red>Cooldown: 28 seconds.</color>" },
});
exports.skillInfoDataModel = mongoose.model('SkillData', exports.SkillInfoSchema);
