const apiKey = 'a4e9d6416a0b31eb2da14bd7549fb619'; // Replace with your actual API key
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        document.getElementById('get-weather').addEventListener('click', getWeather);

        function getWeather() {
            const locationInput = document.getElementById('location').value;
            const url = `${apiUrl}?q=${locationInput}&appid=${apiKey}&units=imperial`;

            console.log(`Fetching weather for: ${locationInput}`);
            console.log(`API URL: ${url}`);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data:', data);
                    displayWeather(data);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }

        function displayWeather(data) {
            const locationName = data.name;
            const weatherCondition = data.weather[0].description;
            const temperatureF = data.main.temp;
            const temperatureC = ((temperatureF - 32) * 5 / 9).toFixed(2);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const date = new Date(data.dt * 1000);

            document.getElementById('location-name').textContent = locationName;
            document.getElementById('date').textContent = `Date: ${date.toLocaleDateString()}`;
            document.getElementById('time').textContent = `Time: ${date.toLocaleTimeString()}`;
            document.getElementById('weather-condition').textContent = weatherCondition;
            document.getElementById('temperature-f').textContent = `Temperature: ${temperatureF}°F`;
            document.getElementById('temperature-c').textContent = `Temperature: ${temperatureC}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} mph`;
        }

        // Get user's location using geolocation API
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

            console.log(`Fetching weather for coordinates: ${latitude}, ${longitude}`);
            console.log(`API URL: ${url}`);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data:', data);
                    displayWeather(data);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });