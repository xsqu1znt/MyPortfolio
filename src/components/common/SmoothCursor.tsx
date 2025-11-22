"use client";

import { useEffect, useRef } from "react";

export default function SmoothCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: -100, y: -100 }); // Start off-screen
    const cursorPosition = useRef({ x: -100, y: -100 });
    const animationFrameId = useRef<number | null>(null);

    // Easing factor (lower = more "lag")
    const easing = 0.2;
    let cursorSize = 20; // Diameter of the circle

    useEffect(() => {
        // 1. Mousemove listener to update the target position
        // TypeScript: Type the event as MouseEvent
        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        // 2. Animation loop
        const animate = () => {
            // Calculate distance from visual cursor to target
            const dx = mousePosition.current.x - cursorPosition.current.x;
            const dy = mousePosition.current.y - cursorPosition.current.y;

            // Move the visual cursor a fraction of the distance
            cursorPosition.current.x += dx * easing;
            cursorPosition.current.y += dy * easing;

            // Apply the new position to the DOM element
            if (cursorRef.current) {
                // We offset by half the size to center the circle on the cursor
                const x = cursorPosition.current.x - cursorSize / 2;
                const y = cursorPosition.current.y - cursorSize / 2;
                // Use translate3d for hardware acceleration
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }

            // Continue the loop
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Start the listeners and the loop
        window.addEventListener("mousemove", handleMouseMove);
        animationFrameId.current = requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div
            ref={cursorRef}
            // Added a shadow so it's visible on white backgrounds (like your card)
            className="pointer-events-none fixed top-0 left-0 rounded-full shadow-lg backdrop-invert-100"
            style={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
                // CRITICAL: This lets mouse events "pass through" the circle
                pointerEvents: "none",
                // Ensure it's on top of everything
                zIndex: 9999
            }}
        />
    );
}
