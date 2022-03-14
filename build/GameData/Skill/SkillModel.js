"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillInfoModel = void 0;
const mongoose = require("mongoose");
const SkillSchema = new mongoose.Schema({
    skillName: String,
    data: {
        type: Array,
        of: new mongoose.Schema({
            conditions: {
                type: Array
            },
            skillCharInfo: { type: Object }
        })
    }
});
exports.skillInfoModel = mongoose.model('Skill', SkillSchema);
