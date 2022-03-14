"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
//import mongoose from '../mongoConnect';
const mongoose_1 = require("mongoose");
const UserConfig = require("./../UserConfig");
const schema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    avatar: { type: String, required: false, default: "adrius_the_sould_stealer_icon" },
    walletID: { type: String, default: '' },
    RDGLock: { type: Number, require: true, default: 0 },
    RDRLock: { type: Number, require: true, default: 0 },
    RDG: { type: Number, require: true, default: 0 },
    RDR: { type: Number, require: true, default: 0 },
    energy: { type: Number, require: true, default: UserConfig.Entity.MAXENERGY },
    maxEnergy: { type: Number, require: true, default: UserConfig.Entity.MAXENERGY },
    currentStage: { type: Number, default: 0 },
    currentMap: { type: Number, default: 0 },
    lastDayLogin: { type: Number, default: 0 },
    lastDeviceId: { type: String, default: '' },
    name: { type: String, default: '' },
    //avatarsOwned: { type: Array , of: Number },
    rank: { type: Number, default: 0 },
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
