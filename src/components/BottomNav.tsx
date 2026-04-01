import React from 'react';
import { LayoutGrid, Clock, MessageCircle, ShoppingBag, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const BottomNav = ({ 
  onChatToggle, 
  onTimelineClick,
  onProjectsClick,
  onStoreClick 
}: { 
  onChatToggle: () => void;
  onTimelineClick: () => void;
  onProjectsClick: () => void;
  onStoreClick: () => void;
}) => {
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/56929871024";

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[999] md:hidden pointer-events-none"
    >
      <div className="glass-panel backdrop-blur-3xl border border-accent/30 rounded-[2.5rem] flex items-center justify-around p-4 shadow-[0_20px_80px_rgba(255,140,0,0.4)] pointer-events-auto">
        
        {/* Projects */}
        <button onClick={onProjectsClick} className="flex flex-col items-center gap-1.5 group">
          <div className="p-2.5 rounded-2xl group-active:bg-accent/30 transition-all bg-white/[0.03] border border-white/5">
            <LayoutGrid className="w-5 h-5 text-white/80 group-active:text-accent" />
          </div>
          <span className="text-[7px] font-black italic uppercase tracking-widest text-white/40">{t('nav.projects', 'Proyectos')}</span>
        </button>

        {/* Timeline */}
        <button onClick={onTimelineClick} className="flex flex-col items-center gap-1.5 group">
          <div className="p-2.5 rounded-2xl group-active:bg-accent/30 transition-all bg-white/[0.03] border border-white/5">
            <Clock className="w-5 h-5 text-white/80 group-active:text-accent" />
          </div>
          <span className="text-[7px] font-black italic uppercase tracking-widest text-white/40">{t('nav.timeline', 'Tiempo')}</span>
        </button>

        {/* WhatsApp - THE MAIN CALL TO ACTION */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative -top-10 flex flex-col items-center group scale-110"
        >
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,140,0,0.6)] border-4 border-[#020617] group-active:scale-90 transition-all animate-slow-pulse">
            <MessageCircle className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
        </a>

        {/* Store */}
        <button onClick={onStoreClick} className="flex flex-col items-center gap-1.5 group">
          <div className="p-2.5 rounded-2xl group-active:bg-accent/30 transition-all bg-white/[0.03] border border-white/5">
            <ShoppingBag className="w-5 h-5 text-white/80 group-active:text-accent" />
          </div>
          <span className="text-[7px] font-black italic uppercase tracking-widest text-white/40">{t('nav.store', 'Tienda')}</span>
        </button>

        {/* Chat */}
        <button onClick={onChatToggle} className="flex flex-col items-center gap-1.5 group">
          <div className="p-2.5 rounded-2xl group-active:bg-accent/30 transition-all bg-white/[0.03] border border-white/5 relative">
            <MessageSquare className="w-5 h-5 text-white/80 group-active:text-accent" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </div>
          <span className="text-[7px] font-black italic uppercase tracking-widest text-white/40">Chat</span>
        </button>

      </div>
    </motion.div>
  );
};
