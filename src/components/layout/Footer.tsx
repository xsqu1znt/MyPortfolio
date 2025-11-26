"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
import { MarqueeItem, VelocityMarquee } from "../ui/VelocityMarquee";
import { cn } from "@/lib/utils";

function ArrowLink({ label, href, accent }: { label: string; href: string; accent?: boolean }) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden pr-8 text-2xl text-nowrap">
            <span className="pointer-events-none opacity-0">{label}</span>
            <ArrowUpRight className="text-accent absolute top-1/2 left-0 size-6 -translate-x-6 -translate-y-1/2 -rotate-90 stroke-[1.5px] opacity-0 transition-all duration-200 group-hover:size-7 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100" />
            <a
                className={cn(
                    "absolute top-0 left-0 font-sans transition-all duration-250 group-hover:translate-x-7",
                    accent && "text-accent"
                )}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </div>
    );
}

function ArrowLinkList({ links }: { links: { label: string; href: string; accent?: boolean }[] }) {
    return links.map((link, i) => (
        <li key={i}>
            <ArrowLink label={link.label} href={link.href} accent={link.accent} />
        </li>
    ));
}

function UnderlineLink({ label, href }: { label: string; href: string }) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden text-lg text-nowrap">
            <a className="font-serif" href={href} target="_blank" rel="noopener noreferrer">
                {label}
            </a>
            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-accent absolute bottom-0 left-0 h-[1.75px] w-0 transition-all duration-200 group-hover:w-full" />
            </div>
        </div>
    );
}

function List(props: ComponentProps<"ul">) {
    return <ul {...props} className="flex flex-col gap-1 font-serif" />;
}

function LabeledList({ label, children, ...props }: ComponentProps<"div"> & { label: string }) {
    return (
        <div {...props} className="flex w-fit flex-col">
            <span className="text-foreground-dim mb-4 cursor-default text-sm">{label}</span>
            <List>{children}</List>
        </div>
    );
}

function StackedText({ label, delay }: { label: string; delay: number }) {
    return (
        <div className="*:ease-overshoot relative overflow-hidden text-3xl font-bold tracking-tighter *:transition-all *:duration-500">
            <span className="pointer-events-none opacity-0">{label}</span>
            <span
                className="absolute top-0 left-0 inline-block -translate-y-full animate-pulse group-hover:translate-y-0"
                style={{ animationDelay: `${delay * 4}ms`, transitionDelay: `${delay}ms` }}
            >
                {label}
            </span>
            <span
                className="absolute top-0 left-0 inline-block group-hover:translate-y-full"
                style={{ transitionDelay: `${delay}ms` }}
            >
                {label}
            </span>
        </div>
    );
}

function StackedTextRow({ label }: { label: string }) {
    return (
        <div className="group text-foreground-dim hover:text-foreground-primary flex w-fit cursor-default transition-all duration-3500">
            {label.split("").map((char, i) => (
                <StackedText key={i} label={char} delay={i * 20} />
            ))}
        </div>
    );
}

export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 1 });
    };

    return (
        <div className="mt-32 flex flex-col">
            {/* Header */}
            <h3 className="px-4 text-center text-2xl font-light">Building spaces that inspire connections.</h3>

            {/* Footer */}
            <footer className="mt-8 flex flex-col">
                {/* Wrapper/Margin */}
                <div className="px-4">
                    <div className="border-foreground-dimmer relative grid w-full grid-cols-3 border-t py-8">
                        <LabeledList label="CONTACT">
                            <ul className="mb-4 text-2xl">
                                <li>Hawaii, USA</li>
                                <li>GMT-10</li>
                            </ul>

                            <UnderlineLink label="guniquegrimble@gmail.com" href="mailto:guniquegrimble@gmail.com" />

                            <div className="flex gap-4">
                                <img src="/icons/socials/whatsapp.svg" alt="Whatsapp" className="" />
                                <UnderlineLink label="+1 808 426-6141" href="tel:+18084266141" />
                            </div>
                        </LabeledList>

                        <LabeledList label="SITEMAP">
                            <ArrowLinkList
                                links={[
                                    { label: "Work", href: "#work" },
                                    { label: "About", href: "#about" },
                                    { label: "Services", href: "#services" },
                                    { label: "Contact", href: "#contact" }
                                    // { label: "Testimonials", href: "#" }
                                ]}
                            />
                        </LabeledList>

                        <LabeledList label="CONNECT">
                            <ArrowLinkList
                                links={[
                                    { label: "Linkedin", href: "https://www.linkedin.com/in/guniqueg/" },
                                    { label: "Twitter / X", href: "https://x.com/bygunique" },
                                    // { label: "Instagram", href: "https://www.instagram.com/xsqu1znt/" },
                                    { label: "Github", href: "https://github.com/xsqu1znt" },
                                    { label: "Octave Labs", href: "https://octavelabs.com", accent: true }
                                ]}
                            />
                        </LabeledList>

                        {/* Button/Back to top */}
                        <button
                            className="group absolute top-6 right-0 flex cursor-pointer items-center gap-1 font-serif"
                            onClick={scrollToTop}
                        >
                            <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                        </button>
                    </div>

                    {/* <div className="bg-foreground-dimmer flex w-full px-4 py-8">
                        <LabeledList label="BUSINESS">
                            <ArrowLinkList links={[{ label: "Octave Labs", href: "https://octavelabs.com" }]} />
                            <ArrowLinkList links={[{ label: "My Team", href: "https://octavelabs.com/team" }]} />
                        </LabeledList>
                    </div> */}

                    <div className="border-foreground-dimmer text-foreground-dim flex w-full items-center justify-between border-t border-b py-4 text-sm">
                        <span>© Copyright {new Date().getFullYear()}</span>

                        <span>
                            Designed & Built by <span className="font-semibold text-white/60">Gunique G.</span>
                        </span>
                    </div>
                </div>

                <div className="relative flex items-center justify-center overflow-hidden font-sans text-[21rem] leading-[0.9] font-semibold tracking-tighter select-none">
                    <VelocityMarquee baseVelocity={-1}>
                        <MarqueeItem
                            text="GUNIQUE"
                            className="bg-linear-to-b from-white/15 to-white/5 bg-clip-text text-transparent"
                        />
                    </VelocityMarquee>

                    <div
                        className="absolute top-1/2 left-0 h-full w-16 -translate-y-1/2 bg-linear-to-r from-black/50 to-transparent backdrop-blur-lg"
                        style={{
                            maskImage: "linear-gradient(to right, black, transparent)",
                            WebkitMaskImage: "linear-gradient(to right, black, transparent)"
                        }}
                    />
                    <div
                        className="absolute top-1/2 right-0 h-full w-16 -translate-y-1/2 bg-linear-to-l from-black/50 to-transparent backdrop-blur-lg"
                        style={{
                            maskImage: "linear-gradient(to left, black, transparent)",
                            WebkitMaskImage: "linear-gradient(to left, black, transparent)"
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}

/* export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 1 });
    };

    return (
        <div className="mt-32 w-full px-4">
            <footer className="border-b-none flex w-full flex-col gap-8 rounded-t-md border border-foreground-dimmer bg-white/5 p-6 font-sans">
                <div className="flex w-full justify-between gap-2">
                    <StackedTextRow label="GUNIQUE⠀G." />

                    <button className="group flex cursor-pointer items-center gap-1 font-serif" onClick={scrollToTop}>
                        <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <List>
                        <ArrowLinkList
                            links={[
                                { label: "Linkedin", href: "https://www.linkedin.com/in/guniqueg/" },
                                { label: "Twitter / X", href: "https://x.com/bygunique" },
                                { label: "Instagram", href: "https://www.instagram.com/xsqu1znt/" }
                            ]}
                        />
                    </List>

                    <LabeledList label="EXTRA">
                        <ArrowLinkList
                            links={[
                                { label: "Github", href: "https://github.com/xsqu1znt" },
                                { label: "Dribbble", href: "https://github.com/xsqu1znt" }
                            ]}
                        />
                    </LabeledList>

                    <LabeledList label="GENERAL INQUIRERS">
                        <UnderlineLink label="guniquegrimble@gmail.com" href="mailto:guniquegrimble@gmail.com" />
                    </LabeledList>

                    <LabeledList label="HAWAII, USA">
                        <UnderlineLink label="+1 808 426-6141" href="tel:+18084266141" />
                    </LabeledList>
                </div>

                <div className="flex w-full justify-end">
                    <div className="group text-accent flex w-fit cursor-default flex-col items-end justify-center text-xl font-bold">
                        <span className="ease-overshoot transition-transform duration-300 group-hover:-translate-x-2">
                            Developer
                        </span>
                        <span className="ease-overshoot transition-transform duration-350 group-hover:translate-x-1">
                            | Designer
                        </span>
                    </div>
                </div>

                <span className="text-foreground-dim w-full font-serif text-sm font-medium">
                    © {new Date().getFullYear()} | Designed & Built by Gunique G.
                </span>
            </footer>
        </div>
    );
} */
