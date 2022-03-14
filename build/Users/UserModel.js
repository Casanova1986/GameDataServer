"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = void 0;
//import mongoose from '../mongoConnect';
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    avatar: { type: String, required: false },
    coint: { type: Number, require: true, default: 2000 },
    gem: { type: Number, require: true, default: 10 },
});
exports.userInfo = (0, mongoose_1.model)('User', schema);
