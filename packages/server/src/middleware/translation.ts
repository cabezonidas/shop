import { i18n } from "i18next";
import * as i18next from "i18next";
import * as middleware from "i18next-express-middleware";

const enUs = {
  translation: {
    errors: {
      not_authenticated: "Unauthenticated access",
      invalid_login: "Invalid login",
      invalid_password: "Invalid password",
    },
  },
};

const esAr = {
  translation: {
    errors: {
      not_authenticated: "Acceso sin autenticar",
      invalid_login: "Usuario inválido",
      invalid_password: "Contraseña inválida",
    },
  },
};

((i18next as unknown) as i18n).init({
  resources: {
    "en-US": enUs,
    "es-AR": esAr,
  },
  lng: "en-US",
  fallbackLng: "en-US",
});

export const translation = middleware.handle((i18next as unknown) as i18n, {
  removeLngFromUrl: false,
});
