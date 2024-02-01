// City.jsx
import React, { useState } from 'react';
import '../styles/city.css'; // Подключаем стили для компонента

const cities = [
  { name: 'Москва', latitude: 55.7, longitude: 37.6 },
  { name: 'Санкт-Петербург', latitude: 59.9, longitude: 30.3 },
  { name: 'Ташкент', latitude: 41.3, longitude: 69.3 },
  { name: 'Берлин', latitude: 52.5, longitude: 13.4 },
  { name: 'Лондон', latitude: 51.5, longitude: -0.1 },
  { name: 'Париж', latitude: 48.9, longitude: 2.4 },
  { name: 'Лос-Анджелес', latitude: 34.1, longitude: -118.2 },
  { name: 'Омск', latitude: 54.98, longitude: 73.38 },
];

function City({ onCitySelect }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    const selectedCityData = cities.find((city) => city.name === e.target.value);
    if (selectedCityData) {
      setLatitude(selectedCityData.latitude);
      setLongitude(selectedCityData.longitude);
      onCitySelect(selectedCityData.latitude, selectedCityData.longitude);
    }
  };

  return (
    <div className="city-container">
      <label htmlFor="citySelect">Выберите город:</label>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        <option value="">Выбрать город</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <p>Выбранные координаты: {latitude}, {longitude}</p>
    </div>
  );
}

export default City;
