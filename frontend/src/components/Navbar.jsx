import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiUser } from 'react-icons/fi';

export const Navbar = () => {
  const { role, setRole } = useContext(FinanceContext);

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 ml-64 sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-slate-800">Financial Overview</h1>
      
      <div className="flex items-center gap-4">
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="bg-slate-100 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-slate-900"
        >
          <option value="viewer">Role: Viewer</option>
          <option value="admin">Role: Admin</option>
        </select>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
          <FiUser />
        </div>
      </div>
    </div>
  );
};