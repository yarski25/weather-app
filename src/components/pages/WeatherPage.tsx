import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Weather } from "../../types/Forecast";
import WeatherCard from "../card/WeatherCard";

const WeatherPage = () => {
  const [position, setPosition] = useState<Coords>({ lat: "", lon: "" });
  const [city, setCity] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [weather, setWeather] = useState<DeepPartial<Weather>>();

  // const [currentWeather, setCurrentWeather] = useState<DeepPartial<Current>>({
  //   location: {
  //     name: "",
  //     region: "",
  //     country: "",
  //   },
  //   temp_c: "",
  //   current: {
  //     condition: { text: "", icon: "" },
  //     wind_kph: "",
  //     wind_degree: "",
  //     wind_dir: "",
  //     air_quality: { "us-epa-index": "" },
  //   },
  //   wind_ms: "",
  // } as DeepPartial<Current>);

  const [fetchData, isDataLoading] = useFetching(async () => {
    const coordsCondition = position.lat && position.lon;
    const cityCondition = city !== "";

    if (!cityCondition) {
      if (coordsCondition) {
        const response = await WeatherService.getForecast(
          {
            lat: position.lat,
            lon: position.lon,
          },
          "3"
        );

        setWeather(response.data);
      }
    } else {
      const response = await WeatherService.getForecastByCity(city, "3");

      setWeather(response.data);
    }

    //A -> get current location
    //B -> type city name
    //after button click
    // if city is empty && coords empty => nothing
    // if city is empty && coords full => fetch by coords
    // if city is full && coords empty => fetch by city
    // if city is full && coords full => fetch by last action

    // add flag to detect user action
  });

  useEffect(() => {
    const timeOutId = setTimeout(() => fetchData(), 1000);
    setIsTyping(false);
    return () => {
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, isTyping]);

  const handleCity = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const letters = /^[A-Za-z ]+$/;
    if (
      event.target.value.length > 0 &&
      event.target.value.match(letters) === null
    ) {
      console.log("Wrong input! Only letters are allowed...");
      return;
    }
    setCity(event.target.value);
  };

  const handleOnClick = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude.toFixed(6).toString(),
            lon: position.coords.longitude.toFixed(6).toString(),
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Not Available");
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-page__input">
        <div className="weather-page__input__textbox">
          <TextField
            id="outlined-basic"
            label="city"
            variant="outlined"
            color="secondary"
            value={city}
            onChange={handleCity}
            fullWidth
          />
        </div>
        <div className="weather-page__input__button">
          <Button
            onClick={handleOnClick}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Get location
          </Button>
        </div>
      </div>
      <div className="weather-page__output">
        {isDataLoading && (
          <Stack
            margin="auto"
            minHeight="80dvh"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ color: "secondary" }} />
          </Stack>
        )}
        {weather?.current?.temp_c && (
          <div className="weather-page__output__location">
            <Typography
              variant="h2"
              sx={{ fontSize: "0.8em" }}
              color="text.primary"
              gutterBottom
              marginTop="0.5em"
            >
              {weather?.location?.country}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              color="text.primary"
              sx={{ fontSize: "0.8em" }}
              gutterBottom
            >
              {weather?.location?.region} - {weather?.location?.name}
            </Typography>
            <Typography variant="h2" component="div" sx={{ fontSize: "0.5em" }}>
              GPS: {weather?.location?.lat}, {weather?.location?.lon}
            </Typography>
          </div>
        )}

        {weather?.current?.temp_c && (
          <div className="weather-page__output__cards">
            {weather?.forecast?.forecastday?.map((forecast, index: number) => (
              <WeatherCard
                index={index}
                key={index}
                day={index}
                hour={12}
                weatherData={weather}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
