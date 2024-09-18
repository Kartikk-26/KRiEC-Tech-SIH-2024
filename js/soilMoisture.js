function updateProgressBar(id, value) {
    const circle = document.querySelector(`#${id} .progress`);
    if (!circle) {
        console.error(`Element with id ${id} and class 'progress' not found.`);
        return;
    }
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const valueElement = document.getElementById(`${id}-value`);
    if (!valueElement) {
        console.error(`Element with id ${id}-value not found.`);
        return;
    }
    valueElement.textContent = `${value}%`;
}


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
