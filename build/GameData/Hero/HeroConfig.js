"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroTier = exports.idHero = exports.Entity = void 0;
var Entity;
(function (Entity) {
    Entity[Entity["MAXENERGY"] = 150] = "MAXENERGY";
    Entity[Entity["ENERGYREGENERATION"] = 10] = "ENERGYREGENERATION";
    Entity[Entity["MAX_SLOT_EQUIPMENT"] = 6] = "MAX_SLOT_EQUIPMENT";
})(Entity = exports.Entity || (exports.Entity = {}));
exports.idHero = Math.floor(Math.random() * 23) + 1;
exports.heroTier = {
    Common: [1, 2, 3, 4, 5],
    Rare: [12, 22, 33, 42, 52],
    Epic: [13, 23, 34, 43, 53],
    Unique: [16, 15, 24, 25, 35, 36, 44, 45],
    Legendary: [14, 17, 26, 27, 38, 39, 46, 47,],
    Ultimate: [],
};
