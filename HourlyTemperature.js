import React from 'react';
import './HourlyTemperature.css';

const HourlyTemperature = ({ hourlyData }) => {
  if (!hourlyData) return <div>Loading...</div>;

  return (
    <div className="hourly-container">
      <h2 className="hourly-header">Hourly Temperature</h2>
      <div className="hourly-cards">
        {hourlyData.map((hour, index) => (
          <div className="hourly-card" key={index}>
            <div className="hourly-time">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="hourly-temp">{hour.temp}°F</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyTemperature;
