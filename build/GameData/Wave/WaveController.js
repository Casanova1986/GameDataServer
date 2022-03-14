"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveController = void 0;
const DataWave_1 = require("./DataWave");
class WaveController {
    async getDataWave(stage, callback) {
        console.log(`stage ID ${stage}`);
        let dataConfig = await DataWave_1.DataWave.findOne({ idStage: stage });
        if (!dataConfig) {
            DataWave_1.DataWave.create({
                idStage: 0,
                data: []
            });
            console.log("Data null  ---");
            return callback("Data not found", null);
        }
        else {
            callback('', dataConfig);
        }
    }
    async addWave(waveData, callback) {
        DataWave_1.DataWave.findOne({ idStage: waveData.idStage }).then(async (data) => {
            if (data) {
                callback('', 'Wave ID is exist!');
            }
            else {
                let wave = new DataWave_1.DataWave({
                    idStage: waveData.idStage,
                    data: waveData.data,
                });
                await wave.save();
                callback('', 'Add Wave Succeeded');
            }
        });
    }
}
exports.WaveController = WaveController;
