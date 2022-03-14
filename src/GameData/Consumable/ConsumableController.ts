import * as Consumable from './ConsumableModel';
import { consumableDataId, getGameData } from '../GetGameData';

export class ConsumableController{
    async createConsumable(dataConsum: any, callback: any){
        if(consumableDataId.has(dataConsum.consumId.toString())){
            callback('', 'Consumable ID is exist!');
        } else{
            let consumableData = new Consumable.consumableModel({
                consumId: dataConsum.consumId,
                itemName: dataConsum.itemName,
                image: dataConsum.image,
                description: dataConsum.description,
                rarity: dataConsum.rarity,
                amount: dataConsum.amount
            });

            await consumableData.save();
            await getGameData.loadGameData();
            callback('','Add New Consumable Successed!');
        }
    }

    async deleteConsumable(id, callback: any){
        Consumable.consumableModel.deleteOne({ consumId:id })
        .then(async(data)=>{
            if(data.deletedCount == 0){
                callback('', 'Check parameter or id valid');
            }else{
                await getGameData.loadGameData();
                callback('', 'Delete Success!');
            }
        })
        .catch((err)=> callback('', err));
    }
}