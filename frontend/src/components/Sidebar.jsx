
import { NavLink } from 'react-router-dom';
import { FiHome, FiRepeat, FiSettings, FiPieChart } from 'react-icons/fi';

export const Sidebar = () => {
  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', path: '/' },
    { icon: <FiRepeat />, label: 'Transactions', path: '/transactions' },
    { icon: <FiPieChart />, label: 'Statistics', path: '/statistics' },
    { icon: <FiSettings />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0">
      <div className="text-2xl font-bold text-slate-900 mb-10 px-4">Zorvyn</div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};