import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, Trash2, Edit2, Save, X, Terminal, List, Clock, Zap, Layout, Monitor, MessageSquare, Database, TrendingUp, ShieldCheck, Globe, Sparkles, Rocket, Award, Cpu, BrainCircuit, ChefHat, Store, Wine, GlassWater } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Product, fetchProducts, saveProduct, deleteProduct, cn, TimelineEvent, fetchTimeline, saveTimelineEvent, deleteTimelineEvent, formatCurrency, SiteSettings, fetchSettings, saveSettings, Industry, MatrixItem, getSettings, getProducts, getTimeline } from '../lib/data';

export default function Admin() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'timeline' | 'settings' | 'vibecms'>('products');
  
  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Timeline State
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem('admin_token') === 'dummy-session-token') {
      setIsLoggedIn(true);
      
      const sync = async () => {
          const [p, tl, st] = await Promise.all([
              fetchProducts(),
              fetchTimeline(),
              fetchSettings()
          ]);
          setProducts(p);
          setTimeline(tl);
          setSettings(st);
      };
      sync();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('admin_token', data.token);
      } else {
        alert(t('admin.wrong_password'));
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await saveProduct(editingProduct);
      setProducts(getProducts());
      setEditingProduct(null);
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm(t('admin.confirm_delete_product'))) {
      await deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleSaveEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      await saveTimelineEvent(editingEvent);
      setTimeline(getTimeline());
      setEditingEvent(null);
      setIsAddingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm(t('admin.confirm_delete_event'))) {
      await deleteTimelineEvent(id);
      setTimeline(getTimeline());
    }
  };

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    if (settings) {
      await saveSettings(settings);
      alert(t('admin.settings_saved'));
    }
  };

  const startAddingProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      price: 0,
      category: 'software',
      image: 'https://picsum.photos/seed/new/800/600',
      features: []
    };
    setEditingProduct(newProduct);
    setIsAddingProduct(true);
  };

  const startAddingEvent = () => {
    const newEvent: TimelineEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      status: 'planned',
      category: ''
    };
    setEditingEvent(newEvent);
    setIsAddingEvent(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card glow-border-orange max-w-md w-full p-10"
        >
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-6">
            <Terminal className="w-4 h-4" />
            <span>{t('admin.restricted')}</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-8">
            <Trans i18nKey="admin.cms_title">ADMIN <span className="text-gradient">CMS</span></Trans>
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.password_label')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-card p-4 focus:outline-none focus:border-accent transition-colors text-white"
                placeholder={t('admin.password_placeholder')}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t('admin.login_btn')}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
            <Settings className="w-4 h-4" />
            <span>{t('admin.panel_title')}</span>
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter leading-none text-gradient">TORRE DE CONTROL</h1>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => setActiveTab('products')} className={cn("btn-tab", activeTab === 'products' && "active")}>
              <List className="w-4 h-4" />
              <span>PRODUCTOS</span>
            </button>
            <button onClick={() => setActiveTab('timeline')} className={cn("btn-tab", activeTab === 'timeline' && "active")}>
              <Clock className="w-4 h-4" />
              <span>TIMELINE</span>
            </button>
            <button onClick={() => setActiveTab('settings')} className={cn("btn-tab", activeTab === 'settings' && "active")}>
              <Layout className="w-4 h-4" />
              <span>GENERAL</span>
            </button>
            <button onClick={() => setActiveTab('vibecms')} className={cn("btn-tab", activeTab === 'vibecms' && "active")}>
              <Zap className="w-4 h-4" />
              <span>VIBECMS</span>
            </button>
          </div>
        </div>
        
        {(activeTab === 'products' || activeTab === 'timeline') && (
          <div className="flex space-x-4">
            <button
              onClick={activeTab === 'products' ? startAddingProduct : startAddingEvent}
              className="btn-primary flex items-center space-x-3"
            >
              <Plus className="w-5 h-5" />
              <span>{activeTab === 'products' ? t('admin.new_product') : t('admin.new_event')}</span>
            </button>
          </div>
        )}

        <button
          onClick={() => { localStorage.removeItem('admin_token'); setIsLoggedIn(false); }}
          className="px-6 py-3 bg-red-600/20 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase italic tracking-widest md:ml-4"
        >
          LOGOUT
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product.id} className="brutalist-card glow-border-blue flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-48 aspect-video bg-ink border border-white/10 overflow-hidden rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-3xl font-black italic tracking-tighter">{product.name}</h3>
                </div>
                <div className="font-mono font-black text-accent text-xl">{formatCurrency(product.price)}</div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => { setEditingProduct(product); setIsAddingProduct(false); }} className="p-4 glass-card hover:border-accent"><Edit2 className="w-5 h-5" /></button>
                <button onClick={() => handleDeleteProduct(product.id)} className="p-4 glass-card hover:border-red-600 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'timeline' ? (
        <div className="grid grid-cols-1 gap-6">
          {timeline.map((event) => (
            <div key={event.id} className="brutalist-card glow-border-blue flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow space-y-2">
                <h3 className="text-3xl font-black italic tracking-tighter">{event.title}</h3>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{event.date} | {event.category}</div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => { setEditingEvent(event); setIsAddingEvent(false); }} className="p-4 glass-card hover:border-accent"><Edit2 className="w-5 h-5" /></button>
                <button onClick={() => handleDeleteEvent(event.id)} className="p-4 glass-card hover:border-red-600 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'settings' ? (
        <div className="max-w-4xl mx-auto">
          {settings && (
            <form onSubmit={handleSaveSettings} className="space-y-12">
               <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">HÉROE DEL SITIO</h3>
                <div className="space-y-4">
                  <input type="text" value={settings.hero.title} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })} className="input-cms" placeholder="Título Hero" />
                  <textarea value={settings.hero.description} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, description: e.target.value } })} className="input-cms min-h-[100px]" placeholder="Descripción Hero" />
                  <input type="text" value={settings.hero.cta} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, cta: e.target.value } })} className="input-cms" placeholder="Botón CTA" />
                  <input type="text" value={settings.hero.subtitle} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })} className="input-cms" placeholder="Subtítulo Disponibilidad" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-6 flex items-center justify-center gap-3"><Save /> GUARDAR TODO</button>
            </form>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-12">
          {settings && (
            <form onSubmit={handleSaveSettings} className="space-y-12">
               {/* VibeCoding Narrative */}
               <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">NARRATIVA VIBECODING</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" value={settings.vibecoding.tagline} onChange={(e) => setSettings({ ...settings, vibecoding: { ...settings.vibecoding, tagline: e.target.value } })} className="input-cms" placeholder="Tagline" />
                    <input type="text" value={settings.vibecoding.title} onChange={(e) => setSettings({ ...settings, vibecoding: { ...settings.vibecoding, title: e.target.value } })} className="input-cms" placeholder="Título" />
                </div>
                <textarea value={settings.vibecoding.desc} onChange={(e) => setSettings({ ...settings, vibecoding: { ...settings.vibecoding, desc: e.target.value } })} className="input-cms min-h-[100px]" placeholder="Descripción Narrativa" />
              </div>

              {/* Industry Slider Manager */}
              <div className="glass-card p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">MERCADOS ESTRATÉGICOS (SLIDER)</h3>
                    <button type="button" onClick={() => {
                        const newInd: Industry = { id: Math.random().toString(), title: 'NUEVO MERCADO', desc: 'Descripción...', img: '', color: 'text-accent', iconName: 'Sparkles' };
                        setSettings({ ...settings, industries: [...settings.industries, newInd] });
                    }} className="p-2 bg-accent/20 text-accent rounded-full"><Plus /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {settings.industries.map((ind, idx) => (
                        <div key={ind.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group">
                            <button type="button" onClick={() => {
                                const newInds = settings.industries.filter((_, i) => i !== idx);
                                setSettings({ ...settings, industries: newInds });
                            }} className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 /></button>
                            <div className="space-y-4">
                                <input type="text" value={ind.title} onChange={(e) => {
                                    const newInds = [...settings.industries];
                                    newInds[idx].title = e.target.value;
                                    setSettings({ ...settings, industries: newInds });
                                }} className="input-cms text-xl font-black italic" placeholder="Título Sector" />
                                <textarea value={ind.desc} onChange={(e) => {
                                    const newInds = [...settings.industries];
                                    newInds[idx].desc = e.target.value;
                                    setSettings({ ...settings, industries: newInds });
                                }} className="input-cms text-sm h-20" placeholder="Descripción" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={ind.img} onChange={(e) => {
                                        const newInds = [...settings.industries];
                                        newInds[idx].img = e.target.value;
                                        setSettings({ ...settings, industries: newInds });
                                    }} className="input-cms text-[10px]" placeholder="URL Imagen" />
                                    <input type="text" value={ind.iconName} onChange={(e) => {
                                        const newInds = [...settings.industries];
                                        newInds[idx].iconName = e.target.value;
                                        setSettings({ ...settings, industries: newInds });
                                    }} className="input-cms text-[10px]" placeholder="Icono Lucide" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>

              {/* Matrix Manager */}
              <div className="glass-card p-8 space-y-8">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">MATRIZ DE SOLUCIONES (BENEFICIOS)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settings.matrix.map((item, idx) => (
                        <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                            <input type="text" value={item.problem} onChange={(e) => {
                                const newM = [...settings.matrix];
                                newM[idx].problem = e.target.value;
                                setSettings({ ...settings, matrix: newM });
                            }} className="input-cms text-white/50 text-[10px]" placeholder="Problema" />
                            <input type="text" value={item.solution} onChange={(e) => {
                                const newM = [...settings.matrix];
                                newM[idx].solution = e.target.value;
                                setSettings({ ...settings, matrix: newM });
                            }} className="input-cms text-accent font-black tracking-widest" placeholder="Solución" />
                            <textarea value={item.impact} onChange={(e) => {
                                const newM = [...settings.matrix];
                                newM[idx].impact = e.target.value;
                                setSettings({ ...settings, matrix: newM });
                            }} className="input-cms text-sm h-24" placeholder="Impacto" />
                        </div>
                    ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-6 flex items-center justify-center gap-3"><Save /> DESPLEGAR CAMBIOS CMS</button>
            </form>
          )}
        </div>
      )}

      {/* Product Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProduct(null)} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} className="relative brutalist-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSaveProduct} className="space-y-6 p-8">
                <input type="text" required value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="input-cms text-3xl font-black italic" placeholder="Nombre" />
                <input type="number" required value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="input-cms font-mono text-xl" />
                <textarea required value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="input-cms min-h-[100px]" />
                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-3"><Save /> <span>{t('admin.save_changes')}</span></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .input-cms { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1rem; color: #fff; transition: all 0.3s; outline: none; }
        .input-cms:focus { border-color: #ff8c00; background: rgba(255,140,0,0.05); }
        .btn-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; font-size: 10px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: 0.1em; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); border: 1px solid transparent; transition: all 0.3s; }
        .btn-tab.active { background: #ff8c00; color: #fff; }
        .btn-tab:hover:not(.active) { background: rgba(255,255,255,0.1); color: #fff; }
      `}</style>
    </motion.div>
  );
}
