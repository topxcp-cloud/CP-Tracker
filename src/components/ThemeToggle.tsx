import { Moon, Sun, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const accentOptions = [
  { id: "cyan", label: "Cyan", color: "hsl(173 80% 50%)" },
  { id: "purple", label: "Purple", color: "hsl(280 85% 65%)" },
  { id: "pink", label: "Pink", color: "hsl(330 85% 60%)" },
  { id: "orange", label: "Orange", color: "hsl(25 95% 55%)" },
  { id: "green", label: "Green", color: "hsl(142 76% 45%)" },
  { id: "blue", label: "Blue", color: "hsl(217 91% 60%)" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative h-9 w-9 rounded-lg border border-border hover:bg-muted"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Accent Color Picker */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg border border-border hover:bg-muted"
          >
            <Palette className="h-4 w-4" />
            <div 
              className="absolute bottom-1 right-1 h-2 w-2 rounded-full ring-1 ring-background"
              style={{ backgroundColor: `hsl(var(--primary))` }}
            />
            <span className="sr-only">Change accent color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          className="w-48 p-3 glass-card"
          sideOffset={8}
        >
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground mb-3">
              Accent Color
            </p>
            <div className="grid grid-cols-3 gap-2">
              {accentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setAccentColor(option.id);
                    setIsOpen(false);
                  }}
                  className={`group relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all hover:bg-muted ${
                    accentColor === option.id ? "bg-muted ring-1 ring-primary" : ""
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-transform group-hover:scale-110 ${
                      accentColor === option.id ? 'ring-current' : 'ring-transparent'
                    }`}
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
