import { motion } from 'motion/react';
import { Monitor, ExternalLink, Layout, Smartphone, Globe, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product, getProducts, formatCurrency } from '../lib/data';

export default function Showcase() {
  const { t } = useTranslation();
  const [websites, setWebsites] = useState<Product[]>([]);

  useEffect(() => {
    setWebsites(getProducts().filter(p => p.category === 'website'));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 space-y-8 md:space-y-0">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Layout className="w-4 h-4" />
            <span>{t('showcase.gallery')}</span>
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter leading-none mb-8 text-gradient">{t('showcase.title')}</h1>
          <p className="text-lg text-white/60 leading-relaxed">
            {t('showcase.subtitle')}
          </p>
        </div>
        
        <div className="flex space-x-4">
          <div className="w-14 h-14 glass-card glow-border-blue flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-glow-blue" />
          </div>
          <div className="w-14 h-14 glass-card glow-border-orange flex items-center justify-center">
            <Monitor className="w-6 h-6 text-accent" />
          </div>
        </div>
      </div>

      <div className="space-y-32">
        {websites.map((site, i) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
          >
            <div className="flex-1 w-full">
              <div className="brutalist-border overflow-hidden group relative">
                <img 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-paper text-ink px-8 py-4 font-bold flex items-center space-x-3 hover:bg-accent hover:text-paper transition-colors">
                    <ExternalLink className="w-5 h-5" />
                    <span>{t('showcase.preview')}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase">{t('showcase.project_prefix')} 0{i + 1}</div>
                <h2 className="text-6xl font-black italic tracking-tighter">{site.name}</h2>
                <p className="text-white/60 leading-relaxed text-lg">
                  {site.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                {site.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-[10px] font-black italic uppercase tracking-[0.2em] text-white/80">
                    <div className="w-2 h-2 bg-accent shadow-[0_0_10px_rgba(255,140,0,0.6)]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/40">{t('showcase.sale_price')}</span>
                  <span className="text-4xl font-black italic tracking-tighter text-accent">{formatCurrency(site.price)}</span>
                </div>
                <a 
                  href={`https://wa.me/56929871024?text=${encodeURIComponent(t('showcase.whatsapp_msg', { name: site.name }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t('showcase.request_access')}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {websites.length === 0 && (
        <div className="py-32 text-center border-2 border-dashed border-ink/10">
          <p className="font-mono text-ink/40 uppercase tracking-widest">{t('showcase.no_sites')}</p>
        </div>
      )}
    </motion.div>
  );
}
