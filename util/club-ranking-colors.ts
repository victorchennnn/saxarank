type Theme = {
  bg: string;
  text: string;
  border: string;
  link: string;
};

const colorValues: { max: number; theme: Theme }[] = [
  {
    max: 3,
    theme: {
      bg: "bg-primary md:hover:opacity-90", // Georgetown Blue
      text: "text-white",
      link: "text-white",
      border: "border-primary",
    },
  },
  {
    max: 10,
    theme: {
      bg: "bg-secondary md:hover:opacity-90", // Cool Gray
      text: "text-white",
      link: "text-white",
      border: "border-secondary",
    },
  },
  {
    max: 20,
    theme: {
      bg: "bg-bg2 md:hover:bg-bg1", // Subtle Gray
      text: "text-foreground",
      link: "text-primary",
      border: "border-bg3",
    },
  },
];

const defaultTheme: Theme = {
  bg: "bg-background md:hover:bg-bg1", // White background
  text: "text-foreground",
  link: "text-primary",
  border: "border-bg3",
};

export function getColorValue(idx: number): Theme {
  for (const { max, theme } of colorValues) {
    if (idx < max) return theme;
  }
  return defaultTheme;
}
