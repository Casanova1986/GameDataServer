"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subStatConfig = exports.Equip_Price = exports.levelEquipment = exports.Equip_TierList = exports.equipmentTier = exports.fuseCost = exports.subStatType = exports.Equip_TypeEquipment = void 0;
exports.Equip_TypeEquipment = ['Weapon', 'Garment', 'Ring', 'Amulet', 'Helmet', 'Cape', 'Artifact'];
exports.subStatType = ['Atk', 'Atk Spd', 'Crit Chance', 'Crit Dmg', 'Armor', 'Magic Res', 'HP'];
exports.fuseCost = {
    Common: 100,
    Rare: 200,
    Epic: 400,
    Unique: 800,
    Legendary: 1600,
    Ultimate: 5000,
};
exports.equipmentTier = {
    Common: [0, 1, 2, 3, 4, 5],
    Rare: [12, 22, 33, 42, 52],
    Epic: [13, 23, 34, 43, 53],
    Unique: [16, 15, 24, 25, 35, 36, 44, 45],
    Legendary: [14, 17, 26, 27, 38, 39, 46, 47,],
    Ultimate: [],
};
exports.Equip_TierList = {
    Common: { subStatMin: 1, subStatMax: 2 },
    Rare: { subStatMin: 1, subStatMax: 2 },
    Epic: { subStatMin: 1, subStatMax: 3 },
    Unique: { subStatMin: 1, subStatMax: 3 },
    Legendary: { subStatMin: 2, subStatMax: 3 },
    Ultimate: { subStatMin: 2, subStatMax: 4 },
};
var levelEquipment;
(function (levelEquipment) {
    levelEquipment[levelEquipment["minLevel"] = 1] = "minLevel";
    levelEquipment[levelEquipment["maxLevel"] = 20] = "maxLevel";
})(levelEquipment = exports.levelEquipment || (exports.levelEquipment = {}));
exports.Equip_Price = [
    { type: 'Common', minCost: 100, stepCost: 100 },
    { type: 'Rare', minCost: 200, stepCost: 200 },
    { type: 'Epic', minCost: 400, stepCost: 400 },
    { type: 'Unique', minCost: 800, stepCost: 800 },
    { type: 'Legendary', minCost: 1600, stepCost: 1600 },
    { type: 'Legendary', minCost: 5000, stepCost: 5000 },
];
exports.subStatConfig = {
    Common: [
        { type: 'Atk', min: 1, max: 10 },
        { type: 'Atk Spd', min: 2, max: 5 },
        { type: 'Crit Chance', min: 0.01, max: 0.02 },
        { type: 'Crit Dmg', min: 0.04, max: 0.06 },
        { type: 'Armor', min: 6, max: 8 },
        { type: 'Magic Res', min: 6, max: 8 },
        { type: 'HP', min: 100, max: 200 },
    ],
    Rare: [
        { type: 'Atk', min: 31, max: 40 },
        { type: 'Atk Spd', min: 5, max: 10 },
        { type: 'Crit Chance', min: 0.03, max: 0.04 },
        { type: 'Crit Dmg', min: 0.1, max: 0.12 },
        { type: 'Armor', min: 12, max: 16 },
        { type: 'Magic Res', min: 12, max: 16 },
        { type: 'HP', min: 200, max: 400 },
    ],
    Epic: [
        { type: 'Atk', min: 61, max: 70 },
        { type: 'Atk Spd', min: 10, max: 15 },
        { type: 'Crit Chance', min: 0.05, max: 0.06 },
        { type: 'Crit Dmg', min: 0.16, max: 0.18 },
        { type: 'Armor', min: 18, max: 24 },
        { type: 'Magic Res', min: 18, max: 24 },
        { type: 'HP', min: 600, max: 900 },
    ],
    Unique: [
        { type: 'Atk', min: 91, max: 100 },
        { type: 'Atk Spd', min: 15, max: 20 },
        { type: 'Crit Chance', min: 0.07, max: 0.08 },
        { type: 'Crit Dmg', min: 0.22, max: 0.24 },
        { type: 'Armor', min: 24, max: 32 },
        { type: 'Magic Res', min: 24, max: 32 },
        { type: 'HP', min: 1000, max: 1400 },
    ],
    Legendary: [
        { type: 'Atk', min: 121, max: 130 },
        { type: 'Atk Spd', min: 20, max: 25 },
        { type: 'Crit Chance', min: 0.09, max: 0.1 },
        { type: 'Crit Dmg', min: 0.28, max: 0.3 },
        { type: 'Armor', min: 30, max: 40 },
        { type: 'Magic Res', min: 30, max: 40 },
        { type: 'HP', min: 1500, max: 2000 },
    ],
    Ultimate: [
        { type: 'Atk', min: 151, max: 160 },
        { type: 'Atk Spd', min: 25, max: 30 },
        { type: 'Crit Chance', min: 0.11, max: 0.12 },
        { type: 'Crit Dmg', min: 0.34, max: 0.36 },
        { type: 'Armor', min: 36, max: 48 },
        { type: 'Magic Res', min: 36, max: 48 },
        { type: 'HP', min: 2200, max: 3000 },
    ],
};
