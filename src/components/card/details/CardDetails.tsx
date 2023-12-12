import { PropsWithChildren } from "react";
import wind from "../../../assets/wind.webp";
import pm10 from "../../../assets/PM10.webp";
import pm25 from "../../../assets/PM25.webp";
import co from "../../../assets/CO.webp";
import o3 from "../../../assets/O3.webp";
import no2 from "../../../assets/NO2.webp";
import so2 from "../../../assets/SO2.webp";
import pressure from "../../../assets/pressure.webp";
import rain from "../../../assets/rain.webp";
import snow from "../../../assets/snow.webp";
import visibility from "../../../assets/visibility.webp";
import uv from "../../../assets/uv.webp";
import Item from "../../ui/Item/Item";
import { Weather } from "../../../types/Forecast";
import { DeepPartial } from "../../../types/custom/DeepPartial";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

type CardDetailsProps = {
  day: number;
  hour: number;
  data?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const hPaTommHg = (hPa: string) => {
  return (3 * Number(hPa)) / 4;
};

const evaluatePM25 = (value: number) => {
  // evaluates concentration per 24 hours
  const level1 = 12,
    level2 = 35.4,
    level3 = 55.4,
    level4 = 150.4,
    level5 = 250.4,
    level6 = 350.4,
    level7 = 500.4;

  if (value <= level1) return "good";
  else if (value > level1 && value <= level3) return "moderate";
  else if (value > level3) return "bad";
};

// CAQI - EU common AQI

const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const evalCAQI = (value: number, pollutant: string): string => {
  //const levels = ["very low", "low", "medium", "high", "very high"];
  const levels = ["green", "yellow", "orange", "red", "maroon"];
  const NO2 = [0, 50, 100, 200, 400];
  const PM10 = [0, 25, 50, 90, 180];
  const PM25 = [0, 15, 30, 55, 110];
  const O3 = arrayRange(0, 240, 60);

  const getLevel = (array: Array<number>): number => {
    let i;
    for (i = 1; array.length - 1; i++) {
      if (array[i] >= value) {
        break;
      }
    }
    return i - 1;
  };

  switch (pollutant) {
    case "NO2": {
      return levels[getLevel(NO2)];
    }
    case "PM10": {
      return levels[getLevel(PM10)];
    }
    case "O3": {
      return levels[getLevel(O3)];
    }
    case "PM25": {
      return levels[getLevel(PM25)];
    }
    default:
      throw new Error("Incorret pollutant name");
  }
};

const CardDetails = ({
  data,
  day,
  hour,
}: PropsWithChildren<CardDetailsProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack padding="0.5em 1.5em">
        <Item src={pressure} alt={t("pressure")} fontSize="0.9em">
          {day > 0 &&
          data?.forecast?.forecastday?.[day].hour?.[hour].pressure_mb
            ? hPaTommHg(
                data?.forecast?.forecastday?.[day].hour?.[hour]
                  .pressure_mb as string
              )
                .toFixed(0)
                .toString()
            : hPaTommHg(data?.current?.pressure_mb as string)
                .toFixed(0)
                .toString()}{" "}
          {t("mmHg")}
        </Item>
        <Item src={rain} alt={t("totalPrecipitation")} fontSize="0.9em">
          {day > 0 &&
          Number(data?.forecast?.forecastday?.[day].day?.totalprecip_mm)
            ? Number(data?.forecast?.forecastday?.[day].day?.totalprecip_mm)
                .toFixed(0)
                .toString()
            : Number(data?.forecast?.forecastday?.[day].day?.totalprecip_mm)
                .toFixed(0)
                .toString()}{" "}
          {t("mm")}
        </Item>
        <Item src={snow} alt={t("totalSnow")} fontSize="0.9em">
          {day > 0 &&
          Number(data?.forecast?.forecastday?.[day].day?.totalsnow_cm)
            ? Number(data?.forecast?.forecastday?.[day].day?.totalsnow_cm)
                .toFixed(0)
                .toString()
            : Number(data?.forecast?.forecastday?.[day].day?.totalsnow_cm)
                .toFixed(0)
                .toString()}{" "}
          {t("cm")}
        </Item>
        <Item src={wind} alt={t("gust")} fontSize="0.9em">
          {day > 0
            ? "-"
            : ((Number(data?.current?.gust_kph) * 1000) / 3600)
                .toFixed(0)
                .toString()}{" "}
          {t("ms")} {day > 0 ? "" : t(data?.current?.wind_dir as string)}
        </Item>
        <Item src={visibility} alt={t("visibility")} fontSize="0.9em">
          {day > 0 && Number(data?.forecast?.forecastday?.[day].day?.avgvis_km)
            ? Number(data?.forecast?.forecastday?.[day].day?.avgvis_km)
                .toFixed(1)
                .toString()
            : Number(data?.current?.vis_km).toFixed(1).toString()}{" "}
          {t("km")}
        </Item>
        <Item src={uv} alt={t("ultravioletRadiation")} fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.uv
            ? data?.forecast?.forecastday?.[day].day?.uv
            : data?.current?.uv}{" "}
        </Item>
        <Item
          src={pm25}
          alt={t("twoMicronsParticles")}
          iconSize="24"
          fontSize="0.9em"
          textColor={evalCAQI(
            day > 0 &&
              Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5)
              ? Number(
                  data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5
                )
              : Number(data?.current?.air_quality?.pm2_5),
            "PM25"
          )}
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.pm2_5)
                .toFixed(0)
                .toString()}{" "}
          {t("microgm3")}
        </Item>
        <Item
          src={pm10}
          alt={t("tenMicronsParticles")}
          iconSize="24"
          fontSize="0.9em"
          textColor={evalCAQI(
            day > 0 &&
              Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm10)
              ? Number(
                  data?.forecast?.forecastday?.[day].day?.air_quality?.pm10
                )
              : Number(data?.current?.air_quality?.pm10),
            "PM10"
          )}
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.pm10
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm10)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.pm10)
                .toFixed(0)
                .toString()}{" "}
          {t("microgm3")}
        </Item>
        <Item src={co} alt={t("carbonMonoxide")} iconSize="24" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.co
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.co)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.co).toFixed(0).toString()}{" "}
          {t("microgm3")}
        </Item>
        <Item
          src={o3}
          alt={t("ozone")}
          iconSize="24"
          fontSize="0.9em"
          textColor={evalCAQI(
            day > 0 &&
              Number(data?.forecast?.forecastday?.[day].day?.air_quality?.o3)
              ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.o3)
              : Number(data?.current?.air_quality?.o3),
            "O3"
          )}
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.o3
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.o3)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.o3).toFixed(0).toString()}{" "}
          {t("microgm3")}
        </Item>
        <Item
          src={no2}
          alt={t("nitrogenDioxide")}
          iconSize="24"
          fontSize="0.9em"
          textColor={evalCAQI(
            day > 0 &&
              Number(data?.forecast?.forecastday?.[day].day?.air_quality?.no2)
              ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.no2)
              : Number(data?.current?.air_quality?.no2),
            "NO2"
          )}
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.no2
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.no2)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.no2)
                .toFixed(0)
                .toString()}{" "}
          {t("microgm3")}
        </Item>
        <Item
          src={so2}
          alt={t("sulphurDioxide")}
          iconSize="24"
          fontSize="0.9em"
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.so2
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.so2)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.so2)
                .toFixed(0)
                .toString()}{" "}
          {t("microgm3")}
        </Item>
      </Stack>
    </>
  );
};

export default CardDetails;
