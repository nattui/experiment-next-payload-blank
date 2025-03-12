import localFont from "next/font/local"

// Define each font loader separately at module scope
const sans = localFont({
  src: [
    { path: "./sans-400.otf", weight: "400" },
    { path: "./sans-500.otf", weight: "500" },
    { path: "./sans-600.otf", weight: "600" },
    { path: "./sans-700.otf", weight: "700" },
  ],
  variable: "--font-sans",
})

// Combine CSS font variables into a single string for Tailwind CSS
export const fontCssVariables = [sans.variable].join(" ")
