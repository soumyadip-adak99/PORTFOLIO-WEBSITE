<script setup lang="ts">
import { CheckCircle2, X } from "lucide-vue-next";

defineProps<{
  showSuccess: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showSuccess"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0D]/80 backdrop-blur-md"
        @click="$emit('close')"
      >
        <div
          class="relative p-8 rounded-3xl bg-[#17171B] border border-[#FF6A00]/40 max-w-sm w-full text-center shadow-[0_16px_48px_-8px_rgba(255,106,0,0.25)] transition-all transform"
          @click.stop
        >
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 p-1.5 rounded-full text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#111114] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X :size="18" />
          </button>

          <div
            class="mx-auto w-14 h-14 bg-[#FF6A00]/15 border border-[#FF6A00]/40 rounded-2xl flex items-center justify-center text-[#FF6A00] mb-5 shadow-lg shadow-[#FF6A00]/20"
          >
            <CheckCircle2 :size="30" />
          </div>

          <h3 class="text-xl font-bold text-[#F5F5F5] mb-2 tracking-tight">
            Message Received
          </h3>

          <p class="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            Thank you for reaching out! I've received your transmission and will respond promptly.
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
