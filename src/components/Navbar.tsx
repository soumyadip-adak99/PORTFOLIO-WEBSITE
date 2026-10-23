import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import { scrollToSection, scrollToTop } from "../utils/scrollHelper";
import LOGO_IMG from "../assets/logo.png";
import ProtectedImage from "./ProtectedImage";

interface NavItem {
    label: string;
    id: string;
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("home");

    const navItems: NavItem[] = [
        { label: "Home", id: "home" },
        { label: "Skills", id: "skills" },
        { label: "Work", id: "work" },
        { label: "About", id: "about" },
        { label: "Contact", id: "contact" },
    ];

    // RAF-throttled scroll state observer (only triggers state update on threshold crossing)
    useEffect(() => {
        let ticking = false;
        let isScrolled = window.scrollY > 20;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const nowScrolled = window.scrollY > 20;
                    if (nowScrolled !== isScrolled) {
                        isScrolled = nowScrolled;
                        setScrolled(nowScrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection observer for section highlighting
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveSection(e.target.id);
                });
            },
            { rootMargin: "-30% 0px -50% 0px" }
        );
        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const scrollTo = (id: string) => {
        setIsMenuOpen(false);
        if (id === "home") {
            scrollToTop();
        } else {
            scrollToSection(id, -75);
        }
    };

    const socialLinks = [
        { icon: FiGithub, href: "https://github.com/soumyadip-adak99", label: "GitHub" },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/",
            label: "LinkedIn",
        },
    ];

    return (
        <>
            <header
                style={{ transform: "translateZ(0)" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#29292F]/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Brand Identifier */}
                    <button
                        onClick={() => scrollTo("home")}
                        className="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl p-1 -ml-1"
                        aria-label="Soumyadip Adak - Return to Top"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#17171B] border border-[#29292F] group-hover:border-[#FF6A00]/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(255,106,0,0.25)] p-1.5 overflow-hidden">
                            <ProtectedImage
                                src={LOGO_IMG}
                                alt="Soumyadip Adak Logo"
                                width={72}
                                height={72}
                                objectFit="contain"
                            />
                        </div>
                        <div className="text-left">
                            <div className="text-lg font-semibold tracking-tight text-[#F5F5F5] group-hover:text-[#FF6A00] transition-colors">
                                Soumyadip Adak
                            </div>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-[#111114]/80 p-1.5 rounded-full border border-[#29292F] backdrop-blur-md">
                        {navItems.map(({ label, id }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`relative px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer rounded-full focus:outline-none ${
                                        isActive
                                            ? "text-[#F5F5F5] font-semibold"
                                            : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#17171B]"
                                    }`}
                                >
                                    {label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="absolute inset-0 bg-[#17171B] border border-[#FF6A00]/40 rounded-full -z-10 shadow-[0_0_15px_rgba(255,106,0,0.15)]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2.5 rounded-xl bg-[#17171B] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-all duration-200 hover:scale-105"
                            >
                                <Icon size={16} />
                            </a>
                        ))}

                        <button
                            onClick={() => scrollTo("contact")}
                            className="ml-1 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C42] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 glow-orange-button cursor-pointer"
                        >
                            <span>Contact</span>
                            <ArrowUpRight size={14} />
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="p-2.5 rounded-xl bg-[#17171B] border border-[#29292F] text-[#F5F5F5] hover:border-[#FF6A00]/50 transition-colors focus:outline-none"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed inset-0 top-20 z-40 bg-[#0B0B0D]/98 backdrop-blur-2xl border-t border-[#29292F] px-6 py-8 flex flex-col justify-between md:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map(({ label, id }) => {
                                const isActive = activeSection === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => scrollTo(id)}
                                        className={`w-full text-left py-4 px-5 rounded-xl text-lg font-medium transition-all ${
                                            isActive
                                                ? "bg-[#17171B] text-[#FF6A00] border border-[#FF6A00]/30 font-semibold"
                                                : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#111114]"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{label}</span>
                                            {isActive && (
                                                <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="pt-6 border-t border-[#29292F] space-y-4">
                            <button
                                onClick={() => scrollTo("contact")}
                                className="w-full py-4 rounded-xl bg-[#FF6A00] text-white text-center font-semibold text-sm uppercase tracking-wider glow-orange-button cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Get in Touch</span>
                                <ArrowUpRight size={16} />
                            </button>

                            <div className="flex items-center justify-center gap-4 pt-2">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-3 rounded-xl bg-[#17171B] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00]"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
