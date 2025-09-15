
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
   
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    console.log("Theme applied:", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
body.dark {
  --bg-main: #121212;
  --text-main: #ffffff;
  --card-bg: #1e1e1e;
  --card-text: #eeeeee;
  --grid-bg: #1a1a1a;
  --button-bg: #2196f3;
  --button-hover: #1565c0;
  --navbar-bg: #1e1e1e;
  --navbar-text: #ffffff;
}

body.light {
  --bg-main: #ffffff;
  --text-main: #333333;
  --card-bg: #ffffff;
  --card-text: #333333;
  --grid-bg: #f0f0f0;
  --button-bg: #241ae4ff;
  --button-hover: #1259a5;
  --navbar-bg: #ffffff;
  --navbar-text: #333333;
}

body {
  background-color: var(--bg-main);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar {
  background-color: var(--navbar-bg);
  color: var(--navbar-text);
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
...
`;


    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []); 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

