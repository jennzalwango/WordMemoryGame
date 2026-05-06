<?php
require 'database_connect.php';
header('Content-Type: application/json');
//number of words to show
$count = intval($_GET['count']);

//get random words
$getWordsSql = "SELECT word_name FROM Words ORDER BY RAND() LIMIT ?";

//use prepare statement
$getWordsStmt = $conn->prepare($getWordsSql);
$getWordsStmt -> bind_param("i", $count);
$getWordsStmt-> execute();

$result = $getWordsStmt->get_result();
$words = [];
while($row = $result->fetch_assoc()){
    $words[] = $row['word_name'];
}

echo json_encode($words);
