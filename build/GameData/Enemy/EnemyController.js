"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnemyController = void 0;
const DataEnemy_1 = require("./DataEnemy");
class EnemyController {
    async getDataEnemy(nameEnemy, callback) {
        let dataConfig = await DataEnemy_1.DataEnemy.findOne({ nameEnemy: nameEnemy });
        if (dataConfig) {
            callback('', dataConfig);
        }
    }
    async getAllEnemyName(callback) {
        let enemies = await DataEnemy_1.DataEnemy.find();
        let enemies_name = new Array();
        if (enemies) {
            enemies.forEach(element => {
                if (element)
                    enemies_name.push(element.nameEnemy);
            });
        }
        callback(``, enemies_name);
    }
}
exports.EnemyController = EnemyController;
