//  -------- Firebase inbuilt functions --------

// import '/firebase/database';\
// test 7

// Firebase Authenticator
const firebaseConfig = {
    apiKey: "AIzaSyBj94MToUIYOeYleMbqFdiuF4T90qBZE14",
    authDomain: "proje-70985.firebaseapp.com",
    databaseURL: "https://proje-70985-default-rtdb.firebaseio.com/",
    projectId: "proje-70985",
    storageBucket: "proje-70985.appspot.com",
    messagingSenderId: "253127593714",
    appId: "1:253127593714:web:c0dc1eb115fb8cb4064a6b"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//invokes firebase authentication.
const auth = firebase.auth();
// Initialize Firestore
const db = firebase.firestore();

// User loginstatus
var loginStatus = false;
// Page Status
var Page = window.location.pathname.split("/").pop().split(".")[0];
console.log("Page : ", Page);


// ========================== These are use to avoid NULL error in console ==========================
if (Page === "login") {

    //sign in when you hit enter
    document.querySelector("#login-password").addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            login();
        }
    });
    // Login button
    document.querySelector("#login").addEventListener("click", () => {
        login();
    });
    // Forgot Password link
    document.querySelector("#forgot-password").addEventListener("click", () => {
        const email = document.querySelector("#login-email").value;
        if (email.trim() == "") {
            alert("Enter Email");
        } else {
            forgotPassword(email);
        }
    });
}
if (Page === "registration") {

    // Sign up button
    document.querySelector("#register").addEventListener("keyup", (e) => {
        register();
    });
    //register when you hit the enter key
    document.querySelector("#registration-password").addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            register();
        }
    });
}
if (Page === "deviceRegistration") {
    document.querySelector("#device-registration").addEventListener("click", () => {
        deviceRegistration();
    });
    document.addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            deviceRegistration();
        }
    });
}
if (Page === "soilMoisture") {
    // Soil_moisture_page

    // Function to get and display the values
    var database = firebase.database();

    var dataRef = database.ref('sensorValue'); // Replace with your 'sensorValue' path

    var chartData = [];
    var timeLabels = [];

    var ctx = document.getElementById('realTimeChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Sensor Value',
                data: chartData,
                fill: true,

                borderColor: '#ADFF2F',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    dataRef.on('value', function (snapshot) {
        var sensorValue = snapshot.val();

        document.getElementById('tempValue').innerHTML = sensorValue + " &#8451;";
        document.getElementById('humiValue').innerHTML = sensorValue + "%";

        chartData.push(sensorValue); // Push sensor value data
        timeLabels.push(new Date().toLocaleTimeString()); // Push timestamp

        // Limit the number of data points shown
        const maxDataPoints = 10;
        if (chartData.length > maxDataPoints) {
            chartData.shift();
            timeLabels.shift();
        }

        myChart.update(); // Update the chart
    });

}
if (Page === "timePeriod") {
    // Call the function to display data and create the chart when the page loads
    window.onload = function () {
        displayDataAndCreateChart();
    };
}
// ========================== --end ==========================






// ========================== Navbar EventListners ==========================

// Signout button
let logout = document.querySelectorAll(".logout-button");
for (let i = 0; i < logout.length; i++) {
    logout[i].addEventListener("click", () => {
        signOut();
    });
}
// Want to - Sign up button
let regCall = document.querySelectorAll(".registration-form-call");
for (let i = 0; i < regCall.length; i++) {
    regCall[i].addEventListener("click", () => {
        window.location.href = "registration.html";
    });
}
// Want to - sign in button
let loginCall = document.querySelectorAll(".login-form-call");
for (let i = 0; i < loginCall.length; i++) {
    loginCall[i].addEventListener("click", () => {
        window.location.href = "login.html";
    });
}
// home page call button
let homeCall = document.querySelectorAll(".home-page-call");
for (let i = 0; i < homeCall.length; i++) {
    homeCall[i].addEventListener("click", () => {
        window.location.href = "./index.html";
    });

}


// ========================== Navbar EventListners --end ==========================





// ========================== Registration ==========================
const register = () => {
    const email = document.querySelector("#registration-email").value;
    const reemail = document.querySelector("#registration-reemail").value;
    const password = document.querySelector("#registration-password").value;

    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters");
    } else if (email != reemail) {
        alert("emails do not match");
    } else {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                console.log("Registration successful:", userCredential);
                window.location.href = "./deviceRegistration.html"

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error("Registration error:", errorCode, errorMessage);
                alert(errorMessage);
            });
    }
};
// ========================== Registration --end ==========================

// ========================== Login ==========================
const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim() == "") {
        alert("Enter Password");
    } else {
        authenticate(email, password);
    }
};
// ========================== Login --end ==========================

// ========================== Signout ==========================
const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(function () {
            location.href = "./login.html";
        })
        .catch(function (error) {
            alert("error signing out, check network connection");
        });
};
// ========================== Signout --end ==========================

// ========================== Authentication ==========================
const authenticate = (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            console.log("Login successful:", userCredential);
            fetch__details();
            loginStatus = true;
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage);
            alert(errorMessage);
            if (errorMessage === "Firebase: Error (auth/invalid-login-credentials).") {
                location.href = "./registration.html";
            }
        });
};
// ========================== Authentication --end ==========================

// ========================== Forgot Password -- send reset_pass-email ==========================
const forgotPassword = (email) => {
    auth
        .sendPasswordResetEmail(email)
        .then(function () {
            alert("email sent");
        })
        .catch(function (error) {
            alert("invalid email or bad network connection");
        });
};
// ========================== Forgot Password -- send reset_pass-email --end ==========================

// ========================== successfull - Login ==========================
auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        console.log("User is signed in:", firebaseUser); // logging if user is authenticated
        loginStatus = true;  // setting login status to true 
        fetch__details();

        // allowing to go through different pages only if user is authenticated
        // Loop through the buttons and add event listeners
        let buttonClasses = {
            ".edit-device-details-call": "deviceRegistration.html",
            ".soil-moisture-call": "soilMoisture.html",
            ".climate-condition-call": "climateCondition.html",
            ".water-use-call": "waterUse.html",
            ".crop-stge-call": "cropStage.html",
            ".time-period-call": "timePeriod.html",
            ".crop-type-call": "cropType.html",
            ".about-us-call": "aboutUs.html",
        };
        Object.entries(buttonClasses).forEach(([buttonClass, page]) => {
            let buttons = document.querySelectorAll(buttonClass);
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    window.location.href = page;
                });
            });
        });
    }
    else {
        console.log("User is not signed in.");  // logging if user is not authenticated
        loginStatus = false;


        // setting every button href to login page if user is not authenticated
        let buttonClasses = [
            ".edit-device-details-call",
            ".soil-moisture-call",
            ".climate-condition-call",
            ".water-use-call",
            ".crop-stge-call",
            ".time-period-call",
            ".crop-type-call",
            ".about-us-call"
        ];
        buttonClasses.forEach((buttonClass) => {
            let buttons = document.querySelectorAll(buttonClass);
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    alert("Please login to continue.");
                    window.location.href = "./login.html";

                });
            })
        });
    }
    toggleLoginLogout();
});
// ========================== successfull - Login --end ==========================



//  ========================== Firebase inbuilt functions --end ==========================









// ========================== Toggle login/logout button ==========================
function toggleLoginLogout() {
    if (loginStatus) {
        let hide = document.querySelectorAll(".login-form-call, .registration-form-call");
        for (let i = 0; i < hide.length; i++) {
            hide[i].classList.add("hide");
        }
        let unhide = document.querySelectorAll(".logout-button");
        for (let i = 0; i < unhide.length; i++) {
            unhide[i].classList.remove("hide");
        }
    }
    else {
        let hide = document.querySelectorAll(".logout-button");
        for (let i = 0; i < hide.length; i++) {
            hide[i].classList.add("hide");
        }
        let unhide = document.querySelectorAll(".login-form-call, .registration-form-call");
        for (let i = 0; i < unhide.length; i++) {
            unhide[i].classList.remove("hide");
        }
    }
}
// ========================== Toggle login/logout button --end ==========================

// ========================== Input box background toggle ==========================
function checkInput() {
    // registration form
    if (Page === "registration") {
        ["registration-email", "registration-reemail", "registration-password"].forEach(id => {
            const editElement = document.getElementById(`${id}`);
            if (editElement.value !== "") {
                editElement.classList.add("input-active");
            }
            else {
                editElement.classList.remove("input-active");
            }
        });
    }
    // login form
    else if (Page === "login") {
        ["login-email", "login-password"].forEach(id => {
            const editElement = document.getElementById(`${id}`);
            if (editElement.value !== "") {
                editElement.classList.add("input-active");
            }
            else {
                editElement.classList.remove("input-active");
            }
        });
    }
    // device registration form
    else if (Page === "deviceRegistration") {
        ["device-id", "crop-state", "crop-type", "username"].forEach(id => {
            const editElement = document.getElementById(`${id}`);
            if (editElement.value !== "") {
                editElement.classList.add("input-active");
            }
            else {
                editElement.classList.remove("input-active");
            }
        });
    }
    // Edit profile form
    else if (Page === "editDevice") {
        ["device-id-edit", "crop-state-edit", "crop-type-edit", "username-edit"].forEach(id => {
            const editElement = document.getElementById(`${id}`);
            if (editElement.value !== "") {
                editElement.classList.add("input-active");
            }
            else {
                editElement.classList.remove("input-active");
            }
        });
    }
}
// ========================== Input box background toggle --end ==========================



// !!IMPORTANT  Fetching details from firebase server and fullfilling requirenments of all pages  !!IMPORTANT
function fetch__details() {
    const user = firebase.auth().currentUser;
    console.log("inside1");

    if (user) {
        // User is signed in, get a reference to the user's document in Firestore
        const userDocRef = db.collection("users").doc(user.uid);

        // Get the user's document
        userDocRef.get().then((doc) => {
            if (doc.exists) {
                // The document exists, you can read its data
                const data = doc.data();

                var deviceID = data.deviceID || '';
                var area = data.area || '';
                var cropState = data.cropState || '';
                var cropType = data.cropType || '';
                var username = data.username || '';

                // ==== Edit-profile-page Display existing values ====
                if (Page === "deviceRegistration") {
                    // Display the data in the form -- Populate Form
                    document.querySelector("#device-id").value = deviceID;
                    document.querySelector("#area").value = area;
                    document.querySelector("#crop-state").value = cropState;
                    document.querySelector("#crop-type").value = cropType;
                    document.querySelector("#username").value = username;
                    checkInput();
                }
                // ==== Edit-profile-page Display existing values --end ====

                // ==== climate_condition_page ====
                if (Page === "climateCondition") {
                    const city = ["Jodhpur", "Rajsamand", "Udaipur"];
                    let areaValue;
                    if (area === "Area A") {
                        areaValue = city[0];
                    } else if (area === "Area B") {
                        areaValue = city[1];
                    } else if (area === "Area C") {
                        areaValue = city[2];
                    } else {
                        console.log("Out of Bound");
                    }
                    searchByCityName(areaValue);
                }
                // ==== climate_condition_page --end ====

                // ==== Crop Type page ====
                if (Page === "cropType") {
                    console.log("inside 2");
                    console.log(cropType);
                    if (cropType.toLowerCase() === "wheat") {
                        document.querySelector(".wheat").classList.remove("hide");
                    } else if (cropType.toLowerCase() === "maize") {
                        document.querySelector(".maize").classList.remove("hide");
                    } else {
                        document.querySelector(".wheat").classList.add("hide");
                        document.querySelector(".maize").classList.add("hide");
                    }
                }
                // ==== Crop Type page --end ====

            } else {
                // The document does not exist
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
        // No user is signed in.
        console.log("User not authenticated. Please sign in.");
    }
}
// !!IMPORTANT  --end  !!IMPORTANT


// ========================== Devicde rehistration form ==========================
function deviceRegistration() {
    try {
        const deviceID = document.querySelector("#device-id").value;
        const area = document.querySelector("#area").value;
        const cropState = document.querySelector("#crop-state").value;
        const cropType = document.querySelector("#crop-type").value;
        const username = document.querySelector("#username").value;

        if (deviceID.trim() == "" || cropState.trim() == "" || cropType.trim() == "" || username.trim() == "") {
            throw new Error("All fields are required");
        }

        const user = firebase.auth().currentUser;

        if (!user) {
            throw new Error("User not authenticated. Please sign in.");
        }

        const userDocRef = db.collection("users").doc(user.uid);

        userDocRef.set({
            deviceID: deviceID,
            area: area,
            cropState: cropState,
            cropType: cropType,
            username: username,
        }, { merge: true }).then(() => {
            alert("Device registered successfully!");
            location.href = "./index.html";
        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert("An error occurred while registering the device.");
        });
    }
    catch (error) {
        alert(error.message);
    }

}
// ========================== Devicde rehistration form --end ==========================



// ========================== Time_Period_page ==========================
// Function to display data from Firestore and create a chart
async function displayDataAndCreateChart() {
    const dataContainer = document.getElementById('dataContainer');
    const ctx = document.getElementById('soil-moisture-data-chart').getContext('2d');
    const data = []; // Array to store data for the chart
    const labels = []; // Array to store labels for the chart

    try {
        const querySnapshot = await db.collection("EspData").get();

        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            // Assuming your data contains values and timestamps
            data.push(docData.Humidity); // Replace 'value' with your actual field name
            labels.push(docData.Temperature); // Replace 'timestamp' with your actual field name

            // Display Firestore data in the container (similar to your previous code)
            // ...
        });

        // Create the chart using Chart.js
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Data from Firestore',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

const soilDataRangeInput = document.getElementById('soilDataRange');
// const calendar = new Pikaday({ field: soilDataRangeInput });
// ========================== Time_Period_page --end ==========================








