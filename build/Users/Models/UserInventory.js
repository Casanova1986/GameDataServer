"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInventoryModel = exports.ItemType = void 0;
const mongoose = require("mongoose");
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Hero"] = 0] = "Hero";
    ItemType[ItemType["Frag"] = 1] = "Frag";
    ItemType[ItemType["Equip"] = 2] = "Equip";
    ItemType[ItemType["NormalBox"] = 3] = "NormalBox";
    ItemType[ItemType["HeroBox"] = 4] = "HeroBox";
    ItemType[ItemType["EquipBox"] = 5] = "EquipBox";
    ItemType[ItemType["Castle"] = 6] = "Castle";
    ItemType[ItemType["HeroFrag"] = 7] = "HeroFrag";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
const UserInventorySchema = new mongoose.Schema({
    walletID: { type: String, required: true },
    amount: { type: Number, default: 1 },
    price: { type: Number, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: Number, required: true },
    isInMarket: { type: Boolean },
    isValid: { type: Boolean, default: true },
    MetaData: { type: Object, required: false },
    CreatedAt: {
        type: Date,
        default: new Date(),
    },
    UpdatedAt: {
        type: Date,
        default: new Date(),
    },
});
UserInventorySchema.index({ userId: 1 }, { sparse: true, background: true });
exports.UserInventoryModel = mongoose.model('UserInventory', UserInventorySchema);
