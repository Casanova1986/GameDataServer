import { Router } from 'express';
import { UserController } from './UserController';
import { HeroController } from '../GameData/Hero/HeroController';
import { EquipmentModel } from '../GameData/Equipment/EquipmentModel';
import { subStatConfig, Equip_TierList } from '../GameData/Equipment/EquiqmentConfig';
var UserRouter = Router();

const userController = new UserController();
const heroController = new HeroController();

UserRouter.post('/registerUser', async (req: any, res: any) => {
  let errors = new Array();
  if (!req.body.userName) {
    errors.push('Name is required.');
  }
  if (!req.body.passWord) {
    errors.push('Password is required.');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    userController.registerUser(req.body.userName, req.body.passWord, (err, results) => {
      if (err) {
        res.send({
          Status: 1,
          Body: {
            data: err,
          },
        });
      } else {
        res.send({
          Status: 1,
          Body: {
            data: results,
          },
        });
      }
    });
  }
});
UserRouter.post('/login', async (req, res) => {
  let errors = new Array();
  if (!req.body.userName) {
    errors.push('Name is required.');
  }
  if (!req.body.passWord) {
    errors.push('Password is required.');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    userController.loginUser(req.body.userName, req.body.passWord, (err, results) => {
      if (err) {
        res.send({
          Status: -1,
          Body: {
            data: err,
          },
        });
      } else {
        res.send({
          Status: 1,
          Body: {
            data: results,
          },
        });
      }
    });
  }
});

UserRouter.post('/testRandom', async (req, res) => {
  if ((req.body.chest = 'Common')) {
    EquipmentModel.find({ equipmentRarity: req.body.chest })
      .then((data) => {
        res.send('ok');
        let randomEquip = Math.round(Math.random() * (data.length - 1));
        let randomEquipNumSub =
          Equip_TierList.Common.subStatMin +
          Math.round(Math.random() * (Equip_TierList.Common.subStatMax - Equip_TierList.Common.subStatMin));
        console.log('test');
        let subArray = new Array();
        while (randomEquipNumSub > 0) {
          let randomEquipSub = Math.round(Math.random() * (subStatConfig.Common.length - 1));
          if (subArray.indexOf(randomEquipSub) === -1) {
            randomEquipNumSub--;
            subArray.push(randomEquipSub);
          }
        }
        subArray.sort((a, b) => {
          return a - b;
        });
        let equipResult = data[randomEquip];
        //subArray.forEach((e) => equipResult?.subStats.push(subStatConfig.Common[e]));
        console.log(equipResult);
      })
      .catch((err) => res.send(err));
  }
});

UserRouter.post('/RandomEquip', async (req, res) => {
  userController.randomEquipment(req.body.userId, res);
});

UserRouter.post('/RandomHero', async (req, res) => {
  let tier = req.body.tier;
  // userController.randomHero(req.body.userId, tier, (err, rs) => {
  //   res.send(rs);
  // });
});


UserRouter.post('/CreateSurvey', async (req, res) => {
 
console.log(req.body);

  userController.CreateSurvey(req.body.userId, req.body.surveyData, (rs) => {
    res.send(rs);
  });
});

UserRouter.post('/GetSurveyByCode', async (req, res) => {
 

  
    userController.GetSurveyData(req.body.code, (rs) => {
      res.send(rs);
    });
  });

UserRouter.post('/GenerateHero', async (req, res) => {
  let walletId = req.body.walletId;
  let tokenId = req.body.tokenId;
  userController.geneRateHero(walletId, tokenId, (err, rs) => {
    res.send(rs);
  });
});

UserRouter.post('/testPassPlayCampain', async (req, res) => {
  let userId = req.body.userId;
  let stageId = req.body.stageId;
  userController.playCampaign(userId, stageId, (err, rs) => {
    res.send(rs);
  });
});

UserRouter.get('/GetHeroOwnerInfo/:walletId', async (req,res)=>{
  let walletId = req.params.walletId;
  heroController.getHeroesOwner(walletId, (err,rs)=>{
    res.send(rs);
  });
});

UserRouter.get('/GetHeroInfo', async (req,res)=>{
  heroController.getHeroes((err,rs)=>{
    res.send(rs);
  });
});

export default UserRouter;
