"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumableModel = void 0;
const mongoose = require("mongoose");
const consumableSchema = new mongoose.Schema({
    itemName: { type: String, default: "itemName" },
    image: { type: String, default: "iamge" },
    description: { type: String, default: "description" },
    rarity: { type: String, default: "equipmentRarity" }
});
exports.consumableModel = mongoose.model('Consumable', consumableSchema);
