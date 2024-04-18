const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
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
        maxlength: 255
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 1024,
    },
    isAdmin: Boolean,
});


userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}
const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        email: Joi.string().min(12).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};


module.exports.User = User;
module.exports.validate = validate;