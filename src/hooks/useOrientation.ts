import { useState, useEffect } from "react";

export function useOrientation() {
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: landscape)");

        const handleOrientationChange = (event: any) => {
            setIsLandscape(event.matches);
        };

        // Initial check
        setIsLandscape(mediaQuery.matches);

        // Listen for changes
        mediaQuery.addEventListener("change", handleOrientationChange);

        // Cleanup the event listener on component unmount
        return () => {
            mediaQuery.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    return { isLandscape };
}
