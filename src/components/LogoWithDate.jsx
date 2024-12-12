// src/components/LogoWithDate.jsx
import React from "react";

const LogoWithDate = () => {
  const today = new Date();
  const day = today.getDate();

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="iconify iconify--noto"
    >
      {/* Outer Shape */}
      <path
        d="M111.42 113.34H16.58a4.88 4.88 0 0 1-4.88-4.88V42.03c0-7.27 5.65-13.16 12.62-13.16h79.37c6.97 0 12.62 5.89 12.62 13.16v66.43c0 2.7-2.19 4.88-4.89 4.88z"
        stroke="var(--border-color)"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      {/* Inner Calendar Icon */}
      <path
        d="M112.11 4h-4.8c-1 0-1.81.81-1.81 1.81V9.9c0 .67.38 1.25.95 1.6 2.01 1.2 3.24 3.57 2.71 6.17-.45 2.2-2.21 3.98-4.41 4.44a5.788 5.788 0 0 1-7.03-5.65c0-2.12 1.14-3.97 2.85-4.97.57-.34.94-.92.94-1.58v-4.1c0-1-.81-1.81-1.81-1.81H28.27c-.98 0-1.77.79-1.77 1.77v4.16c0 .65.37 1.22.93 1.55a5.78 5.78 0 0 1 2.73 6.18c-.45 2.2-2.21 3.98-4.41 4.44a5.788 5.788 0 0 1-7.03-5.65c0-2.13 1.16-3.98 2.87-4.99.55-.32.91-.9.91-1.54V5.77c0-.98-.79-1.77-1.77-1.77h-4.85a5.75 5.75 0 0 0-5.75 5.75v37.52H117.7l.16-37.49A5.745 5.745 0 0 0 112.11 4"
        fill="none"
        stroke="var(--border-color)"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      {/* Dynamic Date */}
      <text
        x="64"
        y="80"
        fill="var(--current-day-text)"
        fontSize="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="inherit"
        className="select-none"
      >
        {day}
      </text>
    </svg>
  );
};

export default LogoWithDate;
