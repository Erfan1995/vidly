const morgan = require('morgan');
const helmet = require('helmet')
const express = require('express');
const Joi = require('joi');
const logger = require('./logging');
const auth = require('./auth');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(logger)
app.use(morgan('tiny'));
app.use(helmet());

const generes = [
    {
        id: 1, name: "genere 1",
    },
    {
        id: 2, name: "genere 2",
    }
]

const schema = Joi.object({
    name: Joi.string().min(5).required(),
    token: Joi.string()
})


app.get('/api/generes', (req, res) => {
    res.send(generes)
})

app.get('/api/generes/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('No generes found with id ' + req.params.id)

    res.send(genere);
})

app.post('/api/generes', auth, (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.send(genere);
})


app.put('/api/generes/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('No generes found with id ' + req.params.id);

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genere.name = req.body.name;
    res.send(genere);

})

app.delete('/api/generes/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('No generes found with id ' + req.params.id);

    const index = generes.indexOf(genere);
    generes.splice(index, 1);
    res.send(genere);
})

app.listen(4000, () => {
    console.log('listening on port 4000....')
})