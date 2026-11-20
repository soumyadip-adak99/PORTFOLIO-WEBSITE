<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isBlackout = ref<boolean>(false);
const lastModifierTime = ref<number>(0);
let blackoutTimeout: ReturnType<typeof setTimeout> | null = null;

const triggerBlackout = (duration: number = 2500) => {
  isBlackout.value = true;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      navigator.clipboard.writeText("");
    } catch {
      // Ignore if permission denied
    }
  }

  if (blackoutTimeout) {
    clearTimeout(blackoutTimeout);
  }

  blackoutTimeout = setTimeout(() => {
    isBlackout.value = false;
  }, duration);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Shift" || e.key === "Meta" || e.key === "Control" || e.key === "Alt") {
    lastModifierTime.value = Date.now();
  }

  // 1. PrintScreen key
  if (
    e.key === "PrintScreen" ||
    e.keyCode === 44 ||
    e.code === "PrintScreen" ||
    (e.altKey && (e.key === "PrintScreen" || e.keyCode === 44))
  ) {
    triggerBlackout(3000);
  }

  // 2. Ctrl/Cmd + P (Print / Save to PDF)
  if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
    e.preventDefault();
    triggerBlackout(3500);
  }

  // 3. Ctrl/Cmd + S (Save web page HTML/assets)
  if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S") && !e.shiftKey) {
    e.preventDefault();
    triggerBlackout(2500);
  }

  // 4. Windows Snipping Tool (Win + Shift + S) or Mac Screenshot (Cmd + Shift + 3/4/5)
  if (
    (e.metaKey || e.ctrlKey) &&
    e.shiftKey &&
    (e.key === "S" ||
      e.key === "s" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.code === "KeyS" ||
      e.code === "Digit3" ||
      e.code === "Digit4" ||
      e.code === "Digit5")
  ) {
    e.preventDefault();
    triggerBlackout(3500);
  }

  // 5. DevTools & Network inspection shortcuts
  if (
    e.key === "F12" ||
    e.keyCode === 123 ||
    ((e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "I" ||
        e.key === "i" ||
        e.key === "J" ||
        e.key === "j" ||
        e.key === "C" ||
        e.key === "c" ||
        e.key === "E" ||
        e.key === "e" ||
        e.key === "P" ||
        e.key === "p")) ||
    ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U"))
  ) {
    e.preventDefault();
    e.stopPropagation();
    triggerBlackout(3000);
  }
};

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === "PrintScreen" || e.keyCode === 44 || e.code === "PrintScreen") {
    triggerBlackout(3000);
  }
};

const handleWindowBlur = () => {
  const timeSinceModifier = Date.now() - lastModifierTime.value;
  if (timeSinceModifier < 600) {
    triggerBlackout(2500);
  }
};

const handleContextMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (
    target.tagName === "IMG" ||
    target.tagName === "CANVAS" ||
    target.tagName === "PICTURE" ||
    target.tagName === "SVG" ||
    target.closest?.(".protected-asset") ||
    target.closest?.(".hero-card-container") ||
    target.closest?.(".project-media-frame") ||
    target.closest?.("article")
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

const handleDragStart = (e: DragEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (
    target.tagName === "IMG" ||
    target.tagName === "CANVAS" ||
    target.tagName === "PICTURE" ||
    target.tagName === "SVG" ||
    target.closest?.(".protected-asset")
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

const handleBeforePrint = () => {
  isBlackout.value = true;
};

const handleAfterPrint = () => {
  isBlackout.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown, { capture: true });
  window.addEventListener("keyup", handleKeyUp, { capture: true });
  window.addEventListener("blur", handleWindowBlur);
  document.addEventListener("contextmenu", handleContextMenu, { capture: true });
  document.addEventListener("dragstart", handleDragStart, { capture: true });
  window.addEventListener("beforeprint", handleBeforePrint);
  window.addEventListener("afterprint", handleAfterPrint);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown, { capture: true });
  window.removeEventListener("keyup", handleKeyUp, { capture: true });
  window.removeEventListener("blur", handleWindowBlur);
  document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
  document.removeEventListener("dragstart", handleDragStart, { capture: true });
  window.removeEventListener("beforeprint", handleBeforePrint);
  window.removeEventListener("afterprint", handleAfterPrint);
  if (blackoutTimeout) {
    clearTimeout(blackoutTimeout);
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isBlackout"
      id="screenshot-blackout-shield"
      class="fixed inset-0 bg-[#000000] flex items-center justify-center select-none"
      style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000000; z-index: 2147483647; pointer-events: auto;"
      aria-hidden="true"
    >
      <div class="text-center p-6 space-y-3 pointer-events-none select-none">
        <span class="w-3.5 h-3.5 rounded-full bg-[#FF6A00] inline-block animate-ping" />
        <p class="text-xs font-mono text-[#52525B] uppercase tracking-widest">
          Digital Rights Protected
        </p>
      </div>
    </div>
  </Teleport>
</template>
