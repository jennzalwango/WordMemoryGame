<?php
require 'auth.php'; // authentication
require '../database_connect.php'; // access db
header('Content-Type: application/json');

$data = [];

// top 5 scores
$topScoresResults = $conn->query("SELECT score FROM GameSession ORDER BY score DESC LIMIT 5");
$data['top_scores'] = $topScoresResults->fetch_all(MYSQLI_ASSOC);

// average score
$averageScoreResults = $conn->query("SELECT AVG(score) as avg_score FROM GameSession");
$data['average'] = $averageScoreResults->fetch_assoc();

// total games played
$totalGamesPlayed = $conn->query("SELECT COUNT(*) as total_games FROM GameSession");
$data['total_games'] = $totalGamesPlayed->fetch_assoc();

// highest score
$highestScoresResults = $conn->query("SELECT MAX(score) as highest FROM GameSession");
$data['highest'] = $highestScoresResults->fetch_assoc();

echo json_encode($data);