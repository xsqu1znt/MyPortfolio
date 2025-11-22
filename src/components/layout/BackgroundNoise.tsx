"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const posX = [-10, 0, 10];
const posY = [-10, 0, -25, 30];

export default function BackgroundNoise() {
    const rafRef = useRef<number>(null);
    const noiseRef = useRef<HTMLImageElement>(null);
    const posXIndexRef = useRef<number>(0);
    const posYIndexRef = useRef<number>(0);

    useEffect(() => {
        if (!noiseRef.current) return;

        const tick = () => {
            setTimeout(() => {
                noiseRef.current!.style.transform = `translate(${posX[posXIndexRef.current]}px, ${posY[posYIndexRef.current]}px)`;
                posXIndexRef.current = (posXIndexRef.current + 1) % posX.length;
                posYIndexRef.current = (posYIndexRef.current + 1) % posY.length;
                rafRef.current = requestAnimationFrame(tick);
            }, 100);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [noiseRef.current, posXIndexRef.current, posYIndexRef.current, rafRef.current]);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 -z-50 h-screen w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        >
            <img
                ref={noiseRef}
                src="/images/overlays/noise.webp"
                className="animate-noise w-full opacity-15"
                style={{ scale: 1.1 }}
            />
        </motion.div>
    );
}
