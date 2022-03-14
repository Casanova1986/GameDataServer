"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastleProcess = exports.CastleController = exports.CastleDataLevel = void 0;
const UserInventory_1 = require("../../Users/Models/UserInventory");
const CastleModel_1 = require("./CastleModel");
const CastleLevelConfig_1 = require("./Config/CastleLevelConfig");
const UserInventory_2 = require("../../Users/Models/UserInventory");
exports.CastleDataLevel = new Map();
class CastleController {
    constructor() {
        this.loadData();
    }
    async loadData() {
        exports.CastleDataLevel = new Map();
        var CastleDataLevelCommon = new Map();
        var CastleDataLevelRare = new Map();
        var CastleDataLevelEpic = new Map();
        var CastleDataLevelUnique = new Map();
        var CastleDataLevelLegendary = new Map();
        await CastleLevelConfig_1.levelDatalCastle.find()
            .then(rs => {
            rs.forEach(elementLevel => {
                if (elementLevel.tier == "Common") {
                    CastleDataLevelCommon.set(elementLevel.level, {
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
                else if (elementLevel.tier == "Rare") {
                    CastleDataLevelRare.set(elementLevel.level, {
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
                else if (elementLevel.tier == "Epic") {
                    CastleDataLevelEpic.set(elementLevel.level, {
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
                else if (elementLevel.tier == "Unique") {
                    CastleDataLevelUnique.set(elementLevel.level, {
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
                else if (elementLevel.tier == "Legendary") {
                    CastleDataLevelLegendary.set(elementLevel.level, {
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
            });
            exports.CastleDataLevel.set('Common', CastleDataLevelCommon);
            exports.CastleDataLevel.set('Rare', CastleDataLevelRare);
            exports.CastleDataLevel.set('Epic', CastleDataLevelEpic);
            exports.CastleDataLevel.set('Unique', CastleDataLevelUnique);
            exports.CastleDataLevel.set('Legendary', CastleDataLevelLegendary);
            //console.log(CastleDataLevel);
        })
            .catch(err => {
            console.log(err);
        });
    }
    async castleUpDate(castleData, callback) {
        let InfoCastle = {
            armor: castleData.infoCastle.armor,
            magicResistance: castleData.infoCastle.magicResistance,
            HP: castleData.infoCastle.HP,
        };
        let castle = {
            cost: castleData.cost,
            level: castleData.level,
            name: castleData.name,
            avatar: castleData.avatar,
            maxLevel: castleData.maxLevel,
            tier: castleData.tier,
            infoCastle: InfoCastle,
        };
        CastleModel_1.CastleModel.updateOne({ _id: castleData._id }, { $set: castle })
            .then(rs => {
            callback('', castle);
        })
            .catch(err => {
            callback('update fail!', '');
        });
    }
    async getCastle(callback) {
        let castles = new Array();
        await CastleModel_1.CastleModel.find({})
            .then(rs => {
            castles = rs;
        })
            .catch(err => {
        });
        callback('', castles);
    }
    async getCastleOwner(walletId, callback) {
        if (walletId === undefined) {
            callback('wallet ID invalid', '');
            return;
        }
        let castles = new Array();
        let castlesData = new Array();
        let inventoriesItem = new Array();
        await UserInventory_1.UserInventoryModel.find({ walletID: walletId, itemType: UserInventory_2.ItemType.Castle })
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
        for (let i = 0; i < inventoriesItem.length; i++) {
            await CastleModel_1.CastleModel.findOne({ _id: inventoriesItem[i].itemId })
                .then(rs => {
                if (rs) {
                    let castle = rs;
                    castles.push(castle);
                    let castleUp = JSON.parse(JSON.stringify(castle));
                    if (!exports.CastleDataLevel.has(castle.tier)) {
                        console.log('tier empty');
                        return;
                    }
                    let Datalevel = exports.CastleDataLevel.get(castle.tier);
                    if (!Datalevel.has(castle.level + 1)) {
                        console.log('level empty');
                        return;
                    }
                    let DataLevelConfig = Datalevel.get(castle.level + 1);
                    let InfoCastle = {
                        armor: castleUp.infoCastle.armor + DataLevelConfig.armor,
                        magicResistance: castleUp.infoCastle.magicResistance + DataLevelConfig.magicRes,
                        HP: castleUp.infoCastle.HP + DataLevelConfig.HP,
                    };
                    castleUp.infoCastle = InfoCastle;
                    castleUp.cost = DataLevelConfig.cost;
                    castleUp.level++;
                    castlesData.push(castleUp);
                }
            })
                .catch(err => {
            });
        }
        callback('', [castles, castlesData]);
    }
    async levelUpCastle(_id, callback) {
        let DataCastle;
        await CastleModel_1.CastleModel.findOne({ _id: _id })
            .then(rs => {
            if (!rs)
                return callback(`castle data level id ${_id} empty`, null);
            DataCastle = rs;
        })
            .catch(err => {
            return callback(`castle data level id ${_id} empty`, null);
        });
        if (!exports.CastleDataLevel.has(DataCastle.tier)) {
            return callback(`castle data level tier ${DataCastle.tier} empty`, null);
        }
        let Datalevel = exports.CastleDataLevel.get(DataCastle.tier);
        if (!Datalevel.has(DataCastle.level + 1)) {
            return callback(`castle data level ${DataCastle.level + 1} empty`, null);
        }
        let DataLevelConfig = Datalevel.get(DataCastle.level + 1);
        let InfoCastle = {
            armor: DataCastle.infoCastle.armor + DataLevelConfig.armor,
            magicResistance: DataCastle.infoCastle.magicResistance + DataLevelConfig.magicRes,
            HP: DataCastle.infoCastle.HP + DataLevelConfig.HP,
        };
        DataCastle.infoCastle = InfoCastle;
        DataCastle.cost = DataLevelConfig.cost;
        DataCastle.level++;
        this.castleUpDate(DataCastle, (err, result) => {
            if (err) {
                callback('upadte db error', '');
            }
            else {
                let castleUp = JSON.parse(JSON.stringify(result));
                if (!exports.CastleDataLevel.has(castleUp.tier)) {
                    console.log('tier empty');
                    return;
                }
                let Datalevel = exports.CastleDataLevel.get(castleUp.tier);
                if (!Datalevel.has(castleUp.level + 1)) {
                    console.log('level empty');
                    return;
                }
                let DataLevelConfig = Datalevel.get(castleUp.level + 1);
                let InfoCastle = {
                    armor: castleUp.infoCastle.armor + DataLevelConfig.armor,
                    magicResistance: castleUp.infoCastle.magicResistance + DataLevelConfig.magicRes,
                    HP: castleUp.infoCastle.HP + DataLevelConfig.HP,
                };
                castleUp.infoCastle = InfoCastle;
                castleUp.cost = DataLevelConfig.cost;
                castleUp.level++;
                console.log("current level " + result.level + "==>" + castleUp.level);
                callback('', [result, castleUp]);
            }
        });
    }
    async randomCastle(callback) {
        if (!exports.CastleDataLevel.has("Common")) {
            return callback(`castle data level tier commom empty`, null);
        }
        let Datalevel = exports.CastleDataLevel.get("Common");
        if (!Datalevel.has(1)) {
            return callback(`castle data level Common empty`, null);
        }
        let DataLevelConfig = Datalevel.get(1);
        let InfoCastle = {
            armor: DataLevelConfig.armor,
            magicResistance: DataLevelConfig.magicRes,
            HP: DataLevelConfig.HP,
        };
        await CastleModel_1.CastleModel.create({
            infoCastle: InfoCastle,
            cost: DataLevelConfig.cost,
            level: 1,
        }, callback);
    }
}
exports.CastleController = CastleController;
let castleController = new CastleController();
class CastleProcess {
    ProcessMessage(msg, callback) {
        switch (msg.cmd) {
            case 'CASTLE_LEVELUP':
                castleController.levelUpCastle(msg._id, callback);
                break;
        }
    }
}
exports.CastleProcess = CastleProcess;
