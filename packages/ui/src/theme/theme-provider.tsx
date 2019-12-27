import React, { FC } from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { theme } from "./theme";
import { globalStyle } from "./global-style";

export const ThemeProvider: FC = props => {
  const { children } = props;
  return (
    <EmotionThemeProvider theme={theme}>
      {globalStyle}
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
