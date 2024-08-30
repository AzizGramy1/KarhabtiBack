const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id_transaction: { type: Number, required: true, unique: true },
    type_transaction: { type: String, required: true }, // e.g., 'Purchase', 'Refund', 'Deposit', etc.
    date_transaction: { type: Date, required: true, default: Date.now },
    montant: { type: Number, required: true }, // The amount of money involved in the transaction
    devise: { type: String, required: true }, // Currency, e.g., 'USD', 'EUR'
    statut: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] }, // Status of the transaction
    methode_paiement: { type: String, required: true }, // Payment method used, e.g., 'Credit Card', 'Bank Transfer'
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who made the transaction
    commentaire: { type: String } // Optional field for any notes related to the transaction
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
