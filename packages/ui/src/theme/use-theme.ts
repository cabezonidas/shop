import { useTheme as useThemeEmotion } from "emotion-theming";
import { ITheme } from "./theme";

export const useTheme = () => useThemeEmotion<ITheme>();
