"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameData = exports.generalHeroData = exports.heroConfigData = exports.skillData = exports.consumableDataId = exports.campaignReward = void 0;
const EquipmentModel_1 = require("./Equipment/EquipmentModel");
const RewardModels_1 = require("./Reward/RewardModels");
const ConsumableModel_1 = require("./Consumable/ConsumableModel");
const SkillModel_1 = require("./Skill/SkillModel");
const HeroGeneralInfoModel_1 = require("./Hero/HeroGeneralInfo/HeroGeneralInfoModel");
const HeroConfigInfoModel_1 = require("./Hero/ConfigInfo/HeroConfigInfoModel");
const HeroConfig_1 = require("./Hero/HeroConfig");
const SkillInfoModel_1 = require("./Skill/SkillInfo/SkillInfoModel");
exports.campaignReward = new Map();
exports.consumableDataId = new Map();
exports.skillData = new Map();
exports.heroConfigData = new Map();
exports.generalHeroData = new Map();
class GetGameData {
    async loadGameData() {
        // reload if admin change game dat
        exports.consumableDataId = new Map();
        exports.heroConfigData = new Map();
        exports.generalHeroData = new Map();
        exports.skillData = new Map();
        SkillModel_1.skillInfoModel.find({})
            .then(async (data) => {
            if (data) {
                data.forEach((skill) => {
                    exports.skillData.set(skill.skillName, {
                        _id: skill._id,
                        skillName: skill.skillName,
                        data: skill.data
                    });
                });
            }
        })
            .catch();
        RewardModels_1.CampaignRewardModel.find({})
            .then(async (data) => {
            if (data) {
                data.forEach((eachReward) => {
                    exports.campaignReward.set(eachReward.stageId.toString(), {
                        boxNormalFirstPlay: eachReward.boxNormalFirstPlay,
                        boxNormalRelay: eachReward.boxNormalRelay,
                        RDGFirstPlay: eachReward.RDGFirstPlay,
                        RDGRePlay: eachReward.RDGRePlay,
                    });
                });
            }
        })
            .catch((err) => console.log(err));
        RewardModels_1.CampaignRewardModel.find({})
            .then(async (data) => {
            data.forEach((eachReward) => {
                if (data) {
                    exports.campaignReward.set(eachReward.stageId.toString(), {
                        boxNormalFirstPlay: eachReward.boxNormalFirstPlay,
                        boxNormalRelay: eachReward.boxNormalRelay,
                        RDGFirstPlay: eachReward.RDGFirstPlay,
                        RDGRePlay: eachReward.RDGRePlay,
                    });
                }
            });
        })
            .catch((err) => console.log(err));
        ConsumableModel_1.consumableModel
            .find({})
            .then(async (data) => {
            if (data) {
                data.forEach((consumItem) => {
                    exports.consumableDataId.set(consumItem._id.toString(), {
                        _id: consumItem._id,
                        itemName: consumItem.itemName,
                        image: consumItem.image,
                        description: consumItem.description,
                        rarity: consumItem.rarity
                    });
                });
            }
        })
            .catch((err) => console.log(err));
        await HeroConfigInfoModel_1.DataHeroConfig.find({})
            .then(async (data) => {
            data.forEach(dataHeroConfig => {
                let fightInfo = {
                    attackSpeed: Math.floor(Math.random() * dataHeroConfig.atkSpeedMax) + dataHeroConfig.atkSpeedMin,
                    minAttackRange: dataHeroConfig.atkRangeMin,
                    maxAttackRange: dataHeroConfig.atkRangeMin,
                    damage: {
                        critRate: Math.floor(Math.random() * (dataHeroConfig.critChanceMax - dataHeroConfig.critChanceMin)) + dataHeroConfig.critChanceMin,
                        critDamage: Math.floor(Math.random() * (dataHeroConfig.critDamageMax - dataHeroConfig.critDamageMin)) + dataHeroConfig.critDamageMin,
                        physicDamage: Math.floor(Math.random() * (dataHeroConfig.physicDamageMax - dataHeroConfig.physicDamageMin)) + dataHeroConfig.physicDamageMin,
                        magicDamage: Math.floor(Math.random() * (dataHeroConfig.magicDamageMax - dataHeroConfig.magicDamageMin)) + dataHeroConfig.magicDamageMin,
                        pureDamage: Math.floor(Math.random() * (dataHeroConfig.pureDamageMax - dataHeroConfig.pureDamageMin)) + dataHeroConfig.pureDamageMin,
                    }
                };
                let entityInfo = {
                    armor: Math.floor(Math.random() * (dataHeroConfig.armorMax - dataHeroConfig.armorMin)) + dataHeroConfig.armorMin,
                    magicResistance: Math.floor(Math.random() * (dataHeroConfig.magicResMax - dataHeroConfig.magicResMin)) + dataHeroConfig.magicResMin,
                    lifeSteal: dataHeroConfig.lifeSteal,
                    HP: Math.floor(Math.random() * (dataHeroConfig.hpMax - dataHeroConfig.hpMin)) + dataHeroConfig.hpMin,
                    maxEnergy: HeroConfig_1.Entity.MAXENERGY,
                    energyRegeneration: HeroConfig_1.Entity.ENERGYREGENERATION
                };
                exports.heroConfigData.set(dataHeroConfig.idHero, {
                    fightInfo: fightInfo,
                    entityInfo: entityInfo
                });
            });
        })
            .catch((err) => console.log(err));
        HeroGeneralInfoModel_1.GeneralHeroInfoModel.find({})
            .then(async (data) => {
            data.forEach(async (generalHeroInfo) => {
                let skills = new Array();
                await SkillInfoModel_1.skillInfoDataModel.find({ idHero: generalHeroInfo.idHero })
                    .then(rs => {
                    rs.forEach(e => {
                        skills.push(e);
                    });
                })
                    .catch(err => {
                    console.log('read skill data from db error');
                });
                let general = {
                    idHero: generalHeroInfo.idHero,
                    name: generalHeroInfo.name,
                    description: generalHeroInfo.description,
                    className: generalHeroInfo.className,
                    type: generalHeroInfo.type,
                    tier: generalHeroInfo.tier,
                    level: generalHeroInfo.level,
                    star: generalHeroInfo.star,
                    avatar: generalHeroInfo.avatar,
                };
                exports.generalHeroData.set(generalHeroInfo.idHero, {
                    idHero: generalHeroInfo.idHero,
                    generalHeroInfo: general,
                    fightInfo: exports.heroConfigData.get(generalHeroInfo.idHero).fightInfo,
                    entityInfo: exports.heroConfigData.get(generalHeroInfo.idHero).entityInfo,
                    originFightInfo: exports.heroConfigData.get(generalHeroInfo.idHero).fightInfo,
                    originEntityInfo: exports.heroConfigData.get(generalHeroInfo.idHero).entityInfo,
                    skills: skills,
                });
            });
        })
            .catch((err) => console.log(err));
    }
    async getNFT(tokenID, callback) {
        await EquipmentModel_1.EquipmentModel.find({ tokenId: tokenID })
            .then(rs => {
        })
            .catch(err => {
        });
    }
}
exports.getGameData = new GetGameData();
