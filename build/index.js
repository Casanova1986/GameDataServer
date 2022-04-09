"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const appChild_1 = require("./appChild");
if (cluster.isMaster) {
    spawnChildServer();
    console.log('----------' + cluster.isMaster);
}
else {
    (0, appChild_1.default)();
}
function spawnChildServer() {
    console.log('SpawnChildServer');
    for (let i = 0; i < 1; i++) {
        console.log('SpawnChild ' + i);
        cluster.fork();
    }
    cluster.on('exit', (deadWorker, code, signal) => {
        var worker = cluster.fork();
        var newPID = worker.process.pid;
        var oldPID = deadWorker.process.pid;
        console.log('worker ' + oldPID + ' died.' + 'code' + code + 'signal' + signal);
        console.log('worker ' + newPID + ' born.');
    });
}
