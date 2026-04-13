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

function displayForecast(response) {
    let forecastElement = document.querySelector("#weather-app-forecast")
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let forecastHtml = "";
    for (let i = 0; i < 5; i++) {
        const time = response.data.daily[i].time
        const date = new Date(time * 1000)
        forecastHtml += `
        <div class="weather-app-forecast-section">
            <div class="forecast-day">${weekdays[date.getDay()]}</div>
                <div class="forecast-icon"><img src="${response.data.daily[i].condition.icon_url}" /></div>
                    <div class="forecast-temperatures">
                        <div class="forecast-upper-temperature">${Math.round(response.data.daily[i].temperature.maximum)}°</div>
                        <div class="forecast-lower-temperature">${Math.round(response.data.daily[i].temperature.minimum)}°</div>
                    </div>
        </div>
    `;
    };
    forecastElement.innerHTML = forecastHtml;
}


function getForecastApi(cityName) {
    const apiKey = '4odc57b3f13ee7a2357a1tf4e037b8ad'
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}

getForecastApi('paris')
// displayForecast();
