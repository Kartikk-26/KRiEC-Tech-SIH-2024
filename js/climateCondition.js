const container = document.querySelector(".container1");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
let temp;
let humi;
let windSp;

function ClimateCondition(city) {
    const APIKey = "92e4e88e94b0469aa0a7c6648d04d088";

    if (city == "") {
        return;
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then((Response) => Response.json())
        .then((json) => {
            if (json.cod == "404") {
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error404.classList.add("active");
                return;
            }

            container.style.height = "555px";
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error404.classList.remove("active");

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(
                ".weather-box .temperature"
            );
            const description = document.querySelector(
                ".weather-box .description"
            );
            const humidity = document.querySelector(
                ".weather-details .humidity span"
            );
            const wind = document.querySelector(".weather-details .wind span");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "image/clear.png";
                    break;

                case "Rain":
                    image.src = "image/rain.png";
                    break;

                case "Snow":
                    image.src = "image/snow.png";
                    break;

                case "Clouds":
                    image.src = "image/cloud.png";
                    break;

                case "Mist":
                    image.src = "image/mist.png";
                    break;

                case "Haze":
                    image.src = "image/mist.png";
                    break;

                default:
                    image.src = "image/cloud.png";
            }
            temp = parseInt(json.main.temp);
            humi = json.main.humidity;
            windSp = parseInt(json.wind.speed);
            console.log("wsp:", windSp);
            temperature.innerHTML = `${temp}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${humi}%`;
            wind.innerHTML = `${windSp}km/h`;
        });
}


// Select the HTML elements for humidity and wind speed
const humidityElement = document.querySelector('#humi');
const windSpeedElement = document.querySelector('#windSpeed');

// Function to update the weather details
function updateMoisture(city) {
    const APIKey = "92e4e88e94b0469aa0a7c6648d04d088";

    if (city == "") {
        return;
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then((Response) => Response.json())
        .then((json) => {
            temp = parseInt(json.main.temp);
            humi = json.main.humidity;
            windSp = parseInt(json.wind.speed);
            humidityElement.innerText = `${humi}%`;
            windSpeedElement.innerText = `${windSp} km/h`;
            console.log("wsp:", windSp); 
        });
}