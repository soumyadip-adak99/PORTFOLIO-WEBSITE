import { ExternalLink, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import ProtectedImage from "./ProtectedImage";
import { Project } from "../types";

interface ProjectCardProps {
    project: Project;
    onOpenSpecs?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenSpecs }: ProjectCardProps) {
    const hasLive = Boolean(project.liveUrl);
    const hasRepo = Boolean(project.githubUrl);

    return (
        <article className="group rounded-2xl bg-[#17171B] border border-[#29292F] hover:border-[#FF6A00]/40 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-lg hover:shadow-[0_12px_36px_-6px_rgba(255,106,0,0.18)] hover:-translate-y-1">
            {/* Visual Header / Technical Screenshot Window */}
            <div className="relative aspect-[16/10] bg-[#111114] overflow-hidden border-b border-[#29292F]/60">
                {/* Technical Window Chrome Bar */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0B0D]/85 backdrop-blur-md border border-[#29292F]/80">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
                    <span className="text-[10px] font-mono text-[#71717A] ml-1 hidden sm:inline">
                        {project.category}
                    </span>
                </div>

                {/* Status Badges */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6A00] text-white text-[10px] font-mono font-semibold tracking-wide shadow-md">
                            <Sparkles size={10} />
                            <span>Featured</span>
                        </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-[#111114]/90 text-[#FF8C42] border border-[#29292F] text-[10px] font-mono font-medium">
                        {project.status || "Ready"}
                    </span>
                </div>

                {/* Project Screenshot In-Memory Canvas */}
                <ProtectedImage
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    width={1000}
                    height={625}
                    canvasClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                    objectFit="cover"
                    objectPosition="top"
                />

                {/* Subtle Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17171B] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Project Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-[#F5F5F5] tracking-tight group-hover:text-[#FF6A00] transition-colors line-clamp-1">
                            {project.title}
                        </h3>
                    </div>

                    {project.subtitle && (
                        <p className="text-xs font-mono text-[#FF8C42] line-clamp-1">
                            {project.subtitle}
                        </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2 pt-1">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-4 pt-1">
                    {/* Key Technical Highlights */}
                    {project.highlights && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.highlights.slice(0, 2).map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#111114] border border-[#29292F] text-[#D4D4D8]"
                                >
                                    <CheckCircle2 size={11} className="text-[#FF6A00]" />
                                    <span>{item}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-[#111114]/80 border border-[#29292F] text-[10px] font-mono text-[#A1A1AA] group-hover:text-[#D4D4D8] transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Links & Architecture Specs Button */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#29292F]/60">
                        {hasLive && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer"
                            >
                                <ExternalLink size={13} />
                                <span>Demo</span>
                            </a>
                        )}

                        {hasRepo && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    hasLive ? "px-3" : "flex-1"
                                }`}
                                aria-label={`View ${project.title} source code`}
                            >
                                <FiGithub size={14} />
                                <span>Code</span>
                            </a>
                        )}

                        <button
                            onClick={() => onOpenSpecs && onOpenSpecs(project)}
                            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#A1A1AA] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-mono transition-all duration-200 cursor-pointer"
                            title="Inspect System Architecture"
                        >
                            <Layers size={13} />
                            <span className="hidden sm:inline">Specs</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
