import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { translationEN } from "../public/locales/en/translation";
import { translationCZ } from "../public/locales/cs/translation";
import { translationRU } from "../public/locales/ru/translation";

const resources = {
  en: {
    translation: translationEN,
  },
  cs: {
    translation: translationCZ,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
