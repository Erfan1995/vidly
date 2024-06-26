const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');
const router = express.Router();


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(12).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(req);

};

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const comparedPassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparedPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);

})

module.exports = router;