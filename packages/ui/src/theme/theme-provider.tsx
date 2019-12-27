import React, { FC } from "react";
import { ThemeProvider as EmotionThemeProvider, ThemeProviderProps } from "emotion-theming";
import { theme, ITheme } from "./theme";

export const ThemeProvider: FC<ThemeProviderProps<ITheme>> = props => {
  console.log(theme);
  return <EmotionThemeProvider theme={theme} {...props} />;
};

export default ThemeProvider;
