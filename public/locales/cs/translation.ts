const windDir90CZ = {
  N: "S",
  W: "Z",
  S: "J",
  E: "V",
};

const windDir45CZ = {
  NW: `${windDir90CZ.N}${windDir90CZ.W}`,
  SW: `${windDir90CZ.S}${windDir90CZ.W}`,
  SE: `${windDir90CZ.S}${windDir90CZ.E}`,
  NE: `${windDir90CZ.N}${windDir90CZ.E}`,
};

const windDir225CZ = {
  NNW: `${windDir90CZ.N}${windDir45CZ.NW}`,
  WNW: `${windDir90CZ.W}${windDir45CZ.NW}`,
  WSW: `${windDir90CZ.W}${windDir45CZ.SW}`,
  SSW: `${windDir90CZ.S}${windDir45CZ.SW}`,
  SSE: `${windDir90CZ.S}${windDir45CZ.SE}`,
  ESE: `${windDir90CZ.E}${windDir45CZ.SE}`,
  ENE: `${windDir90CZ.E}${windDir45CZ.NE}`,
};

const formatsCZ = {
  intlDateTime: "{{val, datetime}}",
};

const weatherAlertCZ = {
  weatherAlert: "výstraha počasí",
  from: "od",
  to: "do",
};

export const translationCZ = {
  title: "Aplikace počasí",
  city: "město",
  getLocation: "Získat polohu",
  ...windDir90CZ,
  ...windDir45CZ,
  ...windDir225CZ,
  microgm3: "µg/m3",
  ms: "m/s",
  mmHg: "mmHg",
  ...weatherAlertCZ,
  formatsCZ,
};
