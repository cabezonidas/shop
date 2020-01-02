import React, { ComponentProps, forwardRef } from "react";
import { Box, useTranslation, ErrorBoundary } from "@cabezonidas/shop-ui";

const enUsMedia = {
  welcome: "You're browsing the media app",
};
const esArMedia = {
  welcome: "Estás navegando la aplicación de multimedios",
};

export const MediaApp = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { i18n, t } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { media: enUsMedia }, true, true);
  i18n.addResourceBundle("en-AR", "translation", { media: esArMedia }, true, true);
  return (
    <ErrorBoundary {...{ i18n, t }}>
      <App {...props} ref={ref} />
    </ErrorBoundary>
  );
});

const App = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t } = useTranslation();

  return (
    <Box {...props} ref={ref}>
      {t("media.welcome")}
    </Box>
  );
});

export default MediaApp;
