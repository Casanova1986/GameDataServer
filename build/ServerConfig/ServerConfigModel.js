"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModel = exports.ConfigSchema = void 0;
const mongoose = require("mongoose");
;
exports.ConfigSchema = new mongoose.Schema({
    isMaintain: { type: Boolean, default: false },
    version: { type: String, default: "1.0.0" },
    passKey: { type: String }
});
exports.ConfigModel = mongoose.model('server_config', exports.ConfigSchema);
