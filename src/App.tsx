import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Zap, Layers, ArrowRight, Code2, Database, BrainCircuit, 
  ShoppingBag, Monitor, MessageSquare, Wrench, Clock, CheckCircle2, 
  Activity, Instagram, Facebook, Twitter, Youtube, ExternalLink 
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import './i18n';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import Admin from './pages/Admin';

// Components
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import { cn, getSettings, SiteSettings } from './lib/data';
import { ChatBot } from './components/ChatBot';
import { BottomNav } from './components/BottomNav';
import { MouseGlow } from './components/MouseGlow';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (window.location.pathname !== '/') {
        window.location.href = '/#' + id;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-center z-50 overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 border-4 border-accent border-t-transparent rounded-full shadow-[0_0_50px_rgba(255,140,0,0.3)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-black italic text-accent"
          >
            IL
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 font-mono text-[10px] uppercase tracking-[0.5em] text-white/20"
        >
          {t('home.system_loading', 'System Loading...')}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-accent/30">
      <MouseGlow />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Navigate to="/torredecontrol" replace />} />
        <Route path="/torredecontrol/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ChatBot forceOpen={isChatOpen} setForceOpen={setIsChatOpen} />
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>

      {/* Global Mobile UI */}
      <BottomNav 
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
          onTimelineClick={() => scrollTo('timeline')}
          onProjectsClick={() => scrollTo('services')}
          onStoreClick={() => window.location.href = '/store'}
      />

      <Toaster position="top-center" theme="dark" closeButton />
    </div>
  );
}

export default App;
