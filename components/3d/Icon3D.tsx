"use client";

import React from "react";

export type Icon3DName =
  | "dashboard"
  | "students"
  | "teachers"
  | "parents"
  | "users"
  | "academic-years"
  | "classes"
  | "subjects"
  | "timetable"
  | "attendance"
  | "homework"
  | "exams"
  | "marks"
  | "report-cards"
  | "promotions"
  | "pyqs"
  | "fees"
  | "notices"
  | "notifications"
  | "school"
  | "search"
  | "upload"
  | "download"
  | "plus"
  | "check"
  | "alert"
  | "lock"
  | "sparkles"
  | "settings"
  | "book"
  | "history";

export type Icon3DTone =
  | "blue"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "slate"
  | "purple"
  | "gold";

export type Icon3DSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Icon3DProps {
  name: Icon3DName;
  tone?: Icon3DTone;
  size?: Icon3DSize;
  className?: string;
  glow?: boolean;
  depth?: boolean;
}

const SIZE_CONFIG: Record<Icon3DSize, { px: number; container: string }> = {
  xs: { px: 16, container: "w-4 h-4" },
  sm: { px: 20, container: "w-5 h-5" },
  md: { px: 24, container: "w-6 h-6" },
  lg: { px: 36, container: "w-9 h-9" },
  xl: { px: 48, container: "w-12 h-12" },
  "2xl": { px: 64, container: "w-16 h-16" },
};

const TONE_THEMES: Record<
  Icon3DTone,
  {
    gradientStart: string;
    gradientEnd: string;
    ambientGlow: string;
    rimColor: string;
    specular: string;
    glyphColor: string;
    shadowColor: string;
  }
> = {
  blue: {
    gradientStart: "#38bdf8",
    gradientEnd: "#0284c7",
    ambientGlow: "rgba(14, 165, 233, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.8)",
    specular: "rgba(255, 255, 255, 0.6)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(3, 105, 161, 0.35)",
  },
  indigo: {
    gradientStart: "#818cf8",
    gradientEnd: "#4f46e5",
    ambientGlow: "rgba(99, 102, 241, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.8)",
    specular: "rgba(255, 255, 255, 0.6)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(67, 56, 202, 0.35)",
  },
  purple: {
    gradientStart: "#c084fc",
    gradientEnd: "#9333ea",
    ambientGlow: "rgba(168, 85, 247, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.85)",
    specular: "rgba(255, 255, 255, 0.65)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(126, 34, 206, 0.35)",
  },
  emerald: {
    gradientStart: "#34d399",
    gradientEnd: "#059669",
    ambientGlow: "rgba(16, 185, 129, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.8)",
    specular: "rgba(255, 255, 255, 0.6)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(4, 120, 87, 0.35)",
  },
  amber: {
    gradientStart: "#fbbf24",
    gradientEnd: "#d97706",
    ambientGlow: "rgba(245, 158, 11, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.85)",
    specular: "rgba(255, 255, 255, 0.65)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(180, 83, 9, 0.35)",
  },
  gold: {
    gradientStart: "#fde047",
    gradientEnd: "#ca8a04",
    ambientGlow: "rgba(234, 179, 8, 0.5)",
    rimColor: "rgba(255, 255, 255, 0.9)",
    specular: "rgba(255, 255, 255, 0.7)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(161, 98, 7, 0.4)",
  },
  rose: {
    gradientStart: "#fb7185",
    gradientEnd: "#e11d48",
    ambientGlow: "rgba(244, 63, 94, 0.45)",
    rimColor: "rgba(255, 255, 255, 0.85)",
    specular: "rgba(255, 255, 255, 0.65)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(190, 18, 60, 0.35)",
  },
  slate: {
    gradientStart: "#94a3b8",
    gradientEnd: "#475569",
    ambientGlow: "rgba(100, 116, 139, 0.35)",
    rimColor: "rgba(255, 255, 255, 0.75)",
    specular: "rgba(255, 255, 255, 0.5)",
    glyphColor: "#ffffff",
    shadowColor: "rgba(51, 65, 85, 0.35)",
  },
};

/** Default semantic tone associations */
const DEFAULT_NAME_TONES: Record<Icon3DName, Icon3DTone> = {
  dashboard: "blue",
  students: "blue",
  teachers: "indigo",
  parents: "emerald",
  users: "slate",
  "academic-years": "indigo",
  classes: "indigo",
  subjects: "purple",
  timetable: "blue",
  attendance: "emerald",
  homework: "blue",
  exams: "rose",
  marks: "amber",
  "report-cards": "gold",
  promotions: "emerald",
  pyqs: "purple",
  fees: "amber",
  notices: "rose",
  notifications: "blue",
  school: "blue",
  search: "slate",
  upload: "indigo",
  download: "emerald",
  plus: "blue",
  check: "emerald",
  alert: "rose",
  lock: "amber",
  sparkles: "gold",
  settings: "slate",
  book: "blue",
  history: "slate",
};

/**
 * 3D Icon Glyphs rendered as dimensional geometric SVG vectors with perspective and lighting
 */
function renderGlyph(name: Icon3DName, fill: string) {
  switch (name) {
    case "dashboard":
      return (
        <g fill={fill}>
          <rect x="5" y="5" width="6" height="6" rx="1.5" />
          <rect x="13" y="5" width="6" height="4" rx="1.5" />
          <rect x="5" y="13" width="6" height="6" rx="1.5" />
          <rect x="13" y="11" width="6" height="8" rx="1.5" />
        </g>
      );
    case "students":
    case "users":
      return (
        <g fill={fill}>
          <circle cx="9" cy="8" r="3" />
          <path d="M4 17c0-2.5 2.2-4 5-4s5 1.5 5 4v1H4v-1z" />
          <circle cx="15.5" cy="8.5" r="2.2" opacity="0.8" />
          <path d="M14 14.5c1.2-.5 2.5-.5 3.5.2 1 .7 1.5 1.8 1.5 2.8v.5h-5v-.5c0-1.1-.3-2.1-.9-3z" opacity="0.8" />
        </g>
      );
    case "teachers":
      return (
        <g fill={fill}>
          <path d="M12 4L3 8.5l9 4.5 9-4.5L12 4z" />
          <path d="M6 10.5v5c0 2.2 2.7 4 6 4s6-1.8 6-4v-5l-6 3-6-3z" />
          <path d="M20 9.5v6" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    case "parents":
      return (
        <g fill={fill}>
          <circle cx="8" cy="7.5" r="2.5" />
          <path d="M3.5 17c0-2.2 2-3.8 4.5-3.8s4.5 1.6 4.5 3.8v1h-9v-1z" />
          <circle cx="15.5" cy="10" r="2" />
          <path d="M12.5 17c0-1.7 1.3-3 3-3s3 1.3 3 3v1h-6v-1z" />
        </g>
      );
    case "academic-years":
    case "timetable":
      return (
        <g fill={fill}>
          <rect x="4" y="5" width="16" height="15" rx="2.5" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M4 10h16M8 3v3M16 3v3" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="14" r="1.2" />
          <circle cx="12" cy="14" r="1.2" />
          <circle cx="16" cy="14" r="1.2" />
        </g>
      );
    case "attendance":
      return (
        <g fill={fill}>
          <rect x="4" y="5" width="16" height="15" rx="2.5" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M4 10h16M8 3v3M16 3v3" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M8.5 14.5l2.5 2.5 4.5-4.5" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      );
    case "classes":
      return (
        <g fill={fill}>
          <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
          <path d="M3 12l9 4.5 9-4.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M3 16.5l9 4.5 9-4.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      );
    case "subjects":
    case "book":
      return (
        <g fill={fill}>
          <path d="M4 19.5v-13A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v14.5a.5.5 0 0 1-.75.43L16 18l-3.25 1.93a.5.5 0 0 1-.5 0L9 18l-3.25 1.93A.5.5 0 0 1 5 19.5H4z" />
          <path d="M8 8h8M8 12h5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    case "homework":
      return (
        <g fill={fill}>
          <path d="M5 4h14a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18.5v-13A1.5 1.5 0 0 1 5 4z" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M7 8h10M7 12h7M7 16h5" stroke={fill} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );
    case "exams":
      return (
        <g fill={fill}>
          <path d="M6 3h9l5 5v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M14 3v6h6" fill="rgba(0,0,0,0.15)" />
          <path d="M8 13h8M8 17h5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );
    case "marks":
      return (
        <g fill={fill}>
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M9 12l2 2 4-4" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 8h.01M8 16h.01M16 16h.01" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    case "report-cards":
      return (
        <g fill={fill}>
          <circle cx="12" cy="9" r="5" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M9 13.5L7 21l5-2 5 2-2-7.5" fill={fill} />
          <path d="M10 9l1.5 1.5L14 8" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      );
    case "promotions":
      return (
        <g fill={fill}>
          <path d="M4 17l6-6 4 4 6-7" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M14 8h6v6" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      );
    case "pyqs":
      return (
        <g fill={fill}>
          <rect x="3" y="4" width="18" height="5" rx="1.5" />
          <path d="M4 9h16v9.5A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5V9z" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M10 13h4" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "fees":
      return (
        <g fill={fill}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke={fill} strokeWidth="2" />
          <path d="M3 9.5h18" stroke={fill} strokeWidth="2" />
          <circle cx="7" cy="14.5" r="1.5" />
          <rect x="12" y="13.5" width="5" height="2" rx="1" />
        </g>
      );
    case "notices":
      return (
        <g fill={fill}>
          <path d="M4 12V8a2 2 0 0 1 2-2h3l7-3v14l-7-3H6a2 2 0 0 1-2-2z" />
          <path d="M7 14v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4" stroke={fill} strokeWidth="1.5" />
          <path d="M19 9a4 4 0 0 1 0 6" stroke={fill} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );
    case "notifications":
      return (
        <g fill={fill}>
          <path d="M18 15V9a6 6 0 1 0-12 0v6l-2 2v1h16v-1l-2-2z" />
          <path d="M10 19a2 2 0 0 0 4 0" stroke={fill} strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="17" cy="6" r="2.5" fill="#f43f5e" />
        </g>
      );
    case "school":
      return (
        <g fill={fill}>
          <path d="M12 3l10 5.5v1H2v-1L12 3z" />
          <rect x="4" y="10" width="2.5" height="8" rx="0.5" />
          <rect x="8.75" y="10" width="2.5" height="8" rx="0.5" />
          <rect x="13.5" y="10" width="2.5" height="8" rx="0.5" />
          <rect x="18" y="10" width="2.5" height="8" rx="0.5" />
          <rect x="2" y="18" width="20" height="3" rx="1" />
        </g>
      );
    case "search":
      return (
        <g fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4.5-4.5" />
        </g>
      );
    case "upload":
      return (
        <g fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15V4M8 8l4-4 4 4" />
          <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
        </g>
      );
    case "download":
      return (
        <g fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v11M8 11l4 4 4-4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </g>
      );
    case "plus":
      return (
        <g stroke={fill} strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </g>
      );
    case "check":
      return (
        <path d="M5 13l4.5 4.5L19 7" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      );
    case "alert":
      return (
        <g fill={fill}>
          <path d="M12 3L2 21h20L12 3z" fill="none" stroke={fill} strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 9v5M12 17h.01" stroke={fill} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "lock":
      return (
        <g fill={fill}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="15" r="1.5" fill="rgba(0,0,0,0.3)" />
        </g>
      );
    case "sparkles":
      return (
        <g fill={fill}>
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
          <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" opacity="0.8" />
        </g>
      );
    case "settings":
      return (
        <g fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </g>
      );
    case "history":
      return (
        <g fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l3 3" />
        </g>
      );
    default:
      return (
        <circle cx="12" cy="12" r="6" fill={fill} />
      );
  }
}

/**
 * 3D Icon Component with physical depth, ambient occlusion shadows,
 * specular lighting highlights, and tactile perspective.
 */
export function Icon3D({
  name,
  tone,
  size = "md",
  className = "",
  glow = false,
  depth = true,
}: Icon3DProps) {
  const chosenTone = tone ?? DEFAULT_NAME_TONES[name] ?? "blue";
  const theme = TONE_THEMES[chosenTone];
  const sizeConfig = SIZE_CONFIG[size];
  const gradId = `grad-3d-${name}-${chosenTone}-${size}`;
  const filterId = `shadow-3d-${name}-${chosenTone}-${size}`;

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeConfig.container} ${className}`}
      style={{
        perspective: "600px",
      }}
    >
      {/* Ambient Floor Glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-70 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: theme.ambientGlow }}
        />
      )}

      {/* 3D Geometric Canvas */}
      <svg
        viewBox="0 0 24 24"
        width={sizeConfig.px}
        height={sizeConfig.px}
        className="w-full h-full relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:scale-105"
        style={{
          transform: depth ? "translateZ(2px)" : "none",
        }}
      >
        <defs>
          {/* Main 3D Volume Gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.gradientStart} />
            <stop offset="100%" stopColor={theme.gradientEnd} />
          </linearGradient>

          {/* Top Specular Rim Reflection */}
          <linearGradient id={`${gradId}-specular`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Depth Drop Shadow Filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.2"
              floodColor={theme.shadowColor}
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {/* 3D Dimensional Base Pill */}
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="6"
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Surface Specular Rim Highlight */}
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="5.5"
          fill="none"
          stroke={`url(#${gradId}-specular)`}
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Inner Top Glass Sheen */}
        <path
          d="M2.5 3 C 2.5 3, 7 7, 21.5 5.5"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Glyph */}
        <g className="transition-transform duration-150 group-hover:scale-102">
          {renderGlyph(name, theme.glyphColor)}
        </g>
      </svg>
    </div>
  );
}
