import { Router } from 'express';
import { RewardController } from './RewardController';
const json = require('./Rewards.json');
var RewardRouter = Router();
var rewardController = new RewardController();

RewardRouter.post('/addReward', async (req: any, res: any) => {
  let errors = new Array();
  if (!req.body.id) {
    errors.push('Id Reward is required');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    rewardController.addReward(req.body, (err, results) => {
      if (err) {
        res.send({
          Status: 1,
          Body: {
            data: errors,
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

RewardRouter.post('/testAddAllReward', async (req: any, res: any) => {
  json.forEach(async (element) => {
    await rewardController.addReward(element, (err, results) => {});
  });
  res.send('ok');
});

export default RewardRouter;
