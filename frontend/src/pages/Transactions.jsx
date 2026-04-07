
import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { FiPlus, FiArrowUpRight, FiArrowDownLeft, FiX } from 'react-icons/fi';

const Transactions = () => {
  const { transactions, role, addNewTransaction } = useContext(FinanceContext);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '', amount: '', category: 'Food', type: 'expense'
  });

  const filteredData = transactions.filter(t =>
    filter === 'all' ? true : t.type === filter
  );

  const handleSubmit = async () => {
    if (!form.title || !form.amount) return alert('Please fill all fields');
    await addNewTransaction({ ...form, amount: Number(form.amount) });
    setShowModal(false);
    setForm({ title: '', amount: '', category: 'Food', type: 'expense' });
  };

  return (
    <div className="p-8 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
          <p className="text-slate-500 text-sm">Monitor your latest financial activity</p>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <FiPlus /> Add New
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          {['all', 'income', 'expense'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${
                filter === f
                  ? f === 'income' ? 'bg-emerald-100 text-emerald-700'
                    : f === 'expense' ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  No transactions found. Add one!
                </td>
              </tr>
            ) : (
              filteredData.map((t) => (
                <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {t.type === 'income'
                      ? <FiArrowDownLeft className="text-emerald-500" />
                      : <FiArrowUpRight className="text-rose-500" />}
                    <span className="font-medium text-slate-700">{t.title}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{t.category}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{formatDate(t.date)}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Add Transaction</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Freelance Project"
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Amount (₹)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  placeholder="e.g. 5000"
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {['Food', 'Rent', 'Salary', 'Entertainment', 'Travel', 'Shopping', 'Other'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Type</label>
                <div className="flex gap-3 mt-1">
                  {['income', 'expense'].map(t => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        form.type === t
                          ? t === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;