
function showError(inputId, message){
    document.getElementById("error-" + inputId).innerText = message;
}

function clearError(inputId){
    document.getElementById("error-" + inputId).innerText = "";
}

function checkPassword(form){
    let password = document.getElementById("password").value;
    let hasError = false;
    const errorMessages = [];

    if (password.length < 8){
        errorMessages.push("Must be at least eight (8) characters. \n");
        hasError = true;
    }

    if (!/[a-z]/.test(password)){
        errorMessages.push("Must contain a lowercase letter.\n");
        hasError = true;
    }

    if (!/[A-Z]/.test(password)){
        errorMessages.push("Must contain at least one (1) uppercase letter.\n");
        hasError = true;
    }

    if (!/[0-9]/.test(password)){
        errorMessages.push("Must contain at least one (1) number.\n")
    }

    if (!/[!@#$%^&*()_,.?:"|<>]/.test(password)){
        errorMessages.push("Must contain at least one (1) special character.\n");
        hasError = true;
    }

    if (hasError) {
        showError("password", errorMessages.join(" "));
    } else {
        clearError("password");
    }

    return !hasError;
}

document.addEventListener("DOMContentLoaded", function () {
    // Clear password inline error on password input
    const passwordField = document.getElementById("password");
    if (passwordField) {
        passwordField.addEventListener("input", function() {
            clearError("password");
        });
    }

    // Clear general server-side error on input in email, username, or password fields
    const inputs = document.querySelectorAll('input[name="email"], input[name="uname"], input[name="psw"]');
    const errorMsg = document.getElementById('error-message');

    function hideError() {
        if (errorMsg) {
            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', hideError);
        input.addEventListener('focus', hideError);
    });
});