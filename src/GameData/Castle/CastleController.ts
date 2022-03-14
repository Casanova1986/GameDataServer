import { UserInventoryModel } from '../../Users/Models/UserInventory';
import {CastleModel,IInfoCastle, ICastle} from './CastleModel';
import { levelDatalCastle } from './Config/CastleLevelConfig';
import { ItemType } from '../../Users/Models/UserInventory';
import { UserController } from '../../Users/UserController';

export var CastleDataLevel = new Map<string, any>();

export class CastleController{
    constructor(){
        this.loadData();
    }

    async loadData(){

        CastleDataLevel = new Map<string, any>();

        var CastleDataLevelCommon = new Map<number, any>();
        var CastleDataLevelRare = new Map<number, any>();
        var CastleDataLevelEpic = new Map<number, any>();
        var CastleDataLevelUnique = new Map<number, any>();
        var CastleDataLevelLegendary = new Map<number, any>();
        await levelDatalCastle.find()
        .then(rs=>{
            rs.forEach(elementLevel=>{
                
                if(elementLevel.tier == "Common"){
                    CastleDataLevelCommon.set(elementLevel.level,{
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }else if(elementLevel.tier == "Rare"){
                    CastleDataLevelRare.set(elementLevel.level,{
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }else if(elementLevel.tier == "Epic"){
                    CastleDataLevelEpic.set(elementLevel.level,{
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }else if(elementLevel.tier == "Unique"){
                    CastleDataLevelUnique.set(elementLevel.level,{
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }else if(elementLevel.tier == "Legendary"){
                    CastleDataLevelLegendary.set(elementLevel.level,{
                        level: elementLevel.level,
                        HP: elementLevel.HP,
                        armor: elementLevel.armor,
                        magicRes: elementLevel.magicRes,
                        cost: elementLevel.cost,
                        tier: elementLevel.tier,
                    });
                }
            });


            CastleDataLevel.set('Common', CastleDataLevelCommon);
            CastleDataLevel.set('Rare', CastleDataLevelRare);
            CastleDataLevel.set('Epic', CastleDataLevelEpic);
            CastleDataLevel.set('Unique', CastleDataLevelUnique);
            CastleDataLevel.set('Legendary', CastleDataLevelLegendary);

            //console.log(CastleDataLevel);
        })
        .catch(err=>{
            console.log(err);
        });


       
    }

    async castleUpDate(castleData: any, callback: any){
        let InfoCastle : IInfoCastle = {
            armor: castleData.infoCastle.armor,
            magicResistance: castleData.infoCastle.magicResistance,
            HP: castleData.infoCastle.HP,
        };

        let castle: ICastle = {
            cost: castleData.cost,
            level: castleData.level,
            name: castleData.name,
            avatar: castleData.avatar,
            maxLevel: castleData.maxLevel,
            tier: castleData.tier,
            infoCastle: InfoCastle,
        }

        CastleModel.updateOne({ _id: castleData._id }, {$set: castle})
        .then(rs=>{
           
            callback('',castle);
        })
        .catch(err=>{
            callback('update fail!','');
        });
    }

    async getCastle(callback: any){
        let castles = new Array();

        await CastleModel.find({})
        .then(rs=>{
            castles = rs;
        })
        .catch(err=>{

        });
    
        callback('',castles);
    }

    async getCastleOwner(walletId: string, callback: any){
             
        if(walletId === undefined){
    
          callback('wallet ID invalid',''); 
          return;
        }
    
        let castles = new Array();
        let castlesData = new Array();
       
        let inventoriesItem = new Array();
        await UserInventoryModel.find({walletID: walletId, itemType: ItemType.Castle })
        .then(rs=>{
            if(!rs || rs.length == 0){
                console.log("inventori of wallet empty!");
                return ;
            }
            inventoriesItem = rs;
        })
        .catch(err=> {
            console.log("inventori of wallet empty!");
            return;
        });

        if(inventoriesItem.length == 0){
            callback('',null);
            return;
        }
        
        for(let i = 0; i< inventoriesItem.length; i++){
            await CastleModel.findOne({_id:inventoriesItem[i].itemId})
            .then(rs=>{
                if(rs){
                    let castle =  rs;
                      castles.push(  castle );
                      let castleUp = JSON.parse( JSON.stringify(castle));
                     
                      
                      if(!CastleDataLevel.has(castle.tier)){
                          console.log('tier empty');
                          return;
                      }
          
                      let Datalevel = CastleDataLevel.get(castle.tier);
      
                      if(!Datalevel.has(castle.level+1)){
                          console.log('level empty');
                          return;
                      }
      
                      let DataLevelConfig = Datalevel.get(castle.level+1);
      
                      let InfoCastle : IInfoCastle = {
                          armor: castleUp.infoCastle.armor + DataLevelConfig.armor,
                          magicResistance: castleUp.infoCastle.magicResistance + DataLevelConfig.magicRes,
                          HP: castleUp.infoCastle.HP + DataLevelConfig.HP,
                      };
                      
                      castleUp.infoCastle = InfoCastle;
                      castleUp.cost = DataLevelConfig.cost;
                      castleUp.level++;
      
                      castlesData.push(castleUp);
                  
                     
                }
            })
            .catch(err=>{

            });
        }
       
        callback('',[castles,castlesData]);
    
      }

      async levelUpCastle(_id: string, callback: any){

        let DataCastle
        await CastleModel.findOne({_id: _id})
        .then(rs=>{
            if(!rs)
                return callback(`castle data level id ${_id} empty`,null);
            DataCastle = rs;
        })
        .catch(err=>{
            return callback(`castle data level id ${_id} empty`,null);
        });
       

        if(!CastleDataLevel.has(DataCastle.tier)){
            return callback(`castle data level tier ${DataCastle.tier} empty`,null);
        }

        let Datalevel = CastleDataLevel.get(DataCastle.tier);

        if(!Datalevel.has(DataCastle.level+1)){
            return callback(`castle data level ${DataCastle.level+1} empty`,null);
        }

        let DataLevelConfig = Datalevel.get(DataCastle.level+1);

        let InfoCastle : IInfoCastle = {
            armor: DataCastle.infoCastle.armor + DataLevelConfig.armor,
            magicResistance: DataCastle.infoCastle.magicResistance + DataLevelConfig.magicRes,
            HP: DataCastle.infoCastle.HP + DataLevelConfig.HP,
        };

        DataCastle.infoCastle = InfoCastle;
        DataCastle.cost = DataLevelConfig.cost;
        DataCastle.level++;

        this.castleUpDate(DataCastle,(err,result)=>{
            if(err){
                callback('upadte db error','');
            }else{
                let castleUp = JSON.parse( JSON.stringify(result));
                if(!CastleDataLevel.has(castleUp.tier)){
                    console.log('tier empty');
                    return;
                }
    
                let Datalevel = CastleDataLevel.get(castleUp.tier);

                if(!Datalevel.has(castleUp.level+1)){
                    console.log('level empty');
                    return;
                }

                let DataLevelConfig = Datalevel.get(castleUp.level+1);

                let InfoCastle : IInfoCastle = {
                    armor: castleUp.infoCastle.armor + DataLevelConfig.armor,
                    magicResistance: castleUp.infoCastle.magicResistance + DataLevelConfig.magicRes,
                    HP: castleUp.infoCastle.HP + DataLevelConfig.HP,
                };
                
                castleUp.infoCastle = InfoCastle;
                castleUp.cost = DataLevelConfig.cost;
                castleUp.level++;

                console.log("current level "+result.level +"==>"+ castleUp.level);

                callback('',[result,castleUp]);
            }
        });
      }

    async randomCastle(callback){

        if(!CastleDataLevel.has("Common")){
            return callback(`castle data level tier commom empty`,null);
        }

        let Datalevel = CastleDataLevel.get("Common");

        if(!Datalevel.has(1)){
            return callback(`castle data level Common empty`,null);
        }

        let DataLevelConfig = Datalevel.get(1);

        let InfoCastle : IInfoCastle = {
            armor:  DataLevelConfig.armor,
            magicResistance: DataLevelConfig.magicRes,
            HP:  DataLevelConfig.HP,
        };

        await CastleModel.create({
            infoCastle : InfoCastle,
            cost : DataLevelConfig.cost,
            level : 1,
        },callback);
    }
}


let castleController = new CastleController();

export class CastleProcess{
    ProcessMessage(msg, callback){
        switch(msg.cmd){
            case 'CASTLE_LEVELUP':
                castleController.levelUpCastle(msg._id,callback);
                break;
        }
    }
}
