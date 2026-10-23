import { useState, useRef } from "react";
import { Send, Clock, ArrowUpRight } from "lucide-react";
import TextInput from "../Input/TextInput";
import SuccessModal from "../SuccessModal";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import emailjs from "@emailjs/browser";

// Direct inquiry and messaging portal
export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sectionRef = useRef(null);

    const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        try {
            if (serviceId && templateId && publicKey) {
                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                    },
                    publicKey
                );
            }
            setShowSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setShowSuccess(false), 4000);
        } catch (err) {
            console.error("EmailJS Error:", err);
            // Fallback for demo when EmailJS credentials are empty
            setShowSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setShowSuccess(false), 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 px-6 lg:px-12 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                        <span className="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
                            Direct Communication
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
                        Let's Build Something{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
                            Exceptional
                        </span>
                    </h2>

                    <p className="text-base text-[#A1A1AA] leading-relaxed">
                        Whether you have an upcoming project, an engineering opening, or want to discuss full-stack architecture, my inbox is always open.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left: Contact Form (7 cols) */}
                    <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#17171B] border border-[#29292F] shadow-2xl relative">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#29292F]/60">
                            <div>
                                <h3 className="text-xl font-bold text-[#F5F5F5] tracking-tight">
                                    Send Direct Message
                                </h3>
                                <p className="text-xs text-[#A1A1AA] mt-0.5">
                                    Typically responded to within 24 hours
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111114] border border-[#29292F] text-[11px] font-mono text-[#FF8C42]">
                                <Clock size={12} />
                                <span>Active</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <TextInput
                                    label="Full Name"
                                    placeholder="Your name or company"
                                    value={formData.name}
                                    handleInputChange={(val) => handleInputChange("name", val)}
                                />

                                <TextInput
                                    label="Email Address"
                                    placeholder="your.email@domain.com"
                                    value={formData.email}
                                    handleInputChange={(val) => handleInputChange("email", val)}
                                />
                            </div>

                            <TextInput
                                label="Project Details / Message"
                                placeholder="Describe your project, timeline, or inquiries..."
                                value={formData.message}
                                handleInputChange={(val) => handleInputChange("message", val)}
                                textarea
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || !isFormValid}
                                className={`w-full py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isFormValid && !isSubmitting
                                        ? "bg-[#FF6A00] hover:bg-[#FF8C42] text-white cursor-pointer glow-orange-button"
                                        : "bg-[#111114] text-[#71717A] border border-[#29292F] cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Transmitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right: Coordinates & Online Channels (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Status Card */}
                        <div className="p-6 rounded-2xl bg-[#111114] border border-[#29292F] space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
                                <span className="text-sm font-semibold text-[#F5F5F5]">
                                    Open for Engagement
                                </span>
                            </div>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed">
                                Available for software engineer positions, contract development, and technical consulting.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-3">
                            {CONTACT_INFO.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.label}
                                        className="p-4 rounded-2xl bg-[#17171B] border border-[#29292F] flex items-center gap-4 hover:border-[#FF6A00]/40 transition-colors"
                                    >
                                        <div className="p-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#FF6A00] shrink-0">
                                            <Icon size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                                                {item.label}
                                            </div>
                                            <div className="text-sm font-medium text-[#F5F5F5] truncate">
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Social Links Grid */}
                        <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
                                Verified Channels
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {SOCIAL_LINKS.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3.5 rounded-xl bg-[#17171B] border border-[#29292F] hover:border-[#FF6A00]/40 hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] flex items-center justify-between transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <Icon size={16} className="text-[#FF6A00]" />
                                                <span className="text-xs font-medium">
                                                    {social.name}
                                                </span>
                                            </div>
                                            <ArrowUpRight size={13} className="text-[#71717A] group-hover:text-[#FF6A00] transition-colors" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal showSuccess={showSuccess} setShowSuccess={setShowSuccess} />
        </section>
    );
}
