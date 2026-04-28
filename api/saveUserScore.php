<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require('database_connect.php');
header('Content-Type: application/json');


//get the JSON input
$data = json_decode(file_get_contents("php://input"), true);
$score = $data['score'] ?? 0;
$game_id = $data['game_id']?? 0;
//prepare statement, to aviod SQL Injections
$updateScore = "UPDATE GameSession SET score=?, completed=1 WHERE id=?";
$updateStmt = $conn->prepare($updateScore);
if(! $updateStmt){
    echo json_encode(["message" => "Prepare failed", "error" => $conn->error]);
    exit;
}
//bind params
$updateStmt->bind_param("ii", $score, $game_id);
if($updateStmt->execute()){
    echo json_encode(["message" => "Score saved"]);
}else{
    echo json_encode(["message" => "Error"]);
}
