"use client";

import { cn } from "@/lib/utils";

export default function SectionHeader({
    title,
    description,
    align
}: {
    title: string;
    description?: string;
    align?: "left" | "right";
}) {
    return (
        <div className={cn("flex flex-col gap-1", align === "right" && "text-right")}>
            <h2 className="font-sans text-6xl font-bold tracking-tight">{title}</h2>
            {description && <span className="text-foreground-dim text-xl font-normal tracking-tight">{description}</span>}
        </div>
    );
}
