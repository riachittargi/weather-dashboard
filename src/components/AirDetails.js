import React from 'react';

const AirDetails = ({ weatherData }) => {
  if (!weatherData) return <div>Loading...</div>;

  return (
    <div>
      <h3>Air Details</h3>
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind Speed: {weatherData.current.wind_speed} mph</p>
    </div>
  );
};

export default AirDetails;
