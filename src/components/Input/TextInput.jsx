export default function TextInput({ value, handleInputChange, textarea, label, placeholder = "" }) {
    const InputComponent = textarea ? "textarea" : "input";

    return (
        <div className="space-y-1.5 text-left">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
                {label}
            </label>
            <InputComponent
                type={textarea ? undefined : "text"}
                value={value}
                onChange={({ target }) => handleInputChange(target.value)}
                rows={textarea ? 4 : undefined}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl bg-[#111114] border border-[#29292F] text-[#F5F5F5] placeholder-[#71717A] text-sm font-normal focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
            />
        </div>
    );
}
