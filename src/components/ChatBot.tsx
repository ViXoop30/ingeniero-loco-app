import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot = ({ 
  forceOpen, 
  setForceOpen 
}: { 
  forceOpen?: boolean; 
  setForceOpen?: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync with external state
  useEffect(() => {
    if (forceOpen !== undefined) {
      setIsOpen(forceOpen);
      if (forceOpen) setIsMinimized(false);
    }
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (setForceOpen) setForceOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const msgToSend = customMsg || input.trim();
    if (!msgToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msgToSend }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: msgToSend,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, tuve un problema al procesar tu solicitud." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión con el servidor de IA." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionKey: string) => {
    const text = t(`promo.${actionKey}`);
    handleSend(undefined, text);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 md:bottom-8 md:right-8 z-[2000] flex items-end justify-end pointer-events-none p-4 md:p-0">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="pointer-events-auto w-full md:w-[420px] glass-card border-accent/40 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col h-[600px] max-h-[85vh] rounded-[2.5rem] overflow-hidden bg-[#050614]/95 backdrop-blur-2xl"
          >
            {/* Header - Fixed Height */}
            <div className="p-6 border-b border-white/10 bg-accent/10 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(255,140,0,0.4)]">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black italic uppercase tracking-widest text-gradient-orange">{t('brand.name')}</h4>
                  <div className="flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-mono uppercase text-white/60 tracking-widest">Núcleo Activo</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setIsMinimized(true)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={handleClose} className="p-2 bg-white/5 hover:bg-red-500/10 rounded-full text-white/60 hover:text-red-500 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area - Flexible but restricted */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,0.05),transparent)]">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-[2rem] bg-accent/5 border border-accent/20 flex items-center justify-center mx-auto shadow-inner">
                      <Bot className="w-10 h-10 text-accent animate-pulse" />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 max-w-[200px]">
                      {t('chat.welcome')}
                    </p>
                  </div>

                  {/* Quick Action Buttons per Screenshot */}
                  <div className="grid grid-cols-1 gap-3 w-full max-w-[240px]">
                    <button 
                      onClick={() => handleQuickAction('cta_discount')}
                      className="group flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-2xl hover:bg-accent hover:border-accent transition-all duration-300"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent group-hover:text-white">
                        {t('promo.cta_discount')}
                      </span>
                      <Zap className="w-4 h-4 text-accent group-hover:text-white" />
                    </button>
                    <button 
                      onClick={() => handleQuickAction('cta_case')}
                      className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/50 transition-all duration-300"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">
                        {t('promo.cta_case')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent" />
                    </button>
                  </div>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group relative max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed transition-all ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-none shadow-[0_10px_30px_rgba(255,140,0,0.2)]' 
                      : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none hover:border-white/20'
                  }`}>
                    {msg.content}
                    <div className={`absolute bottom-[-20px] ${msg.role === 'user' ? 'right-0' : 'left-0'} text-[8px] font-mono uppercase text-white/20 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                      {msg.role === 'user' ? 'Sent' : 'Engineer AI'}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent/5 border border-accent/20 p-4 rounded-2xl rounded-tl-none"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Sparkles className="w-4 h-4 text-accent animate-spin" />
                        <div className="absolute inset-0 bg-accent/20 blur-md rounded-full animate-pulse" />
                      </div>
                      <span className="text-[10px] font-black italic text-accent uppercase tracking-[0.3em]">
                        {t('chat.orchestrating', 'Orquestando Respuesta...')}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area - Pinned to bottom */}
            <div className="p-6 border-t border-white/10 bg-white/5 shrink-0">
              <form onSubmit={handleSend} className="relative group">
                <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#050614] to-transparent pointer-events-none opacity-50" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-white/20 font-medium"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 p-2.5 bg-accent text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shadow-lg shadow-accent/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-[8px] text-center text-white/10 mt-4 font-black uppercase tracking-[0.3em]">
                Orchestrator AI v2.6 • Premium Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button - Enhanced */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
          if (setForceOpen) setForceOpen(true);
        }}
        className={`pointer-events-auto relative w-16 h-16 rounded-[2rem] bg-accent flex items-center justify-center text-white shadow-[0_20px_50px_rgba(255,140,0,0.5)] border-2 border-white/20 transition-all duration-500 overflow-hidden group ${
          isOpen && !isMinimized ? 'opacity-0 scale-50 pointer-events-none translate-y-10' : 'opacity-100 scale-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="w-7 h-7 relative z-10" />
        {isMinimized && (
          <span className="absolute top-3 right-3 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
