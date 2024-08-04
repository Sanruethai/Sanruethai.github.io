document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = '55f52a3b5a30d65c7a909e92edf7d416';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('temperature').textContent = `${data.main.temp} °C`;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('windSpeedval').textContent = `${data.wind.speed} m/s`;
                document.getElementById('humidityVal').textContent = `${data.main.humidity} %`;
                document.getElementById('feelsVal').textContent = `${data.main.feels_like} °C`;

                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weatherIcon').src = iconUrl;

                const currentDate = new Date();
                document.getElementById('date').textContent = currentDate.toLocaleDateString();
                document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            alert('Error fetching weather data');
            console.error('Error:', error);
        });
});