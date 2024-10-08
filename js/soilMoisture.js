function setProgress(element, percent, color) {
    const circle = element.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
    circle.style.stroke = color;
}



function updateSensorValues(moisturePercentage, temperatureValue, humidityPercentage, phValue) {
    // const moisturePercentage = Math.floor(Math.random() * 101);
    // const temperatureValue = Math.floor(Math.random() * 41);
    // const humidityPercentage = Math.floor(Math.random() * 101);
    // const phValue = Math.floor(Math.random() * 15);

    // Moisture
    document.getElementById('moisture-percentage').textContent = `${moisturePercentage}%`;
    // const moistureStatus = document.getElementById('moisture-status');
    if (moisturePercentage < 30) {
        // moistureStatus.textContent = 'Low Moisture';
        setProgress(document.querySelector('.sensor-item:first-child'), moisturePercentage, '#FF4136');
    } else if (moisturePercentage < 70) {
        // moistureStatus.textContent = 'Adequate Moisture';
        setProgress(document.querySelector('.sensor-item:first-child'), moisturePercentage, '#FFDC00');
    } else {
        // moistureStatus.textContent = 'Optimal Moisture';
        setProgress(document.querySelector('.sensor-item:first-child'), moisturePercentage, '#2ECC40');
    }

    // Temperature
    document.getElementById('temperature-value').textContent = `${temperatureValue}°C`;
    // const temperatureStatus = document.getElementById('temperature-status');
    if (temperatureValue < 15) {
        // temperatureStatus.textContent = 'Low Temperature';
        setProgress(document.querySelector('.sensor-item:nth-child(2)'), (temperatureValue / 40) * 100, '#FF4136');
    } else if (temperatureValue < 30) {
        // temperatureStatus.textContent = 'Optimal Temperature';
        setProgress(document.querySelector('.sensor-item:nth-child(2)'), (temperatureValue / 40) * 100, '#2ECC40');
    } else {
        // temperatureStatus.textContent = 'High Temperature';
        setProgress(document.querySelector('.sensor-item:nth-child(2)'), (temperatureValue / 40) * 100, '#FF4136');
    }

    // Humidity
    document.getElementById('humidity-percentage').textContent = `${humidityPercentage}%`;
    // const humidityStatus = document.getElementById('humidity-status');
    if (humidityPercentage < 30) {
        // humidityStatus.textContent = 'Low Humidity';
        setProgress(document.querySelector('.sensor-item:nth-child(3)'), humidityPercentage, '#FF4136');
    } else if (humidityPercentage < 70) {
        // humidityStatus.textContent = 'Adequate Humidity';
        setProgress(document.querySelector('.sensor-item:nth-child(3)'), humidityPercentage, '#FFDC00');
    } else {
        // humidityStatus.textContent = 'Optimal Humidity';
        setProgress(document.querySelector('.sensor-item:nth-child(3)'), humidityPercentage, '#2ECC40');
    }

    // pH
    document.getElementById('ph-value').textContent = `${phValue}`;
    // const phStatus = document.getElementById('ph-status');
    if (phValue < 4) {
        // phStatus.textContent = 'Acidic';
        setProgress(document.querySelector('.sensor-item:last-child'), (phValue / 14) * 100, '#FF4136');
    } else if (phValue < 8) {
        // phStatus.textContent = 'Neutral';
        setProgress(document.querySelector('.sensor-item:last-child'), (phValue / 14) * 100, '#FFDC00');
    } else {
        // phStatus.textContent = 'Alkaline';
        setProgress(document.querySelector('.sensor-item:last-child'), (phValue / 14) * 100, '#2ECC40');
    }
}

// Update sensor values every 3 seconds
// setInterval(updateSensorValues, 3000);

// Initial update
// updateSensorValues();






function toggleSwitches() {
    // Get the first toggle switch and its label
    const toggle1 = document.getElementById('toggle1');
    const switch1Label = document.getElementById('switch1-label');

    // Get the second switch and timers section
    const controlsSection = document.getElementById('controls-section');

    // If the first switch is OFF (unchecked), show the second switch and timers
    if (!toggle1.checked) {
        controlsSection.style.display = 'block';
        switch1Label.innerHTML = 'Manual';
    } else {
        controlsSection.style.display = 'none';
        switch1Label.innerHTML = 'Auto';
    }

    // Reset the second switch and its label
    document.getElementById('toggle2').checked = false;
    document.getElementById('switch2-label').innerHTML = 'Off';
    // Reset timers
    document.getElementById('timer1').value = '';
    document.getElementById('timer2').value = '';
}

function updateLabel(switchNumber) {
    const toggle = document.getElementById('toggle' + switchNumber);
    const label = document.getElementById('switch' + switchNumber + '-label');

    // Update the label based on the switch state
    if (toggle.checked) {
        label.innerHTML = 'On';
    } else {
        label.innerHTML = 'Off';
    }
}

// Initialize the switch labels visibility
window.onload = function () {
    toggleSwitches();
};