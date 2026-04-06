import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { CategoryChart } from '../components/charts/CategoryChart';
import { BalanceChart } from '../components/charts/BalanceChart';
import { formatCurrency } from '../utils/formatters';

const Statistics = () => {
  const { transactions, stats } = useContext(FinanceContext);

  // Build category-wise breakdown from real data
  const categoryMap = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-8 ml-64 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Statistics</h2>
        <p className="text-slate-500 text-sm">A breakdown of your financial activity</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-500">Total Transactions</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900">{transactions.length}</h3>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-500">Income Transactions</p>
          <h3 className="text-2xl font-bold mt-1 text-emerald-600">
            {transactions.filter(t => t.type === 'income').length}
          </h3>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-500">Expense Transactions</p>
          <h3 className="text-2xl font-bold mt-1 text-rose-600">
            {transactions.filter(t => t.type === 'expense').length}
          </h3>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Balance Trend</h3>
          <BalanceChart />
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <CategoryChart />
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Category Breakdown</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount Spent</th>
              <th className="px-6 py-4 text-right">% of Expenses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-400">
                  No expense data yet
                </td>
              </tr>
            ) : (
              topCategories.map(([category, amount]) => (
                <tr key={category} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-700">{category}</td>
                  <td className="px-6 py-4 text-right text-rose-600 font-semibold">
                    {formatCurrency(amount)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">
                    {stats.totalExpenses > 0
                      ? ((amount / stats.totalExpenses) * 100).toFixed(1) + '%'
                      : '0%'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;