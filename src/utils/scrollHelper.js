/**
 * Professional Native Smooth Scroll Utility
 * Uses native hardware-accelerated smooth scrolling with prefers-reduced-motion support
 */

export const scrollToSection = (targetId, offset = -75) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
        top: Math.max(0, y),
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });
};

export const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });
};

