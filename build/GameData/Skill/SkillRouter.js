"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetGameData_1 = require("../GetGameData");
var SkillRouter = (0, express_1.Router)();
exports.default = SkillRouter;
SkillRouter.get('/skillInfo/:skillName', (req, res) => {
    var skillName = req.params.skillName;
    if (skillName == null || skillName == undefined) {
        res.send('skillName invalid!');
        return;
    }
    console.log(GetGameData_1.skillData);
    if (GetGameData_1.skillData.has(skillName)) {
        res.send(GetGameData_1.skillData.get(skillName));
        return;
    }
    res.send(`skill info ${skillName} empty!`);
});
