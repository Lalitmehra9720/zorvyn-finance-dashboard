import API from './api';

// GET all transactions
export const fetchTransactions = async () => {
  try {
    const response = await API.get('/transactions');
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// POST a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await API.post('/transactions', transactionData);
    return response;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

// DELETE a transaction (Optional enhancement)
export const deleteTransaction = async (id) => {
  try {
    const response = await API.delete(`/transactions/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};