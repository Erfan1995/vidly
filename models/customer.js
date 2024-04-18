const mongoose = require('mongoose');
const Joi = require('joi');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, required: true },
    phone: { type: String, required: true }
}))


const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(10).max(10).required(),
    })
    return schema.validate(customer);
}
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;