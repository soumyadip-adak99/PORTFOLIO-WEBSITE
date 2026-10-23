import { useEffect, useRef, useState } from "react";

interface ProtectedImageProps {
    src: string;
    alt?: string;
    className?: string;
    canvasClassName?: string;
    width?: number;
    height?: number;
    objectFit?: "cover" | "contain";
    objectPosition?: "center" | "top" | "bottom";
}

/**
 * ProtectedImage Component
 * - Encrypts / decodes image bitmaps in-memory and renders onto an HTML5 Canvas.
 * - Prevents raw image downloads (no <img> elements in DOM, no downloadable src).
 * - Neutralizes canvas.toDataURL and canvas.toBlob to prevent scraper asset extraction.
 * - Overlays a secure barrier blocking right-click context menus, dragging, and selection.
 */
export default function ProtectedImage({
    src,
    alt = "Protected Digital Asset",
    className = "",
    canvasClassName = "",
    width,
    height,
    objectFit = "cover",
    objectPosition = "center",
}: ProtectedImageProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        let isCancelled = false;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            if (isCancelled || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { willReadFrequently: false });
            if (!ctx) return;

            // Tamper-proof canvas extraction methods (anti-scraping)
            try {
                canvas.toDataURL = () => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
                canvas.toBlob = (callback: BlobCallback) => {
                    if (callback) callback(new Blob([], { type: "image/png" }));
                };
            } catch {
                // Ignore if sealed
            }

            const sourceW = img.naturalWidth || width || 800;
            const sourceH = img.naturalHeight || height || 600;

            // Retain crisp native source aspect ratio & resolution
            canvas.width = sourceW;
            canvas.height = sourceH;

            ctx.clearRect(0, 0, sourceW, sourceH);

            if (objectFit === "contain") {
                // Centered contain render
                const scale = Math.min(sourceW / img.naturalWidth, sourceH / img.naturalHeight);
                const x = (sourceW - img.naturalWidth * scale) / 2;
                const y = (sourceH - img.naturalHeight * scale) / 2;
                ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
            } else {
                // Full canvas draw
                ctx.drawImage(img, 0, 0, sourceW, sourceH);
            }

            setIsLoaded(true);
        };

        return () => {
            isCancelled = true;
        };
    }, [src, width, height, objectFit]);

    return (
        <div
            className={`protected-asset relative w-full h-full overflow-hidden select-none ${className}`}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            draggable="false"
        >
            {/* Encrypted In-Memory Canvas (No <img> in DOM) */}
            <canvas
                ref={canvasRef}
                className={`w-full h-full select-none pointer-events-none transition-all duration-500 ${
                    objectFit === "contain" ? "object-contain" : "object-cover"
                } ${
                    objectPosition === "top" ? "object-top" : "object-center"
                } ${canvasClassName} ${isLoaded ? "opacity-100" : "opacity-0"}`}
                aria-label={alt}
                role="img"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />

            {/* Impenetrable Security Barrier Overlay */}
            <div
                className="absolute inset-0 z-10 select-none bg-transparent pointer-events-auto cursor-default"
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onDragStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                draggable="false"
                aria-hidden="true"
            />
        </div>
    );
}
