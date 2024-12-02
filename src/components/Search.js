import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (input) => {
    if (!input.trim()) return;

    try {
      const response = await axios.get('http://localhost:5000/cities', {
        params: { city: input },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchCities(e.target.value);
  };

  const handleCitySelect = (city) => {
    onCitySelect({ lat: city.lat, lon: city.lon, name: city.name }); // Pass lat, lon, and city name
    setQuery(city.name);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <h1 className="search-header">Search for Weather</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Enter a city name"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="search-dropdown">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleCitySelect(city)}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
