"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();
const mongoConfig = require('./mongoConnect');
const environment = require('./config/environment/server');
const UserController_1 = require("./Users/UserController");
const UserRouter_1 = require("./Users/UserRouter");
const SkillRouter_1 = require("./GameData/Skill/SkillRouter");
const HeroRouter_1 = require("./GameData/Hero/HeroRouter");
const RewardRouter_1 = require("./GameData/Reward/RewardRouter");
const EquipmentRouter_1 = require("./GameData/Equipment/EquipmentRouter");
const CastleRouter_1 = require("./GameData/Castle/CastleRouter");
const GetGameData_1 = require("./GameData/GetGameData");
const EquipmentController_1 = require("./GameData/Equipment/EquipmentController");
const HeroController_1 = require("./GameData/Hero/HeroController");
const CastleController_1 = require("./GameData/Castle/CastleController");
const EquipmentController_2 = require("./GameData/Equipment/EquipmentController");
const UserData_1 = require("./Users/UserData");
//let guild = new GuildController();
let processUser = new UserController_1.ProcessUser();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));
mongoConfig.connect(() => {
    console.log('MongoDB - Connected!');
    GetGameData_1.getGameData.loadGameData();
});
app.use('/api/user', UserRouter_1.default);
app.use('/api/hero', HeroRouter_1.default);
app.use('/api/equipment', EquipmentRouter_1.default);
app.use('/api/reward', RewardRouter_1.default);
app.use('/api/skill', SkillRouter_1.default);
app.use('/api/castle', CastleRouter_1.default);
app.get('/api/user', (req, res) => {
    res.send({ status: 'ok' });
});
app.get('/testEquipment', (req, res) => {
    var equipmentController = new EquipmentController_1.EquipmentController();
    equipmentController.ramdomEquiptment(500100, "Legendary", () => {
        console.log("success");
    });
});
app.get('/testUpdateEquipment', (req, res) => {
    var equipmentController = new EquipmentController_1.EquipmentController();
    equipmentController.levelUpEquipment("61cec41a1dd4819c686bf7a3", () => {
        console.log("update success");
    });
});
app.get('/api/getNFT/:tokenID', (req, res) => {
});
const server = http.createServer(app);
function AppChild() {
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
        let userData = new UserData_1.UserData(socket);
        socket.on('user', (msg, callback) => {
            processUser.processUserMessage(userData, msg, (err, results) => {
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
                }
                else {
                    console.log(results);
                    callback('', results);
                }
            });
        });
        socket.on('hero', (msg, fn) => {
            new HeroController_1.HeroProcessor().ProcessMessage(msg, (err, result) => {
                if (err) {
                    fn({
                        returnCode: 400,
                        err: JSON.stringify(err)
                    });
                }
                else {
                    fn({
                        returnCode: 200,
                        data: JSON.stringify(result)
                    });
                }
            });
        });
        socket.on('castle', (msg, fn) => {
            new CastleController_1.CastleProcess().ProcessMessage(msg, (err, result) => {
                if (err) {
                    fn({
                        returnCode: 400,
                        err: JSON.stringify(err)
                    });
                }
                else {
                    fn({
                        returnCode: 200,
                        data: JSON.stringify(result)
                    });
                }
            });
        });
        socket.on('equipment', (msg, fn) => {
            new EquipmentController_2.EquipmentProcesor().ProcessMessage(msg, (err, result) => {
                if (err) {
                    fn({
                        returnCode: 400,
                        err: JSON.stringify(err)
                    });
                }
                else {
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
exports.default = AppChild;
