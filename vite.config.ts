import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                entryFileNames: "assets/core-[hash].js",
                chunkFileNames: "assets/system-[hash].js",
                assetFileNames: "assets/theme-[hash].[ext]",
                manualChunks(id: string) {
                    if (id.includes("framer-motion") || id.includes("gsap")) {
                        return "motion-engine";
                    }
                    if (id.includes("lucide-react") || id.includes("react-icons")) {
                        return "vector-glyphs";
                    }
                },
            },
        },
    },
});
