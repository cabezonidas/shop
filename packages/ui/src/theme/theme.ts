import { colors, IColors } from "./colors";

export interface ITheme {
  colors: IColors;
  fontSizes: string[];
  space: string[];
  lineHeight: number;
  breakpoints: string[];
}

export const theme: ITheme = {
  colors,
  fontSizes: ["0.75rem", "0.875rem", "1rem", "1.25rem", "1.5rem", "2rem", "3rem", "4rem", "5rem"],
  space: [
    "0rem",
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "2rem",
    "4rem",
    "8rem",
    "16rem",
  ],
  lineHeight: 1.5,
  breakpoints: ["40em", "52em", "64em", "76em"],
};
