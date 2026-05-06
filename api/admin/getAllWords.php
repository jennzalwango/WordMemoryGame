<?php
require 'auth.php';// authentication
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/

header('Content-Type: application/json');

$viewWordssql = "SELECT id, word_name FROM Words ORDER BY id DESC";
$viewWordsResults = $conn->query($viewWordssql);

$words = [];
while($row = $viewWordsResults->fetch_assoc()){
    $words[] = $row;
}
echo json_encode($words);