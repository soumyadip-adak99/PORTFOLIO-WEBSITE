<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
import Index from "./pages/Index.vue";
import SecurityShield from "./components/SecurityShield.vue";
import { setLenis } from "./utils/scrollHelper";

let lenis: Lenis | null = null;
let rafId: number | null = null;

onMounted(() => {
  // Global buttery smooth momentum scrolling across every mouse wheel, trackpad, and touch scroll
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  setLenis(lenis);

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  lenis?.destroy();
  setLenis(null);
});
</script>

<template>
  <div>
    <SecurityShield />
    <div class="midnight-grid" aria-hidden="true" />
    <div class="ambient-glow-hero" aria-hidden="true" />
    <div class="ambient-glow-mid" aria-hidden="true" />
    <div class="ambient-glow-bottom" aria-hidden="true" />
    <div class="ambient-noise" aria-hidden="true" />
    <Index />
  </div>
</template>
