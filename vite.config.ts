import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                entryFileNames: "assets/core-[hash].js",
                chunkFileNames: "assets/system-[hash].js",
                assetFileNames: "assets/theme-[hash].[ext]",
                manualChunks(id: string) {
                    if (id.includes("gsap")) {
                        return "motion-engine";
                    }
                    if (id.includes("lucide-vue-next")) {
                        return "vector-glyphs";
                    }
                },
            },
        },
    },
});
