<?php
require "auth.php"; //authentication
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/

$data = json_decode(file_get_contents("php://input"), true);
$word = strtolower($data['word']); // normailize words, for consistency

//prepare statement
$addWordStmt = $conn->prepare("INSERT INTO Words (word_name) VALUES (?)");
//bind params
$addWordStmt->bind_param("s", $word);
if($addWordStmt->execute()){
    echo json_encode(["message"=> "Word added"]);
}else{
    echo json_encode(["message" => "Error"]);
}
