import { PropsWithChildren } from "react";
import humidity from "../../../assets/humidity.webp";
import wind from "../../../assets/wind.webp";
import aqi from "../../../assets/air-quality.webp";
import moon1 from "../../../assets/moon1.webp";
import moon2 from "../../../assets/moon2.webp";
import moon3 from "../../../assets/moon3.webp";
import moon4 from "../../../assets/moon4.webp";
import temp from "../../../assets/temp.webp";
import Item from "../../ui/Item/Item";
import { Weather } from "../../../types/Forecast";
import { DeepPartial } from "../../../types/custom/DeepPartial";
import { CardMedia, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type CardDataProps = {
  day: number;
  hour: number;
  data?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const dateTransforme = (yyyymmdd: string) => {
  const date = new Date(yyyymmdd);
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
};

const convertMoonPhase = (moonPhase: string) => {
  switch (moonPhase) {
    case "New Moon": {
      return moon1;
    }
    case "Waxing Crescent":
    case "First Quarter":
    case "Waxing Gibbous": {
      return moon2;
    }
    case "Full Moon": {
      return moon3;
    }
    case "Waning Gibbous":
    case "Last Quarter":
    case "Waning Crescent": {
      return moon4;
    }
    default: {
      return moon1;
    }
  }
};

const evalAQI = (index: number): string => {
  switch (index) {
    case 1:
      return "green";
    case 2:
      return "yellow";
    case 3:
      return "orange";
    case 4:
      return "red";
    case 5:
      return "purple";
    case 6:
      return "maroon";
    default:
      throw new Error("incorrect US EPA AQIindex");
  }
};

const CardData = ({ data, day, hour }: PropsWithChildren<CardDataProps>) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction={{ xs: "row", sm: "column" }}
      justifyContent={{ xs: "space-around", sm: "center" }}
    >
      <Stack width={{ xs: "10em", sm: `calc(100%)` }}>
        <Typography color="text.secondary" paddingTop="0.5em">
          {/* {dateTransforme(data?.forecast?.forecastday?.[day].date as string)} */}
          {t("intlDateTime", {
            val: new Date(data?.forecast?.forecastday?.[day].date as string),
            formatParams: {
              val: {
                weekday: "short",
                //year: "numeric",
                month: "long",
                day: "numeric",
              },
            },
          })}
        </Typography>
        <CardMedia
          component="img"
          height="128px"
          image={
            day > 0
              ? data?.forecast?.forecastday?.[day].day?.condition?.icon
              : data?.current?.condition?.icon
          }
          alt={
            day > 0
              ? data?.forecast?.forecastday?.[day].day?.condition?.text
              : data?.current?.condition?.text
          }
          sx={{
            color: "text.secondary",
            objectFit: "contain",
            lineHeight: "128px",
          }}
        />
      </Stack>
      <Stack spacing={0.25} direction="column" justifyContent="center">
        <Stack>
          <Item
            src={temp}
            alt={t("temperature")}
            iconSize="32"
            fontSize="2em"
            justifyContentItem="center"
            paddingItem="0.5em 0em"
          >
            {day > 0
              ? Number(data?.forecast?.forecastday?.[day].day?.maxtemp_c)
                  .toFixed(0)
                  .toString()
              : Number(data?.current?.temp_c).toFixed(0).toString()}
            ℃
          </Item>
        </Stack>
        <Stack padding="0em 1.5em">
          {/* <Item src={wind} alt="wind">
            {day > 0
              ? Number(data?.forecast?.forecastday?.[day].day?.maxwind_kph)
                  .toFixed(0)
                  .toString()
              : Number(data?.current?.wind_kph).toFixed(0).toString()}{" "}
            km/h{" "}
            {day > 0
              ? data?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
              : data?.current?.wind_dir}
          </Item> */}
          <Item src={wind} alt={t("wind")}>
            {day > 0
              ? (
                  ((data?.forecast?.forecastday?.[day].day
                    ?.maxwind_kph as number) *
                    1000) /
                  3600
                )
                  .toFixed(0)
                  .toString()
              : (((data?.current?.wind_kph as number) * 1000) / 3600)
                  .toFixed(0)
                  .toString()}{" "}
            {t("ms")}{" "}
            {day > 0
              ? t(
                  data?.forecast?.forecastday?.[day].hour?.[hour]
                    .wind_dir as string
                )
              : t(data?.current?.wind_dir as string)}
          </Item>
          <Item src={humidity} alt={t("humidity")}>
            {day > 0
              ? data?.forecast?.forecastday?.[day].day?.avghumidity
              : data?.current?.humidity}
            {""}%
          </Item>
          <Item
            src={aqi}
            alt={t("airQuality")}
            textColor={evalAQI(
              day > 0 &&
                Number(
                  data?.forecast?.forecastday?.[day].day?.air_quality?.[
                    "us-epa-index"
                  ]
                )
                ? Number(
                    data?.forecast?.forecastday?.[day].day?.air_quality?.[
                      "us-epa-index"
                    ]
                  )
                : Number(data?.current?.air_quality?.["us-epa-index"])
            )}
          >
            {day > 0 &&
            data?.forecast?.forecastday?.[day].day?.air_quality?.[
              "us-epa-index"
            ]
              ? data?.forecast?.forecastday?.[day].day?.air_quality?.[
                  "us-epa-index"
                ]
              : data?.current?.air_quality?.["us-epa-index"]}
          </Item>
          <Item
            src={convertMoonPhase(
              data?.forecast?.forecastday?.[day].astro?.moon_phase as string
            )}
            alt={t("moonPhase")}
          >
            {day > 0 &&
            data?.forecast?.forecastday?.[day].astro?.moon_illumination
              ? data?.forecast?.forecastday?.[day].astro?.moon_illumination
              : data?.forecast?.forecastday?.[day].astro?.moon_illumination}
            %
          </Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardData;
