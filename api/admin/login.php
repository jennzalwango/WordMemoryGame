<?php
// start session -server remembers a user/player across different pages.
session_start();
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

//find the user, with slect , prepare statement
$userLoginStmt = $conn->prepare("SELECT id, password FROM Users WHERE username =?");

//bind params
$userLoginStmt->bind_param('s' , $username);
$userLoginStmt->execute();

$userLoginResults = $userLoginStmt->get_result();
//check user exits
if ($userLoginResults->num_rows === 1){
    $user = $userLoginResults->fetch_assoc();

    //verfiy the user password
    if(password_verify($password, $user['password'])){
        // keep the user session
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['message'=> "Login successful"]);
    }else{
        echo json_encode(['message' =>'Incorrect password']);
    }

}else{
    echo json_encode(['message' => "User not Found"]);
    }
