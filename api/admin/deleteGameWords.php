<?php
require 'auth.php'; //for authentication
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? 0;

//delete statement
$deleteStmt = $conn->prepare("DELETE FROM Words WHERE id = ?");
$deleteStmt->bind_param('i', $id);

if($deleteStmt->execute()){
    echo json_encode(["message" => "Word deleted"]);
}else{
    echo json_encode(["message" => "Error deleting word"]);
}