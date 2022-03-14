import { Router } from 'express';
import { HeroController } from './HeroController';

var HeroRouter = Router();
var heroController = new HeroController();

HeroRouter.post('/addHero', async (req: any, res: any) => {
  let errors = new Array();
  if (!req.body.id) {
    errors.push('Id Hero is required');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    heroController.createHero(req.body, (err, results) => {
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

HeroRouter.post('/updateHero', async (req: any, res: any) => {
  let errors = new Array();
  if (!req.body.id) {
    errors.push('Id Hero is required');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    heroController.updateHero(req.body, (err, results) => {
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

HeroRouter.post('/deleteHero', async (req: any, res: any) => {
  let errors = new Array();
  if (!req.body.id) {
    errors.push('Id Hero is required');
  }
  if (errors.length) {
    res.send({
      Status: 1,
      Body: {
        data: errors,
      },
    });
  } else {
    heroController.deleteHero(req.body.id, (err, results) => {
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

HeroRouter.post('/levelupHero', async (req: any, res: any)=>{
  heroController.levelUpHero(req.body._id,(err,result)=>{
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
          data: result,
        },
      });
    }
  })
});

HeroRouter.post('/enchanceHero', async (req: any, res: any)=>{
  heroController.enchanceHero(req.body._id, req.body.isEnchace,(err,result)=>{
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
          data: result,
        },
      });
    }
  })
});

HeroRouter.post('/equipHero', async (req: any, res: any)=>{
  console.log(req.body);
  heroController.equipmnentForHero(req.body._idHero, req.body._idEquipt, req.body.isEquip,(err,result)=>{
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
          data: result,
        },
      });
    }
  })
});

HeroRouter

export default HeroRouter;
