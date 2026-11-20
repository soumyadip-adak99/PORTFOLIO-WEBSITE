import type Lenis from "lenis";

/**
 * Universal Smooth Scroll Utility powered by Lenis
 * Delivers inertia-driven, buttery 60/120Hz smooth scrolling on every scroll gesture
 */

let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null): void => {
    lenisInstance = lenis;
};

export const getLenis = (): Lenis | null => lenisInstance;

export const scrollToSection = (targetId: string, offset: number = -80): void => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (lenisInstance) {
        lenisInstance.scrollTo(el, {
            offset,
            duration: 1.0,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
    }

    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset);
    window.scrollTo({ top: targetY, behavior: "smooth" });
};

export const scrollToTop = (): void => {
    if (lenisInstance) {
        lenisInstance.scrollTo(0, {
            duration: 0.9,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
};
