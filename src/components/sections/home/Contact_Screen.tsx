"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { RefObject, useRef } from "react";

function StaggerScrollText({
    text,
    containerRef,
    className
}: {
    text: string;
    containerRef?: RefObject<HTMLDivElement | null>;
    className?: string;
}) {
    // 1. Get the scroll progress for the whole container
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });

    // Split the text into an array of words
    const words = text.split(" ");
    const wordCount = words.length;

    // Define the stagger configuration
    const STAGGER_AMOUNT = 0.1; // Amount of delay between each word (e.g., 5% of the total scroll)

    return (
        <div className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                // 2. Calculate the start and end of the staggered input range
                const start = i * STAGGER_AMOUNT;
                // Ensure the end point is always 1.0 (or close to it)
                // but doesn't start before the total stagger time.
                const end = 1.0 - (wordCount - 1 - i) * STAGGER_AMOUNT;

                // 3. Create a unique, staggered 'x' transformation for each word
                const x = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [start, end],
                    // Output Range (Initial position and Final position)
                    ["25%", "0%"]
                );

                const opacity = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [0, 1],
                    // Output Range (Initial position and Final position)
                    [0, 1]
                );

                const blur = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [0, 1],
                    // Output Range (Initial position and Final position)
                    ["blur(10px)", "blur(0px)"]
                );

                return (
                    <div key={i} className="mr-4">
                        <motion.span className="inline-block" style={{ x, opacity, filter: blur }}>
                            {word}
                        </motion.span>
                    </div>
                );
            })}
        </div>
    );
}

function AttentionTypography() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative flex min-h-screen flex-col justify-center px-4">
            <StaggerScrollText
                containerRef={containerRef}
                text="Your business deserves attention."
                className="font-satoshi text-4xl font-medium tracking-tight"
            />
        </div>
    );
}

export default function Contact_Screen() {
    return (
        <div className="min-h-screen">
            <AttentionTypography />
        </div>
    );
}
