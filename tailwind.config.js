/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep Heritage Forest Green
        "primary": "#0D2619",
        "primary-container": "#173827",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#9AB3A5",
        "primary-fixed": "#CADDCF",
        "primary-fixed-dim": "#AEC7B6",
        "on-primary-fixed": "#061A10",
        
        // Warm Neutral Slate
        "secondary": "#57534A",
        "secondary-container": "#E2D3B8",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#3D3932",
        
        // Warm Terracotta & Amber
        "accent": "#D97736",
        "accent-hover": "#C26527",
        "accent-light": "#F5E4D3",
        "tertiary": "#8A4C1B",
        "tertiary-container": "#EED8C3",
        "on-tertiary-container": "#8A4C1B",
        "gold": "#C29236",
        
        // Rich Warm Cream & Oatmeal Off-White Palette (Unmistakably warm, earthy & rich)
        "surface": "#F3EBDD",
        "surface-dim": "#E5D7BF",
        "surface-bright": "#FAF6EE",
        "surface-container-lowest": "#FAF6EE",
        "surface-container-low": "#EADEC9",
        "surface-container": "#DFD0B5",
        "surface-container-high": "#D4C2A1",
        "surface-container-highest": "#C8B490",
        "surface-variant": "#DFD0B5",
        
        "background": "#F3EBDD",
        "on-background": "#142419",
        "on-surface": "#142419",
        "on-surface-variant": "#4E5750",
        
        "outline": "#7A827B",
        "outline-variant": "#C0B29A",
        "error": "#B82C2C",
        "on-error": "#FFFFFF",
      },
      fontFamily: {
        "display-lg": ["'Playfair Display'", "Georgia", "serif"],
        "headline-md": ["'Playfair Display'", "Georgia", "serif"],
        "headline-sm": ["'Playfair Display'", "Georgia", "serif"],
        "body-lg": ["'Inter'", "system-ui", "sans-serif"],
        "body-md": ["'Inter'", "system-ui", "sans-serif"],
        "label-caps": ["'Inter'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-lg-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["34px", { lineHeight: "42px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      spacing: {
        "margin-desktop": "80px",
        "margin-mobile": "20px",
        "gutter": "28px",
        "section-gap": "120px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "sm": "0.25rem",
        "md": "0.75rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "full": "9999px",
      }
    },
  },
  plugins: [],
}
