<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'DBConnector.php';
header("Content-Type: application/json");

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

// Select a random poll only once per session

// Use the poll ID stored in the session
$poll_id = $_SESSION['poll_id'];

// Fetch poll details
$pollStmt = $conn->prepare("SELECT question FROM poll WHERE poll_id = ?");
if (!$pollStmt) {
    echo json_encode(["status" => "error", "message" => "Poll prepare failed: " . $conn->error]);
    exit;
}
$pollStmt->bind_param("i", $poll_id);
$pollStmt->execute();
$pollResult = $pollStmt->get_result();

if ($pollResult->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Poll not found"]);
    exit;
}

$pollRow = $pollResult->fetch_assoc();

// Fetch poll options
$opts = $conn->prepare("SELECT id AS option_id, option_text FROM poll_options WHERE poll_id = ?");
if (!$opts) {
    echo json_encode(["status" => "error", "message" => "Options prepare failed: " . $conn->error]);
    exit;
}
$opts->bind_param("i", $poll_id);
$opts->execute();
$options = $opts->get_result()->fetch_all(MYSQLI_ASSOC);
$opts->close();

if (empty($options)) {
    echo json_encode(["status" => "error", "message" => "No options found for this poll"]);
    exit;
}

// Prepare the response
$response = [
    "status" => "success",
    "poll_id" => $poll_id,
    "question" => $pollRow['question'],
    "options" => $options
];

echo json_encode($response);
?>