const winston = require('winston');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet')
const express = require('express');

// if (!config.get('jwtPrivateKey')) {
//     console.log('No jwt private key specified');
//     process.exit(1);
// }

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
// winston.add(winston.transports.File,{filename:"logfile"});

app.use(helmet());
app.listen(4000, () => {
    console.log('listening on port 4000....')
})