<?php
require 'auth.php'; //authentication
require '../database_connect.php'; // connect to db

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? 0;
$newWord = $data['word'] ?? '';

// update statement
$newGameWordStmt = $conn->prepare("UPDATE Words SET word_name = ? WHERE id = ?");
$newGameWordStmt->bind_param("si", $newWord, $id);

if($newGameWordStmt->execute()){
    echo json_encode(['message' => 'Word has been Updated']);
}else{
    echo json_encode(['message' => "Error updating word"]);
}