const mongoose = require('mongoose');
const Joi = require('joi');
const { genereSchema } = require('./generes');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: { type: String, required: true },
    genre: genereSchema,
    numberInStock: { type: Number, required: true, min: 0 },
    dailyRentalRate: { type: Number, required: true, min: 0 }
}));

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        genre: Joi.object().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    })
    return schema.validate(movie);
}


module.exports.validate = validateMovie;
module.exports.Movie = Movie