//  -------- Firebase inbuilt functions --------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
            signInFunction();
        }
    });
    // Login button
    document.querySelector("#login").addEventListener("click", () => {
        signInFunction();
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
        googleAuthentication();
    });
}
if (Page === "registration") {

    // Sign up button
    document.querySelector("#register").addEventListener("click", (e) => {
        signUpFunction();
    });
    //register when you hit the enter key
    document.querySelector("#registration-repass").addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            signUpFunction();
        }
    });
}
if (Page === "deviceRegistration") {
    document.querySelector("#device-registration").addEventListener("click", () => {
        deviceRegistration();
    });
    document.querySelector("#device-registration-page").addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            deviceRegistration();
        }
    });
}
// ========================== --end ==========================






// ========================== Navbar EventListners ==========================

// Signout button
let signOutCall = document.querySelectorAll(".logout-button");
for (let i = 0; i < signOutCall.length; i++) {
    signOutCall[i].addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.href = "./index.html";
        }).catch((error) => {
            alert("Error signing out: ", error);
        });
    });
}
// Want to - Sign up button
let signUpCall = document.querySelectorAll(".registration-form-call");
for (let i = 0; i < signUpCall.length; i++) {
    signUpCall[i].addEventListener("click", () => {
        window.location.href = "registration.html";
    });
}
// Want to - sign in button
let signInCall = document.querySelectorAll(".login-form-call");
for (let i = 0; i < signInCall.length; i++) {
    signInCall[i].addEventListener("click", () => {
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
const signUpFunction = () => {
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
const signInFunction = () => {
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
const googleAuthentication = () => {
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
        // console.log("User is signed in:", user); // logging if user is authenticated
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
    const trimmedEmail = email.trim();
    const sanitizedEmail = trimmedEmail.replace(/[^\w\s]/gi, '');
    const docRef = doc(db, "users", sanitizedEmail);
    const espDataRef = doc(db, "users", sanitizedEmail, "espData", "DHT11");


    if (Page === "deviceRegistration") {
        await fetchDeviceRegistrationDetails(docRef);
    } else if (Page === "climateCondition") {
        await fetchClimateConditionDetails(docRef);
    } else if (Page === "soilMoisture") {
        await fetchSoilMoistureDetails(espDataRef);
    }
}
async function fetchDeviceRegistrationDetails(docRef) {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // console.log("Timestamp: ", new Date(docSnap.data().CropStage.Timestamp).toLocaleDateString());
        // Display the data in the form -- Populate Form
        document.querySelector("#mac-id").value = docSnap.data().MacId;
        document.querySelector("#area").value = docSnap.data().Area;
        document.querySelector("#crop-stage").value = docSnap.data().CropStage;
        document.querySelector("#crop-type").value = docSnap.data().CropType;
        checkInput();
    } else {
        console.log("No such document!");
    }
}
async function fetchClimateConditionDetails(docRef) {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        getWeather(docSnap.data().Area);
    } else {
        console.log("No such document!");
    }
}
async function fetchSoilMoistureDetails(espDataRef) {
    const espDataSnap = await getDoc(espDataRef);
    if (espDataSnap.exists()) {
        console.log("espData: ", espDataSnap.data());
        updateSensorValues(
            espDataSnap.data().Moisture,
            Math.floor(espDataSnap.data().Temperature),
            Math.floor(espDataSnap.data().Humidity),
            7
        );
    } else {
        console.log("No such document!");
    }
}
// !!IMPORTANT  --end  !!IMPORTANT


// ========================== Additional User Details ==========================
async function fetchAdditionalUserDetails() {
    const trimmedEmail = email.trim();
    const sanitizedEmail = trimmedEmail.replace(/[^\w\s]/gi, '');
    const docRef = doc(db, "users", sanitizedEmail);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // Display the data in the form -- Populate Form
        document.querySelector("#full-name").value = docSnap.data().FullName;
        document.querySelector("#phone-number").value = docSnap.data().PhoneNumber;
        document.querySelector("#address").value = docSnap.data().Address;
    } else {
        console.log("No such document!");
    }
}

async function saveAdditionalUserDetails() {
    const fullName = document.querySelector("#full-name").value;
    const phoneNumber = document.querySelector("#phone-number").value;
    const address = document.querySelector("#address").value;

    if (fullName.trim() == "" || phoneNumber.trim() == "" || address.trim() == "") {
        alert("All fields are required");
    } else {
        const trimmedEmail = email.trim();
        const sanitizedEmail = trimmedEmail.replace(/[^\w\s]/gi, '');
        const userDocRef = doc(db, "users", sanitizedEmail);

        await updateDoc(userDocRef, {
            FullName: fullName,
            PhoneNumber: phoneNumber,
            Address: address
        }).then(() => {
            console.log("Additional user details successfully saved!");
            alert("Details saved successfully.");
        }).catch((error) => {
            console.error("Error saving additional user details: ", error);
        });
    }
}
// ========================== Additional User Details --end ==========================
// ========================== Devicde rehistration form ==========================
async function deviceRegistration() {
    const macId = document.querySelector("#mac-id").value;
    const area = document.querySelector("#area").value;
    const cropType = document.querySelector("#crop-type").value;
    const cropStage = document.querySelector("#crop-stage").value;

    if (macId.trim() == "") {
        alert("All fields are required");
    } else {
        const trimmedEmail = email.trim();
        const sanitizedEmail = trimmedEmail.replace(/[^\w\s]/gi, '');
        console.log("Sanitized Email: ", sanitizedEmail);
        const userDocRef = doc(db, "users", sanitizedEmail);
        await setDoc(userDocRef, {
            MacId: macId,
            Area: area,
            CropStage: {
                stage: cropStage,
                Timestamp: new Date().getTime()
            },
            CropType: cropType
            // "08-23-2022", manually added date format: MM-DD-YYYY 
        }).then(() => {
            console.log("Document successfully written!");
            alert("Device registered successfully.");
            window.location.href = "./index.html";
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
};
// ========================== Devicde rehistration form --end ==========================