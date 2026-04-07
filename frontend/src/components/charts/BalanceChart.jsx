
import { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinanceContext } from '../../context/FinanceContext';

export const BalanceChart = () => {
  const { transactions } = useContext(FinanceContext);

  // Group transactions by date, calculate running balance
  const dailyMap = {};
  [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(t => {
      const day = new Date(t.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      if (!dailyMap[day]) dailyMap[day] = 0;
      dailyMap[day] += t.type === 'income' ? t.amount : -t.amount;
    });

  // Convert to running balance
  let running = 0;
  const data = Object.entries(dailyMap).map(([name, change]) => {
    running += change;
    return { name, balance: running };
  });

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm">
        No transaction data yet
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
          <YAxis hide />
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Area type="monotone" dataKey="balance" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorBal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};