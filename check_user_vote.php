<?php
session_start();
include 'DBConnector.php';
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$poll_id = isset($_GET['poll_id']) ? intval($_GET['poll_id']) : 0;

if (!$poll_id) {
    echo json_encode(["status" => "error", "message" => "Missing poll_id"]);
    exit;
}

$stmt = $conn->prepare("SELECT option_id FROM poll_votes WHERE poll_id = ? AND user_id = ?");
$stmt->bind_param("ii", $poll_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["status" => "voted", "option_id" => $row['option_id']]);
} else {
    echo json_encode(["status" => "not_voted"]);
}
?>