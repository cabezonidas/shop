import React, { FC } from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./theme/theme";
import { globalStyle } from "./theme/global-style";

export const UiProvider: FC = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      {globalStyle}
      {children}
    </ThemeProvider>
  );
};

export default UiProvider;
