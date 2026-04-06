const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    const { title, amount, category, type } = req.body;
    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type
    });
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }
    await transaction.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};