import { ArrowUp } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { scrollToTop } from "../../utils/scrollHelper";
import LOGO_IMG from "../../assets/logo.png";
import ProtectedImage from "../ProtectedImage";

export default function Footer() {

    const socials = [
        { icon: FiGithub, href: "https://github.com/soumyadip-adak99", label: "GitHub" },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/",
            label: "LinkedIn",
        },
        { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    ];

    return (
        <footer className="relative border-t border-[#29292F] bg-[#0B0B0D] pt-14 pb-12 px-6 lg:px-12 overflow-hidden">
            {/* Top Subtle Orange Laser Divider Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#FF6A00]/50 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand & Identity */}
                <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#17171B] border border-[#29292F] flex items-center justify-center p-1.5 overflow-hidden shadow-md">
                        <ProtectedImage
                            src={LOGO_IMG}
                            alt="Soumyadip Adak Logo"
                            width={64}
                            height={64}
                            objectFit="contain"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-[#F5F5F5] tracking-tight">
                            Soumyadip Adak
                        </div>
                    </div>
                </div>

                {/* Social Quick Links */}
                <div className="flex items-center gap-2.5">
                    {socials.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className="p-2.5 rounded-xl bg-[#111114] border border-[#29292F] text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors duration-200"
                        >
                            <item.icon size={16} />
                        </a>
                    ))}
                </div>

                {/* Return to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17171B] border border-[#29292F] text-xs font-mono text-[#A1A1AA] hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors duration-200 cursor-pointer shadow-sm"
                >
                    <ArrowUp size={14} />
                    <span>Back to Top</span>
                </button>
            </div>

            {/* Copyright & Signoff */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#1F1F24] flex items-center justify-center text-xs font-mono text-[#71717A]">
                <div>
                    © {new Date().getFullYear()} Soumyadip Adak. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
