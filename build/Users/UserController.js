"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessUser = exports.UserController = void 0;
const UserModel_1 = require("./Models/UserModel");
const EquipmentModel_1 = require("../GameData/Equipment/EquipmentModel");
const UserInventory_1 = require("./Models/UserInventory");
const UserInventory_2 = require("./Models/UserInventory");
const HeroModel_1 = require("../GameData/Hero/HeroModel");
const UserMessage_1 = require("./UserMessage");
const EquiqmentConfig_1 = require("../GameData/Equipment/EquiqmentConfig");
const generateRandomHero_1 = require("../Utils/generateRandomHero");
const GetGameData_1 = require("../GameData/GetGameData");
const RewardModels_1 = require("../GameData/Reward/RewardModels");
const HeroController_1 = require("../GameData/Hero/HeroController");
const EquipmentController_1 = require("../GameData/Equipment/EquipmentController");
const CastleController_1 = require("../GameData/Castle/CastleController");
const RedisUltils_1 = require("../Utils/RedisUltils");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
var heroController = new HeroController_1.HeroController();
var equipmentController = new EquipmentController_1.EquipmentController();
var castleController = new CastleController_1.CastleController();
class UserController {
    // When user sign up allocation one hero and equip common
    // equip, hero is not active for maket
    // create new user normal
    async registerUser(userName, passWord, callback) {
        let user = await UserModel_1.UserModel.find({ userName: userName });
        if (user.length) {
            callback('', 'User exist!');
        }
        else {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(passWord, salt);
            // random walletID to 15 character
            let walletID = await crypto.randomBytes(15).toString('hex');
            let userId;
            await UserModel_1.UserModel.create({
                userName: userName,
                passWord: hashedPassword,
                walletID: walletID,
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    callback('', 'Create User Faild');
                }
                else {
                    // this.createDefaultHeroes(res._id, walletID);
                    // this.createDefaultItems(res._id, walletID);
                    // this.createDefaultCastle(res._id, walletID);
                    callback('', 'Create User Succeeded!');
                }
            });
        }
    }
    async createDefaultHeroes(userID, walletID) {
        if (userID === null || userID === undefined) {
            await UserModel_1.UserModel.findOne({ walletID: walletID })
                .then(rs => {
                if (rs)
                    userID = rs._id;
            })
                .catch(err => console.log(err));
        }
        let heroData;
        await heroController.randomHero(1, async (err, rs) => {
            if (err) {
                console.log(`create Arius fail!`);
            }
            else {
                heroData = rs;
                await UserInventory_2.UserInventoryModel.create({
                    userId: userID,
                    walletID: walletID,
                    itemId: heroData._id,
                    itemType: 0,
                    isInMarket: false,
                    isValid: true
                }).then(rs => {
                })
                    .catch(err => {
                    heroController.deleteHero(heroData._id.toString(), (err, rs) => { });
                    console.log(`create inventory for Arius fail! ${err}`);
                });
            }
        });
        await heroController.randomHero(2, async (err, rs) => {
            if (err) {
                console.log(`create Evelyn fail!`);
            }
            else {
                heroData = rs;
                await UserInventory_2.UserInventoryModel.create({
                    userId: userID,
                    walletID: walletID,
                    itemId: heroData._id,
                    itemType: 0,
                    isInMarket: false,
                    isValid: true
                }).then(rs => {
                })
                    .catch(err => {
                    heroController.deleteHero(heroData._id.toString(), (err, rs) => { });
                    console.log(`create inventory for Evelyn fail! ${err}`);
                });
            }
        });
    }
    async createDefaultItems(userID, walletID) {
        if (userID === null || userID === undefined) {
            await UserModel_1.UserModel.findOne({ walletID: walletID })
                .then(rs => {
                if (rs)
                    userID = rs._id;
            })
                .catch(err => console.log(err));
        }
        let itemData;
        await equipmentController.ramdomEquiptment(100100, "Common", async (err, rs) => {
            if (err) {
                console.log(`create Item fail!`);
            }
            else {
                itemData = rs;
                await UserInventory_2.UserInventoryModel.create({
                    userId: userID,
                    walletID: walletID,
                    itemId: itemData._id,
                    itemType: 2,
                    isInMarket: false,
                    isValid: true
                }).then(rs => {
                })
                    .catch(err => {
                    equipmentController.deleteEquipment(itemData._id.toString(), (err, rs) => { });
                    console.log(`create inventory for Arius fail! ${err}`);
                });
            }
        });
        await equipmentController.ramdomEquiptment(100200, "Common", async (err, rs) => {
            if (err) {
                console.log(`create Item fail!`);
            }
            else {
                itemData = rs;
                await UserInventory_2.UserInventoryModel.create({
                    userId: userID,
                    walletID: walletID,
                    itemId: itemData._id,
                    itemType: 2,
                    isInMarket: false,
                    isValid: true
                }).then(rs => {
                })
                    .catch(err => {
                    equipmentController.deleteEquipment(itemData._id.toString(), (err, rs) => { });
                    console.log(`create inventory for Arius fail! ${err}`);
                });
            }
        });
    }
    async createDefaultCastle(userID, walletID) {
        if (userID === null || userID === undefined) {
            await UserModel_1.UserModel.findOne({ walletID: walletID })
                .then(rs => {
                if (rs)
                    userID = rs._id;
            })
                .catch(err => console.log(err));
        }
        await castleController.randomCastle(async (err, rs) => {
            if (err) {
                console.log(err);
            }
            else {
                await UserInventory_2.UserInventoryModel.create({
                    userId: userID,
                    walletID: walletID,
                    itemId: rs._id,
                    itemType: 6,
                    isInMarket: false,
                    isValid: true
                }).then(rs => {
                })
                    .catch(err => {
                    console.log(`create inventory for castle fail! ${err}`);
                });
            }
        });
    }
    async loginUser(userName, passWord, callback) {
        let user = UserModel_1.UserModel.findOne({ userName: userName });
        let validatePassWord;
        user.exec(async (err, data) => {
            if (err)
                console.log(err);
            else {
                if (!data) {
                    callback('', 'Wrong username or password');
                }
                else {
                    let userData = JSON.parse(JSON.stringify(data));
                    let passBcrypt = userData.passWord;
                    validatePassWord = bcrypt.compareSync(passWord, passBcrypt);
                    if (!validatePassWord) {
                        callback('', 'Wrong username or password');
                    }
                    else {
                        let isOnline = await RedisUltils_1.redisUtil.CheckCurrentDeviceOnline(userData._id, userName, 'deviceID');
                        //user đã online ở thiết bị khác rồi
                        if (isOnline) {
                            callback('', 'Duplicate login');
                        }
                        else {
                            //cache user lại để sau này lấy data xử lý cho nhanh
                            //userInfo.User = data;
                        }
                        UserInventory_2.UserInventoryModel.find({ userId: userData._id }, async (err, userInventory) => {
                            if (err)
                                callback('', 'Data User err');
                            else {
                                let inventory = new Map();
                                let heroCount = 0;
                                let castleCount = 0;
                                let itemCount = 0;
                                // await userInventory.forEach((value, key) => {
                                //   if (value.itemType == ItemType.Hero) {
                                //     heroCount++;
                                //   }
                                //   if (value.itemType == ItemType.Castle) {
                                //     castleCount++;
                                //   }
                                //   if (value.itemType == ItemType.Equip) {
                                //     itemCount++;
                                //   }
                                // });
                                // if (heroCount == 0) {
                                //   await this.createDefaultHeroes(null, userData.walletID);
                                // }
                                // if (itemCount == 0) {
                                //   await this.createDefaultItems(null, userData.walletID);
                                // }
                                // if (castleCount == 0) {
                                //   await this.createDefaultCastle(null, userData.walletID);
                                // }
                                callback('', {
                                    id: userData._id,
                                    name: userData.userName,
                                    avatar: userData.avatar,
                                    walletID: userData.walletID,
                                    RDG: userData.RDG,
                                    RDR: userData.RDR,
                                    inventory: inventory,
                                    energy: userData.energy,
                                    maxEnergy: userData.maxEnergy,
                                    currentStage: userData.currentStage
                                });
                            }
                        });
                    }
                }
            }
        });
    }
    // openChest return Equipment random ( funtion is random type common)
    async openChest(msg, callback) {
        EquipmentModel_1.EquipmentModel.find({ equipmentRarity: msg.chest })
            .then(async (data) => {
            if (data) {
                if ((msg.typeChest = 'Common')) {
                    let randomEquip = Math.round(Math.random() * (data.length - 1));
                    let randomEquipNumSub = EquiqmentConfig_1.Equip_TierList.Common.subStatMin +
                        Math.round(Math.random() * (EquiqmentConfig_1.Equip_TierList.Common.subStatMax - EquiqmentConfig_1.Equip_TierList.Common.subStatMin));
                    let subArray = new Array();
                    while (randomEquipNumSub > 0) {
                        let randomEquipSub = Math.round(Math.random() * (EquiqmentConfig_1.subStatConfig.Common.length - 1));
                        if (subArray.indexOf(randomEquipSub) === -1) {
                            randomEquipNumSub--;
                            subArray.push(randomEquipSub);
                        }
                    }
                    subArray.sort((a, b) => {
                        return a - b;
                    });
                    let equipResult = data[randomEquip];
                    //subArray.forEach((e) => equipResult.subStats.push(subStatConfig.Common[e]));
                    let newItem = new UserInventory_2.UserInventoryModel({
                        walletID: msg.walletID,
                        userId: msg.userId,
                        itemId: Number(equipResult._id),
                        itemType: UserInventory_1.ItemType.Equip,
                        isValid: false,
                        MetaData: equipResult,
                    });
                    await newItem.save();
                    callback('', {
                        Status: 1,
                        Body: {
                            data: equipResult,
                        },
                    });
                }
            }
            else {
                callback('', {
                    Status: 0,
                    Body: {
                        err: {
                            code: UserMessage_1.UserErrMsg.USER_DATA_ERROR,
                            message: `Data server error, retry another `,
                        },
                    },
                });
            }
        })
            .catch((err) => callback('', {
            Status: 0,
            Body: {
                err: {
                    code: UserMessage_1.UserErrMsg.USER_PARAM_ERR,
                    message: `Param client err `,
                },
            },
        }));
    }
    async playCampaign(userId, stageId, callback) {
        UserModel_1.UserModel.findOne({ _id: userId }, { currentStage: 1, walletID: 1 }).then(async (data) => {
            if (data) {
                console.log(stageId);
                console.log(data.currentStage);
                // check stage user is played
                let randomBox = Math.random();
                let reward = GetGameData_1.campaignReward.get(stageId.toString());
                let results = { RDG: 0, RDR: 0, box: 0 };
                if (Number(stageId) === Number(data.currentStage + 1)) {
                    if (reward.RDGFirstPlay !== undefined) {
                        results.RDG = reward.RDGFirstPlay;
                    }
                    await UserModel_1.UserModel.updateOne({ _id: userId }, { $inc: { RDG: results.RDG, RDR: results.RDR, currentStage: 1 } });
                    if (randomBox <= reward.boxNormalFirstPlay) {
                        results.box = RewardModels_1.TypeBox.CommonBox;
                        await UserInventory_2.UserInventoryModel.create({
                            walletID: data.walletID,
                            userId: data._id,
                            isInMarket: false,
                            itemType: RewardModels_1.TypeBox.CommonBox,
                            // //////// must add tokenID here
                            // default is null
                            tokenID: 'must add token here',
                            // itemId of typebox same item type
                            itemId: RewardModels_1.TypeBox.CommonBox,
                        });
                    }
                    callback('', {
                        Status: 1,
                        Body: {
                            data: results,
                        },
                    });
                }
                else if (stageId <= data.currentStage) {
                    if (reward.boxNormalRelay !== undefined) {
                        results.RDG = reward.RDGRePlay;
                    }
                    await UserModel_1.UserModel.updateOne({ _id: userId }, { $inc: { RDG: results.RDG, RDR: results.RDR } });
                    if (randomBox <= reward.boxNormalRelay) {
                        results.box = RewardModels_1.TypeBox.CommonBox;
                        await UserInventory_2.UserInventoryModel.create({
                            walletID: data.walletID,
                            userId: data._id,
                            itemType: RewardModels_1.TypeBox.CommonBox,
                            // //////// must add tokenID here
                            // default is null
                            tokenID: 'must add token here',
                            // itemId of typebox same item type
                            itemId: RewardModels_1.TypeBox.CommonBox,
                        });
                    }
                    callback('', {
                        Status: 1,
                        Body: {
                            data: results,
                        },
                    });
                }
                else {
                    callback('', {
                        Status: 0,
                        Body: {
                            err: {
                                code: UserMessage_1.UserErrMsg.USER_NOT_ENOUGH,
                                message: `User can't play stage`,
                            },
                        },
                    });
                }
            }
            else {
                callback('', {
                    Status: 0,
                    Body: {
                        err: {
                            code: UserMessage_1.UserErrMsg.USER_PARAM_ERR,
                            message: `Param client err `,
                        },
                    },
                });
            }
        });
    }
    async randomEquipment(userId, callback) {
        EquipmentModel_1.EquipmentModel.find({ equipmentRarity: 'Common' }).then(async (data) => {
            if (data) {
                let randomEquip = Math.round(Math.random() * (data.length - 1));
                let randomEquipNumSub = EquiqmentConfig_1.Equip_TierList.Common.subStatMin +
                    Math.round(Math.random() * (EquiqmentConfig_1.Equip_TierList.Common.subStatMax - EquiqmentConfig_1.Equip_TierList.Common.subStatMin));
                let subArray = new Array();
                while (randomEquipNumSub > 0) {
                    let randomEquipSub = Math.round(Math.random() * (EquiqmentConfig_1.subStatConfig.Common.length - 1));
                    if (subArray.indexOf(randomEquipSub) === -1) {
                        randomEquipNumSub--;
                        subArray.push(randomEquipSub);
                    }
                }
                subArray.sort((a, b) => {
                    return a - b;
                });
                let equipResult = data[randomEquip];
                //subArray.forEach((e) => equipResult.subStats.push(subStatConfig.Common[e]));
                UserModel_1.UserModel.findOne({ userName: userId }).then((data) => {
                    if (data) {
                        let newItem = new UserInventory_2.UserInventoryModel({
                            walletID: data.walletID,
                            userId: userId,
                            itemId: Number(equipResult._id),
                            itemType: UserInventory_1.ItemType.Equip,
                            isValid: false,
                            MetaData: equipResult,
                        });
                        newItem.save();
                    }
                });
                // random one hero from all heroes
                //    let newItem = new UserInventoryModel();
                //  newItem.userId = userId;
                //    newItem.walletID = userInfo?.walletID;
            }
        });
    }
    // async validateCampaign(userId: string, matchData:Array<CampaignData>)
    // {    
    //   const cappingRate = 2.0;
    //   let validate = true;
    //   for(let i = 0; i <matchData.length; i ++ )
    //   {
    //     let heroData = heroDataHeroId.get(matchData[i].HeroId);
    //     let damePredic = heroData.damage;
    //     matchData[i].Equips.forEach(equip => {
    //       if(equip.damage != undefined )
    //         damePredic += equip.damage;
    //     });
    //     //kiểm tra dame hero client gửi lên > dame đầu vào
    //     if(damePredic * matchData[i].CountHit * cappingRate < matchData[i].TotalDame)
    //     {
    //       validate = false;
    //       break;
    //     }
    //   }
    //   return validate;
    // }
    geneRateHero(walletId, tokenId, callback) {
        let tier = (0, generateRandomHero_1.generateRandomHero)(walletId);
        this.randomHero(walletId, tokenId, tier, callback);
    }
    randomHero(walletId, tokenId, tier, callback) {
        HeroModel_1.heroInfo
            .find({
            tier: tier,
        })
            .then((data) => {
            console.log(data);
            let ranIndex = Math.floor(Math.random() * data.length);
            let newItem = new UserInventory_2.UserInventoryModel({
                // userId:userId,
                walletID: walletId,
                tokenID: tokenId,
                itemId: data[ranIndex].idHero,
                itemType: UserInventory_1.ItemType.Hero,
                isInMarket: false,
                MetaData: data[ranIndex],
                isValid: true,
            });
            newItem
                .save()
                .then((doc) => {
                callback('', {
                    data: data[ranIndex],
                });
            })
                .catch((ex) => {
                callback('', {
                    data: ex,
                });
            });
        });
    }
    async getUserModelByItem(_id, callback) {
        let userInventoryItem;
        await UserInventory_2.UserInventoryModel.findOne({ itemId: _id })
            .then(rs => userInventoryItem = rs)
            .catch(err => callback(err, 'find inventory item error!'));
        let userModel;
        await UserModel_1.UserModel.findOne({ _id: userInventoryItem.userId })
            .then(rs => userModel = rs)
            .catch(err => callback(err, 'find user  error!'));
        callback('', userModel);
    }
    async updateUser(userData, callback) {
        UserModel_1.UserModel.updateOne({ _id: userData._id }, { $set: userData }).
            then(rs => {
            console.log(rs);
            callback('', rs);
        })
            .catch(err => {
            console.log(err);
            callback(err, '');
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
class ProcessUser {
    processUserMessage(userData, msg, callback) {
        switch (msg.typeMsg) {
            case 'OPENCHEST':
                userController.openChest(msg, callback);
                break;
            case 'PASS_CAMPAIGN':
                userController.playCampaign(msg.userId, msg.stageId, callback);
                break;
            case 'USER_LOGIN':
                userController.loginUser(msg.userId, msg.stageId, callback);
                break;
        }
    }
}
exports.ProcessUser = ProcessUser;
