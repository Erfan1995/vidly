const mongoose = require('mongoose');
const Joi = require('joi');


const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 12,
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 255,
    }
}));


function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5),
        email: Joi.string().min(12).required(),
        password: Joi.string().min(8).required()
    });
};


module.exports.User = User;
module.exports.validate = validate;