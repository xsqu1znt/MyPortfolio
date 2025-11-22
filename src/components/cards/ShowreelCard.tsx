"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import { motion } from "motion/react";

export default function ShowreelCard({
    src,
    title,
    description,
    date,
    alignment,
    className,
    ...props
}: ComponentProps<"div"> & {
    src?: string;
    title?: string;
    description?: string;
    date?: string;
    alignment?: "left" | "right";
}) {
    return (
        <motion.div
            className={cn(
                "group relative z-10 flex w-full shrink-0 gap-6 transition-all duration-300",
                src ? "h-fit" : "h-28",
                alignment === "right" && "flex-row-reverse",
                className
            )}
            initial="initial"
            whileHover="hovered"
        >
            {src && (
                <img
                    src={src}
                    alt="showreel-card"
                    className="group-hover:outline-foreground-dim max-h-80 w-300 rounded-md object-cover object-top outline outline-transparent transition-all duration-300 group-hover:outline-offset-8"
                />
            )}

            <div className={cn("flex w-full flex-col overflow-clip", alignment === "right" && "text-right")}>
                <motion.div
                    className={cn(
                        "font-satoshi flex w-full justify-between text-lg font-semibold tracking-tight text-nowrap",
                        alignment === "right" && "flex-row-reverse"
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h3>{title || "LOREM IPSUM"}</h3>

                    <span className="text-foreground-dim font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        ({date || "25/01"})
                    </span>
                </motion.div>
                <motion.p
                    className="font-nunito text-foreground-dim inline-block text-xs tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                >
                    {description || "LOREM IPSUM DOLOR SIT AMUT."}
                </motion.p>
            </div>
        </motion.div>
    );
}

/* export default function ShowreelCard({ src, className, ...props }: ComponentProps<"div"> & { src?: string }) {
    return (
        <div
            {...props}
            className={cn(
                "relative w-48 shrink-0 rounded-md border border-white/5 bg-white/5",
                src ? "h-fit" : "h-28",
                className
            )}
        >
            {src && (
                <Image
                    src={src}
                    alt="showreel-card"
                    width={256}
                    height={256}
                    className="max-h-64 w-full rounded-md object-cover object-top"
                />
            )}
        </div>
    );
} */
