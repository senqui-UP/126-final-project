<?php
session_start();
include 'DBConnector.php';

header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$poll_id = isset($_POST['poll_id']) ? intval($_POST['poll_id']) : 0;
$option_id = isset($_POST['option_id']) ? intval($_POST['option_id']) : 0;

// Validate poll and option IDs
if (!$poll_id || !$option_id) {
    echo json_encode(["status" => "error", "message" => "Missing poll or option"]);
    exit;
}

// Prevent duplicate vote
$check = $conn->prepare("SELECT * FROM poll_votes WHERE user_id = ? AND poll_id = ?");
$check->bind_param("ii", $user_id, $poll_id);
$check->execute();
$existing = $check->get_result();
if ($existing->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "You already voted"]);
    exit;
}

// Record the vote
$stmt = $conn->prepare("INSERT INTO poll_votes (poll_id, option_id, user_id) VALUES (?, ?, ?)");
$stmt->bind_param("iii", $poll_id, $option_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Vote recorded"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error"]);
}
?>
