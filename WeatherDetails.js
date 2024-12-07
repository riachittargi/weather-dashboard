import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherDetails.css';
import { useNavigate } from 'react-router-dom';
import AirDetails from './AirDetails';
import SunDetails from './SunDetails';

const WeatherDetails = ({ city, onCardClick }) => {
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:5000/weather', {
          params: { lat: city.lat, lon: city.lon },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weatherData) return <div className="weather-container">Loading...</div>;

  return (
    <div className="weather-container">
      <h1 className="weather-header">Weather in {city.name}</h1>
      <div
        className="weather-info"
        onClick={() => onCardClick(weatherData.hourly)}
        style={{ cursor: 'pointer' }}
      >
        <p><span className="weather-highlight">Temperature:</span> {weatherData.current.temp}°F</p>
        <p><span className="weather-highlight">Feels Like:</span> {weatherData.current.feels_like}°F</p>
        <p><span className="weather-highlight">Weather:</span> {weatherData.current.weather[0].description}</p>

        {/* Replace with AirDetails */}
        <AirDetails weatherData={weatherData} />

        {/* Replace with SunDetails */}
        <SunDetails weatherData={weatherData} />
      </div>

      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Search
      </button>
    </div>
  );
};

export default WeatherDetails;

