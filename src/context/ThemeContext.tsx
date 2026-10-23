import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Theme, ThemeContextType } from "../types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "dark");

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleDarkMode = (value?: Theme) => {
        if (value === "dark" || value === "light") {
            setTheme(value);
        } else {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode: theme === "dark", toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
