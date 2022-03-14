"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataModel = void 0;
const mongoose = require("mongoose");
var userDataSchema = new mongoose.Schema({
    Private: {
        type: Array,
        of: Object,
        required: false,
    },
    Equipments: {
        type: Array,
        of: Object,
    },
    Achievement: {
        type: Array,
        of: Object,
        required: false,
    },
    Heroes: {
        type: Array,
        of: Object,
        required: false,
    },
    DailyQuest: {
        type: Array,
        of: Object,
        required: false,
    },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    UpdatedAt: {
        type: Date,
        default: Date.now,
    },
});
userDataSchema.index({ User: 1 }, { sparse: true, background: true });
exports.UserDataModel = mongoose.model('UserData', userDataSchema);
