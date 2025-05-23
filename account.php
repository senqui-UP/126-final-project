<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "Session not set.<br>";
    exit;
}

include 'DBConnector.php';

$user_id = $_SESSION['user_id'];

$sql = "SELECT username, email, password 
        FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($username, $email, $password);

$stmt->fetch();
$stmt->close();

if (!$username && !$email && !$password) {
    echo "User not found in database.<br>";
}

$post_sql = "SELECT posts.postID, posts.content
             FROM posts
             INNER JOIN posting ON posts.postID = posting.postID
             WHERE posting.id = ? 
             ORDER BY posts.postID DESC";

$post_stmt = $conn->prepare($post_sql);
$post_stmt->bind_param("i", $user_id);
$post_stmt->execute();
$post_result = $post_stmt->get_result();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset = "UTF-8">
        <meta name = "author" content = "Contreras-DelRosario-Quindao">

        <title>UNCENSORED 23</title>
        <link rel="icon" type="image/x-icon" href="./Images/Icon.png">  
        <link href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="styling-accountinfo.css">
        <link rel="stylesheet" type="text/css" href="styling.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&icon_names=logout" />  
    </head>

    <body>
        <header>
            <nav>
                <a href="homepage.html">Home</a>
                <a href="ganaps.html">Ganaps</a>
                <a href="yearbook.html">Yearbook</a>
                <a href="freedomwall.php">Freedom Wall</a>
                &nbsp; &nbsp;
                <a href="account.php">
                    <img class="acc-icon" src="./Images/Icons/Account.png">
                </a>             
            </nav>
        </header>

        <div class="wrapper">
            <div class="account-deets">
                <img class="img-icon" src="./Images/default-img.png" alt="profile-img">
                <h3>Username: <?= $username ?></h3>
                <h3>Email: <?= $email ?></h3>
                <button type="button" onclick="window.location.href='login.php'"><span class= "material-symbols-outlined">logout</span>Log out</button>
            </div>

            <div class="fw-entries">
                <div class="title">
                    <h2>Freedom Wall Entries</h2>
                    <br>
                </div>  
                <?php if ($post_result->num_rows > 0): ?>
                    <ul class="fw-entries-list">
                        <?php while ($row = $post_result->fetch_assoc()): ?>
                            <li class="entries">
                                <strong>FWBU#<?= $row['postID'] ?></strong>:
                                <?= nl2br($row['content']) ?>
                            </li>
                        <?php endwhile; ?>
                    </ul>
                <?php else: ?>
                    <p>No entries yet.</p>
                <?php endif; ?>
            </div>
        </div>
        <script src="scripts-acct.js"></script>  
    </body>
</html>