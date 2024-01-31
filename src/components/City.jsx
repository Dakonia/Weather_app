import * as React from 'react';


const city = [
    { name: 'Москва', latitude: 55.7, longitude: 37.6 },
  ];
  
  function City({ onCitySelect }) {
    const [selectedCity, setSelectedCity] = React.useState('');
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
  
    const handleCityChange = (e) => {
      setSelectedCity(e.target.value);
      const selectedCityData = city.find((city) => city.name === e.target.value);
      if (selectedCityData) {
        setLatitude(selectedCityData.latitude);
        setLongitude(selectedCityData.longitude);
        onCitySelect(selectedCityData.latitude, selectedCityData.longitude);
      }
    };
  
    return (
      <div>
        <label htmlFor="citySelect">Выберите город:</label>
        <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
          <option value="">Выбрать город</option>
          {city.map((city) => (
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