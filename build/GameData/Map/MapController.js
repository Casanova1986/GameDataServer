"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapDataController = void 0;
const MapModel_1 = require("./MapModel");
class MapDataController {
    async getAllMapData(callback) {
        await MapModel_1.MapDataModel.find()
            .then(rs => {
            callback('', rs);
        })
            .catch(err => {
            callback(err, '');
        });
    }
    async getMapDataByID(_id, callback) {
        await MapModel_1.MapDataModel.findOne({ _id: _id })
            .then(rs => {
            if (rs)
                callback('', rs);
        })
            .catch(err => {
            callback(err, '');
        });
    }
}
exports.MapDataController = MapDataController;
