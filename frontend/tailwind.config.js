/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /** 中华古典设色：纸色、墨色、朱砂、黛青、泥金（与 index.css 变量一致） */
        jian: {
          paper: "#f3efe4",
          "paper-warm": "#ebe4d6",
          ink: "#2a2622",
          "ink-soft": "#4a4238",
          "ink-faint": "#6b6155",
          "ink-faint": "#6b6155",
          cinnabar: "#b43c2b",
          "cinnabar-deep": "#8b2e22",
          teal: "#3a5552",
          "teal-soft": "#5a726f",
          gold: "#b08d3a",
          "gold-dim": "rgba(176, 141, 58, 0.35)",
          mist: "#8a9a96",
          line: "#d4cbc0",
        },
      },
      fontFamily: {
        /** 题签、主标题 */
        display: ['"Ma Shan Zheng"', '"Noto Serif SC"', "serif"],
        /** 栏目标题：略扁、有金石气 */
        heading: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', "serif"],
        serif: ['"Noto Serif SC"', "Georgia", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        /** 画幅轻压纸痕 */
        "scroll-soft": "0 12px 40px -12px rgba(42, 38, 34, 0.14), inset 0 1px 0 rgba(255, 253, 248, 0.85)",
        "scroll-inner": "inset 0 2px 8px rgba(42, 38, 34, 0.06)",
        "cinnabar-glow": "0 8px 28px -6px rgba(180, 60, 43, 0.35)",
      },
    },
  },
  plugins: [],
};
