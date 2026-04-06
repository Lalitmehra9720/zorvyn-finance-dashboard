import { motion } from 'framer-motion';

export const Card = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);