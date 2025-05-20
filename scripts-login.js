function clearError(inputId){
    document.getElementById("error-" + inputId).innerText = "";
}

document.addEventListener("DOMContentLoaded", function () {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    // Select the <p> that contains the error message
    const errorParagraph = document.querySelector("form p[style*='color: red']");

    function clearError() {
        if (errorParagraph) errorParagraph.innerText = "";
    }

    emailField.addEventListener("focus", clearError);
    passwordField.addEventListener("focus", clearError);
});