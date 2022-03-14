
import { Router } from 'express';
import { CastleController } from "./CastleController";

const castleController = new CastleController();

var CastleRouter = Router();

CastleRouter.get('/',(req,res)=>{
    castleController.getCastle((err,result)=>{
        if(err){
            res.send({
                Status: 1,
                Body: {
                  data: "get data castle error",
                },
              });
        }else{
            res.send({
                Status: 1,
                Body: {
                  data: result,
                },
              });
        }
    });
});

CastleRouter.get('/castleOwnerInfo/:walletID',(req,res)=>{
    var walletID = req.params.walletID;
    castleController.getCastleOwner(walletID,(err,result)=>{
        if(err){
            res.send({
                Status: 1,
                Body: {
                  data: "wallet ID can't empty",
                },
              });
        }else{
            res.send({
                Status: 1,
                Body: {
                  data: result,
                },
              });
        }
    });

});

CastleRouter.get('/levelup/:_id',(req,res)=>{
    castleController.levelUpCastle(req.params._id,(err, result)=>{
        if(err){
            res.send({
                Status: 1,
                Body: {
                  error: "levelup error!",
                },
              });
        }else{
            res.send({
                Status: 1,
                Body: {
                  data: result,
                },
              });
        }
    });
});

export default CastleRouter;