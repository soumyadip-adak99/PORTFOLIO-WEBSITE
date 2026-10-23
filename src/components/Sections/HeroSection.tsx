import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import PROFILE_PIC from "../../assets/profile.webp";
import { scrollToSection } from "../../utils/scrollHelper";
import ProtectedImage from "../ProtectedImage";

export default function HeroSection() {
    const heroRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-badge", {
                opacity: 0,
                y: -15,
                duration: 0.7,
                delay: 0.1,
            })
                .from(
                    ".hero-title-line",
                    {
                        opacity: 0,
                        y: 35,
                        duration: 0.8,
                        stagger: 0.15,
                    },
                    "-=0.4"
                )
                .from(
                    ".hero-description",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                    },
                    "-=0.4"
                )
                .from(
                    ".hero-action-buttons",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-socials",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.5,
                        stagger: 0.08,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-card-container",
                    {
                        opacity: 0,
                        scale: 0.94,
                        duration: 0.9,
                    },
                    "-=0.8"
                )
                .from(
                    ".hero-orbit-system",
                    {
                        opacity: 0,
                        scale: 0.85,
                        duration: 1.1,
                        ease: "power2.out",
                    },
                    "-=0.7"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollTo = (id: string) => {
        scrollToSection(id, -75);
    };

    const socials = [
        { icon: FiGithub, href: "https://github.com/soumyadip-adak99", label: "GitHub" },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/",
            label: "LinkedIn",
        },
        { icon: FiMail, href: "mailto:work.soumyadipadak@gmail.com", label: "Email" },
    ];

    return (
        <section
            id="home"
            ref={heroRef}
            className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-6 lg:px-12 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left Column: Headline, Bio & Actions (7 cols) */}
                    <div className="lg:col-span-7 text-left space-y-7">
                        {/* Status Badge */}
                        <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111114] border border-[#29292F] shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6A00]" />
                            </span>
                            <span className="font-mono text-xs text-[#A1A1AA] tracking-wide">
                                Available for software engineering roles & projects
                            </span>
                        </div>

                        {/* Confident, Striking Headline */}
                        <div className="space-y-1">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F5F5] leading-[1.08]">
                                <span className="hero-title-line block">
                                    Engineering robust
                                </span>
                                <span className="hero-title-line block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] via-[#FF8C42] to-[#FFA066]">
                                        backend systems
                                    </span>
                                </span>
                                <span className="hero-title-line block text-[#D4D4D8]">
                                    & modern interfaces.
                                </span>
                            </h1>
                        </div>

                        {/* Supporting Professional Description */}
                        <p className="hero-description text-base sm:text-lg text-[#A1A1AA] font-normal leading-relaxed max-w-2xl">
                            Hi, I'm <strong className="text-[#F5F5F5] font-semibold">Soumyadip Adak</strong>. I architect full-stack web applications with <span className="text-[#F5F5F5]">Java, Spring Boot, Spring AI, RAG, React, and cloud architectures</span>—combining clean, scalable server-side patterns with fluid, responsive user experiences.
                        </p>

                        {/* Call to Actions & Socials */}
                        <div className="hero-action-buttons pt-2 flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => scrollTo("work")}
                                className="px-7 py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 glow-orange-button flex items-center gap-2 cursor-pointer"
                            >
                                <span>Explore Projects</span>
                                <ArrowUpRight size={16} />
                            </button>

                            <button
                                onClick={() => scrollTo("contact")}
                                className="px-7 py-3.5 rounded-xl bg-[#17171B] hover:bg-[#1E1E24] text-[#F5F5F5] border border-[#29292F] hover:border-[#FF6A00]/40 font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                            >
                                <span>Get in Touch</span>
                            </button>

                            {/* Social Quick Links */}
                            <div className="flex items-center gap-2 sm:ml-2">
                                {socials.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="hero-socials p-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 hover:bg-[#17171B] transition-all duration-200"
                                    >
                                        <item.icon size={17} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Key Technical Highlights Pills */}
                        <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                            <span className="text-[11px] uppercase tracking-wider text-[#71717A] mr-1">
                                Core Focus:
                            </span>
                            {["Spring Boot", "React", "RAG", "PostgreSQL", "Docker", "RESTful APIs"].map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 rounded-lg bg-[#111114] border border-[#29292F] text-[#D4D4D8]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Hero Profile Artwork with Moving Orbital System (5 cols) */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="hero-card-container relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
                            {/* Layered Subtle Orange Backlight */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6A00]/20 via-[#FF8C42]/5 to-transparent rounded-[32px] blur-2xl -z-10 pointer-events-none" />

                            {/* Dynamic Moving Orbital Background System */}
                            <div className="hero-orbit-system absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
                                {/* Ambient Core Radial Glow */}
                                <div
                                    className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(circle at center, rgba(255, 106, 0, 0.16) 0%, rgba(255, 140, 66, 0.05) 45%, transparent 70%)",
                                        transform: "translateZ(0)",
                                    }}
                                />

                                {/* Outer Orbit Ring (Large - Smooth Slow Clockwise Orbit) */}
                                <div className="absolute w-[470px] h-[470px] sm:w-[560px] sm:h-[560px] rounded-full border border-[#29292F]/50 animate-orbit-spin-slow">
                                    {/* Orbital Satellite 1 (Primary Orange Glow) */}
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                                        <span className="w-3 h-3 rounded-full bg-[#FF6A00] shadow-[0_0_12px_#FF6A00] block" />
                                    </div>
                                    {/* Orbital Satellite 2 (Subtle node) */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                                        <span className="w-2 h-2 rounded-full bg-[#71717A]/80 shadow-[0_0_8px_rgba(255,106,0,0.3)] block" />
                                    </div>
                                </div>

                                {/* Middle Orbit Ring (Medium - Dashed Counter-Clockwise Orbit) */}
                                <div className="absolute w-[390px] h-[390px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-[#FF6A00]/25 animate-orbit-spin-reverse">
                                    {/* Orbital Satellite 3 (Amber Sparkle Node) */}
                                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFA066] shadow-[0_0_10px_#FF8C42] block" />
                                    </div>
                                    {/* Tech dot */}
                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]/60 block" />
                                    </div>
                                </div>

                                {/* Inner Orbit Ring (Inner Tech Ring) */}
                                <div className="absolute w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] rounded-full border border-[#29292F]/40 animate-orbit-spin-inner">
                                    {/* Orbital Satellite 4 */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                                        <span className="w-2 h-2 rounded-full bg-[#FF8C42] shadow-[0_0_8px_#FF8C42] block" />
                                    </div>
                                </div>
                            </div>

                            {/* Main Portrait Frame */}
                            <div className="relative w-full rounded-2xl overflow-hidden bg-[#111114] border border-[#29292F] shadow-2xl group transition-all duration-300 hover:border-[#FF6A00]/40">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <ProtectedImage
                                        src={PROFILE_PIC}
                                        alt="Soumyadip Adak"
                                        width={800}
                                        height={1000}
                                        canvasClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                                        objectFit="cover"
                                        objectPosition="center"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle Scroll Indicator */}
                <div className="mt-16 sm:mt-20 flex justify-center">
                    <button
                        onClick={() => scrollTo("skills")}
                        aria-label="Scroll to Skills Section"
                        className="p-2.5 rounded-full border border-[#29292F] text-[#71717A] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors duration-200 cursor-pointer animate-bounce"
                        style={{ animationDuration: "2.5s" }}
                    >
                        <ArrowDown size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
