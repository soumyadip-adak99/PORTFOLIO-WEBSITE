interface TextInputProps {
    value: string;
    handleInputChange: (val: string) => void;
    textarea?: boolean;
    label: string;
    placeholder?: string;
}

export default function TextInput({
    value,
    handleInputChange,
    textarea = false,
    label,
    placeholder = "",
}: TextInputProps) {
    return (
        <div className="space-y-1.5 text-left">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
                {label}
            </label>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    rows={4}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#F5F5F5] placeholder-[#71717A] text-sm font-normal focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#F5F5F5] placeholder-[#71717A] text-sm font-normal focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
                />
            )}
        </div>
    );
}
