import { useState, useEffect } from "react";

const isClient = typeof window !== "undefined";

const getIsMobile = () => {
    if (!isClient) return false;

    // Use a media query to check for a "coarse" pointer (e.g., a finger)
    // and absence of hover capability, which is characteristic of touch devices.
    if (window.matchMedia("(pointer: coarse) and (hover: none)").matches) {
        return true;
    }

    // Fallback for older browsers or edge cases using a basic user-agent check.
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export function useUserClient() {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        if (!isClient) return;

        const mediaQuery = window.matchMedia("(pointer: coarse) and (hover: none)");
        const handleMatch = (e: any) => setIsMobile(e.matches);

        // Listen for changes in the media query
        mediaQuery.addEventListener("change", handleMatch);

        // Clean up the event listener
        return () => mediaQuery.removeEventListener("change", handleMatch);
    }, []);

    return { isMobile };
}
