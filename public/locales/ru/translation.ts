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

const weatherAlertRU = {
  weatherAlert: "погодное предупреждение",
  from: "от",
  to: "до",
};

const cardDataRU = {
  temperature: "температура",
  wind: "ветер",
  humidity: "влажность",
  airQuality: "качество воздуха",
  moonPhase: "фаза луны",
};

const cardDetailsRU = {
  gust: "порыв",
  pressure: "давление",
  ultravioletRadiation: "ультрафиолетовое излучение",
  twoMicronsParticles: "частицы размером 2,5 микрона",
  tenMicronsParticles: "частицы размером 10 микрон",
  carbonMonoxide: "угарный газ",
  ozone: "озон",
  nitrogenDioxide: "диоксид азота",
  sulphurDioxide: "сернистый газ",
};

const unitsRU = {
  microgm3: "мкг/м³",
  ms: "м/с",
  mmHg: "мм рт.ст.",
};

export const translationRU = {
  title: "Приложение погоды",
  city: "город",
  getLocation: "Получить местоположение",
  ...windDir90RU,
  ...windDir45RU,
  ...windDir225RU,
  ...unitsRU,
  ...cardDataRU,
  ...cardDetailsRU,
  ...weatherAlertRU,
  formatsRU,
};
