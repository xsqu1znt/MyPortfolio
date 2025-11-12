import { type RefObject, useEffect } from "react";

export function useHandleClickOutside(ref: RefObject<HTMLDivElement | null>, callback: () => void) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
}
