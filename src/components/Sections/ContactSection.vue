<script setup lang="ts">
import { ref, computed } from "vue";
import emailjs from "@emailjs/browser";
import { Clock, Send, MapPin, Mail, ArrowUpRight, AlertCircle } from "lucide-vue-next";
import { FiGithub, FiLinkedin, FiInstagram } from "../Icons";
import SuccessModal from "../SuccessModal.vue";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const formData = ref<ContactFormData>({
  name: "",
  email: "",
  message: "",
});

const showSuccess = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const submitError = ref<string | null>(null);
const sectionRef = ref<HTMLElement | null>(null);

const isFormValid = computed(
  () =>
    Boolean(
      formData.value.name.trim() &&
      formData.value.email.trim() &&
      formData.value.message.trim()
    )
);

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) return;

  isSubmitting.value = true;
  submitError.value = null;

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  try {
    if (!serviceId || !templateId || !publicKey) {
      throw new Error(
        "EmailJS credentials missing in .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Please configure your .env file."
      );
    }

    const templateParams = {
      from_name: formData.value.name,
      name: formData.value.name,
      user_name: formData.value.name,
      from_email: formData.value.email,
      email: formData.value.email,
      user_email: formData.value.email,
      reply_to: formData.value.email,
      message: formData.value.message,
      to_name: "Soumyadip Adak",
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === "OK") {
      showSuccess.value = true;
      formData.value = { name: "", email: "", message: "" };
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      throw new Error(`EmailJS status ${response.status}: ${response.text}`);
    }
  } catch (err: any) {
    console.error("EmailJS Transmission Error:", err);
    submitError.value =
      err?.text ||
      err?.message ||
      "Failed to deliver transmission. Please verify that your Email Service is active in your EmailJS Dashboard.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="py-24 px-6 lg:px-12 relative overflow-hidden"
  >
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
          <span class="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
          <span class="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
            Direct Communication
          </span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
          Let's Build Something
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
            Exceptional
          </span>
        </h2>

        <p class="text-base text-[#A1A1AA] leading-relaxed">
          Whether you have an upcoming project, an engineering opening, or want to discuss full-stack architecture, my inbox is always open.
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <!-- Left Column: Contact Form (7 cols) -->
        <div class="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-[#111114] border border-[#26262B] shadow-2xl relative">
          <!-- Form Header -->
          <div class="flex items-start justify-between mb-8">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight">
                Send Direct Message
              </h3>
              <p class="text-xs text-[#71717A] mt-1 font-sans">
                Typically responded to within 24 hours
              </p>
            </div>

            <!-- Active Status Badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#FF6A00]/40 text-xs font-medium text-[#FF6A00] shrink-0">
              <Clock :size="12" class="text-[#FF6A00]" />
              <span>Active</span>
            </div>
          </div>

          <!-- Error Alert Banner -->
          <div
            v-if="submitError"
            class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start justify-between gap-3"
          >
            <div class="flex items-start gap-2.5">
              <AlertCircle :size="16" class="shrink-0 mt-0.5 text-red-400" />
              <span>{{ submitError }}</span>
            </div>
            <button
              type="button"
              @click="submitError = null"
              class="text-red-400 hover:text-red-300 font-bold text-sm leading-none"
            >
              &times;
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 2-Column Row: Full Name & Email Address -->
            <div class="grid sm:grid-cols-2 gap-5">
              <div class="space-y-2 text-left">
                <label class="block text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
                  FULL NAME
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Your name or company"
                  class="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-[#26262B] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#FF6A00]/60 transition-colors"
                />
              </div>

              <div class="space-y-2 text-left">
                <label class="block text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
                  EMAIL ADDRESS
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="your.email@domain.com"
                  class="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-[#26262B] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#FF6A00]/60 transition-colors"
                />
              </div>
            </div>

            <!-- Full-Width Row: Project Details / Message -->
            <div class="space-y-2 text-left">
              <label class="block text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
                PROJECT DETAILS / MESSAGE
              </label>
              <textarea
                v-model="formData.message"
                rows="4"
                placeholder="Describe your project, timeline, or inquiries..."
                class="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] border border-[#26262B] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#FF6A00]/60 transition-colors resize-none"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              :class="[
                'w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer',
                isFormValid && !isSubmitting
                  ? 'bg-[#FF6A00] hover:bg-[#FF8C42] text-white glow-orange-button shadow-lg shadow-orange-500/20'
                  : 'bg-[#17171B] text-[#71717A] border border-[#26262B] cursor-not-allowed'
              ]"
            >
              <Send :size="14" :class="{ 'animate-pulse': isSubmitting }" />
              <span>{{ isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE" }}</span>
            </button>
          </form>
        </div>

        <!-- Right Column: Coordinates & Online Channels (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <!-- 1. Open for Engagement Status Card -->
          <div class="p-6 rounded-2xl bg-[#111114] border border-[#26262B] space-y-2">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] animate-pulse" />
              <h4 class="text-sm font-bold text-[#F5F5F5]">
                Open for Engagement
              </h4>
            </div>
            <p class="text-xs text-[#8A8A93] leading-relaxed">
              Available for software engineer positions, contract development, and technical consulting.
            </p>
          </div>

          <!-- 2. Location Coordinate Card -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#111114] border border-[#26262B] flex items-center gap-4 hover:border-[#FF6A00]/40 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-[#17171B] border border-[#26262B] flex items-center justify-center text-[#FF6A00] shrink-0">
              <MapPin :size="18" />
            </div>
            <div class="min-w-0">
              <div class="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
                LOCATION
              </div>
              <div class="text-sm font-semibold text-[#F5F5F5] truncate mt-0.5">
                West Bengal, India
              </div>
            </div>
          </div>

          <!-- 3. Direct Email Card -->
          <a
            href="mailto:work.soumyadipadak@gmail.com"
            class="p-4 sm:p-5 rounded-2xl bg-[#111114] border border-[#26262B] flex items-center gap-4 hover:border-[#FF6A00]/40 transition-colors group"
          >
            <div class="w-10 h-10 rounded-xl bg-[#17171B] border border-[#26262B] flex items-center justify-center text-[#FF6A00] shrink-0 group-hover:scale-105 transition-transform">
              <Mail :size="18" />
            </div>
            <div class="min-w-0">
              <div class="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
                EMAIL
              </div>
              <div class="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors truncate mt-0.5">
                work.soumyadipadak@gmail.com
              </div>
            </div>
          </a>

          <!-- 4. Verified Channels Grid -->
          <div class="space-y-3 pt-1">
            <h4 class="text-[10px] font-mono uppercase tracking-widest text-[#71717A] font-semibold">
              VERIFIED CHANNELS
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <!-- GitHub -->
              <a
                href="https://github.com/soumyadip-adak99"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3.5 rounded-xl bg-[#111114] border border-[#26262B] hover:border-[#FF6A00]/40 hover:bg-[#17171B] text-[#D4D4D8] hover:text-white flex items-center justify-between transition-all duration-200 group"
              >
                <div class="flex items-center gap-2.5">
                  <FiGithub :size="16" class="text-[#FF6A00]" />
                  <span class="text-xs font-semibold">GitHub</span>
                </div>
                <ArrowUpRight :size="13" class="text-[#71717A] group-hover:text-[#FF6A00] transition-colors" />
              </a>

              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/in/soumyadip-adak-a19b03281/"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3.5 rounded-xl bg-[#111114] border border-[#26262B] hover:border-[#FF6A00]/40 hover:bg-[#17171B] text-[#D4D4D8] hover:text-white flex items-center justify-between transition-all duration-200 group"
              >
                <div class="flex items-center gap-2.5">
                  <FiLinkedin :size="16" class="text-[#FF6A00]" />
                  <span class="text-xs font-semibold">LinkedIn</span>
                </div>
                <ArrowUpRight :size="13" class="text-[#71717A] group-hover:text-[#FF6A00] transition-colors" />
              </a>

              <!-- Email -->
              <a
                href="mailto:work.soumyadipadak@gmail.com"
                class="p-3.5 rounded-xl bg-[#111114] border border-[#26262B] hover:border-[#FF6A00]/40 hover:bg-[#17171B] text-[#D4D4D8] hover:text-white flex items-center justify-between transition-all duration-200 group"
              >
                <div class="flex items-center gap-2.5">
                  <Mail :size="16" class="text-[#FF6A00]" />
                  <span class="text-xs font-semibold">Email</span>
                </div>
                <ArrowUpRight :size="13" class="text-[#71717A] group-hover:text-[#FF6A00] transition-colors" />
              </a>

              <!-- Instagram -->
              <a
                href="https://www.instagram.com/soumya.dip.adak/"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3.5 rounded-xl bg-[#111114] border border-[#26262B] hover:border-[#FF6A00]/40 hover:bg-[#17171B] text-[#D4D4D8] hover:text-white flex items-center justify-between transition-all duration-200 group"
              >
                <div class="flex items-center gap-2.5">
                  <FiInstagram :size="16" class="text-[#FF6A00]" />
                  <span class="text-xs font-semibold">Instagram</span>
                </div>
                <ArrowUpRight :size="13" class="text-[#71717A] group-hover:text-[#FF6A00] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal Teleport -->
    <SuccessModal
      :is-open="showSuccess"
      @close="showSuccess = false"
    />
  </section>
</template>
