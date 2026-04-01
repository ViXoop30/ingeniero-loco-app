import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Zap, Layers, ArrowRight, Code2, Database, BrainCircuit, 
  ShoppingBag, Monitor, MessageSquare, Wrench, Clock, CheckCircle2, 
  Activity, Instagram, Facebook, Twitter, Youtube, ExternalLink, 
  TrendingUp, Users, Globe, ShoppingCart, ShieldCheck, Sparkles,
  Lock, Award, BarChart3, Rocket, ChefHat, Store, Wine, GlassWater, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { getTimeline, TimelineEvent, cn, formatCurrency, getSettings, fetchSettings, SiteSettings, Industry, MatrixItem } from '../lib/data';
import { DigitalRain, NeuralPulse, FloatingCode, Scanner, GlitchText } from '../components/WowEffect';
import { PromoBanner } from '../components/PromoBanner';

// Helper to render lucide icons by name
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const icons: any = {
    ChefHat, Store, Wine, GlassWater, Zap, TrendingUp, Database, ShieldCheck, Globe, MessageSquare, Sparkles, Rocket, Award, Cpu, BrainCircuit
  };
  const Icon = icons[name] || Sparkles;
  return <Icon className={className} />;
};

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

const IndustrySlider = ({ industries }: { industries: Industry[] }) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % industries.length);
    const prev = () => setIndex((prev) => (prev - 1 + industries.length) % industries.length);

    if (!industries.length) return null;

    return (
        <div className="section-padding relative overflow-hidden" id="solutions">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 text-accent font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">
                            <Sparkles className="w-4 h-4 animate-slow-pulse" />
                            <span>{t('home.industries.tagline', 'SOLUCIONES VERTICALES')}</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-gradient leading-[0.85]">
                            <Trans i18nKey="home.industries.title">MERCADOS <br/><span className="text-white/20">ESTRATÉGICOS</span></Trans>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={prev} className="p-4 glass-card border-white/10 hover:border-accent transition-all"><ChevronLeft /></button>
                        <button onClick={next} className="p-4 glass-card border-white/10 hover:border-accent transition-all"><ChevronRight /></button>
                    </div>
                </div>

                <div className="relative aspect-video w-full glass-card border-white/5 rounded-[4rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, x: 100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: -100 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="absolute inset-0 flex flex-col md:flex-row"
                        >
                            <div className="flex-1 p-12 md:p-24 flex flex-col justify-center bg-linear-to-r from-ink via-ink/90 to-transparent z-10">
                                <IconRenderer name={industries[index].iconName} className={cn("w-20 h-20 mb-10", industries[index].color)} />
                                <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white mb-6 leading-none">
                                    {industries[index].title}
                                </h3>
                                <p className="text-xl md:text-3xl text-white/40 italic font-medium leading-relaxed mb-12 max-w-2xl">
                                    {industries[index].desc}
                                </p>
                                <div className="flex items-center space-x-6">
                                    <div className="px-6 py-2 bg-accent/10 border border-accent/30 rounded-full text-[10px] font-black italic text-accent uppercase tracking-widest">IA ORCHESTRATED</div>
                                    <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black italic text-white/40 uppercase tracking-widest">VIBECODING ENABLED</div>
                                </div>
                            </div>
                            <div className="flex-1 h-full relative">
                                <img 
                                    src={industries[index].img} 
                                    alt={industries[index].title} 
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-ink to-transparent" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const TechMarquee = () => {
    const techs = ["REACT", "NEXT.JS", "TYPESCRIPT", "PYTHON", "GROQ", "DOCKER", "AWS", "SUPABASE", "PRISMA", "TAILWIND", "FRAMER MOTION"];
    return (
        <div className="py-12 bg-white/[0.01] border-y border-white/5 overflow-hidden whitespace-nowrap relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-ink to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-ink to-transparent z-10" />
            <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="inline-block"
            >
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i}>
                        {techs.map(t => (
                            <span key={t} className="text-4xl md:text-6xl font-black italic tracking-tighter text-white/5 mx-12 border-b-4 border-accent/10">{t}</span>
                        ))}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default function Home() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial sync with server
    const sync = async () => {
        const [s, tl] = await Promise.all([
           fetchSettings(),
           getTimeline() 
        ]);
        setSettings(s);
        setTimeline(tl);
    };
    sync();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-ink text-white selection:bg-accent selection:text-white pt-12 overflow-x-hidden"
    >
      <div className="noise-bg" />
      
      {/* Dynamic Navigation Top Bar */}
      {settings.showSocialIcons && (
        <div className="fixed top-0 left-0 w-full h-12 glass-panel border-b border-white/5 flex items-center justify-between px-4 sm:px-12 z-50">
          <div className="flex items-center space-x-8">
            <span className="text-[10px] font-black italic text-white/20 uppercase tracking-[0.5em] hidden md:inline">SYSTEM STATUS: FULLY OPERATIONAL</span>
            <div className="flex items-center space-x-5">
              <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><TikTokIcon className="w-4 h-4" /></a>
              <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex items-center space-x-3 px-4 py-1.5 bg-accent/5 border border-accent/20 rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-accent shadow-glow" />
            <span className="text-[10px] font-black italic text-accent uppercase tracking-widest">{t('home.online', 'EN LÍNEA')}</span>
          </motion.div>
        </div>
      )}

      <DigitalRain />
      <NeuralPulse />
      <FloatingCode />
      <Scanner />
      <PromoBanner />

      {/* Operational Active Status Bar */}
      <div className="fixed bottom-24 right-8 z-[500] hidden lg:flex flex-col items-end space-y-4">
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-panel p-4 border-accent/20 rounded-2xl flex items-center gap-4 bg-black/60 shadow-glow"
          >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-glow" />
              <span className="text-[10px] font-black italic uppercase text-accent tracking-widest">
                 Live: Orquestando Sistema CRM v2.4 (Cliente #92)
              </span>
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4 border-white/5 rounded-2xl flex items-center gap-4 bg-black/60"
          >
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow" />
              <span className="text-[10px] font-black italic uppercase text-white/30 tracking-widest">
                 Uptime Global: 99.98% [Cluster 7]
              </span>
          </motion.div>
      </div>

      {/* Authority Hero Section */}
      <section className="relative pt-32 md:pt-56 pb-24 md:pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
            <motion.div 
              style={{ y: y2 }}
              className="flex-2 text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center space-x-4 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white/60 text-[11px] font-black italic uppercase tracking-[0.5em] mb-12 shadow-glow-blue"
              >
                <Award className="w-4 h-4 text-accent" />
                <span>{t('home.hero_availability', 'PARTNER ESTRATÉGICO DE CRECIMIENTO')}</span>
              </motion.div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.9] mb-10 italic text-gradient uppercase"
              >
                <GlitchText text={settings.hero.title.split(' ').slice(0, 1).join('')} />
                <br />
                <span className="text-white/10" dangerouslySetInnerHTML={{ __html: settings.hero.title.split(' ').slice(1).join(' ') }} />
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl text-xl md:text-3xl text-white/40 mb-16 mx-auto lg:mx-0 leading-relaxed font-medium italic"
              >
                {settings.hero.description}
              </motion.p>
              
              <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 justify-center lg:justify-start items-center">
                <a 
                  href={`https://wa.me/56929871024?text=${encodeURIComponent(t('home.hero_whatsapp_msg'))}`}
                  className="btn-premium px-16 py-8 text-xl group w-full sm:w-auto shadow-[0_30px_80px_rgba(255,140,0,0.4)]"
                >
                  <Rocket className="w-7 h-7 group-hover:rotate-45 group-hover:-translate-y-2 transition-all duration-500" />
                  <span>{settings.hero.cta}</span>
                </a>
                <div className="flex flex-col items-center sm:items-start space-y-4">
                  <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-ink bg-white/10 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all">
                        <img src={`https://i.pravatar.cc/150?u=v${i}`} alt="Client" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-ink bg-accent flex items-center justify-center text-[11px] font-black">+24</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <p className="text-[11px] font-black italic uppercase tracking-widest text-accent">{settings.hero.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
               style={{ scale: 1.1 }}
               className="flex-1 w-full max-w-xl relative group"
            >
                <div className="absolute inset-0 bg-accent/30 blur-[180px] rounded-full animate-slow-pulse -z-10" />
                <div className="glass-card p-2 border-white/5 rounded-[5rem] overflow-hidden shadow-glow">
                    <div className="relative aspect-square rounded-[4.8rem] overflow-hidden bg-black/80 flex items-center justify-center border-4 border-white/10">
                        <DigitalRain />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-10 border-[60px] border-dashed border-accent/20 rounded-full"
                        />
                        <div className="relative z-10 text-center scale-125">
                            <BrainCircuit className="w-40 h-40 text-accent mx-auto mb-8 drop-shadow-[0_0_40px_rgba(255,140,0,1)]" />
                            <div className="space-y-2">
                                <div className="text-7xl font-black italic text-white tracking-widest leading-none">NUCLEUS</div>
                                <div className="text-[12px] font-mono text-accent uppercase tracking-[1em]">V2.0 ALPHA</div>
                            </div>
                        </div>
                        {/* Live Log - Enhanced */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full px-16">
                            <div className="glass-panel p-6 border-white/10 rounded-[2rem] bg-black/60 font-mono text-[10px] text-accent/80 uppercase shadow-2xl">
                                <div className="flex justify-between mb-3 items-center">
                                    <span className="flex items-center gap-2"><Cpu className="w-3 h-3 animate-spin"/> Processing...</span>
                                    <span className="text-white font-black">STABLE</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ width: ["10%", "95%", "80%", "100%", "20%"] }}
                                        transition={{ duration: 15, repeat: Infinity }}
                                        className="h-full bg-linear-to-r from-accent to-glow-blue shadow-glow"
                                    />
                                </div>
                                <div className="mt-3 text-[8px] opacity-30">ARCH: X86_64 NEURAL CLUSTER [OK]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* VibeCoding & AI Orchestration Intro Section */}
      <section className="section-padding relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center mb-32">
              <div className="inline-flex items-center gap-4 px-6 py-2 glass-panel border-white/10 rounded-full mb-12">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-black italic text-white/50 uppercase tracking-[0.4em]">{settings.vibecoding.tagline}</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-gradient leading-[0.9] mb-12" dangerouslySetInnerHTML={{ __html: settings.vibecoding.title }} />
              <p className="max-w-4xl mx-auto text-xl md:text-3xl text-white/40 italic font-medium leading-relaxed">
                  {settings.vibecoding.desc}
              </p>
          </div>
      </section>

      {/* industry Showcase Slider */}
      <IndustrySlider industries={settings.industries} />

      {/* Critical Needs & Technical Solutions Matrix */}
      <section className="section-padding bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                  <div className="max-w-4xl">
                      <h2 className="text-6xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-gradient" dangerouslySetInnerHTML={{ __html: settings.needs.title }} />
                  </div>
                  <div className="text-right">
                      <p className="text-[12px] font-black italic uppercase text-accent tracking-[0.4em] animate-pulse mb-2">{settings.needs.subtitle}</p>
                      <p className="text-xl text-white/30 italic">{settings.needs.desc}</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {settings.matrix.map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="glass-panel p-10 border-white/5 rounded-[3rem] hover:border-accent/40 transition-all group"
                      >
                          <div className="flex items-center gap-6 mb-8">
                             <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors shadow-glow">
                                <IconRenderer name={item.iconName} className="w-7 h-7 text-white" />
                             </div>
                             <div className="text-[10px] font-mono text-accent uppercase tracking-widest">{item.solution}</div>
                          </div>
                          <h4 className="text-2xl font-black italic tracking-tighter text-white/30 mb-4">{item.problem}</h4>
                          <p className="text-xl font-black italic tracking-tighter text-white mb-6 uppercase leading-tight">{item.impact}</p>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 2, delay: i*0.2 }}
                                className="h-full bg-accent"
                              />
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Operational Pulse (Timeline) Section */}
      {timeline.length > 0 && (
        <section className="section-padding relative overflow-hidden" id="timeline">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <div className="max-w-4xl">
                        <div className="flex items-center space-x-3 text-accent font-mono text-[10px] tracking-[0.5em] mb-4 uppercase">
                            <Clock className="w-4 h-4" />
                            <span>{t('home.timeline_tagline', 'HISTORIAL DE ORQUESTACIÓN')}</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-gradient">PULSO <br/>OPERACIONAL</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 relative">
                    {/* Neural Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-accent/0 via-accent/40 to-accent/0 hidden lg:block" />
                    
                    {timeline.map((event, i) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className={cn(
                                "flex flex-col lg:flex-row items-center gap-12",
                                i % 2 !== 0 && "lg:flex-row-reverse"
                            )}
                        >
                            <div className="flex-1 w-full lg:text-right">
                                {i % 2 === 0 && (
                                    <div className="space-y-4">
                                        <div className="text-4xl font-black italic tracking-tighter text-white">{event.title}</div>
                                        <p className="text-xl text-white/30 italic font-medium leading-relaxed">{event.description}</p>
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-ink border-4 border-white/10 rounded-2xl flex items-center justify-center shadow-glow group hover:border-accent transition-all">
                                    <Zap className="w-6 h-6 text-accent" />
                                </div>
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10px] font-mono text-accent whitespace-nowrap hidden lg:block uppercase tracking-widest">{event.date}</div>
                            </div>

                            <div className="flex-1 w-full lg:text-left">
                                {i % 2 !== 0 && (
                                    <div className="space-y-4">
                                        <div className="text-4xl font-black italic tracking-tighter text-white">{event.title}</div>
                                        <p className="text-xl text-white/30 italic font-medium leading-relaxed">{event.description}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* Trust & Guarantee Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { icon: ShieldCheck, title: t('home.box_stability_title', 'Sistemas Blindados'), desc: t('home.box_stability_desc', 'Arquitectura redundante con 99.9% de uptime garantizado.') },
                { icon: Lock, title: t('home.box_privacy_title', 'Privacidad Total'), desc: t('home.box_privacy_desc', 'Protocolos de confidencialidad absoluta sobre tus datos de negocio.') },
                { icon: BarChart3, title: t('home.box_roi_title', 'ROI Optimizado'), desc: t('home.box_roi_desc', 'Cada línea de código está diseñada para generar beneficios directos.') }
            ].map((box, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center text-center p-8 glass-panel border-white/5 rounded-[2.5rem]"
                >
                    <box.icon className="w-12 h-12 text-accent mb-6 drop-shadow-glow" />
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4">{box.title}</h4>
                    <p className="text-sm text-white/30 italic font-medium">{box.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Cyber Footer */}
      <footer className="py-32 border-t border-white/5 relative z-10 glass-panel mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
            <div className="max-w-xl">
              <div className="text-6xl font-black italic tracking-tighter uppercase text-gradient mb-8 leading-none">{t('brand.name')}</div>
              <p className="text-xl text-white/30 font-medium italic mb-12">{settings.footer.description}</p>
              <div className="flex gap-10">
                <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><Instagram size={28} /></a>
                <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><TikTokIcon size={28} /></a>
                <a href="#" className="text-white/20 hover:text-accent transition-all hover:scale-125"><Facebook size={28} /></a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
                <div>
                   <h5 className="text-[12px] font-black italic uppercase text-accent mb-8 tracking-widest">{t('home.work_order')}</h5>
                   <ul className="space-y-4 text-white/40 text-sm font-black italic uppercase tracking-tighter">
                       <li className="hover:text-white cursor-pointer transition-colors" onClick={() => window.scrollTo(0,0)}>{t('nav.home')}</li>
                       <li className="hover:text-white cursor-pointer transition-colors"><Link to="/store">{t('nav.store')}</Link></li>
                   </ul>
                </div>
                <div>
                   <h5 className="text-[12px] font-black italic uppercase text-accent mb-8 tracking-widest">LEGAL</h5>
                   <ul className="space-y-4 text-white/40 text-sm font-black italic uppercase tracking-tighter">
                       <li className="hover:text-white cursor-pointer transition-colors"><Link to="/privacy">{t('nav.privacy')}</Link></li>
                       <li className="hover:text-white cursor-pointer transition-colors">{t('home.security', 'Seguridad')}</li>
                   </ul>
                </div>
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.8em] text-white/10">
              &copy; 2026 {t('brand.name').toUpperCase()}. {t('footer.industrial_secured', 'INDUSTRIAL PERFORMANCE SECURED.')}
            </p>
            <div className="flex items-center gap-4 px-6 py-2 glass-panel border-white/10 rounded-full">
                 <ShieldCheck className="w-4 h-4 text-accent" />
                 <span className="text-[9px] font-black italic uppercase text-white/30 tracking-[0.2em]">SSL: AES-256 ENCRYPTED</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
