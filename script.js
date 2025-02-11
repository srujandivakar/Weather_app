const apikey = "e4fbaefe500225ab6d909efa9ae88bac";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

function submitFunctionality (event) {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
}

formEl.addEventListener("submit", submitFunctionality);
async function getWeatherData(cityValue) {
    try {
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!respone.ok) {
            console.log("Network Respone was not OK");
        }
        const data = await respone.json();
        console.log(data); 
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error Occured!, Please try again later";
        weatherDataEl.querySelector(".details").innerHTML = "";

    }
}