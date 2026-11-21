<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import anime from "animejs";
import { ArrowUpRight, Menu, X } from "lucide-vue-next";
import { FiGithub, FiLinkedin } from "./Icons";
import { scrollToSection, scrollToTop } from "../utils/scrollHelper";

interface NavItem {
  label: string;
  id: string;
}

const isMenuOpen = ref<boolean>(false);
const isCompact = ref<boolean>(false);
const isScrolled = ref<boolean>(false);
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

// DOM references for Anime.js targets
const glassBgRef = ref<HTMLElement | null>(null);
const desktopBrandRef = ref<HTMLElement | null>(null);
const navContainerRef = ref<HTMLElement | null>(null);
const compactLogoRef = ref<HTMLElement | null>(null);
const pillDividerRef = ref<HTMLElement | null>(null);
const rightActionsRef = ref<HTMLElement | null>(null);
const itemRefs = ref<Record<string, HTMLElement>>({});

const setItemRef = (id: string, el: any) => {
  if (el) {
    itemRefs.value[id] = el as HTMLElement;
  }
};

// Sliding Pill References & Positioning State
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

  // Exact native offsets relative to parent rounded container
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

// Anime.js Animation Engine
let currentTimeline: anime.AnimeTimelineInstance | null = null;

const animateNavbar = (toCompact: boolean) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const duration = prefersReducedMotion ? 0 : 450;
  const easing = toCompact ? "easeInOutQuart" : "easeOutCubic";

  // Prevent conflicting or overlapping animations during rapid scroll
  if (currentTimeline) {
    currentTimeline.pause();
  }

  // Cancel and clean existing active anime instances on targets
  anime.remove([
    desktopBrandRef.value,
    rightActionsRef.value,
    compactLogoRef.value,
    pillDividerRef.value,
    glassBgRef.value,
  ]);

  currentTimeline = anime.timeline({
    easing,
    duration,
    update: () => {
      updateActivePill();
    },
    complete: () => {
      updateActivePill();
      currentTimeline = null;
    },
  });

  // 1. Background glass tint smooth transition (subtle & light to let original background show through)
  if (glassBgRef.value) {
    currentTimeline.add(
      {
        targets: glassBgRef.value,
        backgroundColor: toCompact
          ? "rgba(11, 11, 14, 0.35)"
          : "rgba(11, 11, 14, 0.15)",
      },
      0
    );
  }

  // 2. Desktop Left Brand Button (Logo + Name): collapses smoothly
  if (desktopBrandRef.value) {
    currentTimeline.add(
      {
        targets: desktopBrandRef.value,
        opacity: toCompact ? 0 : 1,
        translateX: toCompact ? -20 : 0,
        maxWidth: toCompact ? 0 : 260,
        begin: () => {
          if (!toCompact && desktopBrandRef.value) {
            desktopBrandRef.value.style.pointerEvents = "auto";
          }
        },
        complete: () => {
          if (toCompact && desktopBrandRef.value) {
            desktopBrandRef.value.style.pointerEvents = "none";
          }
        },
      },
      0
    );
  }

  // 3. Desktop Right Action items (Socials + Contact button): collapses smoothly
  if (rightActionsRef.value) {
    currentTimeline.add(
      {
        targets: rightActionsRef.value,
        opacity: toCompact ? 0 : 1,
        translateX: toCompact ? 20 : 0,
        maxWidth: toCompact ? 0 : 300,
        begin: () => {
          if (!toCompact && rightActionsRef.value) {
            rightActionsRef.value.style.pointerEvents = "auto";
          }
        },
        complete: () => {
          if (toCompact && rightActionsRef.value) {
            rightActionsRef.value.style.pointerEvents = "none";
          }
        },
      },
      0
    );
  }

  // 4. Application Logo INSIDE the rounded section: expands smoothly into the same rounded pill
  if (compactLogoRef.value) {
    currentTimeline.add(
      {
        targets: compactLogoRef.value,
        opacity: toCompact ? 1 : 0,
        scale: toCompact ? 1.0 : 0.6,
        maxWidth: toCompact ? 40 : 0,
        marginRight: toCompact ? 6 : 0,
        begin: () => {
          if (toCompact && compactLogoRef.value) {
            compactLogoRef.value.style.pointerEvents = "auto";
          }
        },
        complete: () => {
          if (!toCompact && compactLogoRef.value) {
            compactLogoRef.value.style.pointerEvents = "none";
          }
        },
      },
      0
    );
  }

  // 5. Divider inside rounded pill between logo and section links
  if (pillDividerRef.value) {
    currentTimeline.add(
      {
        targets: pillDividerRef.value,
        opacity: toCompact ? 1 : 0,
        maxWidth: toCompact ? 2 : 0,
        marginRight: toCompact ? 6 : 0,
      },
      0
    );
  }
};

// Immediate state initialization for initial load or page reload while scrolled
const applyInitialState = (toCompact: boolean) => {
  isCompact.value = toCompact;

  if (glassBgRef.value) {
    glassBgRef.value.style.backgroundColor = toCompact
      ? "rgba(11, 11, 14, 0.35)"
      : "rgba(11, 11, 14, 0.15)";
  }
  if (desktopBrandRef.value) {
    desktopBrandRef.value.style.opacity = toCompact ? "0" : "1";
    desktopBrandRef.value.style.transform = toCompact ? "translateX(-20px)" : "translateX(0px)";
    desktopBrandRef.value.style.maxWidth = toCompact ? "0px" : "260px";
    desktopBrandRef.value.style.pointerEvents = toCompact ? "none" : "auto";
  }
  if (rightActionsRef.value) {
    rightActionsRef.value.style.opacity = toCompact ? "0" : "1";
    rightActionsRef.value.style.transform = toCompact ? "translateX(20px)" : "translateX(0px)";
    rightActionsRef.value.style.maxWidth = toCompact ? "0px" : "300px";
    rightActionsRef.value.style.pointerEvents = toCompact ? "none" : "auto";
  }
  if (compactLogoRef.value) {
    compactLogoRef.value.style.opacity = toCompact ? "1" : "0";
    compactLogoRef.value.style.transform = toCompact ? "scale(1)" : "scale(0.6)";
    compactLogoRef.value.style.maxWidth = toCompact ? "40px" : "0px";
    compactLogoRef.value.style.marginRight = toCompact ? "6px" : "0px";
    compactLogoRef.value.style.pointerEvents = toCompact ? "auto" : "none";
  }
  if (pillDividerRef.value) {
    pillDividerRef.value.style.opacity = toCompact ? "1" : "0";
    pillDividerRef.value.style.maxWidth = toCompact ? "2px" : "0px";
    pillDividerRef.value.style.marginRight = toCompact ? "6px" : "0px";
  }
  nextTick(updateActivePill);
};

// Scroll Detection & Performance Optimization
let ticking = false;
let lastScrollY = 0;

const getHeroThreshold = (): number => {
  const heroEl = document.getElementById("home");
  if (heroEl) {
    const heroHeight = heroEl.offsetHeight;
    return Math.max(220, heroHeight * 0.52);
  }
  return 360;
};

const checkScrollState = (y: number) => {
  // Universal scroll detection: activates frosted background on mobile & desktop
  isScrolled.value = y > 20;

  // On mobile screens (< 768px), desktop brand and actions are hidden, skip timeline to save mobile GPU/CPU
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return;
  }

  const threshold = getHeroThreshold();
  const enterThreshold = threshold;
  const exitThreshold = Math.max(80, threshold - 70); // 70px hysteresis to prevent flickering

  if (!isCompact.value && y > enterThreshold) {
    isCompact.value = true;
    animateNavbar(true);
  } else if (isCompact.value && y < exitThreshold) {
    isCompact.value = false;
    animateNavbar(false);
  }
};

const handleScroll = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkScrollState(lastScrollY);
      ticking = false;
    });
    ticking = true;
  }
};

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

  // Evaluate initial scroll state immediately without playing an unnecessary animation
  const initialY = window.scrollY;
  isScrolled.value = initialY > 20;
  const threshold = getHeroThreshold();
  if (initialY > threshold) {
    applyInitialState(true);
  } else {
    applyInitialState(false);
  }

  const handleResize = () => {
    updateActivePill();
  };
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });

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
    if (currentTimeline) currentTimeline.pause();
    document.body.style.overflow = "";
  });
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-20 select-none"
  >
    <!-- Desktop GPU-Accelerated Header Glass Layer with extended bottom area & ultra-smooth progressive feathering -->
    <div
      ref="glassBgRef"
      class="absolute top-0 left-0 right-0 h-[140px] pointer-events-none navbar-glass-layer will-change-[background-color] hidden md:block"
      style="background-color: rgba(11, 11, 14, 0.15);"
    />

    <!-- Dedicated High-Performance Mobile Header Glass Layer (Smooth progressive feathering, zero borders/separators) -->
    <div
      class="absolute inset-x-0 top-0 h-[125px] pointer-events-none md:hidden mobile-navbar-glass transition-colors duration-300"
      :class="[
        isScrolled
          ? 'bg-[#0B0B0D]/82'
          : 'bg-[#0B0B0D]/25'
      ]"
    />

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Desktop Left Brand: Logo + Description (Smoothly collapses when compact) -->
      <div
        ref="desktopBrandRef"
        class="hidden md:flex items-center overflow-hidden whitespace-nowrap will-change-[opacity,transform,max-width]"
        style="max-width: 260px;"
      >
        <button
          @click="scrollTo('home')"
          class="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl p-1 -ml-1 z-20 shrink-0"
          aria-label="Soumyadip Adak - Return to Top"
        >
          <div class="w-10 h-10 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] group-hover:border-white/[0.22] group-hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 ease-out group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-1.5 overflow-hidden shrink-0 group-hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
            <img
              src="/logo.png"
              alt="Soumyadip Adak Logo"
              class="w-full h-full object-contain select-none transition-transform duration-200 group-hover:scale-105"
              draggable="false"
            />
          </div>
          <div class="text-left">
            <div class="text-lg font-semibold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors duration-200">
              Soumyadip
            </div>
          </div>
        </button>
      </div>

      <!-- Mobile Brand (Always visible on mobile) -->
      <div class="md:hidden flex items-center z-20">
        <button
          @click="scrollTo('home')"
          class="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl p-1 -ml-1"
          aria-label="Soumyadip Adak - Return to Top"
        >
          <div class="w-10 h-10 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] group-hover:border-white/[0.22] group-hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 ease-out group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-1.5 overflow-hidden group-hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
            <img
              src="/logo.png"
              alt="Soumyadip Adak Logo"
              class="w-full h-full object-contain select-none"
              draggable="false"
            />
          </div>
          <div class="text-left">
            <div class="text-lg font-semibold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors duration-200">
              Soumyadip 
            </div>
          </div>
        </button>
      </div>

      <!-- Central Rounded Section: Floating Frosted Glass Island holding all section links + compact logo -->
      <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center pointer-events-auto z-10">
        <nav
          ref="navContainerRef"
          class="relative flex items-center p-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-all duration-200"
        >
          <!-- Animated Active Indicator Pill (Luminous Soft Amber Glass Depth) -->
          <div
            class="absolute top-0 left-0 rounded-full border border-[#FF6A00]/55 bg-[#FF6A00]/12 backdrop-blur-md shadow-[0_2px_14px_rgba(255,106,0,0.22),inset_0_1px_0_0_rgba(255,255,255,0.2)] pointer-events-none"
            :class="[
              isReady ? 'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]' : 'transition-none'
            ]"
            :style="activePillStyle"
          />

          <!-- Application Logo INSIDE the rounded section (reveals seamlessly in compact mode) -->
          <button
            ref="compactLogoRef"
            @click="scrollTo('home')"
            class="relative z-10 flex items-center justify-center rounded-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] overflow-hidden will-change-[opacity,transform,max-width,margin]"
            style="max-width: 0px; opacity: 0; transform: scale(0.6); pointer-events: none; margin-right: 0px;"
            aria-label="Soumyadip Adak - Return to Top"
          >
            <div class="w-8 h-8 rounded-full bg-[#17171B]/50 border border-white/[0.12] group-hover:border-[#FF6A00]/60 flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(255,106,0,0.35)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] p-1 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="Soumyadip Adak Logo"
                class="w-full h-full object-contain select-none"
                draggable="false"
              />
            </div>
          </button>

          <!-- Divider inside the rounded section between the logo and section links -->
          <div
            ref="pillDividerRef"
            class="h-4 w-px bg-white/20 will-change-[opacity,max-width,margin] overflow-hidden shrink-0"
            style="max-width: 0px; opacity: 0; margin-right: 0px;"
          />

          <!-- All Section Links -->
          <button
            v-for="{ label, id } in navItems"
            :key="id"
            :ref="(el) => setItemRef(id, el)"
            @click="scrollTo(id)"
            class="nav-link-btn relative z-10 px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-full select-none focus:outline-none"
            :class="[
              activeSection === id
                ? 'text-[#FFFFFF]'
                : 'text-[#9C9CA4] hover:text-[#FFFFFF] hover:bg-white/[0.06]'
            ]"
          >
            {{ label }}
          </button>
        </nav>
      </div>

      <!-- Desktop Right Actions: Socials + Contact CTA (Smoothly collapses when compact) -->
      <div
        ref="rightActionsRef"
        class="hidden md:flex items-center gap-3 z-20 overflow-hidden whitespace-nowrap will-change-[opacity,transform,max-width]"
        style="max-width: 300px;"
      >
        <a
          v-for="{ icon, href, label } in socialLinks"
          :key="label"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="label"
          class="group relative p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-[#9E9EA7] hover:text-[#FFFFFF] hover:border-white/[0.22] hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shrink-0 flex items-center justify-center cursor-pointer"
        >
          <component :is="icon" :size="16" class="transition-colors duration-200 group-hover:text-white" />
        </a>

        <button
          @click="scrollTo('contact')"
          class="group ml-1 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF842B] active:scale-95 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          <span>Contact</span>
          <ArrowUpRight :size="14" class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="md:hidden flex items-center gap-2 z-20">
        <button
          @click="isMenuOpen = !isMenuOpen"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          class="p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-[#9E9EA7] hover:border-white/[0.22] hover:text-white hover:bg-white/[0.08] transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none cursor-pointer"
        >
          <X v-if="isMenuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay (Full-Viewport Frosted Glassmorphism with Soft Backdrop Blur) -->
  <Transition name="drawer">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 mobile-drawer-glass px-6 pt-24 pb-8 flex flex-col justify-between md:hidden overflow-y-auto"
    >
      <!-- Ambient Backlight Glow inside Drawer -->
      <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF6A00]/15 rounded-full blur-[90px] pointer-events-none" />

      <nav class="relative z-10 flex flex-col gap-2 pt-2">
        <button
          v-for="{ label, id } in navItems"
          :key="id"
          @click="scrollTo(id)"
          :class="[
            'relative w-full text-left py-3 px-4.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center justify-between',
            activeSection === id
              ? 'bg-white/[0.06] backdrop-blur-xl text-white border-[#FF6A00]/60 shadow-[0_0_20px_rgba(255,106,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.14)]'
              : 'text-[#9E9EA7] border-transparent hover:text-white hover:bg-white/[0.04] hover:border-white/[0.08]'
          ]"
        >
          <span>{{ label }}</span>
          <span
            v-if="activeSection === id"
            class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_10px_#FF6A00]"
          />
        </button>
      </nav>

      <div class="relative z-10 pt-6 border-t border-white/[0.08] space-y-4">
        <button
          @click="scrollTo('contact')"
          class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] text-white text-center font-semibold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,106,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,106,0,0.45)] active:scale-98 transition-all duration-200 glow-orange-button"
        >
          <span>Get in Touch</span>
          <ArrowUpRight :size="16" />
        </button>

        <div class="flex items-center justify-center gap-3 pt-1">
          <a
            v-for="{ icon, href, label } in socialLinks"
            :key="label"
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="label"
            class="group p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-[#9E9EA7] hover:text-[#FFFFFF] hover:border-white/[0.22] hover:bg-white/[0.08] transition-all duration-200 ease-out active:scale-95 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
          >
            <component :is="icon" :size="18" class="transition-colors duration-200 group-hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* High-Performance Premium Glassmorphism Layer with extended bottom feathering (zero visible bar/cutoff) */
.navbar-glass-layer {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 38%,
    rgba(0, 0, 0, 0.88) 52%,
    rgba(0, 0, 0, 0.65) 66%,
    rgba(0, 0, 0, 0.38) 78%,
    rgba(0, 0, 0, 0.16) 88%,
    rgba(0, 0, 0, 0.04) 95%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 38%,
    rgba(0, 0, 0, 0.88) 52%,
    rgba(0, 0, 0, 0.65) 66%,
    rgba(0, 0, 0, 0.38) 78%,
    rgba(0, 0, 0, 0.16) 88%,
    rgba(0, 0, 0, 0.04) 95%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Mobile Navbar Glass: High-performance frosted backdrop with smooth progressive feathering (zero visible cutoff line) */
.mobile-navbar-glass {
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 48%,
    rgba(0, 0, 0, 0.88) 62%,
    rgba(0, 0, 0, 0.62) 74%,
    rgba(0, 0, 0, 0.35) 84%,
    rgba(0, 0, 0, 0.14) 92%,
    rgba(0, 0, 0, 0.03) 97%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 48%,
    rgba(0, 0, 0, 0.88) 62%,
    rgba(0, 0, 0, 0.62) 74%,
    rgba(0, 0, 0, 0.35) 84%,
    rgba(0, 0, 0, 0.14) 92%,
    rgba(0, 0, 0, 0.03) 97%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Mobile Drawer Frosted Glassmorphism with deep translucent background blur */
.mobile-drawer-glass {
  background-color: rgba(11, 11, 14, 0.82);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
}

@supports (backdrop-filter: blur(28px)) or (-webkit-backdrop-filter: blur(28px)) {
  .mobile-drawer-glass {
    background-color: rgba(11, 11, 14, 0.72);
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
