<?php
require 'auth.php';
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/

header('Content-Type: application/json');

$data= [];

//get the top scorces of the game

$topScoresResults = $conn->query("SELECT score FROM GameSession ORDER BY score DESC LIMIT 5");
$data['top_scores'] = $topScoresResults->fetch_assoc();

//get the avearges cores of the game
$averageScoreResults = $conn->query("SELECT AVG(score) as avg_score FROM GameSession");
$data['avearge'] = $averageScoreResults->fetch_assoc();

//total games played
$totalGamesPlayed = $conn->query("SELECT COUNT(*) as total_games FROM GameSession");
$data['total_games'] = $totalGamesPlayed->fetch_assoc();

//highest scores for the game
$highestScoresResults = $conn->query("SELECT MAX(score) as highest FROM GameSession");
$data['highest_scores'] = $highestScoresResults->fetch_assoc();

echo json_encode($data);
