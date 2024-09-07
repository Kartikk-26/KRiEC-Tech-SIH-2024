var Page = window.location.pathname.split("/").pop().split(".")[0];

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
