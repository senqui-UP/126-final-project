<?php
session_start();
include 'DBConnector.php';
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

// Fetch all polls and their options with vote counts
$polls = [];

$pollResult = $conn->query("SELECT * FROM poll ORDER BY poll_id DESC");

while ($poll = $pollResult->fetch_assoc()) {
    $poll_id = $poll['poll_id'];
    $question = $poll['question'];

    // Get options and votes for this poll
    $options = [];
    $totalVotesRes = $conn->query("SELECT COUNT(*) as total FROM poll_votes WHERE poll_id = $poll_id");
    $totalVotes = $totalVotesRes->fetch_assoc()['total'] ?? 0;

    $optRes = $conn->query("SELECT * FROM poll_options WHERE poll_id = $poll_id");

    while ($opt = $optRes->fetch_assoc()) {
        $opt_id = $opt['id'];
        $opt_text = $opt['option_text'];

        $voteCountRes = $conn->query("SELECT COUNT(*) as count FROM poll_votes WHERE poll_id = $poll_id AND option_id = $opt_id");
        $voteCount = $voteCountRes->fetch_assoc()['count'] ?? 0;

        $percentage = $totalVotes > 0 ? round(($voteCount / $totalVotes) * 100) : 0;

        $options[] = [
            'option_id' => $opt_id,
            'option_text' => $opt_text,
            'votes' => $voteCount,
            'percentage' => $percentage
        ];
    }

    $polls[] = [
        'poll_id' => $poll_id,
        'question' => $question,
        'options' => $options
    ];
}

echo json_encode(["status" => "success", "polls" => $polls]);
?>
