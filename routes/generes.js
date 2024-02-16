const express = require('express');
const { Genere, validate } = require('../models/generes');

const route = express.Router();

const getGeneres = async () => {
    const result = await Genere.find().sort('name');
    return result;
}

const getGeneresById = async (id) => {
    const result = await Genere.findById(id);
    return result;
}

const createGeneres = async (genere) => {
    console.log(genere)
    const genereObj = new Genere(genere);
    try {
        return await genereObj.save();
    } catch (err) {
        return err.message;
    }
}

const updateGenere = async (id, genere) => {
    try {
        const result = await Genere.findByIdAndUpdate({ _id: id },
            { $set: genere }
        )
        return result;
    } catch (err) {
        return err.message;
    }
}

const deleteGeneres = async (id) => {
    try {
        const result = await Genere.findByIdAndDelete({ _id: id });
        return result;
    } catch (err) {
        return err.message;
    }
}

route.get('/', async (req, res) => {
    const generes = await getGeneres();
    res.send(generes)
})

route.get('/:id', async (req, res) => {
    const genere = await getGeneresById(req.params.id);
    res.send(genere);
})

route.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    const genere = await createGeneres(req.body);
    res.send(genere);
})


route.put('/:id', async (req, res) => {
    const genere = await updateGenere(req.params.id, req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    res.send(genere);

})

route.delete('/:id', async (req, res) => {

    const genere = await deleteGeneres(req.params.id);
    res.send(genere);
})



module.exports = route;