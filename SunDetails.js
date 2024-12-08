import React from 'react';

const SunDetails = ({ weatherData }) => {
  if (!weatherData) return <div>Loading...</div>;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div>
      <h3>Sun Details</h3>
      <p>Sunrise: {formatTime(weatherData.current.sunrise)}</p>
      <p>Sunset: {formatTime(weatherData.current.sunset)}</p>
    </div>
  );
};

export default SunDetails;
