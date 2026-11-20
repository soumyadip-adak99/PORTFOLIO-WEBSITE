<script setup lang="ts">
import Index from "./pages/Index.vue";
import SecurityShield from "./components/SecurityShield.vue";
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
