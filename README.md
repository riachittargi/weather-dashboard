# weather-dashboard

# Project Overview
The Weather Dashboard is a web application that allows users to search for cities and view real-time weather details. The application fetches data from the OpenWeather API and provides key weather information, including hourly forecasts.
# Features
Search for Cities: Type in a city name and select from autocomplete suggestions.
Weather Details: View current temperature, "feels like" temperature, humidity, wind speed, and weather descriptions.
Hourly Forecasts: See hourly temperature data for the selected city.
Responsive Design: Works on both desktop and mobile devices.
Error Handling: Manages API failures and invalid user input gracefully.
# Technologies Used
Frontend: React.js
Backend: Node.js and Express.js (Proxy Server)
APIs: OpenWeather Geo API and One Call API
Styling: CSS
Testing: Jest
# How to Set Up
1. Node.js installed on your machine.
2. A valid API key from OpenWeather.
3. Clone the repository (git clone https://github.com/your-username/weather-dashboard.git)
4. Navigate to the project directory (cd weather-dashboard)
5. Install dependencies
Frontend (cd frontend...npm install)
Proxy Server (cd ../proxy-server..npm install)
6. Add your OpenWeather API key to the .env file in the proxy-server directory (OPENWEATHER_API_KEY=your_api_key_here)
7. Start the development servers
   Frontend (npm start)
   Proxy (node server.js)
9. Open the application in your browser
