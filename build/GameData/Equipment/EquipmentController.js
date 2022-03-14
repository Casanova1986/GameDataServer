"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentProcesor = exports.EquipmentController = void 0;
const Equipment = require("./EquipmentModel");
const EquipmentMainStats_1 = require("./EquipmentMainStats");
const EquipmentModel_1 = require("./EquipmentModel");
const EquipmentGeneralInfo_1 = require("./EquipmentGeneralInfo");
const EquipmentSubStats_1 = require("./EquipmentSubStats");
const UserInventory_1 = require("../../Users/Models/UserInventory");
const UserInventory_2 = require("../../Users/Models/UserInventory");
const UserController_1 = require("../../Users/UserController");
const HeroController_1 = require("../Hero/HeroController");
class EquipmentController {
    async ramdomEquiptment(idEquip, tier, callback) {
        let dataConfig;
        await EquipmentMainStats_1.EquipmentMainStats.findOne({ idEquipment: idEquip })
            .then(rs => {
            if (rs == null) {
                return callback("Data not found", null);
            }
            else {
                dataConfig = rs;
                console.log(dataConfig);
            }
        })
            .catch(err => {
        });
        let mainStatData = new Array();
        dataConfig.stats.forEach(e => {
            let data = {
                typeStats: e.type,
                valueStats: Math.floor(Math.random() * (e.valueMax - e.valueMin + 1)) + e.valueMin,
                step: e.step
            };
            mainStatData.push(data);
        });
        let generalData;
        await EquipmentGeneralInfo_1.EquipmentGeneralInfo.findOne({ idEquipment: idEquip })
            .then(rs => {
            generalData = rs;
        })
            .catch();
        let randomEquipNumSub = Math.round(Math.random() * (generalData.numSubStatsMax - generalData.numSubStatsMin)) + generalData.numSubStatsMin;
        let subArray = new Array();
        let subStatTier;
        await EquipmentSubStats_1.EquipmentSubStats.findOne({ tier: tier }).then(rs => {
            if (rs != null) {
                subStatTier = rs;
            }
        });
        while (randomEquipNumSub > 0) {
            let randomEquipSub = Math.round(Math.random() * (subStatTier.stats.length - 1));
            if (subArray.indexOf(randomEquipSub) === -1) {
                randomEquipNumSub--;
                let data = {
                    type: subStatTier.stats[randomEquipNumSub].type,
                    value: Math.floor(Math.random() * (subStatTier.stats[randomEquipNumSub].valueMax - subStatTier.stats[randomEquipNumSub].valueMin + 1)) + subStatTier.stats[randomEquipNumSub].valueMin,
                    tier: subStatTier.tier
                };
                subArray.push(data);
            }
        }
        let costBaseLevelUpRDG = subStatTier.costBaseLevelUpRDG;
        // subArray.sort((a, b) => {
        //   return a - b;
        // });
        await EquipmentModel_1.EquipmentModel.create({
            idEquipment: generalData.idEquipment,
            name: generalData.name,
            description: generalData.description,
            level: 0,
            itemName: generalData.itemName,
            type: generalData.type,
            tier: generalData.tier,
            fuseRate: generalData.fuseRate,
            numSubStatsMin: generalData.numSubStatsMin,
            numSubStatsMax: generalData.numSubStatsMax,
            mainStats: mainStatData,
            originMainStats: mainStatData,
            subStats: subArray,
            originSubStats: subArray,
            costBaseLevelUpRDG: costBaseLevelUpRDG,
            costLevelUpRDG: costBaseLevelUpRDG,
            image: generalData.image,
        }, (err, res) => {
            if (err) {
                console.log(err);
                callback('Create Equipment Faild', '');
            }
            else {
                res.heroEquippedId = res._id;
                this.updateEquipment(res, (err, rs) => { });
                callback('', res);
            }
        });
    }
    async levelUpEquipment(_id, callback) {
        let DataEquipment;
        await EquipmentModel_1.EquipmentModel.findOne({ _id: _id })
            .then(rs => {
            if (!rs)
                return callback(`castle data level id ${_id} empty`, null);
            DataEquipment = rs;
        })
            .catch(err => {
            return callback(`castle data level id ${_id} empty`, null);
        });
        let lvEquip = DataEquipment.level;
        if (lvEquip >= DataEquipment.levelMax) {
            return callback(`Equipment level maxed`, null);
        }
        const userController = new UserController_1.UserController();
        let userRDG, userRDR;
        let userData;
        await userController.getUserModelByItem(DataEquipment._id, (err, results) => {
            userRDG = results.RDG;
            userRDR = results.RDR;
            userData = results;
        });
        console.log(`${userRDG} ------- ${DataEquipment.costLevelUpRDG}`);
        if (userRDG < DataEquipment.costLevelUpRDG) {
            return callback('Not Enough RDG', null);
        }
        let isItemEquip = DataEquipment.heroEquippedId != undefined && DataEquipment._id === DataEquipment.heroEquippedId;
        if (isItemEquip)
            await new HeroController_1.HeroController().equipmnentForHero(DataEquipment.heroEquippedId, DataEquipment._id, false, (err, rs) => { });
        let curLevel = DataEquipment.level;
        curLevel++;
        let newMainStatData = new Array();
        DataEquipment.mainStats.forEach(e => {
            let data = {
                typeStats: e.type,
                valueStats: e.valueStats + e.step,
                step: e.step
            };
            newMainStatData.push(data);
        });
        let newCostFuseRDG = (curLevel + 1) * DataEquipment.costBaseLevelUpRDG;
        let newDataEquipment = {
            tokenId: DataEquipment.tokenId,
            level: curLevel,
            levelMax: DataEquipment.levelMax,
            costBaseLevelUpRDG: DataEquipment.costBaseLevelUpRDG,
            costLevelUpRDG: newCostFuseRDG,
            heroEquippedId: DataEquipment.heroEquippedId,
            mainStats: newMainStatData,
            subStats: DataEquipment.subStats,
            fuseRate: DataEquipment.fuseRate,
            numSubStatsMin: DataEquipment.numSubStatsMin,
            numSubStatsMax: DataEquipment.numSubStatsMax,
            idEquipment: DataEquipment.idEquipment,
            name: DataEquipment.name,
            description: DataEquipment.description,
            type: DataEquipment.type,
            tier: DataEquipment.tier,
            image: DataEquipment.image,
            originMainStats: DataEquipment.originMainStats,
            originSubStats: DataEquipment.originSubStats,
            isNFT: DataEquipment.isNFT
        };
        let key = Object.keys(newDataEquipment);
        for (let i = 0; i < key.length; i++) {
            if (newDataEquipment[`${key[i]}`] == undefined || i == 0) {
                delete newDataEquipment[`${key[i]}`];
            }
        }
        Equipment.EquipmentModel.updateOne({ _id: DataEquipment._id }, { $set: newDataEquipment })
            .then(async (results) => {
            if (results.modifiedCount == 0)
                callback('Data not found check parameter id', '');
            else {
                if (isItemEquip)
                    await new HeroController_1.HeroController().equipmnentForHero(DataEquipment.heroEquippedId, DataEquipment._id, true, (err, rs) => { });
                userData.RDG -= DataEquipment.costLevelUpRDG;
                userController.updateUser(userData, (err, rs) => { });
                callback('', newDataEquipment);
            }
        })
            .catch((err) => callback(err, ''));
    }
    async createEquipment(dataEquip, callback) {
        await Equipment.EquipmentModel.findOne({ itemId: dataEquip.id })
            .then(async (data) => {
            if (data) {
                callback('', 'Equipment ID is exist!');
            }
            else {
                let mainStat = new Array();
                dataEquip.mainStat.forEach((data) => {
                    mainStat.push(data);
                });
                let equipmentData = new Equipment.EquipmentModel({
                    itemId: dataEquip.id,
                    itemName: dataEquip.name,
                    image: dataEquip.image,
                    level: dataEquip.level,
                    mainStat: mainStat,
                    fuseRate: dataEquip.fuseRate,
                    numSubStatsMin: dataEquip.numSubStatsMin,
                    numSubStatsMax: dataEquip.numSubStatsMax,
                    description: dataEquip.description,
                    equipmentRarity: dataEquip.rarity,
                    equipmentType: dataEquip.type,
                    costEnhanceGold: dataEquip.costEnhanceGold,
                    costFuseGold: dataEquip.costFuseGold,
                    costFuseRuby: dataEquip.costFuseRuby,
                    heroEquippedId: dataEquip.heroEquippedId,
                    timeCreated: new Date(),
                });
                let result = await equipmentData.save();
                callback('', result);
            }
        })
            .catch((err) => callback('', err));
    }
    async updateEquipment(dataEquip, callback) {
        // doc thong tin can update
        let mainStat = new Array();
        dataEquip.mainStats.forEach((data) => {
            mainStat.push(data);
        });
        let subStat = new Array();
        if (dataEquip.subStats !== undefined) {
            subStat = dataEquip.subStats;
        }
        let equipmentData = {
            tokenId: dataEquip.tokenId,
            idEquipment: dataEquip.idEquipment,
            name: dataEquip.name,
            image: dataEquip.image,
            level: dataEquip.number,
            levelMax: dataEquip.levelMax,
            mainStats: mainStat,
            subStats: subStat,
            fuseRate: dataEquip.fuseRate,
            numSubStatsMin: dataEquip.numSubStatsMin,
            numSubStatsMax: dataEquip.numSubStatsMax,
            description: dataEquip.description,
            type: dataEquip.type,
            tier: dataEquip.tier,
            costBaseLevelUpRDG: dataEquip.costBaseLevelUpRDG,
            costLevelUpRDG: dataEquip.costLevelUpRDG,
            heroEquippedId: dataEquip.heroEquippedId,
            originMainStats: mainStat,
            originSubStats: subStat,
            isNFT: dataEquip.isNFT,
        };
        let key = Object.keys(equipmentData);
        for (let i = 0; i < key.length; i++) {
            if (equipmentData[`${key[i]}`] == undefined || i == 0) {
                delete equipmentData[`${key[i]}`];
            }
        }
        await Equipment.EquipmentModel.updateOne({ _id: dataEquip._id }, { $set: equipmentData })
            .then((results) => {
            if (results.modifiedCount == 0)
                callback('', 'Data not found check parameter id');
            else
                callback('', 'Update Success!');
        })
            .catch((err) => callback('', err));
    }
    async deleteEquipment(id, callback) {
        Equipment.EquipmentModel.deleteOne({ itemId: id })
            .then((results) => {
            if (results.deletedCount == 0) {
                callback('', 'Check parameter or id valid');
            }
            else
                callback('', 'Delete Success!');
        })
            .catch((err) => callback('', err));
    }
    async getEquipOwn(walletId, callback) {
        if (walletId === undefined) {
            callback('wallet ID invalid', '');
            return;
        }
        let inventoriesItem = new Array();
        await UserInventory_1.UserInventoryModel.find({ walletID: walletId, itemType: UserInventory_2.ItemType.Equip })
            .then(rs => {
            if (!rs || rs.length == 0) {
                console.log("inventori of wallet empty!");
                return;
            }
            inventoriesItem = rs;
        })
            .catch(err => {
            console.log("inventori of wallet empty!");
            return;
        });
        if (inventoriesItem.length == 0) {
            callback('', null);
            return;
        }
        let equipments = new Array();
        for (let i = 0; i < inventoriesItem.length; i++) {
            console.log(inventoriesItem[i].itemId);
            await EquipmentModel_1.EquipmentModel.findOne({ _id: inventoriesItem[i].itemId })
                .then(rs => {
                if (rs)
                    equipments.push(rs);
                else
                    console.log("equipment null!");
            })
                .catch(err => {
                console.log(err);
            });
        }
        console.log(equipments);
        callback('', equipments);
    }
}
exports.EquipmentController = EquipmentController;
let equipmentController = new EquipmentController();
class EquipmentProcesor {
    ProcessMessage(msg, callback) {
        switch (msg.cmd) {
            case 'EQUIPMENT_ENHANCE':
                equipmentController.levelUpEquipment(msg.id, callback);
                break;
        }
    }
}
exports.EquipmentProcesor = EquipmentProcesor;
