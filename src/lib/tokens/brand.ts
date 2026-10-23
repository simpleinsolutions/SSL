/**
 * SIMPLEIN SCHOOL — Official Design System Tokens (Stitch MCP Generated)
 * 
 * Company: SIMPLEIN SOLUTIONS LLP
 * Source of Truth: https://www.simpleinsolutions.com/
 * Product Identity: SimpleIn School ERP
 * Visual Direction: Professional Navy (#0F172A), Interactive Teal (#0D9488),
 * Pure White Card Surfaces (#FFFFFF), and Anti-Glare Soft Slate Canvas (#F8FAFC).
 */

export const BRAND_TOKENS = {
  name: "SimpleIn School",
  companyName: "SIMPLEIN SOLUTIONS LLP",
  companyUrl: "https://www.simpleinsolutions.com/",
  tagline: "One School. One Connected System.",
  subTagline: "The modern unified education management platform for schools, teachers, students, and parents.",

  // SimpleIn School Professional Navy & Teal Palette
  colors: {
    // Primary Interactive (Teal)
    primary: "#0D9488", // Surgical Teal / Primary Brand Action
    primaryHover: "#0F766E", // Deep Teal Hover
    primaryPressed: "#115E59", // Active Pressed
    primaryLight: "#F0FDFA", // Light Teal Surface
    primarySubtle: "rgba(13, 148, 136, 0.08)",
    primaryBorder: "#CCFBF1",

    // Secondary & Structural (Deep Architectural Navy)
    navy: "#0F172A", // Deep Navy Structural Chrome
    navyDark: "#0B132B", // Deep Base
    navyHover: "#1E293B", // Navy Hover
    slate: "#1E293B", // Secondary Dark Slate (Sidebar Flyouts/Panels)
    slateBorder: "#334155", // Hairline Slate Divider

    // Surfaces & Canvas
    background: "#F8FAFC", // Anti-glare soft slate canvas
    surface: "#FFFFFF", // Crisp pure white cards and containers
    surfaceSecondary: "#F1F5F9", // Secondary table headers & panels
    surfaceTertiary: "#E2E8F0", // Inset containers
    surfaceHover: "#F0FDFA", // Interactive hover with subtle teal tint
    surfaceDark: "#0F172A", // Dark structural surface

    // Hairline Borders & Dividers
    border: "#E2E8F0", // Standard neutral hairline divider
    borderLight: "#F1F5F9", // Subtle divider
    borderDark: "#0F172A", // High contrast active border
    borderFocus: "#0D9488", // Focus ring

    // Typography (High-Contrast, Long-Session Comfort)
    textPrimary: "#0F172A", // Deep navy heading & body text
    textSecondary: "#64748B", // Medium accessible slate
    textMuted: "#94A3B8", // Captions & subtle metadata
    textLight: "#CBD5E1", // Inactive icons & disabled text

    // Semantic Status Colors (WCAG AA Compliant)
    status: {
      success: "#10B981", // Emerald
      successBg: "#ECFDF5",
      successBorder: "#A7F3D0",
      successText: "#065F46",

      warning: "#F59E0B", // Amber
      warningBg: "#FFFBEB",
      warningBorder: "#FDE68A",
      warningText: "#92400E",

      danger: "#EF4444", // Crimson
      dangerBg: "#FEF2F2",
      dangerBorder: "#FECACA",
      dangerText: "#991B1B",

      info: "#0284C7", // Sky/Blue
      infoBg: "#F0F9FF",
      infoBorder: "#BAE6FD",
      infoText: "#0369A1",

      neutral: "#64748B", // Neutral Slate
      neutralBg: "#F1F5F9",
      neutralBorder: "#E2E8F0",
      neutralText: "#334155",
    },
  },

  // Typography Settings
  typography: {
    fontSans: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontHeading: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', var(--font-inter), sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },

  // Official Logo Assets
  assets: {
    logoLight: "/light-back-logo.png",
    logoDark: "/dark-back-logo.png",
    favicon: "/favicon.ico",
  },
} as const;

