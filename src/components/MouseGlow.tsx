import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const MouseGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250);
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x, y }}
            className="fixed top-0 left-0 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none z-0 opacity-40 mix-blend-screen hidden lg:block"
        />
    );
};
