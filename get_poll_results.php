<?php
include 'DBConnector.php';
header("Content-Type: application/json");

$poll_id = isset($_GET['poll_id']) ? intval($_GET['poll_id']) : 0;
if (!$poll_id) {
    echo json_encode(["status" => "error", "message" => "Missing poll_id"]);
    exit;
}

// Total votes
$totalRes = $conn->prepare("SELECT COUNT(*) as total FROM poll_votes WHERE poll_id = ?");
$totalRes->bind_param("i", $poll_id);
$totalRes->execute();
$totalVotes = $totalRes->get_result()->fetch_assoc()['total'] ?? 0;

// Fetch poll question
$qstmt = $conn->prepare("SELECT question FROM poll WHERE poll_id = ?");
$qstmt->bind_param("i", $poll_id);
$qstmt->execute();
$qresult = $qstmt->get_result();
$question = "";
if ($row = $qresult->fetch_assoc()) {
    $question = $row['question'];
}

// Votes per option
$stmt = $conn->prepare("
    SELECT po.id, po.option_text, COUNT(pv.vote_id) as votes
    FROM poll_options po
    LEFT JOIN poll_votes pv ON po.id = pv.option_id
    WHERE po.poll_id = ?
    GROUP BY po.id
");
$stmt->bind_param("i", $poll_id);
$stmt->execute();
$results = $stmt->get_result();

$data = [];
while ($row = $results->fetch_assoc()) {
    $percentage = $totalVotes > 0 ? round(($row['votes'] / $totalVotes) * 100, 2) : 0;
    $data[] = [
        "option_id" => $row['id'],
        "option_text" => $row['option_text'],
        "votes" => (int)$row['votes'],
        "percentage" => $percentage
    ];
}

echo json_encode([
    "status" => "success",
    "question" => $question,
    "total_votes" => $totalVotes,
    "options" => $data
]);
?>
