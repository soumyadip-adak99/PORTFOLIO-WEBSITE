<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { ArrowUpRight, Menu, X } from "lucide-vue-next";
import { FiGithub, FiLinkedin } from "./Icons";
import { scrollToSection, scrollToTop } from "../utils/scrollHelper";

interface NavItem {
  label: string;
  id: string;
}

const isMenuOpen = ref<boolean>(false);
const scrolled = ref<boolean>(false);
const activeSection = ref<string>("home");
const hoveredSection = ref<string | null>(null);

const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/soumyadip-adak99", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/",
    label: "LinkedIn",
  },
];

// Sliding Pill References & Positioning State
const navContainerRef = ref<HTMLElement | null>(null);
const itemRefs = ref<Record<string, HTMLElement>>({});

const activePillStyle = ref<{
  transform: string;
  width: string;
  height: string;
  opacity: number;
}>({
  transform: "translate3d(0, 0, 0)",
  width: "0px",
  height: "0px",
  opacity: 0,
});

const hoverPillStyle = ref<{
  transform: string;
  width: string;
  height: string;
  opacity: number;
}>({
  transform: "translate3d(0, 0, 0)",
  width: "0px",
  height: "0px",
  opacity: 0,
});

const calculatePosition = (targetEl: HTMLElement, containerEl: HTMLElement) => {
  const containerRect = containerEl.getBoundingClientRect();
  const elRect = targetEl.getBoundingClientRect();
  return {
    x: elRect.left - containerRect.left,
    y: elRect.top - containerRect.top,
    w: elRect.width,
    h: elRect.height,
  };
};

const updateActivePill = () => {
  const container = navContainerRef.value;
  const activeEl = itemRefs.value[activeSection.value];
  if (!container || !activeEl) {
    activePillStyle.value = {
      ...activePillStyle.value,
      opacity: 0,
    };
    return;
  }
  const pos = calculatePosition(activeEl, container);
  activePillStyle.value = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    width: `${pos.w}px`,
    height: `${pos.h}px`,
    opacity: 1,
  };
};

const updateHoverPill = () => {
  const container = navContainerRef.value;
  if (!container || !hoveredSection.value || hoveredSection.value === activeSection.value) {
    hoverPillStyle.value = {
      ...hoverPillStyle.value,
      opacity: 0,
    };
    return;
  }
  const hoverEl = itemRefs.value[hoveredSection.value];
  if (!hoverEl) {
    hoverPillStyle.value = {
      ...hoverPillStyle.value,
      opacity: 0,
    };
    return;
  }
  const pos = calculatePosition(hoverEl, container);
  hoverPillStyle.value = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    width: `${pos.w}px`,
    height: `${pos.h}px`,
    opacity: 1,
  };
};

let isManualScroll = false;
let scrollLockTimer: ReturnType<typeof setTimeout> | null = null;

const scrollTo = (id: string) => {
  isMenuOpen.value = false;
  activeSection.value = id;
  isManualScroll = true;
  nextTick(updateActivePill);

  if (scrollLockTimer) clearTimeout(scrollLockTimer);
  scrollLockTimer = setTimeout(() => {
    isManualScroll = false;
  }, 850);

  if (id === "home") {
    scrollToTop();
  } else {
    scrollToSection(id, -80);
  }
};

watch(activeSection, () => {
  nextTick(updateActivePill);
});

watch(hoveredSection, () => {
  nextTick(updateHoverPill);
});

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(() => {
  nextTick(() => {
    updateActivePill();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        updateActivePill();
      });
    }
  });

  const handleResize = () => {
    updateActivePill();
    updateHoverPill();
  };
  window.addEventListener("resize", handleResize, { passive: true });

  // Ultra-lightweight scroll detection with hysteresis to eliminate flutter & redundant work
  const handleScroll = () => {
    const y = window.scrollY;
    if (!scrolled.value && y > 24) {
      scrolled.value = true;
    } else if (scrolled.value && y < 10) {
      scrolled.value = false;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check

  const obs = new IntersectionObserver(
    (entries) => {
      if (isManualScroll) return; // Prevent flickering intermediate states while clicking
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id;
      });
    },
    { rootMargin: "-30% 0px -50% 0px" }
  );

  navItems.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    obs.disconnect();
    if (scrollLockTimer) clearTimeout(scrollLockTimer);
    document.body.style.overflow = "";
  });
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-20 will-change-transform"
    style="transform: translateZ(0);"
  >
    <!-- GPU-Accelerated Background Glass Layer (Opacity transition only - 0 repaints, 120fps) -->
    <div
      class="absolute inset-0 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#29292F]/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)] pointer-events-none transition-opacity duration-300 ease-out"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
    />

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Brand Identifier -->
      <button
        @click="scrollTo('home')"
        class="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl p-1 -ml-1"
        aria-label="Soumyadip Adak - Return to Top"
      >
        <div class="w-10 h-10 rounded-xl bg-[#17171B] border border-[#29292F] group-hover:border-[#FF6A00]/50 flex items-center justify-center transition-colors duration-200 group-hover:shadow-[0_0_16px_rgba(255,106,0,0.25)] p-1.5 overflow-hidden">
          <img
            src="/logo.png"
            alt="Soumyadip Adak Logo"
            class="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>
        <div class="text-left">
          <div class="text-lg font-semibold tracking-tight text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors duration-200">
            Soumyadip Adak
          </div>
        </div>
      </button>

      <!-- Desktop Navigation with Animated Sliding Indicator -->
      <nav
        ref="navContainerRef"
        @mouseleave="hoveredSection = null"
        class="relative hidden md:flex items-center gap-1 bg-[#111114]/90 p-1.5 rounded-full border border-[#29292F]"
      >
        <!-- Animated Hover Highlight Pill (Follows cursor smoothly) -->
        <div
          class="absolute top-0 left-0 rounded-full bg-white/[0.04] pointer-events-none transition-all duration-200 ease-out"
          :style="hoverPillStyle"
        />

        <!-- Animated Active Indicator Pill (Slides smoothly with cubic-bezier spring easing) -->
        <div
          class="absolute top-0 left-0 rounded-full bg-[#17171B] border border-[#FF6A00]/40 shadow-[0_0_15px_rgba(255,106,0,0.18)] pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
          :style="activePillStyle"
        >
          <!-- Subtle Bottom Laser Orange Highlight -->
          <span class="absolute inset-x-2 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent opacity-80" />
        </div>

        <!-- Navigation Buttons -->
        <button
          v-for="{ label, id } in navItems"
          :key="id"
          :ref="(el) => { if (el) itemRefs[id] = el as HTMLElement; }"
          @mouseenter="hoveredSection = id"
          @click="scrollTo(id)"
          :class="[
            'relative z-10 px-4 py-1.5 text-xs uppercase tracking-wider font-semibold cursor-pointer rounded-full transition-colors duration-200 focus:outline-none select-none',
            activeSection === id
              ? 'text-[#F5F5F5]'
              : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
          ]"
        >
          {{ label }}
        </button>
      </nav>

      <!-- Desktop Right Actions -->
      <div class="hidden md:flex items-center gap-3">
        <a
          v-for="{ icon, href, label } in socialLinks"
          :key="label"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="label"
          class="p-2.5 rounded-xl bg-[#17171B] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors duration-200 hover:scale-105 active:scale-95"
        >
          <component :is="icon" :size="16" />
        </a>

        <button
          @click="scrollTo('contact')"
          class="ml-1 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] active:scale-98 text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 glow-orange-button cursor-pointer"
        >
          <span>Contact</span>
          <ArrowUpRight :size="14" />
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="isMenuOpen = !isMenuOpen"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          class="p-2.5 rounded-xl bg-[#17171B] border border-[#29292F] text-[#F5F5F5] hover:border-[#FF6A00]/50 transition-colors duration-200 focus:outline-none cursor-pointer"
        >
          <X v-if="isMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay -->
  <Transition name="drawer">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 top-20 z-40 bg-[#0B0B0D]/95 backdrop-blur-lg border-t border-[#29292F] px-6 py-8 flex flex-col justify-between md:hidden"
    >
      <nav class="flex flex-col gap-2">
        <button
          v-for="{ label, id } in navItems"
          :key="id"
          @click="scrollTo(id)"
          :class="[
            'relative w-full text-left py-4 px-5 rounded-xl text-lg font-medium transition-all duration-200 cursor-pointer border overflow-hidden',
            activeSection === id
              ? 'bg-[#17171B] text-[#FF6A00] border-[#FF6A00]/30 font-semibold shadow-[0_0_12px_rgba(255,106,0,0.12)]'
              : 'text-[#A1A1AA] border-transparent hover:text-[#F5F5F5] hover:bg-[#111114]'
          ]"
        >
          <!-- Left Laser Accent Bar for Active Section -->
          <span
            v-if="activeSection === id"
            class="absolute left-0 top-2 bottom-2 w-1 bg-[#FF6A00] rounded-r-full shadow-[0_0_8px_#FF6A00]"
          />
          <div class="flex items-center justify-between">
            <span>{{ label }}</span>
            <span
              v-if="activeSection === id"
              class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]"
            />
          </div>
        </button>
      </nav>

      <div class="pt-6 border-t border-[#29292F] space-y-4">
        <button
          @click="scrollTo('contact')"
          class="w-full py-4 rounded-xl bg-[#FF6A00] text-white text-center font-semibold text-sm uppercase tracking-wider glow-orange-button cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Get in Touch</span>
          <ArrowUpRight :size="16" />
        </button>

        <div class="flex items-center justify-center gap-4 pt-2">
          <a
            v-for="{ icon, href, label } in socialLinks"
            :key="label"
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="label"
            class="p-3 rounded-xl bg-[#17171B] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00]"
          >
            <component :is="icon" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
