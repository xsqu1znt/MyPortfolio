export type StringSelectStyles = "primary";
export type StringSelectSizes = "sm" | "md" | "lg";

export interface StringSelectMenuOption {
    id: string;
    label: string;
    description?: string;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    placeholder?: string;
    variant?: StringSelectStyles;
    direction?: "top" | "bottom";
    size?: StringSelectSizes;
    options: StringSelectMenuOption[];
    onOptionSelect?: (option: StringSelectMenuOption) => void;
}

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { NoTouchPropagation } from "../common/NoTouchPropagation";

// prettier-ignore
export const stringSelectStyles: Record<StringSelectStyles, string> = {
    primary: "border border-white/5 bg-foreground-dimmer hover:bg-foreground-dim active:bg-foreground-dim focus:bg-foreground-dim",
};

export const stringSelectSizes: Record<StringSelectSizes, string> = {
    sm: "px-4 py-2 gap-4",
    md: "px-6 py-3 gap-6",
    lg: "px-6 py-3 gap-12"
};

export const stringSelectMinWidths: Record<StringSelectSizes, string> = {
    sm: "min-w-40",
    md: "min-w-50",
    lg: "min-w-60"
};

export const stringSelectTextSizes: Record<StringSelectSizes, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
};

/* TODO: Add keyboard support. */
export default function StringSelectMenu(props: Props) {
    const { isLoading, onOptionSelect, ...rest } = props;

    const styleVariant = stringSelectStyles[props.variant || "primary"];
    const styleSize = stringSelectSizes[props.size || "md"];
    const styleMinWidth = stringSelectMinWidths[props.size || "md"];
    const styleTextSize = stringSelectTextSizes[props.size || "md"];

    const [selected, setSelected] = useState<StringSelectMenuOption | null>(props.placeholder ? null : props.options[0]);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu if clicked anywhere outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn(`relative ${isLoading && "loadingGlow"}`, props.className)} ref={menuRef}>
            <button
                {...rest}
                className={cn(
                    `flex w-fit cursor-pointer items-center justify-between rounded-md ease-in-out ${props.disabled && "pointer-events-none opacity-50"} ${open ? (props.direction === "top" ? "rounded-t-none" : "rounded-b-none") : ""} h-[50px] px-6 py-3 text-base transition-[colors,border-radius] duration-300 outline-none`,
                    styleVariant,
                    styleSize,
                    styleMinWidth,
                    styleTextSize,
                    props.className
                )}
                onClick={() => setOpen(!open)}
            >
                <span className={`text-nowrap ${!selected && props.placeholder && "text-foreground-dim"}`}>
                    {!selected && props.placeholder ? props.placeholder : selected?.label}
                </span>
                <svg
                    className={`size-4 transform-[colors,rotate] duration-300 ease-in-out ${open ? (props.direction === "top" ? "rotate-0" : "rotate-180") : props.direction === "top" ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <NoTouchPropagation>
                    <div
                        className={cn(
                            `dropdown no-scrollbar absolute z-10 max-h-[201px] w-fit touch-pan-y overflow-x-hidden overflow-y-auto scroll-smooth ${props.direction === "top" ? "bottom-full rounded-t-md border-b-0" : "top-full rounded-b-md border-t-0"} bg-background-primary border border-white/25`,
                            styleMinWidth,
                            styleTextSize,
                            props.className
                        )}
                    >
                        {props.options.map((option, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setSelected(option);
                                    onOptionSelect?.(option);
                                    setOpen(false);
                                }}
                                className={`border-foreground-dimmer text-foreground-primary w-full cursor-pointer border-b px-4 py-3 hover:bg-white/10 focus:bg-white/10 active:bg-white/10 ${selected?.id === option.id && "bg-white/10"}`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </NoTouchPropagation>
            )}
        </div>
    );
}
