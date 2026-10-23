import { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

/**
 * SmoothScroll component wrapper
 * Preserves hardware-accelerated, native 60/120Hz browser scrolling without scroll-hijacking delays
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
    return <>{children}</>;
}
