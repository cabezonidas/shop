import React, { FC, Suspense } from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./theme/theme";
import { globalStyle } from "./theme/global-style";
import { TranslationProvider } from "./internationalization/translation-provider";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    "en-US": { translation: {} },
    "es-AR": { translation: {} },
  },
  lng: "en-US",
  fallbackLng: "en-US",
});
export const UiProvider: FC = props => {
  const { children } = props;
  return (
    <Suspense fallback={<></>}>
      <TranslationProvider>
        <ThemeProvider theme={theme}>
          {globalStyle}
          {children}
        </ThemeProvider>
      </TranslationProvider>
    </Suspense>
  );
};

export default UiProvider;
