import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Terminal, Cpu, Zap, Layers, ArrowRight, Code2, Database, BrainCircuit, 
  ShoppingBag, Monitor, MessageSquare, Wrench, Clock, CheckCircle2, 
  Activity, Instagram, Facebook, Twitter, Youtube, ExternalLink, 
  TrendingUp, Users, Globe 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { getTimeline, TimelineEvent, cn, formatCurrency, getSettings, SiteSettings } from '../lib/data';
import { DigitalRain, NeuralPulse, FloatingCode, Scanner, GlitchText } from '../components/WowEffect';
import { PromoBanner } from '../components/PromoBanner';

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

export default function Home() {
  const { t } = useTranslation();
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeline(getTimeline());
    setSettings(getSettings());
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const whatsappUrl = "https://wa.me/56929871024";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-black text-white selection:bg-accent selection:text-white pt-12"
    >
      {/* Social Media Top Bar */}
      {settings.showSocialIcons && (
        <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 z-40">
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:inline">{t('home.social_connect')}</span>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-white/60 hover:text-accent transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors"><TikTokIcon className="w-4 h-4" /></a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono text-accent animate-pulse uppercase tracking-widest">{t('home.system_online')}</span>
          </div>
        </div>
      )}
      <DigitalRain />
      <NeuralPulse />
      <FloatingCode />
      <Scanner />
      <PromoBanner />

      {/* Background Elements for Parallax */}
      <motion.div 
        style={{ y: y1, opacity: 0.2 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-glow-blue/20 blur-[120px] rounded-full" />
      </motion.div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-50 opacity-30" />

      {/* Meeting Scheduler Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-2 border-accent/30 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] -z-10 group-hover:bg-accent/20 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black italic uppercase tracking-widest mb-6">
                  <Zap className="w-3 h-3" />
                  <span>{t('home.availability')}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 uppercase leading-none">
                  {settings.hero.title}
                </h2>
                <p className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
                  {settings.hero.description}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <a 
                  href={`https://wa.me/56929871024?text=${encodeURIComponent(t('home.hero_whatsapp_msg'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-4 px-12 py-6 text-xl"
                >
                  <MessageSquare className="w-8 h-8" />
                  <span>{t('home.hero_cta')}</span>
                </a>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                  {t('home.hero_sub')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              style={{ y: y2 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-glow-blue text-[10px] font-mono tracking-[0.4em] uppercase mb-8"
              >
                <Zap className="w-4 h-4 animate-pulse text-accent" />
                <span>{t('home.active_systems')}</span>
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-6 italic text-gradient uppercase"
              >
                <GlitchText text={t('home.work_order')} />
              </motion.h1>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-black italic tracking-tight text-white mb-8 opacity-90 uppercase"
              >
                {t('brand.name')}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-lg text-xl text-white/60 mb-12 mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                {t('home.support_desc')}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start mb-12"
              >
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-4 group text-lg"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>{t('home.whatsapp')}</span>
                </a>
                <Link to="/store" className="glass-card px-10 py-5 flex items-center justify-center space-x-3 hover:bg-white/10 transition-all font-black italic uppercase tracking-tighter border-2 border-white/20 hover:border-accent/50">
                  <ShoppingBag className="w-6 h-6" />
                  <span>{t('home.catalog')}</span>
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center lg:justify-start space-x-6"
              >
                <div className="flex items-center space-x-3 text-accent font-black italic text-3xl">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <MessageSquare className="w-7 h-7 text-green-400" />
                  </div>
                  <span className="tracking-tighter">+569 29871024</span>
                </div>
              </motion.div>
            </motion.div>

            {/* The "Digital Core" - AI Orchestrator Visual */}
            <motion.div
              style={{ y: y1, rotate, scale }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex-1 relative max-w-md"
            >
              <div className="relative z-10 rounded-[3rem] border-8 border-white/10 p-4 bg-linear-to-b from-white/5 to-transparent backdrop-blur-xl shadow-2xl">
                <div className="rounded-[2.5rem] overflow-hidden border-4 border-accent/30 shadow-[0_0_80px_rgba(255,140,0,0.4)] aspect-square relative bg-black">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.2)_0%,transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-64 h-64 border-2 border-accent/20 rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          rotate: -360,
                          scale: [1.1, 1, 1.1],
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-48 h-48 border-2 border-glow-blue/20 rounded-full flex items-center justify-center"
                      >
                        <BrainCircuit className="w-24 h-24 text-accent animate-pulse" />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Floating Data Bits */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -40, 0],
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                      className="absolute w-1 h-1 bg-accent rounded-full"
                      style={{
                        top: `${10 + i * 8}%`,
                        left: `${5 + i * 10}%`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Floating Icons with enhanced animations */}
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [12, 25, 12] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-24 h-24 glass-card flex items-center justify-center glow-border-orange rotate-12 z-20"
                >
                  <Wrench className="text-accent w-12 h-12 drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]" />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [-12, -25, -12] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 glass-card flex items-center justify-center glow-border-blue -rotate-12 z-20"
                >
                  <Cpu className="text-glow-blue w-12 h-12 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
                </motion.div>

                {/* Status Badge */}
                <div className="absolute -bottom-4 right-10 bg-accent text-white font-black italic px-4 py-2 rounded-lg text-xs tracking-widest shadow-xl z-30">
                  {t('home.online')}
                </div>
              </div>
              
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/10 blur-[120px] -z-10 rounded-full" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-glow-blue/10 blur-[100px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-glow-blue font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
                <Clock className="w-4 h-4" />
                <span>{t('home.timeline_status')}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
                <Trans i18nKey="home.timeline_title">
                  LÍNEA DE <span className="text-gradient">PRODUCCIÓN</span>
                </Trans>
              </h2>
              <p className="text-lg text-white/40 mt-6 font-medium leading-relaxed">
                {t('home.timeline_desc')}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4 px-6 py-3 glass-card border-white/10">
                <Activity className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">{t('home.executing')}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-accent via-glow-blue to-transparent opacity-20 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[45%]">
                    <div className={cn(
                      "glass-card p-8 border-2 transition-all hover:scale-[1.02]",
                      event.status === 'completed' ? "glow-border-blue border-green-500/20" :
                      event.status === 'in-progress' ? "glow-border-orange border-accent/20" : "border-white/5"
                    )}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{event.date}</span>
                        <div className={cn(
                          "flex items-center space-x-2 px-3 py-1 rounded-full text-[8px] font-black uppercase italic tracking-widest",
                          event.status === 'completed' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          event.status === 'in-progress' ? "bg-accent/10 text-accent border border-accent/20" : "bg-white/5 text-white/40 border border-white/10"
                        )}>
                          {event.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                          {event.status === 'in-progress' && <Activity className="w-3 h-3 animate-spin" />}
                          <span>{t(`admin.status_${event.status.replace('-', '_')}`)}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black italic tracking-tighter mb-4 uppercase">{event.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-6">{event.description}</p>
                      <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-accent">
                        <Terminal className="w-3 h-3" />
                        <span>{event.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#020617] border-2 border-white/10 flex items-center justify-center z-10 hidden md:flex">
                    <div className={cn(
                      "w-3 h-3 rounded-full shadow-[0_0_15px_currentColor]",
                      event.status === 'completed' ? "bg-green-500 text-green-500" :
                      event.status === 'in-progress' ? "bg-accent text-accent animate-pulse" : "bg-white/20 text-white/20"
                    )} />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BrainCircuit, title: t('home.services.ia.title'), desc: t('home.services.ia.desc'), color: "orange" },
              { icon: Layers, title: t('home.services.orch.title'), desc: t('home.services.orch.desc'), color: "blue" },
              { icon: Database, title: t('home.services.data.title'), desc: t('home.services.data.desc'), color: "orange" },
              { icon: Code2, title: t('home.services.dev.title'), desc: t('home.services.dev.desc'), color: "blue" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`p-8 glass-card ${service.color === 'orange' ? 'glow-border-orange' : 'glow-border-blue'} group`}
              >
                <service.icon className={`w-12 h-12 ${service.color === 'orange' ? 'text-accent' : 'text-glow-blue'} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-black mb-4 italic">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Terminal Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-1 border-accent/20 bg-black/80 shadow-2xl"
          >
            <div className="flex items-center space-x-2 px-4 py-2 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-[10px] font-mono text-white/40 ml-4 uppercase tracking-widest">system_orchestrator.sh</span>
            </div>
            <div className="p-6 font-mono text-sm md:text-base min-h-[200px]">
              <div className="flex items-center space-x-2 text-accent mb-2">
                <span>$</span>
                <div className="relative inline-block">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap inline-block border-r-2 border-accent animate-blink"
                  >
                    {t('home.terminal.init')}
                  </motion.span>
                </div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.4,
                      delayChildren: 1.5
                    }
                  }
                }}
                className="space-y-1 text-white/60"
              >
                {[
                  { text: t('home.terminal.load_ai'), color: "text-green-400" },
                  { text: t('home.terminal.connect_db'), color: "text-green-400" },
                  { text: t('home.terminal.optimize_ui'), color: "text-green-400" },
                  { text: ` >> ${t('home.terminal.ready')}`, color: "text-glow-blue animate-pulse mt-4" }
                ].map((line, idx) => (
                  <motion.p
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className={line.color}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-accent/20 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" 
                  alt="Our Journey" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-6xl font-black text-accent italic tracking-tighter">10+</div>
                  <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">{t('story.subtitle')}</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/30" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black tracking-tighter italic mb-8">
                {settings.story.title}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8 font-light italic">
                {settings.story.content}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-accent mb-4" />
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">{t('story.growth')}</div>
                  <div className="text-2xl font-black italic tracking-tighter">+500%</div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Users className="w-8 h-8 text-accent mb-4" />
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">{t('home.clients')}</div>
                  <div className="text-2xl font-black italic tracking-tighter">250+</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News & Marketing Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black tracking-tighter italic mb-4">
                {settings.news.title}
              </h2>
              <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">{settings.news.subtitle}</p>
            </div>
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Marketing Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 p-8 bg-accent rounded-2xl text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Globe className="w-12 h-12 mb-6" />
                <h3 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">{t('news.marketing_title')}</h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  {t('news.marketing_desc')}
                </p>
                <button className="flex items-center space-x-2 font-black italic uppercase tracking-tighter border-b-2 border-white pb-1 hover:space-x-4 transition-all">
                  <span>{t('home.learn_more')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* News Items */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {settings.news.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] font-mono text-accent uppercase tracking-widest">0{i+1} / 2026</div>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="text-xl font-black italic tracking-tighter mb-3 uppercase group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-black tracking-tighter italic">
                <Trans 
                  i18nKey="home.featured"
                  components={{
                    br: <br />,
                    span: <span className="text-gradient" />
                  }}
                >
                  PRODUCTOS <br /><span className="text-gradient">DESTACADOS</span>
                </Trans>
              </h2>
            </div>
            <Link to="/store" className="text-xs font-mono tracking-widest border-b border-accent/40 pb-1 hover:text-accent hover:border-accent transition-colors text-white/60">
              {t('home.view_all')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "POS System", type: "Software", price: 299000, img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" },
              { name: "Sales Page", type: "Web", price: 450000, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
              { name: "WP Bundle", type: "CMS", price: 150000, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop" }
            ].map((item, i) => (
              <div key={i} className="brutalist-card glow-border-orange group">
                <div className="aspect-video bg-ink mb-6 overflow-hidden rounded-lg border border-white/10">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-2xl italic tracking-tighter">{item.name}</h3>
                  <span className="font-mono text-[10px] bg-accent text-white px-2 py-1 rounded">{item.type}</span>
                </div>
                <p className="text-white/60 text-sm mb-6">{t('home.product_desc')}</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono font-black text-accent text-xl">{formatCurrency(item.price)}</span>
                  <button className="text-xs font-black italic uppercase tracking-tighter hover:text-accent transition-colors">{t('home.details')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
