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
if (!isset($_SESSION['poll_id'])) {
    $pollRes = $conn->query("SELECT poll_id FROM poll ORDER BY RAND() LIMIT 1");
    if (!$pollRes) {
        echo json_encode(["status" => "error", "message" => "Poll query failed: " . $conn->error]);
        exit;
    }
    if ($pollRes->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "No polls found"]);
        exit;
    }
    $row = $pollRes->fetch_assoc();
    $_SESSION['poll_id'] = (int)$row['poll_id'];
}

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