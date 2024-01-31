import * as React from 'react';


import City from './City';
import Weather from './WeatherInfo';



function Main () {

    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);

    const handleCitySelect = (selectedLatitude, selectedLongitude) => {
    setLatitude(selectedLatitude);
    setLongitude(selectedLongitude);
    };

    return (
        <main >
            <City onCitySelect={handleCitySelect}/>
            <Weather latitude={latitude} longitude={longitude}/>
        </main>
    )
};


export default Main;