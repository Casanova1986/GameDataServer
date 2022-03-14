import mongoose = require('mongoose');


export interface IInfoCastle{
    armor: number;
    magicResistance: number;
    HP: number;
}

export interface ICastle{
    cost: number;
    level: number;
    name: string;
    avatar: string;
    maxLevel: number;
    tier: string;
    infoCastle: IInfoCastle;
}

export interface ICastleDocument extends ICastle, mongoose.Document{};

export const infoCastleSchema = new mongoose.Schema<IInfoCastle>({
    armor: {type: Number, default: 0},
    magicResistance: {type: Number, default: 0},
    HP: {type: Number, default: 0},
})

export const CastleSchema = new mongoose.Schema({
    cost: {type: Number, default: 0},
    level: {type: Number, default: 0},
    name: {type: String, default: "woody castle"},
    avatar: {type: String, default: "1"},
    maxLevel: {type: Number, default: 100},
    tier: {type: String, default: "Common"},
    infoCastle: {
        type: Object,
        of: infoCastleSchema
    }
});


export const CastleModel = mongoose.model<ICastleDocument>('Castle',CastleSchema);