import { useState, useEffect, useRef } from "react";

export default function SecurityShield() {
    const [isBlackout, setIsBlackout] = useState<boolean>(false);
    const lastModifierTimeRef = useRef<number>(0);
    const blackoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Trigger temporary blackout when screenshot/print is attempted
        const triggerBlackout = (duration: number = 2500) => {
            setIsBlackout(true);

            // Attempt to clear or overwrite clipboard to prevent pasting captured snips
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    navigator.clipboard.writeText("");
                } catch {
                    // Ignore if permission denied
                }
            }

            if (blackoutTimeoutRef.current) {
                clearTimeout(blackoutTimeoutRef.current);
            }

            blackoutTimeoutRef.current = setTimeout(() => {
                setIsBlackout(false);
            }, duration);
        };

        // Track modifier keys for external snipping tool blur detection
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Shift" || e.key === "Meta" || e.key === "Control" || e.key === "Alt") {
                lastModifierTimeRef.current = Date.now();
            }

            // 1. PrintScreen key (standard Windows / Linux)
            if (
                e.key === "PrintScreen" ||
                e.keyCode === 44 ||
                e.code === "PrintScreen" ||
                (e.altKey && (e.key === "PrintScreen" || e.keyCode === 44))
            ) {
                triggerBlackout(3000);
            }

            // 2. Ctrl/Cmd + P (Print / Save to PDF)
            if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
                e.preventDefault();
                triggerBlackout(3500);
            }

            // 3. Ctrl/Cmd + S (Save web page HTML/assets)
            if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S") && !e.shiftKey) {
                e.preventDefault();
                triggerBlackout(2500);
            }

            // 4. Windows Snipping Tool (Win + Shift + S) or Mac Screenshot (Cmd + Shift + 3/4/5)
            if (
                (e.metaKey || e.ctrlKey) &&
                e.shiftKey &&
                (e.key === "S" ||
                    e.key === "s" ||
                    e.key === "3" ||
                    e.key === "4" ||
                    e.key === "5" ||
                    e.code === "KeyS" ||
                    e.code === "Digit3" ||
                    e.code === "Digit4" ||
                    e.code === "Digit5")
            ) {
                e.preventDefault();
                triggerBlackout(3500);
            }

            // 5. DevTools shortcuts (F12, Ctrl+Shift+I/J/C/P, Ctrl+U)
            if (
                e.key === "F12" ||
                e.keyCode === 123 ||
                ((e.ctrlKey || e.metaKey) &&
                    e.shiftKey &&
                    (e.key === "I" ||
                        e.key === "i" ||
                        e.key === "J" ||
                        e.key === "j" ||
                        e.key === "C" ||
                        e.key === "c" ||
                        e.key === "P" ||
                        e.key === "p")) ||
                ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U"))
            ) {
                e.preventDefault();
                triggerBlackout(2000);
            }
        };

        // Keyup listener for PrintScreen (on Windows PrtScn often fires on keyup)
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "PrintScreen" || e.keyCode === 44 || e.code === "PrintScreen") {
                triggerBlackout(3000);
            }
        };

        // Window blur detection: when OS Snipping Tool opens, window blurs right after modifier key
        const handleWindowBlur = () => {
            const timeSinceModifier = Date.now() - lastModifierTimeRef.current;
            if (timeSinceModifier < 600) {
                triggerBlackout(2500);
            }
        };

        // Global context menu (right-click) prevention on images, canvases, and media
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            if (
                target.tagName === "IMG" ||
                target.tagName === "CANVAS" ||
                target.tagName === "PICTURE" ||
                target.tagName === "SVG" ||
                target.closest?.(".protected-asset") ||
                target.closest?.(".hero-card-container") ||
                target.closest?.(".project-media-frame") ||
                target.closest?.("article")
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Global drag-start prevention on media
        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            if (
                target.tagName === "IMG" ||
                target.tagName === "CANVAS" ||
                target.tagName === "PICTURE" ||
                target.tagName === "SVG" ||
                target.closest?.(".protected-asset")
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Native print events (beforeprint / afterprint)
        const handleBeforePrint = () => {
            setIsBlackout(true);
        };

        const handleAfterPrint = () => {
            setIsBlackout(false);
        };

        window.addEventListener("keydown", handleKeyDown, { capture: true });
        window.addEventListener("keyup", handleKeyUp, { capture: true });
        window.addEventListener("blur", handleWindowBlur);
        document.addEventListener("contextmenu", handleContextMenu, { capture: true });
        document.addEventListener("dragstart", handleDragStart, { capture: true });
        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.removeEventListener("keydown", handleKeyDown, { capture: true });
            window.removeEventListener("keyup", handleKeyUp, { capture: true });
            window.removeEventListener("blur", handleWindowBlur);
            document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
            document.removeEventListener("dragstart", handleDragStart, { capture: true });
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
            if (blackoutTimeoutRef.current) {
                clearTimeout(blackoutTimeoutRef.current);
            }
        };
    }, []);

    if (!isBlackout) return null;

    return (
        <div
            id="screenshot-blackout-shield"
            className="fixed inset-0 bg-[#000000] flex items-center justify-center select-none"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                zIndex: 2147483647,
                pointerEvents: "auto",
            }}
            aria-hidden="true"
        >
            <div className="text-center p-6 space-y-3 pointer-events-none select-none">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF6A00] inline-block animate-ping" />
                <p className="text-xs font-mono text-[#52525B] uppercase tracking-widest">
                    Digital Rights Protected
                </p>
            </div>
        </div>
    );
}
