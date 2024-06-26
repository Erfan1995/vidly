const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');

const { User, validate } = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists!");

    user = new User(req.body, ["name", "email", "password"]);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-header', token).send(_.pick(user, ["_id", "name", "email"]));
});

router.post('/register', async (req, res) => {

})


module.exports = router;
