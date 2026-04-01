import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Terminal, ShoppingBag, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/data';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-[100] backdrop-blur-xl bg-black/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,140,0,0.4)]">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter text-gradient uppercase">LOCO</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-[10px] font-black italic uppercase tracking-widest text-white/60 hover:text-accent transition-colors">{t('nav.home', 'HOME')}</Link>
          <Link to="/store" className="text-[10px] font-black italic uppercase tracking-widest text-white/60 hover:text-accent transition-colors">{t('nav.store', 'STORE')}</Link>
          <a href="/#solutions" className="text-[10px] font-black italic uppercase tracking-widest text-white/60 hover:text-accent transition-colors">{t('nav.solutions', 'SOLUCIONES')}</a>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-3 px-4 py-1.5 bg-black/40 border border-white/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-white/40 uppercase tracking-widest">STABLE v2.0</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
