"use client";

import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { useUserClient } from "@/hooks/useUserClient";
import { cn } from "@/lib/utils";
import { ArrowDown02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";

function TextWithFontHoverEffect({
    className,
    text,
    letterSpacing,
    wordSpacing,
    stagger,
    duration,
    initialDelay
}: {
    className?: string;
    text: string;
    letterSpacing?: string;
    /** @default 1.5rem */
    wordSpacing?: string;
    /** @default 0.05*/
    stagger?: number;
    /** @default 0.3 */
    duration?: number;
    initialDelay?: number;
}) {
    const words = text.split(" ");
    const chars = words.map(w => w.split(""));
    let charIndex = 0;

    return (
        <div className={cn("flex w-fit overflow-clip", className)}>
            {chars.map((group, idx) => {
                return (
                    <div
                        key={idx}
                        className="flex"
                        style={{ marginRight: idx !== chars.length - 1 ? (wordSpacing ?? "1rem") : undefined }}
                    >
                        {group.map((char, idx2) => {
                            const div = (
                                <div
                                    key={idx2}
                                    className="relative select-none"
                                    style={{ marginRight: idx2 !== group.length ? letterSpacing : undefined }}
                                >
                                    <span className="pointer-events-none w-fit opacity-0">{char}</span>
                                    <motion.div initial="initial" whileHover="hovered">
                                        <motion.span
                                            className="absolute inset-0 inline-block w-fit"
                                            variants={{
                                                initial: { opacity: 1, scaleX: "100%" },
                                                hovered: { opacity: 0, scaleX: "0%" }
                                            }}
                                            transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                                        >
                                            {char}
                                        </motion.span>
                                        <motion.span
                                            className="font-special absolute top-1/2 left-1/2 inline-block -translate-x-1/2 -translate-y-1/2 font-bold"
                                            variants={{
                                                initial: { opacity: 0, scaleX: "0%" },
                                                hovered: { opacity: 1, scaleX: "100%", color: "var(--accent)" }
                                            }}
                                            transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                                        >
                                            {char}
                                        </motion.span>
                                    </motion.div>
                                </div>
                            );

                            charIndex++;
                            return div;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function HeaderReveal({ initialText, text, className }: { initialText: string; text: string; className?: string }) {
    return (
        <div className={cn("flex items-center", className)}>
            <motion.span
                className="inline-block"
                initial={{ opacity: 0, translateY: "25%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {initialText}
            </motion.span>
            <motion.span
                className="flex items-center overflow-hidden"
                initial={{ width: 0, opacity: 0, borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem" }}
                animate={{ width: "auto", opacity: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
            >
                <span className="whitespace-nowrap">{text}</span>
            </motion.span>
        </div>
    );
}

function HeaderRevealFontHover({ initialText, text, className }: { initialText: string; text: string; className?: string }) {
    const CharFontHover = ({ char }: { char: string }) => {
        return (
            <motion.span
                initial="initial"
                whileHover="hovered"
                className={cn("relative inline-block select-none *:inline-block", className)}
            >
                {/* <span aria-hidden className="select-none opacity-0">{char}</span> */}
                <motion.span
                    variants={{
                        initial: { opacity: 1, scaleX: "100%" },
                        hovered: { opacity: 0, scaleX: "0%" }
                    }}
                    transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                >
                    {char}
                </motion.span>
                <motion.span
                    className="font-special absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
                    variants={{
                        initial: { opacity: 0, scaleX: "0%" },
                        hovered: { opacity: 1, scaleX: "100%", color: "var(--accent)" }
                    }}
                    transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                >
                    {char}
                </motion.span>
            </motion.span>
        );
    };

    return (
        <div className={cn("flex items-center", className)}>
            <motion.span
                className="inline-block"
                initial={{ opacity: 0, translateY: "25%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <CharFontHover char={initialText} />
            </motion.span>
            <motion.div
                className="flex items-center overflow-hidden"
                initial={{ width: 0, opacity: 0, borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem" }}
                animate={{ width: "auto", opacity: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
            >
                <span className="flex whitespace-nowrap">
                    {text.split("").map((char, idx) => (
                        <CharFontHover key={idx} char={char} />
                    ))}
                </span>
            </motion.div>
        </div>
    );
}

export default function Hero() {
    const lenis = useLenis();
    const { isMobile } = useUserClient();

    const scrollToWork = () => {
        lenis?.scrollTo("#work", { duration: 2 });
    };

    return (
        <section
            id="home"
            className={cn(
                "relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden transition-all duration-300",
                styles.padding.section
            )}
        >
            {/* Header */}
            <div className="relative flex flex-col font-sans text-nowrap">
                {/* Header/Mobile */}
                <HeaderReveal
                    initialText="G"
                    text="UNIQUE G."
                    className="text-6xl font-semibold tracking-tighter md:hidden"
                />

                {/* Header/Desktop */}
                <HeaderRevealFontHover
                    initialText="G"
                    text="UNIQUE G."
                    className="hidden text-6xl font-semibold tracking-tighter md:flex"
                />

                {/* Subheader */}
                <motion.div
                    className="absolute bottom-1 left-0 ml-1 translate-y-full text-lg tracking-tight"
                    initial={{ opacity: 0, translateX: "10%" }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 0.5, duration: 1.25, ease: easings.fluidInOut }}
                >
                    <span className="text-foreground-dim">
                        <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
                    </span>
                </motion.div>
            </div>

            {/* Bottom-Left */}
            <motion.div
                className="absolute bottom-12 left-4 text-xs tracking-wide md:left-8 md:text-base md:tracking-normal"
                initial={{ opacity: 0, translateX: "-100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                I WORK WITH <br className="md:hidden" /> STARTUPS & CREATORS
            </motion.div>

            {/* Bottom-Right */}
            <motion.div
                className="absolute right-4 bottom-12 text-right text-xs md:right-8 md:text-base md:tracking-normal"
                initial={{ opacity: 0, translateX: "100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                FOUNDER // <span className="text-accent">OCTAVELABS</span>
            </motion.div>

            {/* Divider */}
            <motion.div
                className={cn(
                    "absolute bottom-10 left-1/2 h-px -translate-x-1/2 bg-linear-to-r from-white/5 from-1% via-white/25 to-white/5 to-99%",
                    styles.padding.section
                )}
                initial={{ opacity: 0.5, width: "1%" }}
                animate={{ opacity: 1, width: "90%" }}
                transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
            />

            {/* Middle - Button/Scroll to work */}
            <motion.button
                className="group absolute bottom-3 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-1 md:bottom-2.5"
                initial={{ opacity: 0, translateY: "200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
                onClick={scrollToWork}
            >
                <span className="text-xs tracking-wide transition-opacity duration-300 group-hover:opacity-75 md:text-base md:tracking-normal">
                    VIEW WORK
                </span>
                <HugeiconsIcon
                    icon={ArrowDown02Icon}
                    strokeWidth={2.5}
                    color="currentColor"
                    className="text-icon-active -mr-1 size-4 transition-transform duration-300 group-hover:translate-y-0.5 md:size-4.5"
                />
            </motion.button>

            {/* Header/Desktop */}
            {/* <motion.div
                className="flex flex-col overflow-clip font-sans font-semibold tracking-tighter text-nowrap select-none"
                initial={{ width: 76, borderTopRightRadius: "1.75rem", borderBottomRightRadius: "1.75rem" }}
                animate={{ width: 516, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.25, duration: 1, ease: easings.fluidInOut }}
            >
                <motion.div
                    className="w-fit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <div className="sm:hidden text-8xl">
                        {!isMobile && <TextWithFontHoverEffect duration={0.5} text="GUNIQUE G." />}
                    </div>
                </motion.div>

                <div className="text-foreground-dim ml-1 overflow-clip text-xl tracking-tight">
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, translateX: "10%" }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: 0.25, duration: 1.25, ease: easings.fluidInOut }}
                    >
                        <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
                    </motion.span>
                </div>
            </motion.div> */}
        </section>
    );
}
