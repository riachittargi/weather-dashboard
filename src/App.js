import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import HourlyTemperature from './components/HourlyTemperature';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate('/weather');
  };

  const handleCardClick = (hourly) => {
    setHourlyData(hourly);
    navigate('/hourly');
  };

  return (
    <Routes>
      <Route path="/" element={<Search onCitySelect={handleCitySelect} />} />
      <Route
        path="/weather"
        element={<WeatherDetails city={selectedCity} onCardClick={handleCardClick} />}
      />
      <Route path="/hourly" element={<HourlyTemperature hourlyData={hourlyData} />} />
    </Routes>
  );
}

export default App;
