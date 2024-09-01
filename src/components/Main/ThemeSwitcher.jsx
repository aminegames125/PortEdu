import React, { useEffect, useState } from "react";
import { VisuallyHidden } from "@nextui-org/react";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";

const ThemeSwitcher = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [icon, setIcon] = useState("moon");

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = savedTheme || (prefersDarkScheme ? "dark" : "light");

    document.documentElement.setAttribute("data-mode", initialTheme);
    setIsDarkMode(initialTheme === "dark");
    setIcon(initialTheme === "dark" ? "sun" : "moon");
  }, []);

  
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newIsDarkMode = !prev;
      const newTheme = newIsDarkMode ? "dark" : "light";
      const newIcon = newIsDarkMode ? "sun" : "moon";

      document.documentElement.setAttribute("data-mode", newTheme);
      localStorage.setItem("theme", newTheme);
      setIcon(newIcon);

      return newIsDarkMode;
    });
  };

  return (
    <div
      className="absolute bottom-6 right-4 z-50 flex cursor-pointer items-center"
      onClick={toggleTheme}
    >
      <VisuallyHidden>
        <input type="checkbox" checked={isDarkMode} readOnly />
      </VisuallyHidden>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
        {icon === "sun" ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-blue-500" />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
