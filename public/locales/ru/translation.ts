const windDir90RU = {
  N: "С",
  W: "З",
  S: "Ю",
  E: "В",
};

const windDir45RU = {
  NW: `${windDir90RU.N}${windDir90RU.W}`,
  SW: `${windDir90RU.S}${windDir90RU.W}`,
  SE: `${windDir90RU.S}${windDir90RU.E}`,
  NE: `${windDir90RU.N}${windDir90RU.E}`,
};

const windDir225RU = {
  NNW: `${windDir90RU.N}${windDir45RU.NW}`,
  WNW: `${windDir90RU.W}${windDir45RU.NW}`,
  WSW: `${windDir90RU.W}${windDir45RU.SW}`,
  SSW: `${windDir90RU.S}${windDir45RU.SW}`,
  SSE: `${windDir90RU.S}${windDir45RU.SE}`,
  ESE: `${windDir90RU.E}${windDir45RU.SE}`,
  ENE: `${windDir90RU.E}${windDir45RU.NE}`,
};

const formatsRU = {
  intlDateTime: "{{val, datetime}}",
};

export const translationRU = {
  title: "Приложение погоды",
  city: "город",
  getLocation: "Получить местоположение",
  ...windDir90RU,
  ...windDir45RU,
  ...windDir225RU,
  microgm3: "мкг/м³",
  ms: "м/с",
  mmHg: "мм рт.ст.",
  formatsRU,
};
