<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Compass, Sparkles } from "lucide-vue-next";
import { FaAws, FaJava } from "./Icons";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "./Icons";
import { TechGlobeItem } from "../types";

const TECHNOLOGIES: TechGlobeItem[] = [
  {
    name: "Java",
    category: "Core Language",
    level: "Advanced",
    icon: FaJava,
    color: "#E76F00",
    description: "Robust enterprise applications, OOP, multi-threading",
  },
  {
    name: "Spring Boot",
    category: "Backend Framework",
    level: "Expert",
    icon: SiSpringboot,
    color: "#6DB33F",
    description: "RESTful microservices, Spring Data JPA, Spring Security",
  },
  {
    name: "React",
    category: "Frontend Library",
    level: "Advanced",
    icon: SiReact,
    color: "#61DAFB",
    description: "Component architecture, hooks, state systems & SPAs",
  },
  {
    name: "TypeScript",
    category: "Frontend / Full Stack",
    level: "Proficient",
    icon: SiTypescript,
    color: "#3178C6",
    description: "Strict static typing, interfaces, and maintainable scalable code",
  },
  {
    name: "JavaScript (ES6+)",
    shortName: "JavaScript",
    category: "Core Language",
    level: "Expert",
    icon: SiJavascript,
    color: "#F7DF1E",
    description: "Asynchronous programming, closures, modern DOM APIs",
  },
  {
    name: "Python",
    category: "Language & AI",
    level: "Proficient",
    icon: SiPython,
    color: "#3776AB",
    description: "Data scripts, Flask endpoints, ML recommendation pipelines",
  },
  {
    name: "PostgreSQL",
    shortName: "Postgres",
    category: "Relational DB",
    level: "Advanced",
    icon: SiPostgresql,
    color: "#4169E1",
    description: "Relational schema design, indexes, transactional queries",
  },
  {
    name: "MongoDB",
    category: "NoSQL DB",
    level: "Advanced",
    icon: SiMongodb,
    color: "#47A248",
    description: "Document models, aggregation pipelines, scalable persistence",
  },
  {
    name: "MySQL",
    category: "Relational DB",
    level: "Proficient",
    icon: SiMysql,
    color: "#4479A1",
    description: "Structured query optimization and normalized schemas",
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    level: "Advanced",
    icon: FaAws,
    color: "#FF9900",
    description: "EC2 compute, S3 storage, cloud hosting & scalable deployments",
  },
  {
    name: "Docker",
    category: "DevOps & Cloud",
    level: "Proficient",
    icon: SiDocker,
    color: "#2496ED",
    description: "Containerization, reproducible microservice environments",
  },
  {
    name: "Git",
    category: "Version Control",
    level: "Expert",
    icon: SiGit,
    color: "#F05032",
    description: "Branching strategies, Git workflows, team collaboration",
  },
  {
    name: "Redis",
    category: "In-Memory Cache",
    level: "Proficient",
    icon: SiRedis,
    color: "#FF4438",
    description: "High-speed caching, session management, Pub/Sub",
  },
  {
    name: "Node.js",
    category: "Runtime Environment",
    level: "Proficient",
    icon: SiNodedotjs,
    color: "#5FA04E",
    description: "Event-driven architecture and asynchronous runtime services",
  },
  {
    name: "Express",
    category: "Backend Framework",
    level: "Proficient",
    icon: SiExpress,
    color: "#E4E4E7",
    description: "Lightweight middleware routing and REST APIs",
  },
  {
    name: "Tailwind CSS",
    shortName: "Tailwind",
    category: "Styling Architecture",
    level: "Expert",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Design systems, utility-first layouts, responsive design",
  },
];

interface SphereCoord {
  x: number;
  y: number;
  z: number;
  tech: TechGlobeItem;
}

const containerRef = ref<HTMLDivElement | null>(null);
const nodeRefs = ref<HTMLElement[]>([]);
const hoveredTech = ref<TechGlobeItem | null>(null);
let hoveredTechName: string | null = null;
let isVisible = false;

let rotX = 0.2;
let rotY = 0.3;
let targetRotX = 0.2;
let targetRotY = 0.3;
let lastMousePos = { x: 0, y: 0 };
let isDragging = false;
let animFrameId: number | null = null;
let radius = 175;
let perspective = 520;
const isMobile = ref(false);
let baseCoords: SphereCoord[] = [];

// Fibonacci sphere base coordinates
const computeBaseCoords = () => {
  const n = TECHNOLOGIES.length;
  const coords: SphereCoord[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < n; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const y = 1 - (i / (n - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    coords.push({ x, y, z, tech: TECHNOLOGIES[i] });
  }
  baseCoords = coords;
};

const updateSize = () => {
  if (!containerRef.value) return;
  const w = containerRef.value.clientWidth;
  isMobile.value = w < 640;

  // Responsive radius & perspective carefully tuned to prevent clipping on mobile screens
  if (w < 360) {
    radius = 82;
    perspective = 380;
  } else if (w < 440) {
    radius = 96;
    perspective = 420;
  } else if (w < 640) {
    radius = 120;
    perspective = 460;
  } else {
    radius = 175;
    perspective = 520;
  }
};

const handlePointerMove = (e: MouseEvent) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const clientX = e.clientX;
  const clientY = e.clientY;

  if (isDragging) {
    const dx = clientX - lastMousePos.x;
    const dy = clientY - lastMousePos.y;
    targetRotY += dx * 0.008;
    targetRotX -= dy * 0.008;
    lastMousePos = { x: clientX, y: clientY };
  } else {
    const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetRotY += normX * 0.003;
    targetRotX -= normY * 0.003;
  }
};

const handlePointerDown = (e: MouseEvent) => {
  isDragging = true;
  lastMousePos = { x: e.clientX, y: e.clientY };
};

const handlePointerUp = () => {
  isDragging = false;
};

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches && e.touches[0]) {
    lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!e.touches || !e.touches[0]) return;
  const clientX = e.touches[0].clientX;
  const clientY = e.touches[0].clientY;
  const dx = clientX - lastMousePos.x;
  const dy = clientY - lastMousePos.y;

  // Only handle horizontal rotation; let vertical touch motions scroll natively
  if (Math.abs(dx) > Math.abs(dy) * 1.2) {
    targetRotY += dx * 0.006;
    lastMousePos = { x: clientX, y: clientY };
  }
};

onMounted(() => {
  computeBaseCoords();
  updateSize();
  window.addEventListener("resize", updateSize, { passive: true });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updatePositions = () => {
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    for (let i = 0; i < TECHNOLOGIES.length; i++) {
      const el = nodeRefs.value[i];
      const item = baseCoords[i];
      if (!el || !item) continue;

      const { x: bx, y: by, z: bz, tech } = item;

      const x1 = bx * cosY - bz * sinY;
      const z1 = bx * sinY + bz * cosY;

      const y2 = by * cosX - z1 * sinX;
      const z2 = by * sinX + z1 * cosX;

      const worldX = x1 * radius;
      const worldY = y2 * radius;
      const worldZ = z2 * radius;

      const scale = perspective / (perspective - worldZ);
      const projX = worldX * scale;
      const projY = worldY * scale;

      const depthNorm = (worldZ + radius) / (2 * radius);
      const opacity = Math.max(0.35, Math.min(1, 0.35 + depthNorm * 0.65));
      const zIndex = Math.round(depthNorm * 100);

      const isHovered = hoveredTechName === tech.name;
      const finalScale = (isHovered ? scale * 1.3 : scale) * (0.8 + depthNorm * 0.35);

      // Hardware-accelerated 3D transform
      el.style.transform = `translate3d(${projX.toFixed(1)}px, ${projY.toFixed(1)}px, 0px) scale(${finalScale.toFixed(3)})`;

      // Avoid DOM style thrashing: only update zIndex & opacity if changed
      const zIndexStr = isHovered ? "200" : String(zIndex);
      if (el.dataset.z !== zIndexStr) {
        el.style.zIndex = zIndexStr;
        el.dataset.z = zIndexStr;
      }

      const opStr = isHovered ? "1" : opacity.toFixed(2);
      if (el.dataset.op !== opStr) {
        el.style.opacity = opStr;
        el.dataset.op = opStr;
      }
    }
  };

  const render = () => {
    if (!isVisible) return;

    if (!hoveredTechName && !isDragging && !prefersReducedMotion) {
      targetRotY += 0.0035;
      targetRotX = Math.sin(Date.now() * 0.0006) * 0.18;
    }

    rotX += (targetRotX - rotX) * 0.06;
    rotY += (targetRotY - rotY) * 0.06;

    updatePositions();

    animFrameId = requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (entry.isIntersecting) {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(render);
      } else {
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }
    },
    { threshold: 0.05 }
  );

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }

  updatePositions();

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
    observer.disconnect();
    if (animFrameId) cancelAnimationFrame(animFrameId);
  });
});
</script>

<template>
  <div class="relative w-full flex flex-col items-center">
    <!-- 3D Sphere Interactive Canvas -->
    <div
      ref="containerRef"
      @mousemove="handlePointerMove"
      @mousedown="handlePointerDown"
      @mouseup="handlePointerUp"
      @mouseleave="handlePointerUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handlePointerUp"
      class="relative w-full max-w-[540px] h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y"
      style="perspective: 1000px;"
    >
      <!-- Central Soft Orange Atmospheric Glow -->
      <div
        class="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none"
        style="background: radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.18) 0%, rgba(255, 120, 30, 0.08) 30%, rgba(255, 140, 66, 0.02) 55%, transparent 72%); transform: translateZ(0);"
      />
      <div
        class="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full pointer-events-none"
        style="background: radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.32) 0%, rgba(255, 130, 40, 0.12) 40%, transparent 70%); transform: translateZ(0);"
      />

      <!-- Concentric Technical Orbital Rings (Responsive to avoid mobile overflow) -->
      <div
        class="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border border-orange-500/10 pointer-events-none animate-[spin_60s_linear_infinite]"
        style="will-change: transform; transform: translateZ(0);"
      />
      <div
        class="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed border-[#29292F]/60 pointer-events-none animate-[spin_90s_linear_infinite_reverse]"
        style="will-change: transform; transform: translateZ(0);"
      />
      <div class="absolute w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] rounded-full border border-orange-500/5 pointer-events-none" />

      <!-- Central Core Hologram Node -->
      <div class="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
        <div class="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#111114]/95 border border-orange-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(255,106,0,0.25)]">
          <Sparkles class="w-4 h-4 sm:w-6 sm:h-6 text-[#FF6A00] animate-pulse" />
        </div>
      </div>

      <!-- Render Projected Tech Nodes -->
      <div
        v-for="(tech, idx) in TECHNOLOGIES"
        :key="tech.name"
        :ref="(el) => { if (el) nodeRefs[idx] = el as HTMLElement; }"
        @mouseenter="() => { hoveredTechName = tech.name; hoveredTech = tech; }"
        @mouseleave="() => { hoveredTechName = null; hoveredTech = null; }"
        @click="() => { hoveredTechName = tech.name; hoveredTech = tech; }"
        style="will-change: transform, opacity;"
        class="absolute cursor-pointer group"
      >
        <div
          :class="[
            'flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 border',
            hoveredTech?.name === tech.name
              ? 'bg-[#17171B] border-[#FF6A00] shadow-[0_0_24px_rgba(255,106,0,0.4)] scale-110'
              : 'bg-[#111114]/95 border-[#29292F] hover:border-[#FF6A00]/60 shadow-lg shadow-black/50'
          ]"
        >
          <span
            class="text-sm sm:text-lg transition-transform duration-200 group-hover:scale-110 shrink-0"
            :style="{ color: tech.color }"
          >
            <component :is="tech.icon" :size="isMobile ? 14 : 18" />
          </span>
          <span
            :class="[
              'text-[10px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-colors',
              hoveredTech?.name === tech.name ? 'text-[#F5F5F5] font-semibold' : 'text-[#D4D4D8]'
            ]"
          >
            {{ isMobile && tech.shortName ? tech.shortName : tech.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Selected Tech Card / Inspection HUD -->
    <div class="w-full max-w-xl min-h-[84px] sm:min-h-[96px] mt-2 px-2 sm:px-4">
      <div
        v-if="hoveredTech"
        class="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#17171B]/95 border border-[#FF6A00]/40 shadow-[0_4px_24px_-4px_rgba(255,106,0,0.2)] flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200"
      >
        <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#111114] border border-[#29292F] flex items-center justify-center shrink-0"
            :style="{ color: hoveredTech.color }"
          >
            <component :is="hoveredTech.icon" :size="isMobile ? 18 : 24" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <h4 class="text-sm sm:text-base font-semibold text-[#F5F5F5] tracking-tight truncate">
                {{ hoveredTech.name }}
              </h4>
              <span class="text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/25 shrink-0">
                {{ hoveredTech.level }}
              </span>
            </div>
            <p class="text-[11px] sm:text-xs text-[#A1A1AA] truncate mt-0.5">
              {{ hoveredTech.description }}
            </p>
          </div>
        </div>
        <div class="text-right shrink-0 hidden sm:block">
          <span class="text-[10px] uppercase font-mono tracking-wider text-[#71717A] block">
            Discipline
          </span>
          <span class="text-xs font-medium text-[#D4D4D8]">
            {{ hoveredTech.category }}
          </span>
        </div>
      </div>
      <div
        v-else
        class="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#111114]/80 border border-[#29292F]/60 flex items-center justify-center gap-2 text-xs text-[#A1A1AA]"
      >
        <Compass class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6A00] animate-spin" style="animation-duration: 12s;" />
        <span class="text-[11px] sm:text-xs">Touch or hover any skill to inspect discipline details</span>
      </div>
    </div>
  </div>
</template>
