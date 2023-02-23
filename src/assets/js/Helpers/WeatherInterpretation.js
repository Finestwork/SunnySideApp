export default class WeatherImage {
  static #IMG_PATH = 'images/weather';

  static #WEATHER_INTERPRETATION = {
    0: {
      interpretation: 'Clear sky',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/0.png`,
        night: `${WeatherImage.#IMG_PATH}/night/0.png`,
      },
    },
    1: {
      intrepretation: 'Mainly clear',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/0.png`,
        night: `${WeatherImage.#IMG_PATH}/night/0.png`,
      },
    },
    2: {
      interpretation: 'Partly cloudy',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/2.png`,
        night: `${WeatherImage.#IMG_PATH}/night/2.png`,
      },
    },
    3: {
      interpretation: 'Mostly Cloudy',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/2.png`,
        night: `${WeatherImage.#IMG_PATH}/night/2.png`,
      },
    },
    45: {
      interpretation: 'Fog',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/45.png`,
        night: `${WeatherImage.#IMG_PATH}/night/45.png`,
      },
    },
    48: {
      interpretation: 'Depositing rime fog',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/48.png`,
        night: `${WeatherImage.#IMG_PATH}/night/48.png`,
      },
    },
    51: {
      interpretation: 'Light drizzle',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/51.png`,
        night: `${WeatherImage.#IMG_PATH}/night/51.png`,
      },
    },
    53: {
      interpretation: 'Moderate drizzle',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/51.png`,
        night: `${WeatherImage.#IMG_PATH}/night/51.png`,
      },
    },
    55: {
      interpretation: 'Heavy drizzle',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/51.png`,
        night: `${WeatherImage.#IMG_PATH}/night/51.png`,
      },
    },
    56: {
      interpretation: 'Light freezing drizzle',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/51.png`,
        night: `${WeatherImage.#IMG_PATH}/night/51.png`,
      },
    },
    57: {
      interpretation: 'Heavy freezing dizzle',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/51.png`,
        night: `${WeatherImage.#IMG_PATH}/night/51.png`,
      },
    },
    61: {
      interpretation: 'Slight rain',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/61.png`,
        night: `${WeatherImage.#IMG_PATH}/night/61.png`,
      },
    },
    63: {
      interpretation: 'Moderate rain',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/61.png`,
        night: `${WeatherImage.#IMG_PATH}/night/61.png`,
      },
    },
    65: {
      interpretation: 'Heavy rain',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/61.png`,
        night: `${WeatherImage.#IMG_PATH}/night/61.png`,
      },
    },
    66: {
      interpretation: 'Light freezing rain',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/66.png`,
        night: `${WeatherImage.#IMG_PATH}/night/66.png`,
      },
    },
    67: {
      interpretation: 'Heavy freezing rain',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/66.png`,
        night: `${WeatherImage.#IMG_PATH}/night/66.png`,
      },
    },
    71: {
      interpretation: 'Slight snow fall',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/71.png`,
        night: `${WeatherImage.#IMG_PATH}/night/71.png`,
      },
    },
    73: {
      interpretation: 'Moderate snow fall',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/71.png`,
        night: `${WeatherImage.#IMG_PATH}/night/71.png`,
      },
    },
    75: {
      interpretation: 'heavy snow fall',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/71.png`,
        night: `${WeatherImage.#IMG_PATH}/night/71.png`,
      },
    },
    77: {
      interpretation: 'Snow grains',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/71.png`,
        night: `${WeatherImage.#IMG_PATH}/night/71.png`,
      },
    },
    80: {
      interpretation: 'Slight rain shower',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/80.png`,
        night: `${WeatherImage.#IMG_PATH}/night/80.png`,
      },
    },
    81: {
      interpretation: 'Moderate rain shower',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/80.png`,
        night: `${WeatherImage.#IMG_PATH}/night/80.png`,
      },
    },
    82: {
      interpretation: 'Violent rain shower',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/80.png`,
        night: `${WeatherImage.#IMG_PATH}/night/80.png`,
      },
    },
    85: {
      interpretation: 'Slight snow',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/85.png`,
        night: `${WeatherImage.#IMG_PATH}/night/85.png`,
      },
    },
    86: {
      interpretation: 'Heavy snow',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/85.png`,
        night: `${WeatherImage.#IMG_PATH}/night/85.png`,
      },
    },
    95: {
      interpretation: 'Slight thunderstorm',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/95.png`,
        night: `${WeatherImage.#IMG_PATH}/night/95.png`,
      },
    },
    96: {
      intrepretation: 'Moderate thunderstorm',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/95.png`,
        night: `${WeatherImage.#IMG_PATH}/night/95.png`,
      },
    },
    99: {
      interpretation: 'Heavy thunderstorm',
      img: {
        day: `${WeatherImage.#IMG_PATH}/day/95.png`,
        night: `${WeatherImage.#IMG_PATH}/night/95.png`,
      },
    },
  };

  // Gets the correct interpretation of the weather based on a current time
  static getCurrentImageData(time, code) {
    const DAY_TIME = time.toLowerCase().includes('pm') ? 'day' : 'night';

    return {
      interpretation: WeatherImage.#WEATHER_INTERPRETATION[code].interpretation,
      imgSrc: WeatherImage.#WEATHER_INTERPRETATION[code].img[DAY_TIME],
    };
  }

  // Gets the correct interpretation of the weather together with the image to display
  static getImageDataFromWeatherCode(date, code) {
    const DATE = new Date(date);
    const DAY_TIME =
      DATE.getHours() >= 6 && DATE.getHours() < 18 ? 'day' : 'night'; // 6 AM and 5 PM

    return {
      interpretation: WeatherImage.#WEATHER_INTERPRETATION[code].interpretation,
      imgSrc: WeatherImage.#WEATHER_INTERPRETATION[code].img[DAY_TIME],
    };
  }
}
