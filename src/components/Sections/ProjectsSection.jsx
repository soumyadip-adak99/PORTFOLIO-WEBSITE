import { useState, useRef } from "react";
import { PROJECTS } from "../../utils/data";
import ProjectCard from "../ProjectCard";
import ProjectSpecsModal from "../ProjectSpecsModal";
import ProtectedImage from "../ProtectedImage";
import {
    FolderGit2,
    Sparkles,
    ExternalLink,
    Server,
    Database,
    Layers,
    CheckCircle2,
    Cpu,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const sectionRef = useRef(null);

    const categories = [
        { label: "All Systems", value: "All", count: PROJECTS.length },
        { label: "Full Stack (Java/Spring)", value: "Full Stack", count: PROJECTS.filter((p) => p.category === "Full Stack").length },
        { label: "Web Apps & SPAs", value: "Web App", count: PROJECTS.filter((p) => p.category === "Web App").length },
        { label: "AI & Machine Learning", value: "AI & ML", count: PROJECTS.filter((p) => p.category === "AI & ML").length },
    ];

    const filteredProjects =
        activeCategory === "All"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === activeCategory);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
    const hasMore = filteredProjects.length > 3;

    // Flagship featured project (CodeMind AI)
    const flagshipProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];

    const handleOpenSpecs = (project) => {
        setSelectedProject(project);
        setIsSpecsOpen(true);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setShowAll(false);
    };

    return (
        <section
            id="work"
            ref={sectionRef}
            className="py-24 px-6 lg:px-12 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[#29292F] shadow-sm mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                        <span className="text-xs uppercase font-mono tracking-widest font-semibold text-[#FF8C42]">
                            Engineering Portfolio
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-5">
                        Featured Systems &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]">
                            Applications
                        </span>
                    </h2>

                    <p className="text-base text-[#A1A1AA] leading-relaxed">
                        A curated catalog of full-stack platforms, microservice architectures, and modern web
                        applications engineered for resilience, clean code standards, and seamless user experiences.
                    </p>
                </div>

                {/* ──────────────────────────────────────────────────────────
                   FLAGSHIP SPOTLIGHT: #1 Project Showcase Bento
                   ────────────────────────────────────────────────────────── */}
                <div className="mb-20 rounded-3xl bg-[#17171B] border border-[#29292F] overflow-hidden shadow-2xl relative group hover:border-[#FF6A00]/40 transition-all duration-300">
                    <div className="grid lg:grid-cols-12 items-stretch">
                        {/* Left Column: Interactive Screenshot Frame (7 cols) */}
                        <div className="lg:col-span-7 bg-[#111114] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#29292F]">
                            {/* Window Top Bar Chrome */}
                            <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#29292F]/80 bg-[#0B0B0D]/80">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-[#17171B] border border-[#29292F] text-[11px] font-mono text-[#A1A1AA] flex items-center gap-1.5 truncate max-w-[280px]">
                                    <span className="text-[#FF6A00]">https://</span>
                                    <span className="text-[#D4D4D8]">
                                        {flagshipProject.liveUrl
                                            ? flagshipProject.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                                            : "codemindai.vercel.app"}
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] hidden sm:inline">
                                    Live Deploy
                                </span>
                            </div>

                            {/* Screenshot Media */}
                            <div className="relative aspect-[16/10] overflow-hidden group/img">
                                <ProtectedImage
                                    src={flagshipProject.image}
                                    alt={`${flagshipProject.title} flagship preview`}
                                    width={1000}
                                    height={625}
                                    canvasClassName="transition-transform duration-700 ease-out group-hover/img:scale-105"
                                    objectFit="cover"
                                    objectPosition="top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent opacity-40 pointer-events-none" />
                            </div>

                            {/* Bottom Live Metrics Strip */}
                            <div className="p-4 px-6 border-t border-[#29292F]/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A1A1AA] bg-[#0E0E11]">
                                {flagshipProject.flagshipMetrics ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Server size={14} className="text-[#FF6A00]" />
                                            <span>{flagshipProject.flagshipMetrics[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Database size={14} className="text-[#4169E1]" />
                                            <span>{flagshipProject.flagshipMetrics[1]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Layers size={14} className="text-[#61DAFB]" />
                                            <span>{flagshipProject.flagshipMetrics[2]}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Server size={14} className="text-[#FF6A00]" />
                                            <span>Spring Boot 4 & Spring AI</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Database size={14} className="text-[#4169E1]" />
                                            <span>PostgreSQL 16 & pgvector</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Layers size={14} className="text-[#61DAFB]" />
                                            <span>Next.js 16 & React 19 UI</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Architectural Dossier (5 cols) */}
                        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00] text-white text-xs font-mono font-semibold tracking-wide shadow-md">
                                        <Sparkles size={12} />
                                        <span>Flagship Project</span>
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-[#111114] border border-[#29292F] text-[11px] font-mono text-[#FF8C42]">
                                        ● Production Live
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-tight">
                                        {flagshipProject.title}
                                    </h3>
                                    <p className="text-xs font-mono text-[#FF8C42] mt-1">
                                        {flagshipProject.subtitle}
                                    </p>
                                </div>

                                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                                    {flagshipProject.description}
                                </p>

                                {/* Highlights with Checkmarks */}
                                <div className="space-y-2 pt-2">
                                    {flagshipProject.highlights.map((item) => (
                                        <div key={item} className="flex items-center gap-2 text-xs text-[#D4D4D8]">
                                            <CheckCircle2 size={14} className="text-[#FF6A00] shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Tags */}
                                <div className="pt-2 flex flex-wrap gap-1.5">
                                    {flagshipProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 rounded-lg bg-[#111114] border border-[#29292F] text-[11px] font-mono text-[#A1A1AA]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Flagship CTAs */}
                            <div className="pt-6 border-t border-[#29292F] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {flagshipProject.liveUrl && (
                                    <a
                                        href={flagshipProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer"
                                    >
                                        <ExternalLink size={14} />
                                        <span>Launch Application</span>
                                    </a>
                                )}

                                <div className="flex items-center gap-2.5">
                                    {flagshipProject.githubUrl && (
                                        <a
                                            href={flagshipProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer"
                                        >
                                            <FiGithub size={15} />
                                            <span>Source Code</span>
                                        </a>
                                    )}

                                    <button
                                        onClick={() => handleOpenSpecs(flagshipProject)}
                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#A1A1AA] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-mono transition-colors cursor-pointer"
                                        title="View Technical Specification"
                                        aria-label="View Technical Specification"
                                    >
                                        <Cpu size={15} />
                                        <span>Specs</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                   SECONDARY SYSTEMS CATALOG WITH DISCIPLINE FILTERS
                   ────────────────────────────────────────────────────────── */}
                <div className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#29292F]">
                        <div className="flex items-center gap-2.5">
                            <FolderGit2 className="w-5 h-5 text-[#FF6A00]" />
                            <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] tracking-tight">
                                Complete Engineering Deployments
                            </h3>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#111114] border border-[#29292F]">
                            {categories.map((category) => {
                                const isActive = activeCategory === category.value;
                                return (
                                    <button
                                        key={category.value}
                                        onClick={() => handleCategoryChange(category.value)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                                            isActive
                                                ? "bg-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/25"
                                                : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#17171B]"
                                        }`}
                                    >
                                        <span>{category.label}</span>
                                        <span
                                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-[#17171B] text-[#71717A]"
                                            }`}
                                        >
                                            {category.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Secondary Projects Grid (Shows 3 items initially) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {displayedProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpenSpecs={handleOpenSpecs}
                            />
                        ))}
                    </div>

                    {/* Expand / Collapse More Projects Button */}
                    {hasMore && (
                        <div className="pt-2 flex justify-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="group px-7 py-3.5 rounded-xl bg-[#17171B] hover:bg-[#1E1E24] text-[#F5F5F5] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/50 font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center gap-2.5 cursor-pointer glow-subtle-hover"
                            >
                                <span>
                                    {showAll
                                        ? "Show Less"
                                        : `View More Projects (${filteredProjects.length - 3} More)`}
                                </span>
                                {showAll ? (
                                    <ChevronUp
                                        size={16}
                                        className="text-[#FF6A00] transition-transform duration-200 group-hover:-translate-y-0.5"
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        className="text-[#FF6A00] transition-transform duration-200 group-hover:translate-y-0.5"
                                    />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Architecture Specification Modal */}
            <ProjectSpecsModal
                project={selectedProject}
                isOpen={isSpecsOpen}
                onClose={() => setIsSpecsOpen(false)}
            />
        </section>
    );
}
