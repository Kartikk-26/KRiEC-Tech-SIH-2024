var Page = window.location.pathname.split("/").pop().split(".")[0];

// ========================== Input box background toggle ==========================
function checkInput() {
    // registration form
    if (Page === "registration") {
        ["registration-email", "registration-pass", "registration-repass"].forEach(id => {
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
        ["mac-id"].forEach(id => {
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

const nValueInput = document.getElementById("n-value");
const pValueInput = document.getElementById("p-value");
const kValueInput = document.getElementById("k-value");

// Event listeners to handle input changes
nValueInput.addEventListener("input", handleInputChange);
pValueInput.addEventListener("input", handleInputChange);
kValueInput.addEventListener("input", handleInputChange);

function handleInputChange() {
  const nValue = nValueInput.value;
  const pValue = pValueInput.value;
  const kValue = kValueInput.value;

  // Here you can process the values as needed. For example:
  console.log(`N: ${nValue}, P: ${pValue}, K: ${kValue}`);
  
  // If you want to do something with the values, replace the console.log() statement.
}
