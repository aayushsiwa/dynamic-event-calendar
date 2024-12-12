import React, { useEffect, useState } from "react";
import moon from "../img/moon.svg";
import sun from "../img/sun.svg";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded text-white"
    >
      {theme === "light" ? (
        <img src={moon} alt="Moon Icon" className="w-6 h-6" />
      ) : (
        <img src={sun} alt="Moon Icon" className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
