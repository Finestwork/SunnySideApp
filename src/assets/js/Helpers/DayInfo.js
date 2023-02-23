import DateConversion from "./DateConversion";
import WeatherInterpretation from './WeatherInterpretation';

export default class DayInfo{

    // Extracts the only necessary data from the API
    static extractData(dataObj){
        // Get the current time based on the given timezone to determine if it's a day or night
        const CURRENT_TIME = DateConversion.getTimeFromTimezone(dataObj.timezone).toLowerCase();
        const IS_DAY =  CURRENT_TIME.includes('pm') ? 'day' : 'night';

        // Weather Information
        const WEATHER_CODE = dataObj.daily.weathercode[0];
        const APPARENT_TEMP_MAX = dataObj.daily.apparent_temperature_max[0];
        const APPARENT_TEMP_MIN = dataObj.daily.apparent_temperature_min[0];
        const SUNRISE = DateConversion.shortenTime(dataObj.daily.sunrise[0]);
        const SUNSET = DateConversion.shortenTime(dataObj.daily.sunset[0]);
        const WIND_SPEED = dataObj.daily.windspeed_10m_max[0];
        return {
            isDay: IS_DAY,
            imgSrc: WeatherInterpretation.getCurrentImageData(CURRENT_TIME, WEATHER_CODE).imgSrc,
            apparentTemp: {
                max: APPARENT_TEMP_MAX,
                min: APPARENT_TEMP_MIN,
            },
            sunrise: SUNRISE,
            sunset: SUNSET,
            windspeed: WIND_SPEED,
        }
    }
}