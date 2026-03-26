import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix() as Preset],
    theme: {
      extend: {
        colors: {
          background: "#F3F4F6", // Light gray background for a code/robotic look
          foreground: "#041E42", // Georgetown Blue for text
          primary: "#041E42", // Georgetown Blue
          secondary: "#63666A", // Cool Gray 9
          green: "#2E7D32", // Accessible green for "up" arrows
          red: "#C62828", // Accessible red for "down" arrows
          bg1: "#F8F9FA", // Very light gray for row alternates
          bg2: "#E9ECEF", // Slightly darker gray for hover
          bg3: "#D1D5DB", // Border gray
        },
        fontFamily: {
          sans: ['"Fira Code"', "monospace"],
          mono: ['"Fira Code"', "monospace"],
        },
      },
    },
  }),
  selfURL: import.meta.url,
};
