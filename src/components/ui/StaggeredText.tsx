"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ComponentProps } from "react";

export default function StaggeredText({
    text,
    duration = 0.15,
    stagger = 0.015,
    className
}: ComponentProps<"span"> & { text: string; duration?: number; stagger?: number }) {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={cn("relative cursor-default overflow-hidden whitespace-nowrap", className)}
            style={{ lineHeight: 0.85, height: "0.85em" }}
        >
            {/* Top */}
            <div>
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
                        transition={{ duration, ease: "circInOut", delay: i * stagger }}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
            {/* Bottom */}
            <div className="absolute inset-0">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
                        transition={{ duration, ease: "circInOut", delay: i * stagger }}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
