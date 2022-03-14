import mongoose = require('mongoose');


export interface IConsumable{
    itemName: string,
    image: string,
    description: string,
    rarity: string
}

export interface IConsumableDocument extends IConsumable, Document{}


const consumableSchema = new mongoose.Schema<IConsumable>({
    itemName: {type: String, default: "itemName"},
    image: {type: String, default: "iamge"},
    description: {type: String, default: "description"},
    rarity: {type: String, default: "equipmentRarity"}
});

export const consumableModel = mongoose.model<IConsumableDocument>('Consumable',consumableSchema);