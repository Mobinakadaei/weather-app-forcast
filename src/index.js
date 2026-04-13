function updateHtmlValuesBasedOnApi(response) {
    if (response.data.message === "City not found") {
        return alert("Please enter a valid city name")
    }
    const temperatureValue = document.querySelector("#weather-app-temperature");
    temperatureValue.innerHTML = Math.round(response.data.temperature.current);
    const cityName = document.querySelector("#weather-app-city")
    cityName.innerHTML = response.data.city;
    const humidity = document.querySelector("#humidity")
    humidity.innerHTML = `${response.data.temperature.humidity}%`
    const windSpeed = document.querySelector("#wind")
    windSpeed.innerHTML = `${response.data.wind.speed}km/h`
    const cloudsStatus = document.querySelector("#clouds")
    cloudsStatus.innerHTML = response.data.condition.description
    const weatherIcon = document.querySelector("#weather-app-icon")
    weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" />`
}

function searchCity(cityName) {
    const apiKey = "4odc57b3f13ee7a2357a1tf4e037b8ad"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(updateHtmlValuesBasedOnApi)
}

function submitFunction(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-form-input").value;
    searchCity(cityInput)
}

function dateAndHour() {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = new Date()
    let currentDay = weekDays[date.getDay()]
    let currentHour = date.getHours()
    if (currentHour < 10) {
        currentHour = `0${currentHour}`
    }
    let currentMinute = date.getMinutes()
    if (currentMinute < 10) {
        currentMinute = `0${currentMinute}`
    }
    return `${currentDay} ${currentHour}:${currentMinute}`
}

let timeElement = document.querySelector("#time")
timeElement.innerHTML = dateAndHour()
let searchForm = document.querySelector("form.search-form")
document.addEventListener("submit", submitFunction)

function displayForecast() {
    let forecastElement = document.querySelector("#weather-app-forecast")
    let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml += `
            <div class="weather-app-forecast-section">
                <div class="forecast-day">${day}</div>
                    <div class="forecast-icon">❄️</div>
                        <div class="forecast-temperatures">
                            <div class="forecast-upper-temperature">20°</div>
                            <div class="forecast-lower-temperature">12°</div>
                        </div>
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHtml;
}

displayForecast();
