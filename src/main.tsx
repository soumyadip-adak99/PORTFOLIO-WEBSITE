import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SmoothScroll from "./components/SmoothScroll";

// Locate mount container (disguised semantic viewport, no 'root' element)
const mountTarget =
    document.getElementById("app-viewport") ||
    document.querySelector("main") ||
    document.body;

createRoot(mountTarget).render(
    <StrictMode>
        <SmoothScroll>
            <App />
        </SmoothScroll>
    </StrictMode>
);

// Obfuscate / Disguise Runtime Signature in Console
if (typeof window !== "undefined") {
    console.log(
        "%c⚡ SOUMYADIP ADAK %c| Bespoke Full-Stack Architecture",
        "background: #FF6A00; color: #FFFFFF; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-family: monospace; font-size: 11px;",
        "color: #A1A1AA; font-family: monospace; font-size: 11px; padding-left: 4px;"
    );
    console.log(
        "%cProprietary interface architecture. Source inspection obfuscated.",
        "color: #52525B; font-family: monospace; font-size: 10px;"
    );
}
