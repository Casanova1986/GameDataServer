"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumableController = void 0;
const Consumable = require("./ConsumableModel");
const GetGameData_1 = require("../GetGameData");
class ConsumableController {
    async createConsumable(dataConsum, callback) {
        if (GetGameData_1.consumableDataId.has(dataConsum.consumId.toString())) {
            callback('', 'Consumable ID is exist!');
        }
        else {
            let consumableData = new Consumable.consumableModel({
                consumId: dataConsum.consumId,
                itemName: dataConsum.itemName,
                image: dataConsum.image,
                description: dataConsum.description,
                rarity: dataConsum.rarity,
                amount: dataConsum.amount
            });
            await consumableData.save();
            await GetGameData_1.getGameData.loadGameData();
            callback('', 'Add New Consumable Successed!');
        }
    }
    async deleteConsumable(id, callback) {
        Consumable.consumableModel.deleteOne({ consumId: id })
            .then(async (data) => {
            if (data.deletedCount == 0) {
                callback('', 'Check parameter or id valid');
            }
            else {
                await GetGameData_1.getGameData.loadGameData();
                callback('', 'Delete Success!');
            }
        })
            .catch((err) => callback('', err));
    }
}
exports.ConsumableController = ConsumableController;
