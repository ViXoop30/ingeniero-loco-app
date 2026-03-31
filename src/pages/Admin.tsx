import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, Trash2, Edit2, Save, X, Terminal, List, Clock } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Product, getProducts, saveProduct, deleteProduct, cn, TimelineEvent, getTimeline, saveTimelineEvent, deleteTimelineEvent, formatCurrency, SiteSettings, getSettings, saveSettings } from '../lib/data';

export default function Admin() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'timeline' | 'settings'>('products');
  
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
    if (isLoggedIn) {
      setProducts(getProducts());
      setTimeline(getTimeline());
      setSettings(getSettings());
    }
  }, [isLoggedIn]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock password
      setIsLoggedIn(true);
    } else {
      alert(t('admin.wrong_password'));
    }
  };

  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      saveProduct(editingProduct);
      setProducts(getProducts());
      setEditingProduct(null);
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm(t('admin.confirm_delete_product'))) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleSaveEvent = (e: FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      saveTimelineEvent(editingEvent);
      setTimeline(getTimeline());
      setEditingEvent(null);
      setIsAddingEvent(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm(t('admin.confirm_delete_event'))) {
      deleteTimelineEvent(id);
      setTimeline(getTimeline());
    }
  };

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    if (settings) {
      saveSettings(settings);
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
          <div className="mb-8 p-4 bg-black/40 rounded border border-white/5 font-mono text-[10px] text-white/40">
            <div className="flex items-center space-x-2">
              <span className="text-accent">$</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="overflow-hidden whitespace-nowrap inline-block border-r border-accent animate-blink"
              >
                sudo access --level=root
              </motion.span>
            </div>
            <div className="mt-1 text-green-500/60">[AUTH_REQUIRED]</div>
          </div>
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
          <h1 className="text-7xl font-black italic tracking-tighter leading-none text-gradient">{t('admin.gestion_title')}</h1>
          
          <div className="flex space-x-4 pt-4">
            <button 
              onClick={() => setActiveTab('products')}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 text-[10px] font-black uppercase italic tracking-widest transition-all",
                activeTab === 'products' ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              <List className="w-4 h-4" />
              <span>{t('admin.tab_products')}</span>
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 text-[10px] font-black uppercase italic tracking-widest transition-all",
                activeTab === 'timeline' ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              <Clock className="w-4 h-4" />
              <span>{t('admin.tab_timeline')}</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 text-[10px] font-black uppercase italic tracking-widest transition-all",
                activeTab === 'settings' ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              <Settings className="w-4 h-4" />
              <span>{t('admin.tab_settings')}</span>
            </button>
          </div>
        </div>
        
        {activeTab !== 'settings' && (
          <button
            onClick={activeTab === 'products' ? startAddingProduct : startAddingEvent}
            className="btn-primary flex items-center space-x-3"
          >
            <Plus className="w-5 h-5" />
            <span>{activeTab === 'products' ? t('admin.new_product') : t('admin.new_event')}</span>
          </button>
        )}
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
                  <span className="font-mono text-[8px] bg-accent text-white px-2 py-1 rounded uppercase tracking-widest">{product.category}</span>
                </div>
                <p className="text-white/60 text-sm line-clamp-1">{product.description}</p>
                <div className="font-mono font-black text-accent text-xl">{formatCurrency(product.price)}</div>
              </div>
              <div className="flex space-x-4 w-full md:w-auto">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setIsAddingProduct(false);
                  }}
                  className="flex-1 md:flex-none glass-card p-4 hover:border-accent transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 md:flex-none glass-card p-4 hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'timeline' ? (
        <div className="grid grid-cols-1 gap-6">
          {timeline.map((event) => (
            <div key={event.id} className="brutalist-card glow-border-blue flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-3xl font-black italic tracking-tighter">{event.title}</h3>
                  <span className={cn(
                    "font-mono text-[8px] px-2 py-1 rounded uppercase tracking-widest",
                    event.status === 'completed' ? "bg-green-500/20 text-green-500" :
                    event.status === 'in-progress' ? "bg-accent/20 text-accent" : "bg-white/10 text-white/40"
                  )}>
                    {t(`admin.status_${event.status.replace('-', '_')}`)}
                  </span>
                </div>
                <p className="text-white/60 text-sm line-clamp-1">{event.description}</p>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{event.date} | {event.category}</div>
              </div>
              <div className="flex space-x-4 w-full md:w-auto">
                <button
                  onClick={() => {
                    setEditingEvent(event);
                    setIsAddingEvent(false);
                  }}
                  className="flex-1 md:flex-none glass-card p-4 hover:border-accent transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="flex-1 md:flex-none glass-card p-4 hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {settings && (
            <form onSubmit={handleSaveSettings} className="space-y-12">
              {/* General Settings */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">{t('admin.general_settings')}</h3>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest">{t('admin.show_social_icons')}</h4>
                    <p className="text-[10px] text-white/40 uppercase font-mono">{t('admin.show_social_icons_desc')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, showSocialIcons: !settings.showSocialIcons })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      settings.showSocialIcons ? "bg-accent" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      settings.showSocialIcons ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>

              {/* Hero Settings */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">{t('admin.hero_section')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.hero_title')}</label>
                    <input
                      type="text"
                      value={settings.hero.title}
                      onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.hero_description')}</label>
                    <textarea
                      value={settings.hero.description}
                      onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, description: e.target.value } })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Story Settings */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">{t('admin.story_section')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.story_title')}</label>
                    <input
                      type="text"
                      value={settings.story.title}
                      onChange={(e) => setSettings({ ...settings, story: { ...settings.story, title: e.target.value } })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.story_content')}</label>
                    <textarea
                      value={settings.story.content}
                      onChange={(e) => setSettings({ ...settings, story: { ...settings.story, content: e.target.value } })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white min-h-[150px]"
                    />
                  </div>
                </div>
              </div>

              {/* News Settings */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">{t('admin.news_section')}</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.news_title')}</label>
                      <input
                        type="text"
                        value={settings.news.title}
                        onChange={(e) => setSettings({ ...settings, news: { ...settings.news, title: e.target.value } })}
                        className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.news_subtitle')}</label>
                      <input
                        type="text"
                        value={settings.news.subtitle}
                        onChange={(e) => setSettings({ ...settings, news: { ...settings.news, subtitle: e.target.value } })}
                        className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/60">{t('admin.news_items')}</h4>
                    {settings.news.items.map((item, idx) => (
                      <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                        <div>
                          <label className="block text-[8px] font-black uppercase tracking-widest mb-2 text-white/40">{t('admin.item_title')} {idx + 1}</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...settings.news.items];
                              newItems[idx].title = e.target.value;
                              setSettings({ ...settings, news: { ...settings.news, items: newItems } });
                            }}
                            className="w-full glass-card p-3 focus:outline-none focus:border-accent text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black uppercase tracking-widest mb-2 text-white/40">{t('admin.item_desc')} {idx + 1}</label>
                          <textarea
                            value={item.desc}
                            onChange={(e) => {
                              const newItems = [...settings.news.items];
                              newItems[idx].desc = e.target.value;
                              setSettings({ ...settings, news: { ...settings.news, items: newItems } });
                            }}
                            className="w-full glass-card p-3 focus:outline-none focus:border-accent text-white text-sm min-h-[80px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Settings */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black italic uppercase tracking-widest text-accent">{t('admin.footer_section')}</h3>
                <div>
                  <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.footer_description')}</label>
                  <textarea
                    value={settings.footer.description}
                    onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, description: e.target.value } })}
                    className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white min-h-[100px]"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-3 py-6">
                <Save className="w-6 h-6" />
                <span className="text-xl">{t('admin.save_all_settings')}</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Product Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative brutalist-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter uppercase">
                  {isAddingProduct ? t('admin.new_product') : t('admin.edit_product')}
                </h2>
                <button onClick={() => setEditingProduct(null)} className="p-2 hover:text-accent">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.name')}</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.price')}</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.description')}</label>
                  <textarea
                    required
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.category')}</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white bg-ink"
                    >
                      <option value="software">{t('admin.cat_software')}</option>
                      <option value="website">{t('admin.cat_website')}</option>
                      <option value="service">{t('admin.cat_service')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.image_url')}</label>
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.features')}</label>
                  <input
                    type="text"
                    value={editingProduct.features.join(', ')}
                    onChange={(e) => setEditingProduct({ ...editingProduct, features: e.target.value.split(',').map(f => f.trim()) })}
                    className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    placeholder={t('admin.placeholder_features')}
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-3">
                  <Save className="w-5 h-5" />
                  <span>{t('admin.save_changes')}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Timeline Event Edit Modal */}
      <AnimatePresence>
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingEvent(null)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative brutalist-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter uppercase">
                  {isAddingEvent ? t('admin.new_event') : t('admin.edit_event')}
                </h2>
                <button onClick={() => setEditingEvent(null)} className="p-2 hover:text-accent">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.project_title')}</label>
                    <input
                      type="text"
                      required
                      value={editingEvent.title}
                      onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.date')}</label>
                    <input
                      type="date"
                      required
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.advance_desc')}</label>
                  <textarea
                    required
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.status')}</label>
                    <select
                      value={editingEvent.status}
                      onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white bg-ink"
                    >
                      <option value="planned">{t('admin.status_planned')}</option>
                      <option value="in-progress">{t('admin.status_in_progress')}</option>
                      <option value="completed">{t('admin.status_completed')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black italic uppercase tracking-[0.2em] mb-2 text-white/60">{t('admin.category')}</label>
                    <input
                      type="text"
                      value={editingEvent.category}
                      onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                      className="w-full glass-card p-4 focus:outline-none focus:border-accent text-white"
                      placeholder={t('admin.placeholder_category')}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-3">
                  <Save className="w-5 h-5" />
                  <span>{t('admin.save_event')}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
