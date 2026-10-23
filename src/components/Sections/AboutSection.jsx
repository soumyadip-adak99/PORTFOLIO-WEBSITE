import { useRef } from "react";
import { JOURNEY_STEPS, PASSIONS } from "../../utils/data";
import SIGNATURE from "../../assets/signature.png";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "../../utils/scrollHelper";
import ProtectedImage from "../ProtectedImage";

export default function AboutSection() {
    const sectionRef = useRef(null);

    const scrollTo = (id) => {
        scrollToSection(id, -75);
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 px-6 lg:px-12 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                        <span className="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
                            Background & Trajectory
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
                        Engineering Philosophy &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
                            Journey
                        </span>
                    </h2>

                    <p className="text-base text-[#A1A1AA] leading-relaxed">
                        A look into my background, academic roots, professional trajectory, and the architectural principles that drive my development workflow.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
                    {/* Left: Biography, Mission & Principles (6 cols) */}
                    <div className="lg:col-span-6 space-y-8">
                        {/* Core Mission Card */}
                        <div className="p-8 rounded-2xl bg-[#17171B] border border-[#29292F] shadow-xl space-y-4">
                            <h3 className="text-xl font-bold text-[#F5F5F5] tracking-tight flex items-center justify-between">
                                <span>The Engineering Mindset</span>
                                <span className="text-xs font-mono text-[#FF8C42]">Full Stack</span>
                            </h3>

                            <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed font-normal">
                                I believe modern software should be as resilient on the server as it is delightful in the browser. My daily focus is bridging high-throughput, maintainable backend architectures in <strong className="text-[#F5F5F5]">Java and Spring Boot</strong> with reactive, silky-smooth frontends in <strong className="text-[#F5F5F5]">React</strong>.
                            </p>

                            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                                From modeling relational schemas and configuring Docker containers to optimizing state management and DOM performance, I prioritize code clarity, type safety, and real-world impact.
                            </p>
                        </div>

                        {/* What Drives My Work */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717A] mb-2">
                                Core Pillars
                            </h4>
                            <div className="grid gap-3">
                                {PASSIONS.map((passion) => {
                                    const Icon = passion.icon;
                                    return (
                                        <div
                                            key={passion.title}
                                            className="p-4 rounded-xl bg-[#111114] border border-[#29292F] flex items-center gap-4 hover:border-[#FF6A00]/40 transition-colors"
                                        >
                                            <div className="p-2.5 rounded-lg bg-[#17171B] border border-[#29292F] text-[#FF6A00] shrink-0">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold text-[#F5F5F5]">
                                                    {passion.title}
                                                </h5>
                                                <p className="text-xs text-[#A1A1AA] mt-0.5">
                                                    {passion.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Authentic Digital Signature */}
                        <div className="p-6 rounded-2xl bg-[#111114]/60 border border-[#29292F] flex flex-col items-center text-center">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-3">
                                Designed & Coded By
                            </span>
                            <div className="w-56 h-16 mb-2 flex items-center justify-center">
                                <ProtectedImage
                                    src={SIGNATURE}
                                    alt="Soumyadip Adak signature"
                                    width={448}
                                    height={134}
                                    canvasClassName="brightness-125 contrast-125 drop-shadow-[0_0_12px_rgba(255,106,0,0.2)]"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="text-base font-bold text-[#F5F5F5]">
                                Soumyadip Adak
                            </div>
                            <span className="text-xs text-[#FF8C42] font-mono">
                                Full Stack Systems & Applications
                            </span>
                        </div>
                    </div>

                    {/* Right: Journey & Experience Timeline (6 cols) */}
                    <div className="lg:col-span-6 space-y-6">
                        <h3 className="text-xl font-bold text-[#F5F5F5] tracking-tight mb-6">
                            Milestones & Experience
                        </h3>

                        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#FF6A00] before:via-[#FF8C42]/50 before:to-[#29292F]">
                            {JOURNEY_STEPS.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={idx} className="relative group">
                                        {/* Glowing Timeline Node */}
                                        <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#111114] border-2 border-[#FF6A00] flex items-center justify-center shadow-[0_0_10px_rgba(255,106,0,0.4)] group-hover:scale-125 transition-transform duration-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                                        </div>

                                        {/* Milestone Card */}
                                        <div className="p-6 rounded-2xl bg-[#17171B] border border-[#29292F] group-hover:border-[#FF6A00]/40 transition-all duration-200 shadow-md">
                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                <h4 className="text-base font-bold text-[#F5F5F5] tracking-tight group-hover:text-[#FF6A00] transition-colors">
                                                    {step.title}
                                                </h4>
                                                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8C42] text-[11px] font-mono font-semibold">
                                                    {step.year}
                                                </span>
                                            </div>

                                            <div className="text-xs font-mono font-medium text-[#D4D4D8] mb-3">
                                                {step.company}
                                            </div>

                                            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Connect Callout */}
                        <div className="pt-4">
                            <button
                                onClick={() => scrollTo("contact")}
                                className="w-full py-4 rounded-xl bg-[#17171B] border border-[#29292F] hover:border-[#FF6A00]/50 text-[#F5F5F5] hover:text-[#FF6A00] font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                            >
                                <span>Have a project in mind? Let's discuss</span>
                                <ArrowUpRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
