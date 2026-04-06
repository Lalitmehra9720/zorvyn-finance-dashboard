import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Card } from '../components/ui/Card';
import { BalanceChart } from '../components/charts/BalanceChart';
import { CategoryChart } from '../components/charts/CategoryChart';
import { formatCurrency } from '../utils/formatters';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { stats, loading } = useContext(FinanceContext);

  if (loading) return <div className="p-8 text-slate-500 text-center">Loading Data...</div>;

  const cards = [
    { title: 'Total Balance', value: stats.totalBalance, color: 'text-slate-900' },
    { title: 'Total Income', value: stats.totalIncome, color: 'text-emerald-600' },
    { title: 'Total Expenses', value: stats.totalExpenses, color: 'text-rose-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-8 space-y-8 ml-64"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <h2 className={`text-2xl font-bold mt-2 ${card.color}`}>
              {formatCurrency(card.value)}
            </h2>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold mb-6">Balance Trend</h3>
          <BalanceChart />
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
          <CategoryChart />
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;