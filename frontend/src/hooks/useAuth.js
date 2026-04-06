import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const useAuth = () => {
  const { role, setRole } = useContext(FinanceContext);

  const isAdmin = role === 'admin';
  const isViewer = role === 'viewer';

  // Toggle function for the UI switch
  const toggleRole = () => {
    setRole(prev => (prev === 'admin' ? 'viewer' : 'admin'));
  };

  return {
    role,
    isAdmin,
    isViewer,
    toggleRole,
  };
};

export default useAuth;