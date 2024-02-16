const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet')
const express = require('express');
const logger = require('./middleware/logging');
const auth = require('./middleware/auth');
const generes = require('./routes/generes');
const mongoose = require('mongoose');
const customers = require('./routes/customer');
const movies = require('./routes/movie');
const rental = require('./routes/rental');
const user = require('./routes/user');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to database..."))
    .catch(err => console.error("Error connecting to database: " + err))

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(logger)
app.use(helmet());

app.use('/api/generes', generes);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rental);
app.use('/api/user', user);

console.log(config.get('name'))
console.log(config.get('mail.host'))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}


app.listen(4000, () => {
    console.log('listening on port 4000....')
})