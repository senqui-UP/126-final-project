<?php
ob_start(); // Prevent accidental output
session_start();
include 'DBConnector.php';

// Set JSON content-type early for fetch() responses
header("Content-Type: application/json");

// Helper to detect if this is a fetch/AJAX call
function isApiRequest() {
    return $_SERVER['REQUEST_METHOD'] === 'POST' || 
           ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['fetch']));
}

// Handle unauthenticated access differently for API and normal browser
if (!isset($_SESSION['user_id'])) {
    if (isApiRequest()) {
        echo json_encode(["status" => "error", "message" => "Not logged in"]);
    } else {
        // Switch to text/html for regular browser redirect
        header("Content-Type: text/html");
        header("Location: login.php");
    }
    exit;
}

// ==== POST a new message ====
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['content'])) {
    $content = trim($_POST['content']);
    $acct_user_id = $_SESSION['user_id'] ?? null;

    $reply_to = isset($_POST['reply_to']) && is_numeric($_POST['reply_to']) ? intval($_POST['reply_to']) : null;

    if (!$acct_user_id || $content === '') {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
        exit;
    }

    $stmt1 = $conn->prepare("INSERT INTO posts (content, reply_to) VALUES (?, ?)");
    $stmt1->bind_param("si", $content, $reply_to);

    if ($stmt1->execute()) {
        $post_id = $conn->insert_id;

        $stmt2 = $conn->prepare("INSERT INTO posting (postID, id) VALUES (?, ?)");
        $stmt2->bind_param("ii", $post_id, $acct_user_id);

        if ($stmt2->execute()) {
            echo json_encode(["status" => "success", "postID" => $post_id]);
            exit;
        }
    }

    echo json_encode(["status" => "error", "message" => "Database error"]);
    exit;
}

// ==== GET all posts ====
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['fetch']) && $_GET['fetch'] === 'posts') {
    $sql = "SELECT posts.postID, posts.content, posts.reply_to
            FROM posting 
            JOIN posts ON posting.postID = posts.postID 
            ORDER BY posts.postID DESC";

    $result = $conn->query($sql);

    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = [
            'postID' => $row['postID'],
            'content' => $row['content'],
            'reply_to' => $row['reply_to'] === null ? null : intval($row['reply_to'])
        ];
    }

    echo json_encode($posts);
    exit;
}

// ==== Not an API call, continue with full HTML page ====
header("Content-Type: text/html");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>UNCENSORED</title>
        <meta charset = "UTF-8">
        <meta name = "author" content = "Contreras-DelRosario-Quindao">
        <link rel="icon" type="image/x-icon" href="Images/Icon.png">

        <link href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=flag,reply" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="styling.css">
        <link rel="stylesheet" type="text/css" href="styling-fw.css">
    </head>

    <body>
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

        <div class="freedomWall">
            <h1>Freedom Wall</h1>
            
            <div id="post-box" class="post-box">
                <textarea id="post-input" placeholder="Write your message..."></textarea>
                <br>
                <button id="post-button">Post</button>
            </div>

            <div id="posts-container" class="posts-container">
                <!-- Posts will show here -->
            </div>
        </div>

        <script src="scripts-freedomwall.js"></script>

        <div class="poll"></div>
        <div class="spotify">
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0njbZ1fbv5llNEsrTfBLcp?utm_source=generator&theme=0" width="100%" height="350" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </body>
</html>