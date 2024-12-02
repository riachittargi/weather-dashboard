import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherDetails.css';
import { useNavigate } from 'react-router-dom';

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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  
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
        <p><span className="weather-highlight">Humidity:</span> {weatherData.current.humidity}</p>
	     <p><span className="weather-highlight">Wind Speed:</span> {weatherData.current.wind_speed} mph</p>
        <p><span className="weather-highlight">Sunrise:</span> {formatTime(weatherData.current.sunrise)}</p>
        <p><span className="weather-highlight">Sunset:</span> {formatTime(weatherData.current.sunset)}</p>
 	 </div>
	 
	  <button
        className="back-button"
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Back to Search
      </button>
    </div>
  );
};

export default WeatherDetails;
