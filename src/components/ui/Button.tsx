"use client";

import { cn } from "@/lib/utils";
import { HugeiconsFreeIcons, Loading03FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ComponentProps } from "react";

export type ButtonStyles = "primary" | "accent" | "transparent";
export type ButtonSizes = "normal";

export const buttonStyles: Record<ButtonStyles, string> = {
    primary: "bg-background-secondary border border-white/5 text-foreground-primary",
    accent: "bg-accent text-background-primary",
    transparent: "bg-transparent"
};

export const buttonSizes: Record<ButtonSizes, string> = {
    // normal: "px-4 py-2.5 h-[50px] text-base"
    normal: "px-4 py-2.5 text-base"
};

export const buttonAlignment: Record<"left" | "center" | "right", string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
};

export const buttonIconAlignment: Record<"left" | "right", string> = {
    left: "flex-row-reverse",
    right: "flex-row"
};

export const buttonIconMargin: Record<"left" | "right", string> = {
    left: "mr-1 -ml-1",
    right: "-mr-1 ml-1"
};

interface ButtonProps extends ComponentProps<"button"> {
    label: string;
    variant?: ButtonStyles;
    size?: ButtonSizes;
    alignment?: "left" | "center" | "right";
    iconAlignment?: "left" | "right";
    full?: boolean;
    fit?: boolean;
    waiting?: boolean;
}

export default function Button({
    label,
    variant,
    size,
    alignment,
    iconAlignment,
    full,
    fit,
    waiting,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={cn(
                "group flex w-fit cursor-pointer items-center rounded-md font-sans font-medium transition-all duration-300 hover:opacity-75",
                buttonStyles[variant || "primary"],
                buttonSizes[size || "normal"],
                buttonAlignment[alignment || "center"],
                buttonIconAlignment[iconAlignment || "right"],
                full && "w-full",
                fit && "w-fit",
                className,
                disabled && "cursor-default bg-zinc-500 opacity-50",
                waiting && "cursor-wait"
            )}
        >
            {label}
            {(children || waiting) && (
                <div
                    className={cn(
                        "transition-transform duration-300 group-hover:translate-x-1",
                        buttonIconMargin[iconAlignment || "right"],
                        waiting && "translate-x-1"
                    )}
                >
                    {waiting ? <HugeiconsIcon icon={Loading03FreeIcons} className="animate-spin" /> : children}
                </div>
            )}
        </button>
    );
}
