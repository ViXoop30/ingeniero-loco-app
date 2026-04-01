import { motion, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed inset-0 pointer-events-none z-50 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full opacity-50"
    />
  );
};

export const DigitalRain = () => {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const count = Math.floor(window.innerWidth / 40); // Fewer columns for performance
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -500 }}
          animate={{ y: window.innerHeight + 500 }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute text-accent font-mono text-[10px] whitespace-nowrap"
          style={{ left: `${i * 40}px`, writingMode: 'vertical-rl' }}
        >
          {Array.from({ length: 15 }, () => 
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ).join('')}
        </motion.div>
      ))}
    </div>
  );
};

export const NeuralPulse = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full"
      />
    </div>
  );
};

export const Scanner = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <motion.div
        animate={{
          top: ["-10%", "110%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent shadow-[0_0_10px_rgba(242,125,38,0.2)]"
      />
    </div>
  );
};

export const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <motion.span
        animate={{ x: [-2, 2, -2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 left-0 text-red-500 z-0 select-none hidden group-hover:block"
      >
        {text}
      </motion.span>
    </span>
  );
};

export const FloatingCode = () => {
  const containerRef = useRef(null);
  const snippets = ["const ai = new Orchestrator();", "await ai.process(data);", "01011010110", "NeuralNetwork.train()"];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ 
            y: [0, -100],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
          className="absolute text-accent/20 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        >
          {snippets[i % snippets.length]}
        </motion.div>
      ))}
    </div>
  );
};
