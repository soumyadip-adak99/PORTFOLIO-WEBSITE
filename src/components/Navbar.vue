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
const isReady = ref<boolean>(false);

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

const setItemRef = (id: string, el: any) => {
  if (el) {
    itemRefs.value[id] = el as HTMLElement;
  }
};

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

const updateActivePill = () => {
  const container = navContainerRef.value;
  const activeEl = itemRefs.value[activeSection.value];
  if (!container || !activeEl) {
    activePillStyle.value.opacity = 0;
    return;
  }

  // Exact native offsets relative to the parent position:relative container
  const x = activeEl.offsetLeft;
  const y = activeEl.offsetTop;
  const w = activeEl.offsetWidth;
  const h = activeEl.offsetHeight;

  activePillStyle.value = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    width: `${w}px`,
    height: `${h}px`,
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
  }, 950);

  if (id === "home") {
    scrollToTop();
  } else {
    scrollToSection(id, -80);
  }
};

watch(activeSection, () => {
  nextTick(updateActivePill);
});

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(() => {
  const initPill = () => {
    updateActivePill();
    if (activePillStyle.value.width !== "0px") {
      setTimeout(() => {
        isReady.value = true;
      }, 50);
    }
  };

  nextTick(() => {
    initPill();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initPill);
    }
  });

  const handleResize = () => {
    updateActivePill();
  };
  window.addEventListener("resize", handleResize, { passive: true });

  const handleScroll = () => {
    const y = window.scrollY;
    if (!scrolled.value && y > 24) {
      scrolled.value = true;
    } else if (scrolled.value && y < 10) {
      scrolled.value = false;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const obs = new IntersectionObserver(
    (entries) => {
      if (isManualScroll) return;
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
    <!-- GPU-Accelerated Header Glass Layer (Smooth Opacity Transition) -->
    <div
      class="absolute inset-0 bg-[#0B0B0D]/75 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)] pointer-events-none transition-opacity duration-300 ease-out"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
    />

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Brand Identifier (Left-Aligned, Frosted Glass) -->
      <button
        @click="scrollTo('home')"
        class="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl p-1 -ml-1 z-20"
        aria-label="Soumyadip Adak - Return to Top"
      >
        <div class="w-10 h-10 rounded-xl bg-[#17171B]/80 backdrop-blur-lg border border-white/[0.08] group-hover:border-[#FF6A00]/50 flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(255,106,0,0.25)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-1.5 overflow-hidden">
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

      <!-- Desktop Navigation: Floating Frosted Glass Island -->
      <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center pointer-events-auto z-10">
        <nav
          ref="navContainerRef"
          class="relative flex items-center p-1.5 rounded-full bg-[#0E0E12]/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-colors duration-200"
        >
          <!-- Animated Active Indicator Pill (Refined Soft Amber/Orange Border with Glass Depth) -->
          <div
            class="absolute top-0 left-0 rounded-full border border-[#FF6A00]/40 bg-[#18181C]/85 backdrop-blur-md shadow-[0_2px_12px_rgba(255,106,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-none"
            :class="[
              isReady ? 'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]' : 'transition-none'
            ]"
            :style="activePillStyle"
          />

          <!-- Navigation Buttons -->
          <button
            v-for="{ label, id } in navItems"
            :key="id"
            :ref="(el) => setItemRef(id, el)"
            @click="scrollTo(id)"
            :class="[
              'relative z-10 px-5 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer rounded-full select-none focus:outline-none',
              activeSection === id
                ? 'text-[#FFFFFF]'
                : 'text-[#8A8A93] hover:text-[#FFFFFF]'
            ]"
          >
            {{ label }}
          </button>
        </nav>
      </div>

      <!-- Desktop Right Actions (Right-Aligned, Frosted Glass) -->
      <div class="hidden md:flex items-center gap-3 z-20">
        <a
          v-for="{ icon, href, label } in socialLinks"
          :key="label"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="label"
          class="p-2.5 rounded-xl bg-[#17171B]/80 backdrop-blur-lg border border-white/[0.08] text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <component :is="icon" :size="16" />
        </a>

        <button
          @click="scrollTo('contact')"
          class="ml-1 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] active:scale-98 text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 glow-orange-button cursor-pointer shadow-lg shadow-orange-500/20"
        >
          <span>Contact</span>
          <ArrowUpRight :size="14" />
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="md:hidden flex items-center gap-2 z-20">
        <button
          @click="isMenuOpen = !isMenuOpen"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          class="p-2.5 rounded-xl bg-[#17171B]/80 backdrop-blur-lg border border-white/[0.08] text-[#F5F5F5] hover:border-[#FF6A00]/50 transition-colors duration-200 focus:outline-none cursor-pointer"
        >
          <X v-if="isMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay (Frosted Glass) -->
  <Transition name="drawer">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 top-20 z-40 bg-[#0B0B0D]/90 backdrop-blur-2xl border-t border-white/[0.08] px-6 py-8 flex flex-col justify-between md:hidden"
    >
      <nav class="flex flex-col gap-2.5">
        <button
          v-for="{ label, id } in navItems"
          :key="id"
          @click="scrollTo(id)"
          :class="[
            'relative w-full text-left py-3.5 px-5 rounded-2xl text-base font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center justify-between',
            activeSection === id
              ? 'bg-[#18181C]/90 backdrop-blur-md text-white border-[#FF6A00]/40 shadow-[0_2px_10px_rgba(255,106,0,0.08)]'
              : 'text-[#8A8A93] border-transparent hover:text-white hover:bg-[#141417]/60'
          ]"
        >
          <span>{{ label }}</span>
          <span
            v-if="activeSection === id"
            class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]"
          />
        </button>
      </nav>

      <div class="pt-6 border-t border-white/[0.08] space-y-4">
        <button
          @click="scrollTo('contact')"
          class="w-full py-4 rounded-xl bg-[#FF6A00] text-white text-center font-semibold text-sm uppercase tracking-wider glow-orange-button cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
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
            class="p-3 rounded-xl bg-[#17171B]/80 backdrop-blur-lg border border-white/[0.08] text-[#A1A1AA] hover:text-[#FF6A00]"
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
