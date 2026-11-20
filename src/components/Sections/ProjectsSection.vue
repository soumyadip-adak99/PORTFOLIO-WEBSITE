<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  ExternalLink,
  FolderGit2,
  Layers,
  Server,
  Sparkles,
} from "lucide-vue-next";
import { FiGithub } from "../Icons";
import { Project } from "../../types";
import { PROJECTS } from "../../utils/data";
import ProjectCard from "../ProjectCard.vue";
import ProjectSpecsModal from "../ProjectSpecsModal.vue";
import ProtectedImage from "../ProtectedImage.vue";

const activeCategory = ref<string>("All");
const selectedProject = ref<Project | null>(null);
const isSpecsOpen = ref<boolean>(false);
const showAll = ref<boolean>(false);
const sectionRef = ref<HTMLElement | null>(null);

const categories = [
  { label: "All Systems", value: "All", count: PROJECTS.length },
  { label: "Full Stack (Java/Spring)", value: "Full Stack", count: PROJECTS.filter((p) => p.category === "Full Stack").length },
  { label: "Web Apps & SPAs", value: "Web App", count: PROJECTS.filter((p) => p.category === "Web App").length },
  { label: "AI & Machine Learning", value: "AI & ML", count: PROJECTS.filter((p) => p.category === "AI & ML").length },
];

const filteredProjects = computed(() =>
  activeCategory.value === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory.value)
);

const displayedProjects = computed(() =>
  showAll.value ? filteredProjects.value : filteredProjects.value.slice(0, 3)
);

const hasMore = computed(() => filteredProjects.value.length > 3);

const flagshipProject = computed(() => PROJECTS.find((p) => p.featured) || PROJECTS[0]);

const handleOpenSpecs = (project: Project) => {
  selectedProject.value = project;
  isSpecsOpen.value = true;
};

const handleCategoryChange = (category: string) => {
  activeCategory.value = category;
  showAll.value = false;
};
</script>

<template>
  <section
    id="work"
    ref="sectionRef"
    class="py-24 px-6 lg:px-12 relative overflow-hidden"
  >
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
          <span class="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
            Engineering Portfolio
          </span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
          Featured Systems &
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
            Applications
          </span>
        </h2>

        <p class="text-base text-[#A1A1AA] leading-relaxed">
          A curated catalog of full-stack platforms, microservice architectures, and modern web
          applications engineered for resilience, clean code standards, and seamless user experiences.
        </p>
      </div>

      <!-- FLAGSHIP SPOTLIGHT Bento -->
      <div class="mb-20 rounded-3xl bg-[#17171B] border border-[#29292F] overflow-hidden shadow-2xl relative group hover:border-[#FF6A00]/40 transition-all duration-300">
        <div class="grid lg:grid-cols-12 items-stretch">
          <!-- Left Column: Screenshot Frame (7 cols) -->
          <div class="lg:col-span-7 bg-[#111114] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#29292F]">
            <!-- Window Top Bar Chrome -->
            <div class="px-5 py-3.5 flex items-center justify-between border-b border-[#29292F]/80 bg-[#0B0B0D]/80">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div class="px-3 py-1 rounded-full bg-[#17171B] border border-[#29292F] text-[11px] font-mono text-[#A1A1AA] flex items-center gap-1.5 truncate max-w-[280px]">
                <span class="text-[#FF6A00]">https://</span>
                <span class="text-[#D4D4D8]">
                  {{ flagshipProject.liveUrl ? flagshipProject.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "codemindai.vercel.app" }}
                </span>
              </div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-[#71717A] hidden sm:inline">
                Live Deploy
              </span>
            </div>

            <!-- Screenshot Media -->
            <div class="relative aspect-[16/10] overflow-hidden group/img">
              <ProtectedImage
                :src="flagshipProject.image"
                :alt="`${flagshipProject.title} flagship preview`"
                :width="1000"
                :height="625"
                canvas-class-name="transition-transform duration-700 ease-out group-hover/img:scale-105"
                object-fit="cover"
                object-position="top"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

            <!-- Bottom Live Metrics Strip -->
            <div class="p-4 px-6 border-t border-[#29292F]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A1A1AA] bg-[#0E0E11]">
              <template v-if="flagshipProject.flagshipMetrics">
                <div class="flex items-center gap-2">
                  <Server :size="14" class="text-[#FF6A00]" />
                  <span>{{ flagshipProject.flagshipMetrics[0] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Database :size="14" class="text-[#4169E1]" />
                  <span>{{ flagshipProject.flagshipMetrics[1] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Layers :size="14" class="text-[#61DAFB]" />
                  <span>{{ flagshipProject.flagshipMetrics[2] }}</span>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center gap-2">
                  <Server :size="14" class="text-[#FF6A00]" />
                  <span>Spring Boot 4 & Spring AI</span>
                </div>
                <div class="flex items-center gap-2">
                  <Database :size="14" class="text-[#4169E1]" />
                  <span>PostgreSQL 16 & pgvector</span>
                </div>
                <div class="flex items-center gap-2">
                  <Layers :size="14" class="text-[#61DAFB]" />
                  <span>Next.js 16 & React 19 UI</span>
                </div>
              </template>
            </div>
          </div>

          <!-- Right Column: Architectural Dossier (5 cols) -->
          <div class="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00] text-white text-xs font-mono font-semibold tracking-wide shadow-md">
                  <Sparkles :size="12" />
                  <span>Flagship Project</span>
                </span>
                <span class="px-2.5 py-1 rounded-full bg-[#111114] border border-[#29292F] text-[11px] font-mono text-[#FF8C42]">
                  ● Production Live
                </span>
              </div>

              <div>
                <h3 class="text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-tight">
                  {{ flagshipProject.title }}
                </h3>
                <p v-if="flagshipProject.subtitle" class="text-xs font-mono text-[#FF8C42] mt-1">
                  {{ flagshipProject.subtitle }}
                </p>
              </div>

              <p class="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {{ flagshipProject.description }}
              </p>

              <!-- Highlights with Checkmarks -->
              <div v-if="flagshipProject.highlights" class="space-y-2 pt-2">
                <div
                  v-for="item in flagshipProject.highlights"
                  :key="item"
                  class="flex items-center gap-2 text-xs text-[#D4D4D8]"
                >
                  <CheckCircle2 :size="14" class="text-[#FF6A00] shrink-0" />
                  <span>{{ item }}</span>
                </div>
              </div>

              <!-- Tech Tags -->
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in flagshipProject.tags"
                  :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-[#111114] border border-[#29292F] text-[11px] font-mono text-[#A1A1AA]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Flagship CTAs -->
            <div class="pt-6 border-t border-[#29292F] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                v-if="flagshipProject.liveUrl"
                :href="flagshipProject.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer"
              >
                <ExternalLink :size="14" />
                <span>Launch Application</span>
              </a>

              <div class="flex items-center gap-2.5">
                <a
                  v-if="flagshipProject.githubUrl"
                  :href="flagshipProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <FiGithub :size="15" />
                  <span>Source Code</span>
                </a>

                <button
                  @click="handleOpenSpecs(flagshipProject)"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#A1A1AA] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-mono transition-colors cursor-pointer"
                  title="View Technical Specification"
                  aria-label="View Technical Specification"
                >
                  <Cpu :size="15" />
                  <span>Specs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECONDARY SYSTEMS CATALOG -->
      <div class="space-y-10">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#29292F]">
          <div class="flex items-center gap-2.5">
            <FolderGit2 class="w-5 h-5 text-[#FF6A00]" />
            <h3 class="text-lg sm:text-xl font-bold text-[#F5F5F5] tracking-tight">
              Complete Engineering Deployments
            </h3>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#111114] border border-[#29292F]">
            <button
              v-for="category in categories"
              :key="category.value"
              @click="handleCategoryChange(category.value)"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                activeCategory === category.value
                  ? 'bg-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/25'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#17171B]'
              ]"
            >
              <span>{{ category.label }}</span>
              <span
                :class="[
                  'text-[10px] font-mono px-1.5 py-0.2 rounded-full',
                  activeCategory === category.value ? 'bg-white/20 text-white' : 'bg-[#17171B] text-[#71717A]'
                ]"
              >
                {{ category.count }}
              </span>
            </button>
          </div>
        </div>

        <!-- Secondary Projects Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <ProjectCard
            v-for="project in displayedProjects"
            :key="project.id"
            :project="project"
            @open-specs="handleOpenSpecs"
          />
        </div>

        <!-- Expand / Collapse More Projects Button -->
        <div v-if="hasMore" class="pt-2 flex justify-center">
          <button
            @click="showAll = !showAll"
            class="group px-7 py-3.5 rounded-xl bg-[#17171B] hover:bg-[#1E1E24] text-[#F5F5F5] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/50 font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center gap-2.5 cursor-pointer glow-subtle-hover"
          >
            <span>
              {{ showAll ? "Show Less" : `View More Projects (${filteredProjects.length - 3} More)` }}
            </span>
            <ChevronUp
              v-if="showAll"
              :size="16"
              class="text-[#FF6A00] transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            <ChevronDown
              v-else
              :size="16"
              class="text-[#FF6A00] transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Architecture Specification Modal -->
    <ProjectSpecsModal
      :project="selectedProject"
      :is-open="isSpecsOpen"
      @close="isSpecsOpen = false"
    />
  </section>
</template>
