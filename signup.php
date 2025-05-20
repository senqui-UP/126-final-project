<?php
include 'DBConnector.php';

$error = " ";

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $uname = $_POST['uname'];
    $email = $_POST['email'];
    $password = $_POST['psw'];

    $checksql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($checksql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0){
        $error = "This email is already registered.";
    } else {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertSql);
        $stmt->bind_param("sss", $uname, $email, $hashedPassword);

        if ($stmt->execute()) {
            echo "<script>alert('Signup successful!'); window.location.href='login.php';</script>";
        } else {
            echo "Error: " . $stmt->error;
        }
    }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" href="Images/Icons/Icon.png" as="image">
        <link href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" rel="stylesheet">

        <title>UNCENSORED 23</title>
        <meta charset = "UTF-8">
        <meta name = "author" content = "Contreras-DelRosario-Quindao">
        <link rel="icon" type="image/x-icon" href="./Images/Icon.png">  
        <link rel="stylesheet" type="text/css" href="styling-login.css">
        <script src="scripts-signup.js"></script>
    </head> 

    <body>
        <div class="wrapper">
            <div class="left-panel">
                <img src="Images/Logo.png" alt="logo" width="600px" height="500px">
            </div>

            <div class="right-panel">
                <br><br>

                <?php if (!empty(trim($error))): ?>
                    <p id="error-message" style="color:red; margin-bottom: 1em;"><?= $error ?></p>
                <?php else: ?>
                    <p id="error-message" style="display:none;"></p>
                <?php endif; ?>
                
                <form method="POST" action="signUp.php" onsubmit="return checkPassword();">
                    <label for="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>
                    <br>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required>
                    <br>
                
                    <label for="password"><b>Password</b></label>
                    <input type="password" id="password" placeholder="Enter Password" name="psw" required>
                    <span id="error-password" class="error-message"></span>

                    <label class="terms-label">
                        <input type="checkbox" required name="terms"> By signing up, you agree to our <a href="https://youtu.be/uHgt8giw1LY?si=PSlNQEjlHODbSJOI" target="_blank">Terms, Privacy Policy & Cookies Policy.</a>
                    </label>
                <br>
                <button type="submit">Sign Up</button>
                <form>
    
                <p class="sign-in"> Already have an account? <a class="link-sign-in" href="login.php">LOGIN</a></p>
        </div>
    </body>
</html>