import { useState, useEffect, useRef, useCallback } from "react";
import {
    SiSpringboot,
    SiReact,
    SiJavascript,
    SiTypescript,
    SiPython,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiRedis,
    SiNodedotjs,
    SiExpress,
    SiTailwindcss,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { Sparkles, Compass } from "lucide-react";

const TECHNOLOGIES = [
    {
        name: "Java",
        category: "Core Language",
        level: "Advanced",
        icon: FaJava,
        color: "#E76F00",
        description: "Robust enterprise applications, OOP, multi-threading",
    },
    {
        name: "Spring Boot",
        category: "Backend Framework",
        level: "Expert",
        icon: SiSpringboot,
        color: "#6DB33F",
        description: "RESTful microservices, Spring Data JPA, Spring Security",
    },
    {
        name: "React",
        category: "Frontend Library",
        level: "Advanced",
        icon: SiReact,
        color: "#61DAFB",
        description: "Component architecture, hooks, state systems & SPAs",
    },
    {
        name: "TypeScript",
        category: "Frontend / Full Stack",
        level: "Proficient",
        icon: SiTypescript,
        color: "#3178C6",
        description: "Strict static typing, interfaces, and maintainable scalable code",
    },
    {
        name: "JavaScript (ES6+)",
        category: "Core Language",
        level: "Expert",
        icon: SiJavascript,
        color: "#F7DF1E",
        description: "Asynchronous programming, closures, modern DOM APIs",
    },
    {
        name: "Python",
        category: "Language & AI",
        level: "Proficient",
        icon: SiPython,
        color: "#3776AB",
        description: "Data scripts, Flask endpoints, ML recommendation pipelines",
    },
    {
        name: "PostgreSQL",
        category: "Relational DB",
        level: "Advanced",
        icon: SiPostgresql,
        color: "#4169E1",
        description: "Relational schema design, indexes, transactional queries",
    },
    {
        name: "MongoDB",
        category: "NoSQL DB",
        level: "Advanced",
        icon: SiMongodb,
        color: "#47A248",
        description: "Document models, aggregation pipelines, scalable persistence",
    },
    {
        name: "MySQL",
        category: "Relational DB",
        level: "Proficient",
        icon: SiMysql,
        color: "#4479A1",
        description: "Structured query optimization and normalized schemas",
    },
    {
        name: "AWS",
        category: "Cloud Infrastructure",
        level: "Advanced",
        icon: FaAws,
        color: "#FF9900",
        description: "EC2 compute, S3 storage, cloud hosting & scalable deployments",
    },
    {
        name: "Docker",
        category: "DevOps & Cloud",
        level: "Proficient",
        icon: SiDocker,
        color: "#2496ED",
        description: "Containerization, reproducible microservice environments",
    },
    {
        name: "Git",
        category: "Version Control",
        level: "Expert",
        icon: SiGit,
        color: "#F05032",
        description: "Branching strategies, Git workflows, team collaboration",
    },
    {
        name: "Redis",
        category: "In-Memory Cache",
        level: "Proficient",
        icon: SiRedis,
        color: "#FF4438",
        description: "High-speed caching, session management, Pub/Sub",
    },
    {
        name: "Node.js",
        category: "Runtime Environment",
        level: "Proficient",
        icon: SiNodedotjs,
        color: "#5FA04E",
        description: "Event-driven architecture and asynchronous runtime services",
    },
    {
        name: "Express",
        category: "Backend Framework",
        level: "Proficient",
        icon: SiExpress,
        color: "#E4E4E7",
        description: "Lightweight middleware routing and REST APIs",
    },
    {
        name: "Tailwind CSS",
        category: "Styling Architecture",
        level: "Expert",
        icon: SiTailwindcss,
        color: "#06B6D4",
        description: "Design systems, utility-first layouts, responsive design",
    },
];

export default function TechGlobe() {
    const containerRef = useRef(null);
    const nodeRefs = useRef([]);
    const [hoveredTech, setHoveredTech] = useState(null);
    const hoveredTechRef = useRef(null);
    const isVisibleRef = useRef(false);

    // Rotation angles in radians
    const rotX = useRef(0.2);
    const rotY = useRef(0.3);
    const targetRotX = useRef(0.2);
    const targetRotY = useRef(0.3);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const animFrameId = useRef(null);

    // Radius of the sphere in px (responsive)
    const radiusRef = useRef(175);
    const baseCoords = useRef([]);

    // Precompute Fibonacci sphere base coordinates once
    useEffect(() => {
        const n = TECHNOLOGIES.length;
        const coords = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < n; i++) {
            const theta = (2 * Math.PI * i) / goldenRatio;
            const y = 1 - (i / (n - 1)) * 2;
            const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            coords.push({ x, y, z, tech: TECHNOLOGIES[i] });
        }
        baseCoords.current = coords;
    }, []);

    // Compute responsive radius
    useEffect(() => {
        const updateSize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            if (w < 400) {
                radiusRef.current = 135;
            } else if (w < 640) {
                radiusRef.current = 155;
            } else {
                radiusRef.current = 185;
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize, { passive: true });
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Pointer move over container
    const handlePointerMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

        if (isDragging.current) {
            const dx = clientX - lastMousePos.current.x;
            const dy = clientY - lastMousePos.current.y;
            targetRotY.current += dx * 0.008;
            targetRotX.current -= dy * 0.008;
            lastMousePos.current = { x: clientX, y: clientY };
        } else {
            const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            targetRotY.current += normX * 0.003;
            targetRotX.current -= normY * 0.003;
        }
    }, []);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    // Mobile touch handling: only rotate on horizontal drag, allow vertical page scroll
    const handleTouchStart = (e) => {
        if (e.touches && e.touches[0]) {
            lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    };

    const handleTouchMove = (e) => {
        if (!e.touches || !e.touches[0]) return;
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        const dx = clientX - lastMousePos.current.x;
        const dy = clientY - lastMousePos.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            targetRotY.current += dx * 0.007;
            lastMousePos.current = { x: clientX, y: clientY };
        }
    };

    // High-Performance RAF Loop: Direct Ref DOM mutation (0 React re-renders)
    // + IntersectionObserver visibility pause
    useEffect(() => {
        let isMounted = true;
        const perspective = 520;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const updatePositions = () => {
            const currentRadius = radiusRef.current;
            const cosX = Math.cos(rotX.current);
            const sinX = Math.sin(rotX.current);
            const cosY = Math.cos(rotY.current);
            const sinY = Math.sin(rotY.current);

            for (let i = 0; i < TECHNOLOGIES.length; i++) {
                const el = nodeRefs.current[i];
                const item = baseCoords.current[i];
                if (!el || !item) continue;

                const { x: bx, y: by, z: bz, tech } = item;

                // Rotate around Y
                const x1 = bx * cosY - bz * sinY;
                const z1 = bx * sinY + bz * cosY;

                // Rotate around X
                const y2 = by * cosX - z1 * sinX;
                const z2 = by * sinX + z1 * cosX;

                // Scale by sphere radius
                const worldX = x1 * currentRadius;
                const worldY = y2 * currentRadius;
                const worldZ = z2 * currentRadius;

                // Perspective projection
                const scale = perspective / (perspective - worldZ);
                const projX = worldX * scale;
                const projY = worldY * scale;

                // Normalized depth for styling (0 = back, 1 = front)
                const depthNorm = (worldZ + currentRadius) / (2 * currentRadius);
                const opacity = Math.max(0.35, Math.min(1, 0.35 + depthNorm * 0.65));
                const zIndex = Math.round(depthNorm * 100);

                const isHovered = hoveredTechRef.current === tech.name;
                const finalScale = (isHovered ? scale * 1.35 : scale) * (0.8 + depthNorm * 0.35);

                el.style.transform = `translate3d(${projX.toFixed(1)}px, ${projY.toFixed(1)}px, 0px) scale(${finalScale.toFixed(3)})`;
                el.style.opacity = isHovered ? "1" : opacity.toFixed(2);
                el.style.zIndex = isHovered ? "200" : String(zIndex);
            }
        };

        const render = () => {
            if (!isMounted || !isVisibleRef.current) return;

            // Auto-rotate if not hovering a specific node and reduced motion is false
            if (!hoveredTechRef.current && !isDragging.current && !prefersReducedMotion) {
                targetRotY.current += 0.0035;
                targetRotX.current = Math.sin(Date.now() * 0.0006) * 0.18;
            }

            // Smooth interpolation (Lerp)
            rotX.current += (targetRotX.current - rotX.current) * 0.06;
            rotY.current += (targetRotY.current - rotY.current) * 0.06;

            updatePositions();

            animFrameId.current = requestAnimationFrame(render);
        };

        // Visibility observer: completely halt loop when scrolled offscreen
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!isMounted) return;
                isVisibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting) {
                    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
                    animFrameId.current = requestAnimationFrame(render);
                } else {
                    if (animFrameId.current) {
                        cancelAnimationFrame(animFrameId.current);
                        animFrameId.current = null;
                    }
                }
            },
            { threshold: 0.05 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Initial position calculation
        updatePositions();

        return () => {
            isMounted = false;
            observer.disconnect();
            if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
        };
    }, []);

    return (
        <div className="relative w-full flex flex-col items-center">
            {/* 3D Sphere Interactive Canvas */}
            <div
                ref={containerRef}
                onMouseMove={handlePointerMove}
                onMouseDown={handlePointerDown}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handlePointerUp}
                className="relative w-full max-w-[540px] h-[460px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y"
                style={{ perspective: "1000px" }}
            >
                {/* Central Soft Orange Atmospheric Glow - Multi-layered diffused celestial lighting */}
                <div
                    className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.18) 0%, rgba(255, 120, 30, 0.08) 30%, rgba(255, 140, 66, 0.02) 55%, transparent 72%)",
                        transform: "translateZ(0)",
                    }}
                />
                <div
                    className="absolute w-48 h-48 rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.32) 0%, rgba(255, 130, 40, 0.12) 40%, transparent 70%)",
                        transform: "translateZ(0)",
                    }}
                />

                {/* Concentric Technical Orbital Rings */}
                <div
                    className="absolute w-72 h-72 rounded-full border border-orange-500/10 pointer-events-none animate-[spin_60s_linear_infinite]"
                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                />
                <div
                    className="absolute w-96 h-96 rounded-full border border-dashed border-[#29292F]/60 pointer-events-none animate-[spin_90s_linear_infinite_reverse]"
                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                />
                <div className="absolute w-[340px] h-[340px] rounded-full border border-orange-500/5 pointer-events-none" />

                {/* Central Core Hologram Node */}
                <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-[#111114]/95 border border-orange-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(255,106,0,0.25)]">
                        <Sparkles className="w-6 h-6 text-[#FF6A00] animate-pulse" />
                    </div>
                </div>

                {/* Render Projected Tech Nodes with Persistent DOM refs */}
                {TECHNOLOGIES.map((tech, idx) => {
                    const isHovered = hoveredTech?.name === tech.name;
                    const Icon = tech.icon;

                    return (
                        <div
                            key={tech.name}
                            ref={(el) => (nodeRefs.current[idx] = el)}
                            onMouseEnter={() => {
                                hoveredTechRef.current = tech.name;
                                setHoveredTech(tech);
                            }}
                            onMouseLeave={() => {
                                hoveredTechRef.current = null;
                                setHoveredTech(null);
                            }}
                            onClick={() => {
                                hoveredTechRef.current = tech.name;
                                setHoveredTech(tech);
                            }}
                            style={{
                                willChange: "transform, opacity",
                            }}
                            className="absolute cursor-pointer group"
                        >
                            <div
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 border ${
                                    isHovered
                                        ? "bg-[#17171B] border-[#FF6A00] shadow-[0_0_24px_rgba(255,106,0,0.4)] scale-110"
                                        : "bg-[#111114]/95 border-[#29292F] hover:border-[#FF6A00]/60 shadow-lg shadow-black/50"
                                }`}
                            >
                                <span
                                    className="text-lg transition-transform duration-200 group-hover:scale-110 shrink-0"
                                    style={{ color: tech.color }}
                                >
                                    <Icon />
                                </span>
                                <span
                                    className={`text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
                                        isHovered
                                            ? "text-[#F5F5F5] font-semibold"
                                            : "text-[#D4D4D8]"
                                    }`}
                                >
                                    {tech.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected Tech Card / Inspection HUD */}
            <div className="w-full max-w-xl min-h-[96px] mt-2 px-4">
                {hoveredTech ? (
                    <div className="p-4 rounded-2xl bg-[#17171B]/95 border border-[#FF6A00]/40 shadow-[0_4px_24px_-4px_rgba(255,106,0,0.2)] flex items-center justify-between gap-4 transition-all duration-200 animate-in fade-in zoom-in-95">
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div
                                className="w-12 h-12 rounded-xl bg-[#111114] border border-[#29292F] flex items-center justify-center text-2xl shrink-0"
                                style={{ color: hoveredTech.color }}
                            >
                                <hoveredTech.icon />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-base font-semibold text-[#F5F5F5] tracking-tight">
                                        {hoveredTech.name}
                                    </h4>
                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/25">
                                        {hoveredTech.level}
                                    </span>
                                </div>
                                <p className="text-xs text-[#A1A1AA] truncate mt-0.5">
                                    {hoveredTech.description}
                                </p>
                            </div>
                        </div>
                        <div className="text-right shrink-0 hidden sm:block">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] block">
                                Discipline
                            </span>
                            <span className="text-xs font-medium text-[#D4D4D8]">
                                {hoveredTech.category}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-2xl bg-[#111114]/80 border border-[#29292F]/60 flex items-center justify-center gap-2 text-xs text-[#A1A1AA]">
                        <Compass className="w-4 h-4 text-[#FF6A00] animate-spin" style={{ animationDuration: "12s" }} />
                        <span>Hover any technology or drag to rotate the 3D ecosystem</span>
                    </div>
                )}
            </div>
        </div>
    );
}

