import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";
type AccentColor = "cyan" | "purple" | "pink" | "orange" | "green" | "blue";

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Accent color HSL values
const accentColors: Record<AccentColor, { primary: string; accent: string }> = {
  cyan: { primary: "173 80% 50%", accent: "280 85% 65%" },
  purple: { primary: "280 85% 65%", accent: "320 85% 60%" },
  pink: { primary: "330 85% 60%", accent: "280 85% 65%" },
  orange: { primary: "25 95% 55%", accent: "45 93% 55%" },
  green: { primary: "142 76% 45%", accent: "173 80% 50%" },
  blue: { primary: "217 91% 60%", accent: "240 85% 65%" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "dark";
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const stored = localStorage.getItem("accentColor");
    return (stored as AccentColor) || "cyan";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme class
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Apply accent colors
    const colors = accentColors[accentColor];
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--ring", colors.primary);
    root.style.setProperty("--sidebar-primary", colors.primary);
    root.style.setProperty("--sidebar-ring", colors.primary);
    localStorage.setItem("accentColor", accentColor);
  }, [theme, accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
