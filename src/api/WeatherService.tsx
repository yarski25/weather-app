import axios from "axios";
import { Coords } from "../types/Coords";
import { OriginCurrent } from "../types/Current";
import { Weather } from "../types/Forecast";
import i18n from "../i18n";
import { useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

//const getLanguage = () => i18next.language || window.localStorage.i18nextLng

// queries
const queries = new Map<string, string>();
queries.set("airQuality", "&aqi=yes");
queries.set("days", "&days=14");
queries.set("lang", `&lang=${i18n.language}`);
queries.set("alerts", "&alerts=yes");

// endpoints
const endpoints = new Map<string, string>();
endpoints.set("current", "current.json");
endpoints.set("forecast", "forecast.json");
endpoints.set("search", "search.json");
endpoints.set("history", "history.json");
endpoints.set("marina", "marina.json");
endpoints.set("future", "future.json");
endpoints.set("timezone", "timezone.json");
endpoints.set("sports", "sports.json");
endpoints.set("astronomy", "astronomy.json");
endpoints.set("ip", "ip.json");

export default class WeatherService {
  // get language if i18n language changed
  // useEffect(() => {
  //   const languageCode = i18n.language;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [i18n.language]);

  static async getByCoords(coords: Coords) {
    const response = await axios.get<OriginCurrent>(
      API_URL +
        endpoints.get("current") +
        `?key=` +
        API_KEY +
        `&q=` +
        coords.lat +
        `,` +
        coords.lon +
        queries.get("airQuality")
    );

    return response;
  }

  static async getForecast(coords: Coords, days: string) {
    queries.set("days", "&days=" + days);
    const response = await axios.get<Weather>(
      API_URL +
        endpoints.get("forecast") +
        `?key=` +
        API_KEY +
        `&q=` +
        coords.lat +
        `,` +
        coords.lon +
        queries.get("airQuality") +
        queries.get("days") +
        queries.get("alerts") +
        `&lang=${i18n.language}`
    );

    return response;
  }

  static async getForecastByCity(city: string, days: string) {
    queries.set("days", "&days=" + days);
    const response = await axios.get<Weather>(
      API_URL +
        endpoints.get("forecast") +
        `?key=` +
        API_KEY +
        `&q=` +
        city +
        queries.get("airQuality") +
        queries.get("days") +
        queries.get("alerts") +
        `&lang=${i18n.language}`
    );

    return response;
  }
}
