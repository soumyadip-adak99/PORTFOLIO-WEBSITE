<script setup lang="ts">
import { computed } from "vue";
import { CheckCircle2, Cpu, Database, ExternalLink, Layers, Server, ShieldCheck, X } from "lucide-vue-next";
import { FiGithub } from "./Icons";
import { Project } from "../types";

const props = defineProps<{
  project: Project | null;
  isOpen: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();

const hasLive = computed(() => Boolean(props.project?.liveUrl));
const hasRepo = computed(() => Boolean(props.project?.githubUrl));
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md"
          @click="$emit('close')"
        />

        <!-- Modal Container -->
        <div
          class="relative w-full max-w-2xl bg-[#17171B] border border-[#29292F] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(255,106,0,0.25)] z-10 max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="absolute top-5 right-5 p-2 rounded-xl bg-[#111114] border border-[#29292F] text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-[#FF6A00]/40 transition-colors cursor-pointer"
            aria-label="Close specification dialog"
          >
            <X :size="18" />
          </button>

          <!-- Header -->
          <div class="space-y-2 mb-6 pr-10">
            <div class="flex items-center gap-2">
              <span
                v-if="project.status"
                class="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/25 font-semibold"
              >
                {{ project.status }}
              </span>
              <span class="text-xs font-mono text-[#71717A]">
                {{ project.category }}
              </span>
            </div>
            <h3 class="text-2xl font-bold text-[#F5F5F5] tracking-tight">
              {{ project.title }}
            </h3>
            <p v-if="project.subtitle" class="text-xs sm:text-sm font-mono text-[#FF8C42]">
              {{ project.subtitle }}
            </p>
          </div>

          <!-- Architectural Overview -->
          <div class="space-y-6">
            <div>
              <h4 class="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2 flex items-center gap-1.5">
                <Cpu :size="14" class="text-[#FF6A00]" />
                <span>System Architecture Scope</span>
              </h4>
              <p class="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Tech Stack Specs Table -->
            <div
              v-if="project.techDetails"
              class="p-4 rounded-2xl bg-[#111114] border border-[#29292F] space-y-3"
            >
              <h4 class="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-3">
                Technical Architecture Specification
              </h4>
              <div class="grid sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                  <div class="flex items-center gap-1.5 text-[#FF8C42] font-mono font-medium mb-1">
                    <Server :size="13" />
                    <span>Backend Engine</span>
                  </div>
                  <div class="text-[#D4D4D8] font-mono text-[11px]">
                    {{ project.techDetails.backend }}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                  <div class="flex items-center gap-1.5 text-[#61DAFB] font-mono font-medium mb-1">
                    <Layers :size="13" />
                    <span>Frontend Layer</span>
                  </div>
                  <div class="text-[#D4D4D8] font-mono text-[11px]">
                    {{ project.techDetails.frontend }}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                  <div class="flex items-center gap-1.5 text-[#4169E1] font-mono font-medium mb-1">
                    <Database :size="13" />
                    <span>Persistence Layer</span>
                  </div>
                  <div class="text-[#D4D4D8] font-mono text-[11px]">
                    {{ project.techDetails.database }}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                  <div class="flex items-center gap-1.5 text-[#6DB33F] font-mono font-medium mb-1">
                    <ShieldCheck :size="13" />
                    <span>Pattern & Protocols</span>
                  </div>
                  <div class="text-[#D4D4D8] font-mono text-[11px]">
                    {{ project.techDetails.architecture }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Engineering Highlights -->
            <div v-if="project.highlights">
              <h4 class="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-2.5">
                Key Capabilities Delivered
              </h4>
              <div class="grid sm:grid-cols-3 gap-2">
                <div
                  v-for="item in project.highlights"
                  :key="item"
                  class="p-2.5 rounded-xl bg-[#111114] border border-[#29292F] flex items-center gap-2 text-xs text-[#D4D4D8]"
                >
                  <CheckCircle2 :size="14" class="text-[#FF6A00] shrink-0" />
                  <span class="truncate">{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3 pt-4 border-t border-[#29292F]">
              <a
                v-if="hasLive && project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button"
              >
                <ExternalLink :size="14" />
                <span>Launch Application</span>
              </a>

              <a
                v-if="hasRepo && project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200',
                  hasLive ? '' : 'flex-1'
                ]"
              >
                <FiGithub :size="15" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
