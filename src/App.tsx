import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, ShoppingBag, Monitor, Settings, Menu, X, Terminal, Cpu, Globe, Zap, MessageSquare, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Store from './pages/Store';
import Showcase from './pages/Showcase';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import WhatsAppButton from './components/WhatsAppButton';
import { cn, getSettings, SiteSettings } from './lib/data';
import { Instagram, Facebook, Twitter } from 'lucide-react';

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

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
    toast(t('activity.lang_changed'), {
      icon: <Languages className="w-4 h-4 text-accent" />,
      className: "glass-card border-accent/30 text-white font-black italic uppercase tracking-widest text-[10px]",
    });
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
      title="Cambiar Idioma / Change Language"
    >
      <Languages className="w-3.5 h-3.5 text-accent group-hover:rotate-12 transition-transform" />
      <span className="text-[10px] font-black uppercase italic tracking-widest">
        {i18n.language === 'es' ? 'ES' : 'EN'}
      </span>
    </button>
  );
}

function CookieConsent() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 z-100"
    >
      <div className="glass-card p-6 border-2 border-accent/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-accent/20 flex items-center justify-center rounded-lg shrink-0">
            <Globe className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black italic uppercase tracking-widest mb-2">{t('cookie.title')}</h4>
            <p className="text-[10px] text-white/60 leading-relaxed mb-4 uppercase font-mono tracking-wider">
              {t('cookie.text')}
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={accept}
                className="flex-1 px-4 py-2 bg-accent text-white text-[10px] font-black italic uppercase tracking-tighter rounded-lg hover:scale-105 transition-transform"
              >
                {t('cookie.accept')}
              </button>
              <Link 
                to="/privacy"
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-black italic uppercase tracking-tighter rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('cookie.policy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityToasts() {
  const { t } = useTranslation();
  
  useEffect(() => {
    const messages = [
      t('activity.toast_1'),
      t('activity.toast_2'),
      t('activity.toast_3'),
      t('activity.toast_4'),
      t('activity.toast_5'),
      t('activity.toast_6'),
      t('activity.toast_7'),
      t('activity.toast_8'),
      t('activity.toast_9'),
      t('activity.toast_10')
    ];

    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      toast(msg, {
        icon: <Zap className="w-4 h-4 text-accent" />,
        className: "glass-card border-accent/30 text-white font-black italic uppercase tracking-widest text-[10px]",
        duration: 4000,
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [t]);

  return null;
}

function Banner() {
  const { t } = useTranslation();
  const whatsappUrl = `https://wa.me/56929871024?text=${encodeURIComponent(t('home.hero_whatsapp_msg'))}`;
  
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-accent/20 border-b border-accent/30 py-2.5 relative z-[60] backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center space-x-2">
          <Zap className="w-3.5 h-3.5 text-accent animate-pulse" />
          <p className="text-[9px] md:text-[11px] font-black italic uppercase tracking-[0.1em] text-white/90">
            {t('banner.text')}
          </p>
        </div>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-1 bg-accent text-white text-[9px] font-black italic uppercase tracking-tighter rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,140,0,0.4)] border border-white/20"
        >
          <MessageSquare className="w-3 h-3" />
          <span>{t('banner.cta')}</span>
        </a>
      </div>
    </motion.div>
  );
}

function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('nav.home'), path: '/', icon: Globe },
    { name: t('nav.store'), path: '/store', icon: ShoppingBag },
    { name: t('nav.showcase'), path: '/showcase', icon: Monitor },
    { name: t('nav.admin'), path: '/admin', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-accent to-glow-orange flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-transform group-hover:rotate-12">
              <Terminal className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter italic leading-none uppercase">{t('brand.name')}</span>
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-accent">{t('brand.tagline')}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] italic transition-all hover:text-accent",
                    location.pathname === item.path ? "text-accent scale-110" : "text-white/60"
                  )}
                >
                  <item.icon className="w-3 h-3" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="h-4 w-px bg-white/10" />
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <LanguageSwitcher />
            <button 
              className="p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] border-b border-white/5 px-4 pt-2 pb-8 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-4 px-4 py-4 rounded-lg text-sm font-black uppercase italic tracking-widest",
                  location.pathname === item.path ? "bg-accent text-white" : "text-white/60 hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(t('loading.init'));

  useEffect(() => {
    const statuses = [
      t('loading.core'),
      t('loading.orchestrate'),
      t('loading.optimize'),
      t('loading.ready')
    ];
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const next = prev + Math.random() * 15;
        const statusIdx = Math.floor((next / 100) * statuses.length);
        setStatus(statuses[Math.min(statusIdx, statuses.length - 1)]);
        return Math.min(next, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete, t]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-md">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(255,140,0,0.5)]">
            <Terminal className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">{t('brand.name')}</h2>
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">{status}</p>
          </div>
        </div>
        
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-accent shadow-[0_0_15px_rgba(255,140,0,0.8)]"
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center font-mono text-[8px] tracking-widest text-white/20 uppercase">
          <span>Boot Sequence v4.0.2</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />
    </motion.div>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(getSettings());

  useEffect(() => {
    // Update settings when localStorage changes (e.g. from Admin panel)
    const handleStorageChange = () => {
      setSettings(getSettings());
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically or on route change if needed, 
    // but for this demo a simple interval or just initial load is fine.
    const interval = setInterval(handleStorageChange, 2000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <Toaster position="bottom-left" theme="dark" />
      <ActivityToasts />
      <CookieConsent />
      <WhatsAppButton />
      <Banner />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="bg-[#010409] border-t border-white/5 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-2xl tracking-tighter italic uppercase">{t('brand.name')}</span>
              </div>
              <p className="text-white/40 text-sm max-w-md leading-relaxed font-medium">
                {settings.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] mb-8 text-accent tracking-[0.3em] uppercase">{t('nav.home')}</h4>
              <ul className="space-y-4 text-xs font-black uppercase italic tracking-widest">
                <li><Link to="/" className="text-white/60 hover:text-accent transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/store" className="text-white/60 hover:text-accent transition-colors">{t('nav.store')}</Link></li>
                <li><Link to="/showcase" className="text-white/60 hover:text-accent transition-colors">{t('nav.showcase')}</Link></li>
                <li><Link to="/privacy" className="text-white/60 hover:text-accent transition-colors">{t('nav.privacy')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] mb-8 text-accent tracking-[0.3em] uppercase">{t('footer.contact')}</h4>
              <p className="text-xs font-black uppercase italic tracking-widest text-white/60 mb-2">victor.garcia.manriquez@gmail.com</p>
              <a 
                href={`https://wa.me/56929871024?text=${encodeURIComponent(t('footer.whatsapp_msg'))}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-black uppercase italic tracking-widest text-accent hover:text-white transition-colors block mb-6"
              >
                WhatsApp: +56 9 2987 1024
              </a>
              {/* Social Icons */}
              {settings.showSocialIcons && (
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent hover:text-accent transition-all cursor-pointer group">
                    <Instagram className="w-5 h-5 group-hover:scale-110" />
                  </a>
                  <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent hover:text-accent transition-all cursor-pointer group">
                    <TikTokIcon className="w-5 h-5 group-hover:scale-110" />
                  </a>
                  <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent hover:text-accent transition-all cursor-pointer group">
                    <Facebook className="w-5 h-5 group-hover:scale-110" />
                  </a>
                  <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent hover:text-accent transition-all cursor-pointer group">
                    <Twitter className="w-5 h-5 group-hover:scale-110" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/20">
              {t('footer.rights', { year: new Date().getFullYear() })}
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black italic uppercase tracking-widest">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>{t('footer.optimized')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
