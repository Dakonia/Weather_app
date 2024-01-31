import * as React from 'react';

function Weather({ latitude, longitude }) {
    const [currentWeather, setCurrentWeather] = React.useState(null);
    const [dailyForecast, setDailyForecast] = React.useState([]);

    React.useEffect(() => {
        if (latitude && longitude) {
            const apiKey = '2506d981a9aa8390031808d805c827b7';

            const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

            fetch(currentWeatherApiUrl)
                .then(response => response.json())
                .then(data => {

                    setCurrentWeather(data);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных о текущей погоде:', error);
                });

            const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

            fetch(forecastApiUrl)
                .then(response => response.json())
                .then(data => {
                    const filteredForecast = data.list.filter((forecast, index) => index % 8 === 0 && index < 40);
                    setDailyForecast(filteredForecast);
                })
                .catch(error => {
                    // Обработка ошибок
                    console.error('Ошибка при получении прогноза погоды на пять дней:', error);
                });
        }
    }, [latitude, longitude]);

    return (
        <div>
            <h2>Текущая погода</h2>
            {currentWeather && (
                <div>
                    <p>Температура: {currentWeather.main.temp} °C</p>
                    <p>Описание: {currentWeather.weather[0].description}</p>
                </div>
            )}


            <h2>Прогноз на пять дней</h2>
            <ul>
                {dailyForecast.map((forecast, index) => (
                    <li key={index}>
                        <p>Дата: {new Date(forecast.dt_txt).toLocaleDateString()}</p>
                        <p>Температура: {forecast.main.temp} °C</p>
                        <p>Описание: {forecast.weather[0].description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Weather;
