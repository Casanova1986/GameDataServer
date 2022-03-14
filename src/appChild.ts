const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();
const mongoConfig = require('./mongoConnect');
const environment = require('./config/environment/server');

import { UserController, ProcessUser } from './Users/UserController';
import { GuildController } from './Guild/GuildController';

import UserRouter from './Users/UserRouter';
import SkillRouter from './GameData/Skill/SkillRouter';
import GuildRouter from './Guild/GuildRouter';
import HeroRouter from './GameData/Hero/HeroRouter';
import RewardRouter from './GameData/Reward/RewardRouter';
import EquipmentRouter from './GameData/Equipment/EquipmentRouter';

import CastleRouter from './GameData/Castle/CastleRouter';

import { getGameData } from './GameData/GetGameData';
import { EquipmentSubStats } from './GameData/Equipment/EquipmentSubStats';
import { EquipmentController } from './GameData/Equipment/EquipmentController';
import { GuildModel } from './Guild/GuildModel';
import { getEnvironmentData } from 'worker_threads';
import { HeroProcessor } from './GameData/Hero/HeroController';
import { CastleProcess } from './GameData/Castle/CastleController';
import { EquipmentProcesor} from './GameData/Equipment/EquipmentController';
import { UserData} from './Users/UserData';

//let guild = new GuildController();

let processUser = new ProcessUser();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
  })
);

mongoConfig.connect(() => {
  console.log('MongoDB - Connected!');
  getGameData.loadGameData();
});

app.use('/api/user', UserRouter);
app.use('/api/hero', HeroRouter);
app.use('/api/equipment', EquipmentRouter);
app.use('/api/reward', RewardRouter);
app.use('/api/skill',SkillRouter);
app.use('/api/castle',CastleRouter);

app.get('/api/user', (req: any, res) => {
  res.send({ status: 'ok' });
});

app.get('/testEquipment', (req, res)=>{
  var equipmentController = new EquipmentController();

  equipmentController.ramdomEquiptment(500100, "Legendary", ()=>{
    console.log("success")
  });
})

app.get('/testUpdateEquipment', (req, res)=>{
  var equipmentController = new EquipmentController();

  equipmentController.levelUpEquipment("61cec41a1dd4819c686bf7a3", ()=>{
    console.log("update success")
  });
})

app.get('/api/getNFT/:tokenID',(req,res)=>{

});

const server = http.createServer(app);

export default function AppChild() {
  // since socket v3, use alloweio3 to true for cors
  const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
      // List IP client connect to server
      origin: '',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  server.listen(environment.server.port, () => {
    console.log(`Worker ${process.pid} listening on port: ${environment.server.port}`);
  });
  io.sockets.on('connection', (socket) => {
    console.log(`Worker ${process.pid} started for ${socket.id}`);
    console.info(`Client connected id = ${socket.id}`);


    let userData = new UserData(socket);

    socket.on('user', (msg: any, callback: any) => {
      processUser.processUserMessage(userData,msg, (err: any, results: any) => {
        if (err) {
          console.log(err);
          return callback('', {
            Status: 0,
            Body: {
              err: {
                errCode: 2000,
                meesage: 'Server error',
              },
            },
          });
        } else {
          console.log(results);
          callback('', results);
        }
      });
    });

    socket.on('hero',(msg, fn)=>{
      new HeroProcessor().ProcessMessage(msg,(err,result)=>{
        if(err){
          fn({
            returnCode: 400,
            err: JSON.stringify(err)
          });
        }else{
          fn({
            returnCode: 200,
            data: JSON.stringify(result)
          });
        }
      });
    });

    socket.on('castle',(msg, fn)=>{
      new CastleProcess().ProcessMessage(msg,(err,result)=>{
        if(err){
          fn({
            returnCode: 400,
            err: JSON.stringify(err)
          });
        }else{
          fn({
            returnCode: 200,
            data: JSON.stringify(result)
          });
        }
      });
    });


    socket.on('equipment',(msg, fn)=>{
      new EquipmentProcesor().ProcessMessage(msg,(err,result)=>{
        if(err){
          fn({
            returnCode: 400,
            err: JSON.stringify(err)
          });
        }else{
          fn({
            returnCode: 200,
            data: JSON.stringify(result)
          });
        }
      });
    });

    // socket.on('guild', (msg: any, callback: any) => {
    //   //  console.log(msg);

    //   guild.createGuild(msg, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return callback({
    //         Status: 1,
    //         data: 'Create guild failed',
    //       });
    //     }
    //     console.log(results);
    //     callback({
    //       Status: 1,
    //       data: results,
    //     });
    //   });
    // });
    socket.on('disconnected', () => {
      socket.disconnect();
      console.log(`Client gone [id=${socket.id}]`);
    });
  });
}


