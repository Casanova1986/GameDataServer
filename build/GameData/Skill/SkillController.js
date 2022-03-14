"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const SkillModel_1 = require("./SkillModel");
const SkillInfoModel_1 = require("./SkillInfo/SkillInfoModel");
const HeroModel_1 = require("../Hero/HeroModel");
class SkillController {
    //skill general data (damage, type .. etc)
    async createNewSkill(skillData, callback) {
        let skillData_check = await SkillModel_1.skillModel.findOne({ skillName: skillData.skillName });
        if (skillData_check) {
            if (!skillData.skillId && !skillData_check.skillId) {
                skillData.skillId = SkillModel_1.skillOfType.hero;
            }
            await SkillModel_1.skillModel.updateOne({ skillName: skillData.skillName }, { $set: skillData })
                .then(rs => {
                callback('', 'Update success');
            })
                .catch(err => {
                callback(err, '');
            });
        }
        else {
            await SkillModel_1.skillModel.create(skillData)
                .then(rs => {
                callback('', 'Create success');
            })
                .catch(err => {
                callback(err, '');
            });
        }
    }
    async getSkillByName(skillName, callback) {
        SkillModel_1.skillModel.findOne({ skillName: skillName })
            .then(rs => callback('', rs))
            .catch(err => callback(err, ''));
    }
    async deleteSkillByName(skillName, callback) {
        SkillModel_1.skillModel.deleteOne({ skillName: skillName })
            .then(rs => callback('', 'delete success'))
            .catch(err => callback(err, ''));
    }
    async getSkillsByTypeId(skillTypeId, callback) {
        SkillModel_1.skillModel.find({ skillId: skillTypeId })
            .then(async (rs) => {
            let skillsName = new Array();
            if (rs) {
                rs.forEach(element => {
                    skillsName.push(element.skillName);
                });
            }
            callback('', skillsName);
        })
            .catch(err => callback(err, ''));
    }
    async createDefaultDataForSkill(callback) {
        let errors = new Array();
        let update_success = 0;
        let create_success = 0;
        for (let i = 0; i < SkillModel_1.skillsData.length; i++) {
            await this.createNewSkill(SkillModel_1.skillsData[i], (err, rs) => {
                if (err)
                    errors.push(err);
                else {
                    if (rs == "Update success") {
                        update_success += 1;
                    }
                    else {
                        create_success += 1;
                    }
                }
            });
        }
        callback('', `total: ${SkillModel_1.skillsData.length}  ----- update success: ${update_success} ----- create success: ${create_success}  --- faild: ${errors.length}`);
    }
    // skill info (name, avatar, description...etc)
    async createNewSkillInfo(skillData, callback) {
        console.log(`create new skill`);
        if (!skillData || !skillData.skillName) {
            return callback('skillData error!', '');
        }
        let oldSkillInfo = await SkillInfoModel_1.skillInfoModel.findOne({ skillName: skillData.skillName });
        if (!oldSkillInfo) {
            await SkillInfoModel_1.skillInfoModel.create(skillData)
                .then(rs => { if (rs)
                callback('', 'success!'); })
                .catch(err => { if (err)
                callback('error!', ''); });
            return;
        }
        await SkillInfoModel_1.skillInfoModel.updateOne({ skillName: skillData.skillName }, { $set: skillData });
        let heroes = await HeroModel_1.heroInfo.find({ idHero: skillData.idHero });
        for (let i = 0; i < heroes.length; i++) {
            let foundSkill = false;
            for (let j = 0; j < heroes[i].skills.length; j++) {
                if (heroes[i].skills[j].skillName && heroes[i].skills[j].skillName == skillData.skillName) {
                    heroes[i].skills[j] = skillData;
                    foundSkill = true;
                }
            }
            if (foundSkill) {
                await HeroModel_1.heroInfo.updateOne({ _id: heroes[i]._id }, { $set: heroes[i] });
            }
        }
        callback('', 'update skill success!');
    }
    async deleteSkillInfoByName(skillName, callback) {
        if (!skillName) {
            return callback('skill name invalid!', '');
        }
        SkillInfoModel_1.skillInfoModel.deleteOne({ skillName: skillName })
            .then(rs => callback('', 'delete success'))
            .catch(er => callback('delete fail!', ''));
    }
}
exports.SkillController = SkillController;
