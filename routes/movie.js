const express = require('express');
const { Movie, validate } = require('../models/movie');


const route = express.Router();

route.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

route.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found!');
    res.send(movie);
});

route.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = new Movie(req.body);
    try {
        const savedMovie = await movie.save();
        res.send(savedMovie);
    } catch (err) {
        res.send(err.message);
    }
});

route.put('/:id', async (req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).send('Movie not found!');
    console.log(updatedMovie, 'mmm');
    res.send(updatedMovie);
})



module.exports = route