const mongoose = require('mongoose');
const Joi = require('joi');

const genereSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Genere = mongoose.model('Genere', genereSchema);


const validateGener = (genere) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
    })
    return schema.validate(genere);
}




module.exports.Genere = Genere;
module.exports.validate = validateGener;
module.exports.genereSchema = genereSchema;