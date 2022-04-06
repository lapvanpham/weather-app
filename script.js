const API_KEY = 'fa83a95719bb2cabaccc5ab2d7e49c3d';
const weatherDetailsEl = document.getElementById('weather-details');

navigator.geolocation.getCurrentPosition((position) => {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
	)
		.then((res) => {
			if (!res.ok) {
				throw Error('Weather data not available');
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
			const weather = data.weather[0].main;
			const temp = farenheitToCelsius(data.main.temp);
			const city = data.name;
			const country = data.sys.country;
			const icon = data.weather[0].icon;

			weatherDetailsEl.innerHTML = `
                <div class="weather-icon">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
                </div>
                <div class="weather-main">
                    <h1>${weather}</h1>
                </div>
                <div class="weather-info">
                    <div class="weather-info-temp">${temp}&deg;C</div>
                    <div class="weather-info-location">${city}, ${country}</div>
                </div>

                `;
		});
});

function farenheitToCelsius(temp) {
	return (temp - 32) * (5 / 9);
}
