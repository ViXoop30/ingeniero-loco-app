import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Gift, Zap } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Show banner after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/56929871024?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:w-[450px] z-50"
        >
          <div className="glass-card p-1 border-accent/30 bg-black/90 shadow-[0_0_50px_rgba(242,125,38,0.3)] overflow-hidden relative">
            {/* Animated Background Glow */}
            <motion.div
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 blur-[60px] rounded-full"
            />

            <div className="relative p-6">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/50 flex items-center justify-center shrink-0">
                  <Gift className="w-7 h-7 text-accent animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">
                    {t('promo.title')}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-tight">
                    <Trans i18nKey="promo.description">
                      Obtén un <span className="text-accent font-bold">descuento especial</span> en tu primera compra como cliente nuevo.
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-2">
                <button
                  onClick={() => handleWhatsAppClick(t('promo.whatsapp_discount'))}
                  className="w-full bg-accent hover:bg-accent/80 text-white font-black italic py-3 rounded-lg transition-all flex items-center justify-center space-x-2 group shadow-[0_0_20px_rgba(242,125,38,0.4)]"
                >
                  <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                  <span className="uppercase tracking-widest text-xs">{t('promo.cta_discount')}</span>
                </button>

                <button
                  onClick={() => handleWhatsAppClick(t('promo.whatsapp_case'))}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('promo.cta_case')}</span>
                </button>
              </div>
              
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{t('promo.limited_time')}</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
