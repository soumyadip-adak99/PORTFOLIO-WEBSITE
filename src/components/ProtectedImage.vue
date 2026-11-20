<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { loadSecureAsset } from "../utils/secureAssets";

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    className?: string;
    canvasClassName?: string;
    width?: number;
    height?: number;
    objectFit?: "cover" | "contain";
    objectPosition?: "center" | "top" | "bottom";
  }>(),
  {
    alt: "Protected Digital Asset",
    className: "",
    canvasClassName: "",
    objectFit: "cover",
    objectPosition: "center",
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isLoaded = ref<boolean>(false);
const hasError = ref<boolean>(false);
let isCancelled = false;

const renderAsset = () => {
  isCancelled = false;
  isLoaded.value = false;
  hasError.value = false;

  if (!props.src) return;

  loadSecureAsset(props.src)
    .then((drawable) => {
      if (isCancelled || !canvasRef.value) return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      if (!ctx) return;

      try {
        canvas.toDataURL = () =>
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
        canvas.toBlob = (callback: BlobCallback) => {
          if (callback) callback(new Blob([], { type: "image/png" }));
        };
        const originalGetImageData = ctx.getImageData.bind(ctx);
        ctx.getImageData = (sx, sy, sw, sh) => {
          try {
            return new ImageData(Math.max(1, sw), Math.max(1, sh));
          } catch {
            return originalGetImageData(sx, sy, 1, 1);
          }
        };
      } catch {
        // Ignore if sealed
      }

      const imgW = drawable instanceof ImageBitmap ? drawable.width : drawable.naturalWidth || props.width || 800;
      const imgH = drawable instanceof ImageBitmap ? drawable.height : drawable.naturalHeight || props.height || 600;

      canvas.width = imgW;
      canvas.height = imgH;

      ctx.clearRect(0, 0, imgW, imgH);

      if (props.objectFit === "contain") {
        const scale = Math.min(imgW / imgW, imgH / imgH);
        const x = (imgW - imgW * scale) / 2;
        const y = (imgH - imgH * scale) / 2;
        ctx.drawImage(drawable, x, y, imgW * scale, imgH * scale);
      } else {
        ctx.drawImage(drawable, 0, 0, imgW, imgH);
      }

      isLoaded.value = true;
    })
    .catch((err) => {
      if (!isCancelled) {
        console.error("Asset protection stream failure", err);
        hasError.value = true;
      }
    });
};

onMounted(() => {
  renderAsset();
});

watch(() => [props.src, props.width, props.height, props.objectFit], () => {
  renderAsset();
});

onUnmounted(() => {
  isCancelled = true;
});
</script>

<template>
  <div
    :class="[
      'protected-asset relative w-full h-full overflow-hidden select-none bg-[#111114]',
      className
    ]"
    @contextmenu.prevent.stop
    @dragstart.prevent.stop
    draggable="false"
  >
    <!-- Loading Shimmer Placeholder -->
    <div
      v-if="!isLoaded && !hasError"
      class="absolute inset-0 bg-[#17171B] animate-pulse flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div class="w-5 h-5 rounded-full border-2 border-[#FF6A00]/30 border-t-[#FF6A00] animate-spin" />
    </div>

    <!-- Error Placeholder -->
    <div
      v-if="hasError"
      class="absolute inset-0 bg-[#17171B] flex items-center justify-center p-2 text-center pointer-events-none"
      aria-hidden="true"
    >
      <span class="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
        Asset Protected
      </span>
    </div>

    <!-- Encrypted In-Memory GPU Canvas -->
    <canvas
      ref="canvasRef"
      :class="[
        'w-full h-full select-none pointer-events-none transition-opacity duration-500',
        objectFit === 'contain' ? 'object-contain' : 'object-cover',
        objectPosition === 'top'
          ? 'object-top'
          : objectPosition === 'bottom'
          ? 'object-bottom'
          : 'object-center',
        canvasClassName,
        isLoaded ? 'opacity-100' : 'opacity-0'
      ]"
      :aria-label="alt"
      role="img"
      draggable="false"
      @contextmenu.prevent
    />

    <!-- Impenetrable Security Barrier Overlay -->
    <div
      class="absolute inset-0 z-10 select-none bg-transparent pointer-events-auto cursor-default"
      @contextmenu.prevent.stop
      @dragstart.prevent.stop
      draggable="false"
      aria-hidden="true"
    />
  </div>
</template>
