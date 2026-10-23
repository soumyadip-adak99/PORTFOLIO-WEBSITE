import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({ showSuccess, setShowSuccess }) {
    return (
        <AnimatePresence>
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0D]/80 backdrop-blur-md"
                    onClick={() => setShowSuccess(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 15 }}
                        transition={{ type: "spring", duration: 0.4, damping: 25 }}
                        className="relative p-8 rounded-3xl bg-[#17171B] border border-[#FF6A00]/40 max-w-sm w-full text-center shadow-[0_16px_48px_-8px_rgba(255,106,0,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-full text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#111114] transition-colors"
                            aria-label="Close dialog"
                        >
                            <X size={18} />
                        </button>

                        <div className="mx-auto w-14 h-14 bg-[#FF6A00]/15 border border-[#FF6A00]/40 rounded-2xl flex items-center justify-center text-[#FF6A00] mb-5 shadow-lg shadow-[#FF6A00]/20">
                            <CheckCircle2 size={30} />
                        </div>

                        <h3 className="text-xl font-bold text-[#F5F5F5] mb-2 tracking-tight">
                            Message Received
                        </h3>

                        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                            Thank you for reaching out! I've received your transmission and will respond promptly.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
