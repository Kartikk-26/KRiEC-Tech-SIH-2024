//  -------- Firebase inbuilt functions --------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc, addDoc, collection, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// import '/firebase/database';

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
const app = initializeApp(firebaseConfig);
//invokes firebase authentication.
const auth = getAuth(app);
let email;

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const db = firebase.firestore();



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

    document.querySelector("#GOOGLE").addEventListener("click", () => {
        google_auth();
    });
}
if (Page === "registration") {

    // Sign up button
    document.querySelector("#register").addEventListener("click", (e) => {
        Signup();
    });
    //register when you hit the enter key
    document.querySelector("#registration-repass").addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            Signup();
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
        auth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
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
const Signup = () => {
    const email = document.querySelector("#registration-email").value;
    const pass = document.querySelector("#registration-pass").value;
    const repass = document.querySelector("#registration-repass").value;

    if (email.trim() == "") {
        alert("Enter Email");
    } else if (pass.trim().length < 7) {
        alert("Password must be at least 7 characters");
    } else if (pass != repass) {
        alert("Password does not match");
    } else {
        createUserWithEmailAndPassword(auth, email, pass)
            .then(function (userCredential) {
                console.log("Registration successful:", userCredential);
                window.location.href = "./deviceRegistration.html"

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error("Registration error:", errorCode, errorMessage);
                if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
                    signInWithEmailAndPassword(auth, email, pass)
                        .then((userCredential) => {
                            console.log("Login successful:", userCredential);
                            fetch__details();
                            loginStatus = true;
                            alert("Account already exists.");
                            window.location.href = "./index.html";
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.error("Login error:", errorCode, errorMessage);

                            alert(errorMessage);
                            if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
                                alert("Account already exists. Please login with correct password.");
                                location.href = "./login.html";
                            }
                        });
                } else {
                    alert(errorMessage);
                }
            });
    }
};
// ========================== Registration --end ==========================

// ========================== Login ==========================
const login = () => {
    email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim() == "") {
        alert("Enter Password");
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login successful:", userCredential);
                alert(userCredential.user.email + " logged in successfully.");
                fetch__details();
                loginStatus = true;
                window.location.href = "./index.html";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error("Login error:", errorCode, errorMessage);

                alert(errorMessage);
                if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
                    location.href = "./registration.html";
                }
            });
    }
};
// ========================== Login --end ==========================

// ========================== Authentication ==========================
const provider = new GoogleAuthProvider();
const google_auth = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            window.location.href = "./deviceRegistration.html"
            // console.log("email: ", email);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
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
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user); // logging if user is authenticated
        loginStatus = true;  // setting login status to true 
        email = user.email;
        console.log("Email : ", email);
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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
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







// !!IMPORTANT  Fetching details from firebase server and fullfilling requirenments of all pages  !!IMPORTANT
async function fetch__details() {
    const docRef = doc(db, "Email", "MacId", "Area", "CropType");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    // if (user !== null) {
    //     // The user object has basic properties such as display name, email, etc.
    //     const deviceID = user.deviceID;
    //     const area = user.area;
    //     const cropState = user.cropState;
    //     const cropType = user.cropType;
    //     const username = user.username;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getIdToken() instead.
    // const uid = user.uid;
    // console.log("User ID : ", uid);

    // ==== Edit-profile-page Display existing values ====
    // if (Page === "deviceRegistration") {
    //     // Display the data in the form -- Populate Form
    //     document.querySelector("#device-id").value = deviceID;
    //     document.querySelector("#area").value = area;
    //     document.querySelector("#crop-state").value = cropState;
    //     document.querySelector("#crop-type").value = cropType;
    //     document.querySelector("#username").value = username;
    //     checkInput();
    // }
    // ==== Edit-profile-page Display existing values --end ====

    // ==== climate_condition_page ====
    // if (Page === "climateCondition") {
    //     const city = ["Jodhpur", "Rajsamand", "Udaipur"];
    //     let areaValue;
    //     if (area === "Area A") {
    //         areaValue = city[0];
    //     } else if (area === "Area B") {
    //         areaValue = city[1];
    //     } else if (area === "Area C") {
    //         areaValue = city[2];
    //     } else {
    //         console.log("Out of Bound");
    //     }
    //     searchByCityName(areaValue);
    // }
    // ==== climate_condition_page --end ====

    // ==== Crop Type page ====
    // if (Page === "cropType") {
    //     console.log("inside 2");
    //     console.log(cropType);
    //     if (cropType.toLowerCase() === "wheat") {
    //         document.querySelector(".wheat").classList.remove("hide");
    //     } else if (cropType.toLowerCase() === "maize") {
    //         document.querySelector(".maize").classList.remove("hide");
    //     } else {
    //         document.querySelector(".wheat").classList.add("hide");
    //         document.querySelector(".maize").classList.add("hide");
    //     }
    // }
    // ==== Crop Type page --end ====
}
// !!IMPORTANT  --end  !!IMPORTANT


// ========================== Devicde rehistration form ==========================
async function deviceRegistration() {
    try {
        const macId = document.querySelector("#device-id").value;
        const area = document.querySelector("#area").value;
        const cropType = document.querySelector("#crop-type").value;

        if (macId.trim() == "" || cropType.trim() == "") {
            throw new Error("All fields are required");
        }

        const userDocRef = doc(db, "users", email);
        await setDoc(userDocRef, {
            MacId: macId,
            Area: area,
            CropState: CropState,
            CropType: cropType,
        });
    }
    catch (error) {
        alert(error.message);
    }

};
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








