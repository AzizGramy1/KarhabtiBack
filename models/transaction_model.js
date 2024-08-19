const mongoose = require('mongoose');
const { number } = require('yup');

const transactionSchema = new mongoose.Schema({
    id_transaction: { type: Number, required: true, unique: true },
    type_transaction: {type: String, required: true},
    date_transaction: {type: Date, required:true, default: Date.now}




})

const transaction = mongoose.model('Transaction', transactionSchema);
module.exports = transaction;