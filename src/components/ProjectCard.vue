<script setup lang="ts">
import { computed } from "vue";
import { CheckCircle2, ExternalLink, Layers, Sparkles } from "lucide-vue-next";
import { FiGithub } from "./Icons";
import ProtectedImage from "./ProtectedImage.vue";
import { Project } from "../types";

const props = defineProps<{
  project: Project;
}>();

defineEmits<{
  (e: "openSpecs", project: Project): void;
}>();

const hasLive = computed(() => Boolean(props.project.liveUrl));
const hasRepo = computed(() => Boolean(props.project.githubUrl));
</script>

<template>
  <article class="group rounded-2xl bg-[#17171B] border border-[#29292F] hover:border-[#FF6A00]/40 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-lg hover:shadow-[0_12px_36px_-6px_rgba(255,106,0,0.18)] hover:-translate-y-1">
    <!-- Visual Header / Technical Screenshot Window -->
    <div class="relative aspect-[16/9] bg-[#111114] overflow-hidden border-b border-[#29292F]/60">
      <!-- Technical Window Chrome Bar -->
      <div class="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0B0D]/85 backdrop-blur-md border border-[#29292F]/80">
        <span class="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
        <span class="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
        <span class="w-2 h-2 rounded-full bg-[#27C93F]/80" />
        <span class="text-[10px] font-mono text-[#71717A] ml-1 hidden sm:inline">
          {{ project.category }}
        </span>
      </div>

      <!-- Status Badges -->
      <div class="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        <span
          v-if="project.featured"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6A00] text-white text-[10px] font-mono font-semibold tracking-wide shadow-md"
        >
          <Sparkles :size="10" />
          <span>Featured</span>
        </span>
        <span class="px-2 py-0.5 rounded-full bg-[#111114]/90 text-[#FF8C42] border border-[#29292F] text-[10px] font-mono font-medium">
          {{ project.status || "Ready" }}
        </span>
      </div>

      <!-- Project Screenshot In-Memory Canvas -->
      <ProtectedImage
        :src="project.image"
        :alt="`${project.title} interface preview`"
        :width="1000"
        :height="562"
        canvas-class-name="transition-transform duration-500 ease-out group-hover:scale-105"
        object-fit="cover"
        object-position="top"
      />

      <!-- Subtle Gradient Shade -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#17171B] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>

    <!-- Project Details -->
    <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-lg font-bold text-[#F5F5F5] tracking-tight group-hover:text-[#FF6A00] transition-colors line-clamp-1">
            {{ project.title }}
          </h3>
        </div>

        <p v-if="project.subtitle" class="text-xs font-mono text-[#FF8C42] line-clamp-1">
          {{ project.subtitle }}
        </p>

        <p class="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 pt-1">
          {{ project.description }}
        </p>
      </div>

      <div class="space-y-4 pt-1">
        <!-- Key Technical Highlights -->
        <div v-if="project.highlights" class="flex flex-wrap gap-1.5">
          <span
            v-for="item in project.highlights.slice(0, 2)"
            :key="item"
            class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#111114] border border-[#29292F] text-[#D4D4D8]"
          >
            <CheckCircle2 :size="11" class="text-[#FF6A00]" />
            <span>{{ item }}</span>
          </span>
        </div>

        <!-- Technology Tags -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2 py-0.5 rounded-md bg-[#111114]/80 border border-[#29292F] text-[10px] font-mono text-[#A1A1AA] group-hover:text-[#D4D4D8] transition-colors"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Action Links & Architecture Specs Button -->
        <div class="flex items-center gap-2 pt-2 border-t border-[#29292F]/60">
          <a
            v-if="hasLive && project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer"
          >
            <ExternalLink :size="13" />
            <span>Demo</span>
          </a>

          <a
            v-if="hasRepo && project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer',
              hasLive ? 'px-3' : 'flex-1'
            ]"
            :aria-label="`View ${project.title} source code`"
          >
            <FiGithub :size="14" />
            <span>Code</span>
          </a>

          <button
            @click="$emit('openSpecs', project)"
            class="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#A1A1AA] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-mono transition-all duration-200 cursor-pointer"
            title="Inspect System Architecture"
          >
            <Layers :size="13" />
            <span class="hidden sm:inline">Specs</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
