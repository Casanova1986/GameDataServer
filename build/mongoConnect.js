const mongoose = require('mongoose');
const { mongo, redis } = require('./config/environment/server');
let mongodb;
let mongoDbUrl = `mongodb://${mongo.host}:${mongo.port}`;
function connect(callback) {
    console.log(`MongoDB - Preparing to connect: ${mongoDbUrl}`);
    mongoose.connect(mongoDbUrl, {
        dbName: mongo.dbName,
        user: mongo.username,
        pass: mongo.password
    }, (err, db) => {
        if (err)
            console.log(err);
        else {
            mongodb = db;
            callback();
        }
    });
}
function get() {
    return mongodb;
}
module.exports = {
    connect,
    get,
};
