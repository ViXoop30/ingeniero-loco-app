import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { Product, getProducts, cn, formatCurrency } from '../lib/data';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="brutalist-card group"
    >
      <div className="relative aspect-video overflow-hidden mb-6 border border-ink/10">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-ink text-paper px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
          {product.category}
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black italic tracking-tighter">{product.name}</h3>
        <span className="font-mono font-black text-accent text-xl">{formatCurrency(product.price)}</span>
      </div>
      
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {product.description}
      </p>
      
      <div className="space-y-2 mb-8">
        {product.features.map((feature, i) => (
          <div key={i} className="flex items-center space-x-2 text-[10px] font-black italic uppercase tracking-wider text-white/80">
            <CheckCircle2 className="w-3 h-3 text-accent" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <a 
        href={`https://wa.me/56929871024?text=${encodeURIComponent(t('home.store.whatsapp_msg', { name: product.name }))}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full flex items-center justify-center space-x-3 group"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>{t('home.store.buy_now')}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
}

export default function Store() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'software' | 'website' | 'service'>('all');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Terminal className="w-4 h-4" />
            <span>{t('home.store.subtitle')}</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter leading-none uppercase">{t('home.store.title')}</h1>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {['all', 'software', 'website', 'service'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={cn(
                "px-6 py-2 border-2 font-black italic uppercase tracking-widest transition-all text-[10px]",
                filter === cat ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(255,140,0,0.4)]" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              )}
            >
              {cat === 'all' ? t('home.store.all') : t(`home.store.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center border-2 border-dashed border-ink/10">
          <p className="font-mono text-ink/40 uppercase tracking-widest">{t('home.store.no_products')}</p>
        </div>
      )}
    </motion.div>
  );
}
