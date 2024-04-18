const winston = require('winston');
const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
    level:"info",
    format: combine(timestamp(),json()),
    transports:[
        new winston.transports.File({
            filename: 'info-logs.log',
            level:'info'
        }),
        new winston.transports.File({
            filename:'error-logs.log', level:'error'
        })
    ]
});


module.exports = logger