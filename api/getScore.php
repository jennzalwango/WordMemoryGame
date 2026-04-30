<?php
require 'database_connect.php';
header('Content-Type: application/json');

$game_id = $_GET['game_id'];
$getScore = "SELECT score FROM GameSession WHERE id = ?";
$getScoreStatement = $conn->prepare($getScore);
$getScoreStatement->bind_param("i", $game_id);
$getScoreStatement->execute();

$result = $getScoreStatement->get_result();
$row = $result->fetch_assoc();

echo json_encode($row);