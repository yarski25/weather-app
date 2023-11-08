import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "Weather App",
        city: "city",
        getLocation: "Get location",
      },
    },
    cz: {
      translation: {
        title: "Aplikace počasí",
        city: "město",
        getLocation: "Získat polohu",
      },
    },
    ru: {
      translation: {
        title: "Приложение погоды",
        city: "город",
        getLocation: "Получить местоположение",
      },
    },
  },
});

export default i18n;
