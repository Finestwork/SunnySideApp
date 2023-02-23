import WeatherInterpretation from './WeatherInterpretation';
import DateConversion from './DateConversion';

export default class DailyForecast {
  // Extracts the only necessary data from the API
  static extractData(data) {
    return data.daily.time.map((time, ind) => {
      const TIME = new Date(time);
      const WEATHER_TIME = DateConversion.addTimeToCurrentDate(TIME);
      const WEATHER_INTERPRETATION =
        WeatherInterpretation.getImageDataFromWeatherCode(
          WEATHER_TIME,
          data.daily.weathercode[ind]
        );
      const IMG_SRC = WEATHER_INTERPRETATION.imgSrc;
      const IMG_INTERPRETATION = WEATHER_INTERPRETATION.interpretation;

      return {
        time: TIME.toLocaleDateString('en', { weekday: 'short' }),
        imgSrc: IMG_SRC,
        imgInterpretation: IMG_INTERPRETATION,
        temperature: {
          min: data.daily.apparent_temperature_max[ind],
          max: data.daily.apparent_temperature_max[ind],
        },
        apparentTemperature: data.daily.temperature_2m_min[ind],
      };
    });
  }
}
