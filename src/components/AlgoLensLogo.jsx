import React from 'react';

export function AlgoLensLogo({ size = 38 }) {
  return (
    <div className="algolens-logo-container" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="algolens-svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9333ea" />
            <stop offset="0.5" stopColor="#7c5cbf" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Lens Ring with aperture notches */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#logoGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="95 15"
          filter="url(#glow)"
        />

        {/* Tree Branch Network inside the lens */}
        <path
          d="M24 13V24M24 24L16 33M24 24L32 33"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tree Nodes */}
        <circle cx="24" cy="13" r="3.5" fill="#38bdf8" />
        <circle cx="16" cy="33" r="3" fill="#c084fc" />
        <circle cx="32" cy="33" r="3" fill="#a855f7" />
        <circle cx="24" cy="24" r="2.5" fill="#ffffff" />

        {/* Sparkle focal accent */}
        <circle cx="24" cy="24" r="5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      </svg>
    </div>
  );
}
