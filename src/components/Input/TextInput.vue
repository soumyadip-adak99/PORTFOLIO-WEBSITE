<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    textarea?: boolean;
    label: string;
    placeholder?: string;
  }>(),
  {
    textarea: false,
    placeholder: "",
  }
);

defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();
</script>

<template>
  <div class="space-y-1.5 text-left">
    <label class="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
      {{ label }}
    </label>
    <textarea
      v-if="textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :rows="4"
      :placeholder="placeholder"
      class="w-full px-4 py-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#F5F5F5] placeholder-[#71717A] text-sm font-normal focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
    />
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="w-full px-4 py-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#F5F5F5] placeholder-[#71717A] text-sm font-normal focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
    />
  </div>
</template>
