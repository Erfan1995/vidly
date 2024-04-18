const express = require('express');
const { Genere, validate } = require('../models/generes');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');
const route = express.Router();
const asyncMiddlewareHandler = require('../middleware/async');

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

// route.get('/', asyncMiddlewareHandler(async (req, res) => {
//     throw new Error()
//     const result = await Genere.find().sort('name');
//     res.send(result);
// }))

route.get('/',async(req,res)=>{
    throw new Error("Could not get the genere!")
    const result = await Genere.find().sort("name");
    res.send(result);
})

route.get('/:id', async (req, res) => {
    const result = await Genere.findById(id);
    res.send(result);
})

route.post('/', auth, async (req, res) => {
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

route.delete('/:id', [auth, admin], async (req, res) => {

    const genere = await deleteGeneres(req.params.id);
    res.send(genere);
})



module.exports = route;