const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to create a new transaction
router.post('addTransaction/', transactionController.createTransaction);

// Route to get all transactions
router.get('getAllTransaction/', transactionController.getAllTransactions);

// Route to get a transaction by ID
router.get('getTransactionById/:id', transactionController.getTransactionById);

// Route to update a transaction by ID
router.put('updateTransactionById/:id', transactionController.updateTransaction);

// Route to delete a transaction by ID
router.delete('deleteTransactionById/:id', transactionController.deleteTransaction);

module.exports = router;
