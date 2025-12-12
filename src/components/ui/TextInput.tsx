"use client";

import { useUserClient } from "@/hooks/useUserClient";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChangeEvent, ComponentProps, HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";

type InputComponentProps = {
    inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
    handleFocus: () => void;
    id: string | undefined;
    value: string;
    placeholder: string;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
};

const TextArea = ({ inputRef, handleFocus, id, value, placeholder, handleChange, disabled }: InputComponentProps) => (
    <textarea
        ref={inputRef as any}
        onFocus={handleFocus}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
            "placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary min-h-40 w-full resize-none rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none focus:min-h-52",
            disabled && "cursor-not-allowed opacity-50"
        )}
    />
);

const TextInputInternal = ({
    inputRef,
    handleFocus,
    id,
    value,
    placeholder,
    handleChange,
    disabled,
    type
}: InputComponentProps) => (
    <input
        ref={inputRef as any}
        onFocus={handleFocus}
        type={type || "text"}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
            "placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary w-full rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none",
            disabled && "cursor-not-allowed opacity-50"
        )}
    />
);

export default function TextInput({
    id,
    type,
    label,
    placeholder,
    disabled,
    textValue,
    onTextChange,
    area,
    className,
    ...props
}: ComponentProps<"div"> & {
    type?: HTMLInputTypeAttribute;
    label: string;
    placeholder: string;
    disabled?: boolean;
    textValue?: string;
    onTextChange?: (value: string) => void;
    area?: boolean;
}) {
    const lenis = useLenis();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const { isMobile } = useUserClient();
    const [value, setValue] = useState("");

    useEffect(() => {
        if (onTextChange) onTextChange(value);
    }, [value]);

    const handleFocus = () => {
        if (!isMobile) return;

        if (inputRef.current) {
            setTimeout(() => {
                lenis?.scrollTo(inputRef.current as any, { offset: -200, duration: 1 });
            }, 100);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    // Shared props to pass to the helper components
    const sharedProps: InputComponentProps = {
        inputRef,
        handleFocus,
        id,
        value: textValue || value,
        placeholder,
        handleChange,
        disabled
    };

    return (
        <div {...props} className={cn("flex w-full flex-col gap-1", className)}>
            <label htmlFor={id} className="text-foreground-dim ml-2 text-xs tracking-tight">
                {label}
            </label>

            {area ? <TextArea {...sharedProps} /> : <TextInputInternal {...sharedProps} type={type} />}
        </div>
    );
}
