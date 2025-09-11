// context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    console.log("Theme applied:", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Inject theme styles once on mount
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
  body.light {
    --bg-main: #ffffff;
    --text-main: #000000;
    --card-bg: #ffffff;
    --card-text: #333333;
    --grid-bg: #f0f0f0;
    --button-bg: #241ae4ff;
    --button-hover: #1259a5;
  }

  body.dark {
    --bg-main: #121212;
    --text-main: #ffffff;
    --card-bg: #1e1e1e;
    --card-text: #eeeeee;
    --grid-bg: #1a1a1a;
    --button-bg: #2196f3;
    --button-hover: #1565c0;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .navbar {
    background-color: inherit;
    color: inherit;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .btn-theme-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

    document.head.appendChild(styleTag);

    // Cleanup on unmount (optional)
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []); // Only run once

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

