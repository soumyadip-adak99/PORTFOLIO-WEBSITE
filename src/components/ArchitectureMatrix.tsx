import { useState } from "react";
import {
    SiSpringboot,
    SiReact,
    SiJavascript,
    SiTypescript,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiRedis,
    SiNodedotjs,
    SiTailwindcss,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import {
    Server,
    Code2,
    Database,
    Cloud,
    Workflow,
    Layers,
} from "lucide-react";
import { StackPillar, PipelineStep, TechnologyItem } from "../types";

const STACK_PILLARS: StackPillar[] = [
    {
        title: "Backend Core",
        icon: Server,
        color: "#6DB33F",
        accent: "rgba(109, 179, 63, 0.15)",
        technologies: [
            {
                name: "Spring Boot",
                spec: "Microservices & JPA",
                tier: "Expert",
                icon: SiSpringboot,
                color: "#6DB33F",
                project: "CodeMind AI",
            },
            {
                name: "Java 21",
                spec: "Enterprise OOP & Concurrency",
                tier: "Advanced",
                icon: FaJava,
                color: "#E76F00",
                project: "CodeMind & Services",
            },
            {
                name: "REST APIs",
                spec: "Protocols & JSON Contracts",
                tier: "Expert",
                icon: Server,
                color: "#FF8C42",
                project: "All Backend Systems",
            },
            {
                name: "Node.js",
                spec: "Async Runtime & Routing",
                tier: "Proficient",
                icon: SiNodedotjs,
                color: "#5FA04E",
                project: "MERN E-Commerce",
            },
        ],
    },
    {
        title: "Frontend Engineering",
        icon: Code2,
        color: "#61DAFB",
        accent: "rgba(97, 218, 251, 0.15)",
        technologies: [
            {
                name: "React 19",
                spec: "SPAs & Component Hooks",
                tier: "Expert",
                icon: SiReact,
                color: "#61DAFB",
                project: "CodeMind & SPAs",
            },
            {
                name: "TypeScript",
                spec: "Strict Static Types",
                tier: "Advanced",
                icon: SiTypescript,
                color: "#3178C6",
                project: "CodeMind AI (Next.js)",
            },
            {
                name: "Tailwind CSS",
                spec: "Token Design Systems",
                tier: "Expert",
                icon: SiTailwindcss,
                color: "#06B6D4",
                project: "All Frontends",
            },
            {
                name: "JavaScript",
                spec: "ESNext & Async Loops",
                tier: "Expert",
                icon: SiJavascript,
                color: "#F7DF1E",
                project: "Web Applications",
            },
        ],
    },
    {
        title: "Data & Storage",
        icon: Database,
        color: "#4169E1",
        accent: "rgba(65, 105, 225, 0.15)",
        technologies: [
            {
                name: "PostgreSQL",
                spec: "ACID Schemas & pgvector",
                tier: "Advanced",
                icon: SiPostgresql,
                color: "#4169E1",
                project: "CodeMind AI",
            },
            {
                name: "MongoDB",
                spec: "NoSQL Document Models",
                tier: "Advanced",
                icon: SiMongodb,
                color: "#47A248",
                project: "CodeScribe AI",
            },
            {
                name: "Redis",
                spec: "Sub-ms In-Memory Cache",
                tier: "Proficient",
                icon: SiRedis,
                color: "#FF4438",
                project: "Performance Caching",
            },
            {
                name: "MySQL",
                spec: "Transactional Data & Keys",
                tier: "Proficient",
                icon: SiMysql,
                color: "#4479A1",
                project: "Relational Queries",
            },
        ],
    },
    {
        title: "Cloud & DevOps",
        icon: Cloud,
        color: "#FF9900",
        accent: "rgba(255, 153, 0, 0.15)",
        technologies: [
            {
                name: "AWS",
                spec: "EC2, S3 & Cloud Architecture",
                tier: "Advanced",
                icon: FaAws,
                color: "#FF9900",
                project: "Cloud Deployments",
            },
            {
                name: "Docker",
                spec: "Multi-Stage Containers",
                tier: "Advanced",
                icon: SiDocker,
                color: "#2496ED",
                project: "Service Deployments",
            },
            {
                name: "Git & GitHub",
                spec: "Branching & CI/CD",
                tier: "Expert",
                icon: SiGit,
                color: "#F05032",
                project: "All Repositories",
            },
            {
                name: "Cloudflare & Vercel",
                spec: "Edge CDN & SSL Routing",
                tier: "Advanced",
                icon: Cloud,
                color: "#F38020",
                project: "CodeScribe AI",
            },
        ],
    },
];

const PIPELINE_FLOW: PipelineStep[] = [
    { step: "01", name: "Client Layer", tech: "React 19 + TypeScript", color: "#61DAFB" },
    { step: "02", name: "Security & API", tech: "REST + JWT Auth", color: "#FF8C42" },
    { step: "03", name: "Core Engine", tech: "Spring Boot (Java 21)", color: "#6DB33F" },
    { step: "04", name: "Persistence", tech: "PostgreSQL + MongoDB", color: "#4169E1" },
    { step: "05", name: "Infrastructure", tech: "AWS + Docker Containers", color: "#FF9900" },
];

export default function ArchitectureMatrix() {
    const [viewMode, setViewMode] = useState<"grid" | "pipeline">("grid");
    const [activeHover, setActiveHover] = useState<TechnologyItem | null>(null);

    return (
        <div className="w-full space-y-5">
            {/* Minimalist View Switcher & Live Inspector Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#111114] border border-[#29292F] overflow-hidden">
                {/* Active Hover Ticker / Telemetry */}
                <div className="w-full sm:w-auto min-w-0 px-2 sm:px-3 text-xs font-mono overflow-hidden">
                    {activeHover ? (
                        <div className="flex items-center gap-2 min-w-0 truncate justify-center sm:justify-start">
                            <span
                                className="w-2 h-2 rounded-full shrink-0 animate-ping"
                                style={{ backgroundColor: activeHover.color }}
                            />
                            <span className="font-semibold text-[#F5F5F5] shrink-0">
                                {activeHover.name}:
                            </span>
                            <span className="text-[#A1A1AA] truncate">{activeHover.spec}</span>
                            <span className="text-[#71717A] hidden md:inline shrink-0">
                                • Deployed in {activeHover.project}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 min-w-0 truncate justify-center sm:justify-start">
                            <span className="w-2 h-2 rounded-full bg-[#FF6A00] shrink-0" />
                            <span className="text-[#A1A1AA] truncate sm:hidden">
                                Tap any tech to inspect role
                            </span>
                            <span className="text-[#A1A1AA] truncate hidden sm:inline">
                                Hover any technology to view architectural role & deployment
                            </span>
                        </div>
                    )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-[#17171B] border border-[#29292F]/80 shrink-0">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            viewMode === "grid"
                                ? "bg-[#111114] text-[#F5F5F5] border border-[#FF6A00]/40 shadow-sm"
                                : "text-[#71717A] hover:text-[#D4D4D8]"
                        }`}
                    >
                        <Layers size={12} className={viewMode === "grid" ? "text-[#FF6A00]" : ""} />
                        <span>Matrix</span>
                    </button>
                    <button
                        onClick={() => setViewMode("pipeline")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            viewMode === "pipeline"
                                ? "bg-[#111114] text-[#F5F5F5] border border-[#FF6A00]/40 shadow-sm"
                                : "text-[#71717A] hover:text-[#D4D4D8]"
                        }`}
                    >
                        <Workflow size={12} className={viewMode === "pipeline" ? "text-[#FF6A00]" : ""} />
                        <span>Pipeline</span>
                    </button>
                </div>
            </div>

            {/* View Mode 1: Compact Bento Grid */}
            {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STACK_PILLARS.map((pillar) => {
                        const PillarIcon = pillar.icon;
                        return (
                            <div
                                key={pillar.title}
                                className="p-5 rounded-2xl bg-[#17171B] border border-[#29292F] hover:border-[#FF6A00]/30 transition-all duration-300 shadow-lg flex flex-col justify-between"
                            >
                                {/* Pillar Header */}
                                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#29292F]/80">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                                            style={{ backgroundColor: pillar.accent, color: pillar.color }}
                                        >
                                            <PillarIcon size={14} />
                                        </div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#F5F5F5]">
                                            {pillar.title}
                                        </h4>
                                    </div>
                                    <span className="text-[10px] font-mono text-[#71717A]">
                                        {pillar.technologies.length} Techs
                                    </span>
                                </div>

                                {/* Tech Rows (Compact & Punchy) */}
                                <div className="space-y-2">
                                    {pillar.technologies.map((tech) => {
                                        const TechIcon = tech.icon;
                                        const isHovered = activeHover?.name === tech.name;

                                        return (
                                            <div
                                                key={tech.name}
                                                onMouseEnter={() => setActiveHover(tech)}
                                                onMouseLeave={() => setActiveHover(null)}
                                                className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                                                    isHovered
                                                        ? "bg-[#111114] border-[#FF6A00]/50 shadow-[0_0_15px_rgba(255,106,0,0.15)] translate-x-1"
                                                        : "bg-[#111114]/60 border-[#29292F]/60 hover:bg-[#111114] hover:border-[#29292F]"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <span
                                                        className="text-base shrink-0 transition-transform duration-200"
                                                        style={{ color: tech.color }}
                                                    >
                                                        <TechIcon />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-semibold text-[#F5F5F5] truncate">
                                                            {tech.name}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-[#71717A] truncate">
                                                            {tech.spec}
                                                        </div>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                                                        tech.tier === "Expert"
                                                            ? "bg-[#FF6A00]/10 text-[#FF8C42] border border-[#FF6A00]/20 font-semibold"
                                                            : "bg-[#17171B] text-[#A1A1AA] border border-[#29292F]"
                                                    }`}
                                                >
                                                    {tech.tier}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* View Mode 2: Minimalist 5-Step Architecture Flow */
                <div className="p-6 rounded-2xl bg-[#17171B] border border-[#29292F] shadow-xl">
                    <div className="grid sm:grid-cols-5 gap-3">
                        {PIPELINE_FLOW.map((stage) => (
                            <div
                                key={stage.step}
                                className="p-4 rounded-xl bg-[#111114] border border-[#29292F] space-y-2 hover:border-[#FF6A00]/40 transition-colors"
                            >
                                <span className="text-[10px] font-mono text-[#71717A] block">
                                    {stage.step}
                                </span>
                                <div className="text-xs font-bold text-[#F5F5F5]">
                                    {stage.name}
                                </div>
                                <div
                                    className="text-[11px] font-mono truncate"
                                    style={{ color: stage.color }}
                                >
                                    {stage.tech}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
