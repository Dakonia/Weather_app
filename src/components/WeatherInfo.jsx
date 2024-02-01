// WeatherInfo.jsx
import React, { useEffect, useState } from 'react';
import '../styles/weather.css'; // Подключаем стили для компонента

function Weather({ latitude, longitude }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    if (latitude && longitude) {
      const apiKey = '2506d981a9aa8390031808d805c827b7';

      const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

      fetch(currentWeatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeather(data);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о текущей погоде:', error);
        });

      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

      fetch(forecastApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const filteredForecast = data.list.filter((forecast, index) => index % 8 === 0 && index < 40);
          setDailyForecast(filteredForecast);
        })
        .catch((error) => {
          console.error('Ошибка при получении прогноза погоды на пять дней:', error);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="weather-container">
      <div className="current-weather">
        <h2>Текущая погода</h2>
        {currentWeather && (
          <div>
            <p>Температура: {currentWeather.main.temp} °C</p>
            <p>Описание: {currentWeather.weather[0].description}</p>
          </div>
        )}
      </div>

      <div className="forecast">
        <h2>Прогноз на пять дней</h2>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Температура (°C)</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {dailyForecast.map((forecast, index) => (
              <tr key={index}>
                <td>{new Date(forecast.dt_txt).toLocaleDateString()}</td>
                <td>{forecast.main.temp}</td>
                <td>{forecast.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Weather;
