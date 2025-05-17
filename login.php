<?php
include 'DBConnector.php';

$error = " ";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $psw = $_POST['psw'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Please enter a valid email address.";
    } else {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            if (!$user) {
                $error = "This email is not registered.";
            } elseif (!password_verify($psw, $user['password'])) {
                $error = "Incorrect password.";
            } else {
                session_start();
                $_SESSION['user'] = $user['username'];
                header("Location: homepage.html");
                exit;
            }
        } else {
            $error = "Something went wrong. Please try again later.";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>UNCENSORED 23 | Login</title>
    <meta charset="UTF-8">
    <meta name="author" content="Contreras-DelRosario-Quindao">
    <link rel="stylesheet" type="text/css" href="styling-login.css">
    <link rel="preload" href="Images/Logo.png" as="image">
    <script src="scripts-login.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" rel="stylesheet">
</head>
<body>
    <div class="wrapper">
        <div class="left-panel">
            <img src="Images/Logo.png" alt="logo" width="600px" height="500px">
        </div>

        <div class="right-panel">
            <form method="POST" action="login.php">
                <br><br><br>
                <?php if ($error): ?>
                    <p style="color: red;"><?= $error ?></p>
                <?php endif; ?>

                <label for="email"><b>Email</b></label>
                <input type="text" id="email" placeholder="Enter Email" name="email" required>
                <br>

                <label for="password"><b>Password</b></label>
                <input type="password" id="password" placeholder="Enter Password" name="psw" required>
                <br>

                <button type="submit">Login</button>
                <br>
                <p> Don't have an account? <a href="signup.php">SIGN UP</a></p>
            </form>
        </div>
    </div>
</body>
</html>