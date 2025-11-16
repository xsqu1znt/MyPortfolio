"use client";

import Button from "@/components/ui/Button";
import StringSelectMenu from "@/components/ui/StringSelectMenu";
import TextInput from "@/components/ui/TextInput";
import { AddonServices, MainServices } from "@/constants/services";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import React, { ComponentProps, RefObject, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ContactServiceForm() {
    return (
        <div className="flex flex-col gap-8">
            {/* Field/Project Type */}
            <div className="flex flex-col gap-1">
                <label htmlFor="ssm-project-type" className="text-foreground-dim ml-2 text-xs tracking-tight">
                    PROJECT TYPE
                </label>
                <StringSelectMenu
                    id="ssm-project-type"
                    className="w-full"
                    direction="top"
                    options={[
                        ...MainServices.map(service => ({ id: service.title, label: service.title })),
                        ...AddonServices.map(service => ({ id: service.title, label: service.title })),
                        { id: "other", label: "Other" }
                    ]}
                />
            </div>

            {/* Grouped */}
            <div className="flex w-full gap-6">
                {/* Field/Name */}
                <TextInput id="input-name" label="NAME" placeholder="John Smith" className="flex-[75%]" />

                {/* Field/Email */}
                <TextInput id="input-email" type="email" label="EMAIL" placeholder="johnsmith@gmail.com" />
            </div>

            {/* Grouped */}
            <div className="flex w-full gap-6">
                {/* Field/Timeline */}
                <TextInput id="input-timeline" label="TIMELINE" placeholder="2 weeks" />

                {/* Field/Budget */}
                <TextInput id="input-budget" label="BUDGET" placeholder="$1,500 USD" className="flex-[75%]" />
            </div>

            {/* Field/Message */}
            <TextInput
                area
                id="input-message"
                label="MESSAGE"
                placeholder="Hello. I'm interested in one of your finest landing pages for my company."
            />

            {/* Button/Submit */}
            <Button label="SUBMIT" variant="accent" full>
                <ArrowRight className="text-background-primary size-5 stroke-[1.5px]" />
            </Button>
        </div>
    );
}

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

function Reveal({
    containerRef,
    children,
    ...props
}: ComponentProps<"div"> & { containerRef?: RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["center end", "center center"]
    });

    const x = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]);

    return (
        <div {...props}>
            <motion.div style={{ opacity }}>{children}</motion.div>
        </div>
    );
}

function Typography() {
    const containerRef = useRef<HTMLDivElement>(null);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    return (
        <div ref={containerRef} className="relative flex min-h-screen flex-col justify-center px-4">
            <StaggerScrollText
                containerRef={containerRef}
                text="Your business deserves attention."
                className="font-satoshi text-4xl font-medium tracking-tight"
            />

            {/* <div className="mt-32 flex flex-col items-center justify-center gap-96">
                <div ref={ref1}>
                    <Reveal containerRef={ref1}>
                        <ArrowDown className="size-32 stroke-[1px]" />
                    </Reveal>
                </div>

                <div ref={ref2}>
                    <Reveal containerRef={ref2}>
                        <ArrowDown className="size-32 stroke-[1px]" />
                    </Reveal>
                </div>

                <div ref={ref3}>
                    <Reveal containerRef={ref3}>
                        <ArrowDown className="size-32 stroke-[1px]" />
                    </Reveal>
                </div>
            </div> */}
        </div>
    );
}

export default function Contact() {
    return (
        <>
            <Typography />

            {/* Section/Contact */}
            <section id="contact" className="section">
                {/* <SectionHeader title="// CONTACT" description="Let's get your business the attention it needs." /> */}

                <div className="flex w-full flex-col gap-2">
                    <span className="font-satoshi text-6xl font-bold tracking-tight">// CONTACT</span>
                    <span className="text-foreground-dim text-xl font-normal tracking-tight">Request an inquiry today.</span>
                </div>

                <ContactServiceForm />
            </section>
        </>
    );
}
