import React, { useContext } from "react";
import { useTranslation as useTranslationNext } from "react-i18next";
import { TFunction, i18n as i18nObject } from "i18next";

interface ILanguage {
  localeId: string;
  name: string;
}

interface II18nContext {
  t: TFunction;
  c: (num: number, currencyCode?: string) => string;
  n: (num: number) => string;
  i18n: i18nObject;
  languages: ILanguage[];
}

const TranslationContext = React.createContext<II18nContext>(undefined as any);

export const TranslationProvider: React.FC = ({ children }) => {
  const { t, i18n } = useTranslationNext();

  const languages: ILanguage[] = [
    { localeId: "es-AR", name: "Español (argentino)" },
    { localeId: "en-US", name: "English (USA)" },
  ];

  const c = (num: number, currencyCode = "USD") =>
    (num / 1.0).toLocaleString(i18n.language, {
      minimumFractionDigits: 2,
      currency: currencyCode,
      currencyDisplay: "symbol",
      style: "currency",
    });

  const n = (num: number) => num.toLocaleString(i18n.language);

  return (
    <TranslationContext.Provider value={{ t, i18n, c, n, languages }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
