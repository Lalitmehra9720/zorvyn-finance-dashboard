import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchTransactions, createTransaction } from '../services/transactionService';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('admin'); // Options: 'admin', 'viewer'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mockData = [
  { _id: '1', title: 'Freelance Project', amount: 15000, category: 'Salary', type: 'income', date: new Date() },
  { _id: '2', title: 'Monthly Rent', amount: 8000, category: 'Rent', type: 'expense', date: new Date() },
  { _id: '3', title: 'Zomato Order', amount: 450, category: 'Food', type: 'expense', date: new Date() },
];
  // Load data from Backend

// To load data:
const loadData = async () => {
  try {
    const { data } = await fetchTransactions();
    setTransactions(data);
  } catch (err) {
    console.warn("Backend not reachable, using mock data.");
    setTransactions(mockData); // This ensures your dashboard looks FULL
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadData();
}, []);

  // Calculate Summary Stats (Optimized with useMemo)
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions]);

  // Function to add a new transaction (Admin only logic check can be added here)
  const addNewTransaction = async (txData) => {
    if (role !== 'admin') return alert("Access Denied: Only Admins can add data.");
    try {
      const { data } = await createTransaction(txData);
      setTransactions((prev) => [data, ...prev]);
    } catch (err) {
      alert("Error adding transaction.");
    }
  };

  return (
    <FinanceContext.Provider 
      value={{ 
        transactions, 
        role, 
        setRole, 
        loading, 
        error,
        stats, 
        refreshData: loadData,
        addNewTransaction 
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};