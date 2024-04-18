const express = require('express');
const { Customer, validate } = require('../models/customer')


const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.find({ _id: req.params.id });
    if (!customer) return res.status(404).send("Customer not found!");
    res.send(customer);
});

router.post('/', async (req, res) => {
    const customer = new Customer(req.body);
    try {
        const result = await customer.save();
        res.send(result);
    } catch (err) {
        return res.status(500).send(err.message)
    }
});

router.put('/:id', async (req, res) => {
    const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    if (!customer) return res.status(404).send("Customer not found!");
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send("Customer not found!");
    res.send(customer);
})



module.exports = router;