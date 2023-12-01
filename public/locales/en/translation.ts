const windDir90 = {
  N: "N",
  W: "W",
  S: "S",
  E: "E",
};

const windDir45 = {
  NW: `${windDir90.N}${windDir90.W}`,
  SW: `${windDir90.S}${windDir90.W}`,
  SE: `${windDir90.S}${windDir90.E}`,
  NE: `${windDir90.N}${windDir90.E}`,
};

const windDir225 = {
  NNW: `${windDir90.N}${windDir45.NW}`,
  WNW: `${windDir90.W}${windDir45.NW}`,
  WSW: `${windDir90.W}${windDir45.SW}`,
  SSW: `${windDir90.S}${windDir45.SW}`,
  SSE: `${windDir90.S}${windDir45.SE}`,
  ESE: `${windDir90.E}${windDir45.SE}`,
  ENE: `${windDir90.E}${windDir45.NE}`,
};

const formats = {
  intlDateTime: "{{val, datetime}}",
};

const weatherAlert = {
  weatherAlert: "weather alert",
  from: "from",
  to: "to",
};

const cardData = {
  temperature: "temperature",
  wind: "wind",
  humidity: "humidity",
  airQuality: "air quality",
  moonPhase: "moon phase",
};

const cardDetails = {
  gust: "gust",
  pressure: "pressure",
  ultravioletRadiation: "ultraviolet radiation",
  twoMicronsParticles: "2.5 microns particles",
  tenMicronsParticles: "10 microns particles",
  carbonMonoxide: "carbon monoxide",
  ozone: "ozone",
  nitrogenDioxide: "nitrogen dioxide",
  sulphurDioxide: "sulphur dioxide",
};

const units = {
  microgm3: "µg/m3",
  ms: "m/s",
  mmHg: "mmHg",
};

export const translationEN = {
  title: "Weather App",
  city: "city",
  getLocation: "Get location",
  ...windDir90,
  ...windDir45,
  ...windDir225,
  ...units,
  ...cardData,
  ...cardDetails,
  ...weatherAlert,
  ...formats,
};
