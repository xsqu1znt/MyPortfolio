"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, HTMLInputTypeAttribute, useRef } from "react";

export default function TextInput({
    id,
    type,
    area,
    label,
    placeholder,
    className,
    ...props
}: ComponentProps<"div"> & { type?: HTMLInputTypeAttribute; area?: boolean; label: string; placeholder: string }) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);
        }
    };

    return (
        <div {...props} className={cn("flex w-full flex-col gap-1", className)}>
            <label htmlFor={id} className="text-foreground-dim ml-2 text-xs tracking-tight">
                {label}
            </label>

            {area ? (
                <textarea
                    ref={inputRef as any}
                    onFocus={handleFocus}
                    id={id}
                    placeholder={placeholder}
                    className="placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary min-h-40 w-full resize-none rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none focus:min-h-52"
                />
            ) : (
                <input
                    ref={inputRef as any}
                    onFocus={handleFocus}
                    type={type || "text"}
                    id={id}
                    placeholder={placeholder}
                    className="placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary w-full rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none"
                />
            )}
        </div>
    );
}
