"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const formatLog = printf(log => {
    // nếu log là error hiển thị stack trace còn không hiển thị message của log 
    if (log.stack)
        return `[${log.timestamp}] [${log.level}] ${log.stack}`;
    return `[${log.timestamp}] [${log.level}] ${log.message}`;
});
let transportApi = new transports.Console();
exports.Logger = createLogger({
    format: combine(format.splat(), format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), format.colorize(), formatLog),
    transports: [
        transportApi
    ]
});
