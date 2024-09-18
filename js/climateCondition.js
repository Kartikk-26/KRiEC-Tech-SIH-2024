// const container = document.querySelector(".container1");
// const weatherBox = document.querySelector(".weather-box");
// const weatherDetails = document.querySelector(".weather-details");
// const error404 = document.querySelector(".not-found");

var rainfall;
var forecastRain;
var city;
// function getWeather(cityName) {
//     city = cityName;
// }


function getWeather(cityName) {
    var APIKey = "402fe03746dde66fe92a09674269957b";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        var d = new Date();
        var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        $(".date").text(strDate);
        $(".wind").text("Wind Speed: " + response.wind.speed + " m/s");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");

        // Checking if 'rain' data exists and showing accordingly in one line
        rainfall = response.rain && response.rain['1h'] ? response.rain['1h'] : 0;
        console.log(rainfall);
        $(".rainfall").text("Rainfall: " + rainfall + " mm"); // Rainfall in mm

        // Display temperature in Celsius with °C in one line
        var tempC = (response.main.temp - 273.15).toFixed(2);
        $(".tempC").text("Temperature: " + tempC + "°C");
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 5; i++) {
            var d = new Date();
            d.setDate(d.getDate() + i + 1);
            var strDate = (d.getMonth() + 1) + "/" + d.getDate();
            $(".uPdate" + i).text(strDate);

            var iconcode = response.list[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#wicon' + i).attr('src', iconurl);

            var tempForC = (response.list[i].main.temp - 273.15).toFixed(2);
            $(".card-text" + i).text("Temp: " + tempForC + "°C"); // Temperature in Celsius with °C

            $('.card-hum' + i).text('Humidity: ' + response.list[i].main.humidity + "%");

            // Checking if 'rain' data exists for forecast and showing accordingly in one line
            forecastRain = response.list[i].rain && response.list[i].rain['3h'] ? response.list[i].rain['3h'] : 0;
            $('.card-rain' + i).text('Rainfall: ' + forecastRain + " mm"); // Rainfall in mm
        }
    });
};

function updateProgressBar(id, value) {
    const circle = document.querySelector(`#${id} .progress`);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    document.getElementById(`${id}-value`).textContent = `${value}%`;
}

// Example function to fetch data from the backend
function fetchData() {
    // Replace with your backend endpoint
    fetch('https://example.com/api/progress')
        .then(response => response.json())
        .then(data => {
            updateProgressBar('temperature', data.temperature);
            updateProgressBar('moisture', data.moisture);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update progress bars on page load
window.onload = fetchData;

// Set an interval to update data periodically
setInterval(fetchData, 5000); // Update every 5 seconds
