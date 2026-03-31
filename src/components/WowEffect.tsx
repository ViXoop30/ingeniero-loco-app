import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const DigitalRain = () => {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const count = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -1000 }}
          animate={{ y: window.innerHeight + 1000 }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute text-accent font-mono text-xs whitespace-nowrap"
          style={{ left: `${i * 20}px`, writingMode: 'vertical-rl' }}
        >
          {Array.from({ length: 20 }, () => 
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ).join('')}
        </motion.div>
      ))}
    </div>
  );
};

export const NeuralPulse = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.4, 0.1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 blur-[150px] rounded-full border border-accent/5"
      />
      <motion.div
        animate={{
          scale: [1.5, 1, 1.5],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-blue/10 blur-[120px] rounded-full border border-glow-blue/5"
      />
    </div>
  );
};

export const Scanner = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        animate={{
          top: ["-10%", "110%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_15px_rgba(242,125,38,0.5)]"
      />
    </div>
  );
};

export const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <motion.span
        animate={{
          x: [-2, 2, -2],
          y: [1, -1, 1],
          filter: [
            "hue-rotate(0deg) brightness(1)",
            "hue-rotate(90deg) brightness(1.2)",
            "hue-rotate(0deg) brightness(1)"
          ]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: Math.random() * 5 + 2
        }}
        className="relative z-10"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [2, -2, 2],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: Math.random() * 5 + 2
        }}
        className="absolute top-0 left-0 text-red-500 z-0 select-none"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [-2, 2, -2],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: Math.random() * 5 + 2
        }}
        className="absolute top-0 left-0 text-blue-500 z-0 select-none"
      >
        {text}
      </motion.span>
    </div>
  );
};

export const FloatingCode = () => {
  const snippets = [
    "const ai = new Orchestrator();",
    "await ai.process(data);",
    "system.optimize();",
    "01011010110",
    "NeuralNetwork.train()",
    "export default AI;",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -200],
            opacity: [0, 0.4, 0],
            rotate: [0, Math.random() * 20]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute text-accent/30 font-mono text-[10px] uppercase tracking-widest"
        >
          {snippets[i % snippets.length]}
        </motion.div>
      ))}
    </div>
  );
};
