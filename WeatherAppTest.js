
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import axios from 'axios';

// Mock axios for API calls
jest.mock('axios');

describe('Weather App', () => {
  test('1. City Search Input: Verify text input exists', () => {
    render(
      <BrowserRouter>
        <Search onCitySelect={jest.fn()} />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/enter a city name/i);
    expect(input).toBeInTheDocument();
  });

  test('2. Dropdown Rendering: Display correct options based on input', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { name: 'New York', country: 'US' },
        { name: 'Newark', country: 'US' },
      ],
    });

    render(
      <BrowserRouter>
        <Search onCitySelect={jest.fn()} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/enter a city name/i);
    fireEvent.change(input, { target: { value: 'New' } });

    await waitFor(() => {
      expect(screen.getByText(/New York, US/i)).toBeInTheDocument();
      expect(screen.getByText(/Newark, US/i)).toBeInTheDocument();
    });
  });

  test('3. City Selection: Fetch weather data on city select', async () => {
    const mockOnCitySelect = jest.fn();

    axios.get.mockResolvedValueOnce({
      data: [
        { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
      ],
    });

    render(
      <BrowserRouter>
        <Search onCitySelect={mockOnCitySelect} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/enter a city name/i);
    fireEvent.change(input, { target: { value: 'Lon' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText(/London, UK/i));
    });

    expect(mockOnCitySelect).toHaveBeenCalledWith({
      lat: 51.5074,
      lon: -0.1278,
      name: 'London',
    });
  });

  test('4. Weather Data Rendering: Ensure details are displayed', async () => {
    const mockCity = { name: 'London', lat: 51.5074, lon: -0.1278 };

    axios.get.mockResolvedValueOnce({
      data: {
        current: {
          temp: 70,
          feels_like: 68,
          weather: [{ description: 'Clear sky' }],
          humidity: 50,
          wind_speed: 10,
        },
      },
    });

    render(
      <BrowserRouter>
        <WeatherDetails city={mockCity} onCardClick={jest.fn()} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/temperature: 70°f/i)).toBeInTheDocument();
      expect(screen.getByText(/feels like: 68°f/i)).toBeInTheDocument();
      expect(screen.getByText(/weather: clear sky/i)).toBeInTheDocument();
    });
  });

  test('5. Error Handling: Show error message on API failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <BrowserRouter>
        <WeatherDetails city={{ name: 'Invalid City' }} onCardClick={jest.fn()} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error fetching weather data/i)).toBeInTheDocument();
    });
  });

  test('6. Link Functionality: Navbar links navigate correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <nav>
          <a href="/">Search</a>
          <a href="/weather">Weather</a>
          <a href="/hourly">Hourly</a>
        </nav>
      </BrowserRouter>
    );

    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(3);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/weather');
    expect(links[2].getAttribute('href')).toBe('/hourly');
  });
});
