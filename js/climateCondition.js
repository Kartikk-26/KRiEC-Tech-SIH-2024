const container = document.querySelector(".container1");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const APIKey = "92e4e88e94b0469aa0a7c6648d04d088";

    const city = "udaipur"

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
                    image.src = "./image/clear.png";
                    break;

                case "Rain":
                    image.src = "./image/rain.png";
                    break;

                case "Snow":
                    image.src = "./image/snow.png";
                    break;

                case "Clouds":
                    image.src = "./image/cloud.png";
                    break;

                case "Mist":
                    image.src = "./image/mist.png";
                    break;

                case "Haze":
                    image.src = "./image/mist.png";
                    break;

                default:
                    image.src = "./image/cloud.png";
            }

            temperature.innerHTML = `${parseInt(
                json.main.temp
            )}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
        });
});
