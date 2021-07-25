// export const apiKey = "a94ace9be7994ce0beb8b5e27cefcd7b";

export const apiKey = "5d3cc58f3cb20407c9920f4c29d0f47e";

export const weatherUrl = (city, unit, key = apiKey) => {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${unit}`;
};
