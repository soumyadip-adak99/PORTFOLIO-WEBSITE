import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Layers, CheckCircle2, Database, Server } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export default function ProjectSpecsModal({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null;

    const hasLive = Boolean(project.liveUrl);
    const hasRepo = Boolean(project.githubUrl);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop with hardware-accelerated dark tint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.35, damping: 26 }}
                    className="relative w-full max-w-2xl bg-[#17171B] border border-[#29292F] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(255,106,0,0.25)] z-10 max-h-[90vh] overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-xl bg-[#111114] border border-[#29292F] text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-[#FF6A00]/40 transition-colors cursor-pointer"
                        aria-label="Close specification dialog"
                    >
                        <X size={18} />
                    </button>

                    {/* Header */}
                    <div className="space-y-2 mb-6 pr-10">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/25 font-semibold">
                                {project.status}
                            </span>
                            <span className="text-xs font-mono text-[#71717A]">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#F5F5F5] tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-[#FF8C42]">
                            {project.subtitle}
                        </p>
                    </div>

                    {/* Architectural Overview */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2 flex items-center gap-1.5">
                                <Cpu size={14} className="text-[#FF6A00]" />
                                <span>System Architecture Scope</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack Specs Table */}
                        {project.techDetails && (
                            <div className="p-4 rounded-2xl bg-[#111114] border border-[#29292F] space-y-3">
                                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-3">
                                    Technical Architecture Specification
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                                    <div className="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                                        <div className="flex items-center gap-1.5 text-[#FF8C42] font-mono font-medium mb-1">
                                            <Server size={13} />
                                            <span>Backend Engine</span>
                                        </div>
                                        <div className="text-[#D4D4D8] font-mono text-[11px]">
                                            {project.techDetails.backend}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                                        <div className="flex items-center gap-1.5 text-[#61DAFB] font-mono font-medium mb-1">
                                            <Layers size={13} />
                                            <span>Frontend Layer</span>
                                        </div>
                                        <div className="text-[#D4D4D8] font-mono text-[11px]">
                                            {project.techDetails.frontend}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                                        <div className="flex items-center gap-1.5 text-[#4169E1] font-mono font-medium mb-1">
                                            <Database size={13} />
                                            <span>Persistence Layer</span>
                                        </div>
                                        <div className="text-[#D4D4D8] font-mono text-[11px]">
                                            {project.techDetails.database}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#17171B] border border-[#29292F]/60">
                                        <div className="flex items-center gap-1.5 text-[#6DB33F] font-mono font-medium mb-1">
                                            <ShieldCheck size={13} />
                                            <span>Pattern & Protocols</span>
                                        </div>
                                        <div className="text-[#D4D4D8] font-mono text-[11px]">
                                            {project.techDetails.architecture}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Engineering Highlights */}
                        {project.highlights && (
                            <div>
                                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-2.5">
                                    Key Capabilities Delivered
                                </h4>
                                <div className="grid sm:grid-cols-3 gap-2">
                                    {project.highlights.map((item) => (
                                        <div
                                            key={item}
                                            className="p-2.5 rounded-xl bg-[#111114] border border-[#29292F] flex items-center gap-2 text-xs text-[#D4D4D8]"
                                        >
                                            <CheckCircle2 size={14} className="text-[#FF6A00] shrink-0" />
                                            <span className="truncate">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-[#29292F]">
                            {hasLive && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button"
                                >
                                    <ExternalLink size={14} />
                                    <span>Launch Application</span>
                                </a>
                            )}

                            {hasRepo && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111114] hover:bg-[#1E1E24] text-[#D4D4D8] hover:text-[#FF6A00] border border-[#29292F] hover:border-[#FF6A00]/40 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                                        hasLive ? "" : "flex-1"
                                    }`}
                                >
                                    <FiGithub size={15} />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
