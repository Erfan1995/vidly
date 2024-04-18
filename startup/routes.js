const express = require('express');
const customers = require('../routes/customer');
const movies = require('../routes/movie');
const rental = require('../routes/rental');
const user = require('../routes/user');
const auth = require('../routes/auth')
const generes = require('../routes/generes');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/generes', generes);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rental);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use(error)

}