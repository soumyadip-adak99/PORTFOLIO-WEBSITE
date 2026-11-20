<script setup lang="ts">
import { ref } from "vue";
import { Cpu, Terminal } from "lucide-vue-next";
import ArchitectureMatrix from "../ArchitectureMatrix.vue";
import TechGlobe from "../TechGlobe.vue";

const sectionRef = ref<HTMLElement | null>(null);
</script>

<template>
  <section
    id="skills"
    ref="sectionRef"
    class="py-24 px-6 lg:px-12 relative overflow-hidden"
  >
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
          <span class="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
            Technical Ecosystem
          </span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
          Interactive Stack &
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
            Core Competencies
          </span>
        </h2>

        <p class="text-base text-[#A1A1AA] leading-relaxed">
          A focused engineering toolkit centered on scalable enterprise backend architectures,
          distributed databases, and responsive reactive interfaces.
        </p>
      </div>

      <!-- 3D Interactive Technology Globe Showcase -->
      <div class="mb-20 p-6 sm:p-10 rounded-3xl bg-[#111114]/90 border border-[#29292F] backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div
          class="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none -z-10"
          style="background: radial-gradient(circle at center, rgba(255, 106, 0, 0.08) 0%, rgba(255, 130, 45, 0.03) 40%, transparent 70%); transform: translateZ(0);"
        />

        <div class="flex flex-col items-center">
          <div class="text-center mb-4">
            <span class="text-xs font-mono uppercase tracking-widest text-[#71717A] flex items-center justify-center gap-2">
              <Cpu :size="14" class="text-[#FF6A00]" />
              <span>3D Orbit Visualization</span>
            </span>
          </div>

          <TechGlobe />
        </div>
      </div>

      <!-- Interactive Architectural Stack Matrix & System Cohesion Hub -->
      <div class="space-y-4">
        <div class="text-center mb-6">
          <span class="text-xs font-mono uppercase tracking-widest text-[#71717A] inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111114] border border-[#29292F]">
            <Terminal :size="13" class="text-[#FF6A00]" />
            <span>Core Engineering Stack</span>
          </span>
        </div>

        <ArchitectureMatrix />
      </div>
    </div>
  </section>
</template>
