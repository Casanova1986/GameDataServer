
import * as Equipment from './EquipmentModel';
import {EquipmentMainStats} from './EquipmentMainStats';
import {EquipmentModel} from './EquipmentModel';
import {EquipmentGeneralInfo} from './EquipmentGeneralInfo';
import {EquipmentSubStats} from './EquipmentSubStats';
import { UserInfo, UserModel } from '../../Users/Models/UserModel';

import { UserInventoryModel } from '../../Users/Models/UserInventory';
import { ItemType } from '../../Users/Models/UserInventory';
import { UserController } from '../../Users/UserController';
import { HeroController } from '../Hero/HeroController';

export class EquipmentController {

  async ramdomEquiptment(idEquip:number, tier:string, callback: any){
    let dataConfig;
    await EquipmentMainStats.findOne({idEquipment: idEquip})
    .then(rs=>{
      if(rs == null){
        return callback("Data not found", null);
      }
      else{
        dataConfig = rs;
        console.log(dataConfig);
      }
    })
    .catch(err=>{

    });
 
    let mainStatData = new Array();
    dataConfig.stats.forEach(e => {
      let data = {
        typeStats : e.type,
        valueStats: Math.floor(Math.random() * (e.valueMax - e.valueMin + 1) ) + e.valueMin,
        step: e.step
      }
      mainStatData.push(data);
    });

    let generalData;
    await EquipmentGeneralInfo.findOne({idEquipment: idEquip})
    .then(rs=>{
      generalData = rs;
    })
    .catch();

    let randomEquipNumSub = Math.round(Math.random() * (generalData.numSubStatsMax - generalData.numSubStatsMin)) + generalData.numSubStatsMin;
      let subArray = new Array();
      
      let subStatTier;      
      await EquipmentSubStats.findOne({tier : tier}).then(rs=>{
        if(rs != null){
          subStatTier = rs;
        }
      });
      while (randomEquipNumSub > 0) {
        let randomEquipSub = Math.round(Math.random() * (subStatTier.stats.length - 1));
          if (subArray.indexOf(randomEquipSub) === -1) {
            randomEquipNumSub--;
            let data = {
              type: subStatTier.stats[randomEquipNumSub].type,
              value: Math.floor(Math.random() * (subStatTier.stats[randomEquipNumSub].valueMax - subStatTier.stats[randomEquipNumSub].valueMin + 1)) + subStatTier.stats[randomEquipNumSub].valueMin,
              tier: subStatTier.tier
            }
            subArray.push(data);
          }
      }

      let costBaseLevelUpRDG = subStatTier.costBaseLevelUpRDG;

      // subArray.sort((a, b) => {
      //   return a - b;
      // });

    await EquipmentModel.create({ 
      idEquipment: generalData.idEquipment,
      name: generalData.name,
      description: generalData.description,
      level: 0,
      itemName: generalData.itemName,
      type: generalData.type,
      tier: generalData.tier,
      fuseRate: generalData.fuseRate,
      numSubStatsMin: generalData.numSubStatsMin,
      numSubStatsMax: generalData.numSubStatsMax,
      mainStats: mainStatData,
      originMainStats: mainStatData,
      subStats: subArray,
      originSubStats: subArray,
      costBaseLevelUpRDG: costBaseLevelUpRDG,
      costLevelUpRDG: costBaseLevelUpRDG,
      image: generalData.image,
    },(err: any, res: any) => {
      if (err) {
        console.log(err);
        callback('Create Equipment Faild', '');
      } else {
        res.heroEquippedId = res._id;
        this.updateEquipment(res,(err,rs)=>{});
        callback('', res);
      }
    });
  }


  async levelUpEquipment(_id: any, callback: any){

    let DataEquipment
    await EquipmentModel.findOne({_id: _id})
    .then(rs=>{
        if(!rs)
            return callback(`castle data level id ${_id} empty`,null);
        DataEquipment = rs;
    })
    .catch(err=>{
        return callback(`castle data level id ${_id} empty`,null);
    });
   
    let lvEquip = DataEquipment.level;

    if(lvEquip >= DataEquipment.levelMax){
        return callback(`Equipment level maxed`,null);
    }
   
    const userController = new UserController();

    let userRDG, userRDR;
    let userData;
    await userController.getUserModelByItem(DataEquipment._id, (err, results)=>{
      userRDG = results.RDG;
      userRDR = results.RDR;
      userData = results;
    })

    console.log(`${userRDG} ------- ${DataEquipment.costLevelUpRDG}`);
    if(userRDG < DataEquipment.costLevelUpRDG){
      return callback('Not Enough RDG', null);
    }

    let isItemEquip = DataEquipment.heroEquippedId != undefined && DataEquipment._id === DataEquipment.heroEquippedId;
    if(isItemEquip)
      await new HeroController().equipmnentForHero(DataEquipment.heroEquippedId, DataEquipment._id, false, (err, rs)=>{});

    let curLevel = DataEquipment.level;
    curLevel++;

    let newMainStatData = new Array();
    DataEquipment.mainStats.forEach(e => {
      let data = {
        typeStats : e.type, 
        valueStats: e.valueStats + e.step,
        step: e.step
      }
      newMainStatData.push(data);
    });

    let newCostFuseRDG = (curLevel + 1)* DataEquipment.costBaseLevelUpRDG;

    let newDataEquipment : Equipment.IEquipment = {

      tokenId: DataEquipment.tokenId,
      level: curLevel,
      levelMax: DataEquipment.levelMax,
      costBaseLevelUpRDG: DataEquipment.costBaseLevelUpRDG,
      costLevelUpRDG: newCostFuseRDG,
      heroEquippedId: DataEquipment.heroEquippedId,
      mainStats: newMainStatData,
      subStats: DataEquipment.subStats,
      fuseRate: DataEquipment.fuseRate,
      numSubStatsMin: DataEquipment.numSubStatsMin,
      numSubStatsMax: DataEquipment.numSubStatsMax,
      idEquipment: DataEquipment.idEquipment,
      name: DataEquipment.name,
      description: DataEquipment.description,
      type: DataEquipment.type,
      tier: DataEquipment.tier,
      image: DataEquipment.image,
      originMainStats: DataEquipment.originMainStats,
      originSubStats: DataEquipment.originSubStats,
      isNFT: DataEquipment.isNFT
    };

    
    let key: string[] = Object.keys(newDataEquipment);
    for (let i = 0; i < key.length; i++) {
      if (newDataEquipment[`${key[i]}`] == undefined || i == 0) {
        delete newDataEquipment[`${key[i]}`];
      }
    }
    Equipment.EquipmentModel.updateOne({ _id : DataEquipment._id }, { $set: newDataEquipment })
      .then(async (results) => {
        if (results.modifiedCount == 0) callback('Data not found check parameter id','');
        else {
          if(isItemEquip)
            await new HeroController().equipmnentForHero(DataEquipment.heroEquippedId, DataEquipment._id, true, (err, rs)=>{});
          
          userData.RDG -= DataEquipment.costLevelUpRDG;
          userController.updateUser(userData,(err,rs) => {});
          callback('', newDataEquipment);
        }
        
      })
      .catch((err) => callback( err,''));
  }

  async createEquipment(dataEquip: any, callback: any) {
    await Equipment.EquipmentModel.findOne({ itemId: dataEquip.id })
      .then(async (data) => {
        if (data) {
          callback('', 'Equipment ID is exist!');
        } else {
          let mainStat: Array<Equipment.mainStats> = new Array<Equipment.mainStats>();
          dataEquip.mainStat.forEach((data) => {
            mainStat.push(data);
          });
          let equipmentData = new Equipment.EquipmentModel({
            itemId: dataEquip.id,
            itemName: dataEquip.name,
            image: dataEquip.image,
            level: dataEquip.level,
            mainStat: mainStat,
            fuseRate: dataEquip.fuseRate,
            numSubStatsMin: dataEquip.numSubStatsMin,
            numSubStatsMax: dataEquip.numSubStatsMax,
            description: dataEquip.description,
            equipmentRarity: dataEquip.rarity,
            equipmentType: dataEquip.type,
            costEnhanceGold: dataEquip.costEnhanceGold,
            costFuseGold: dataEquip.costFuseGold,
            costFuseRuby: dataEquip.costFuseRuby,
            heroEquippedId: dataEquip.heroEquippedId,
            timeCreated: new Date(),
          });
          let result = await equipmentData.save();
          callback('', result);
        }
      })
      .catch((err) => callback('', err));
  }

  async updateEquipment(dataEquip: any, callback: any) {
   
    // doc thong tin can update
    let mainStat: Array<Equipment.mainStats> = new Array<Equipment.mainStats>();
    dataEquip.mainStats.forEach((data) => {
      mainStat.push(data);
    });
    let subStat = new Array();
    if (dataEquip.subStats !== undefined) {
      subStat = dataEquip.subStats;
    }
    let equipmentData: Equipment.IEquipment = {

      tokenId: dataEquip.tokenId,
      idEquipment: dataEquip.idEquipment,
      name: dataEquip.name,
      image: dataEquip.image,
      level: dataEquip.number,
      levelMax: dataEquip.levelMax,
      mainStats: mainStat,
      subStats: subStat,
      fuseRate: dataEquip.fuseRate,
      numSubStatsMin: dataEquip.numSubStatsMin,
      numSubStatsMax: dataEquip.numSubStatsMax,
      description: dataEquip.description,
      type: dataEquip.type,
      tier: dataEquip.tier,
      costBaseLevelUpRDG: dataEquip.costBaseLevelUpRDG,
      costLevelUpRDG: dataEquip.costLevelUpRDG,
      heroEquippedId: dataEquip.heroEquippedId,
      originMainStats: mainStat,
      originSubStats: subStat,
      isNFT: dataEquip.isNFT,
    };
    let key: string[] = Object.keys(equipmentData);
    for (let i = 0; i < key.length; i++) {
      if (equipmentData[`${key[i]}`] == undefined || i == 0) {
        delete equipmentData[`${key[i]}`];
      }
    }
    await Equipment.EquipmentModel.updateOne({ _id : dataEquip._id }, { $set: equipmentData })
      .then((results) => {
        if (results.modifiedCount == 0) callback('', 'Data not found check parameter id');
        else callback('', 'Update Success!');
      })
      .catch((err) => callback('', err));
  }
  async deleteEquipment(id, callback: any) {
    Equipment.EquipmentModel.deleteOne({ itemId: id })
      .then((results) => {
        if (results.deletedCount == 0) {
          callback('', 'Check parameter or id valid');
        } else callback('', 'Delete Success!');
      })
      .catch((err) => callback('', err));
  }

  async getEquipOwn(walletId: string, callback: any){
    if(walletId === undefined){

      callback( 'wallet ID invalid',''); 
      return;
    }

    let inventoriesItem = new Array();
    await UserInventoryModel.find({walletID: walletId,itemType: ItemType.Equip})
    .then(rs=>{
      if(!rs || rs.length == 0){
        console.log("inventori of wallet empty!");
        return;
      }
       
      inventoriesItem = rs;
    })
    .catch(err=> {
      console.log("inventori of wallet empty!");
      return ;
    });

    if(inventoriesItem.length == 0 ){
      callback('',null);
      return;
    }

  let equipments = new Array();
  for(let i = 0; i < inventoriesItem.length; i++){
    console.log(inventoriesItem[i].itemId);
    await EquipmentModel.findOne({_id: inventoriesItem[i].itemId})
    .then(rs=>{
    
      if(rs)
        equipments.push( rs );
      else
       console.log("equipment null!");
    })
    .catch(err=>{
      console.log(err);
    });
  }

    console.log(equipments);
    callback('',equipments);

  }

}

let equipmentController = new EquipmentController();

export class EquipmentProcesor{
  ProcessMessage(msg,callback){
    switch(msg.cmd){
      case 'EQUIPMENT_ENHANCE':
        equipmentController.levelUpEquipment(msg.id, callback);
        break;
    }
  }
}
