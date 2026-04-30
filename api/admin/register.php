<?php
require '../database_connect.php'; // goes up one level from /api/admin/ to /api/
header('Content-Type: application/json');

//get data
$data = json_decode(file_get_contents("php://input"), true);

// Get data from the register form safely
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(["message" => "Username and password are required"]);
    exit;
}

//before user reation, check if user being created exists,
$checkUserExits = $conn->prepare("SELECT id FROM Users WHERE username = ?");
$checkUserExits->bind_param('s', $username);
$checkUserExits->execute();
$userResponse = $checkUserExits->get_result();

//verify response
if($userResponse->num_rows > 0){
    echo json_encode(["message" => "User already exits. Please login"]);
    exit;
}

// Hash the password for the user for security reasons
$hashedUserPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL statement to insert user
$CreateUserstmt = $conn->prepare("INSERT INTO Users (username, password) VALUES (?, ?)");

// Bind parameters
$CreateUserstmt->bind_param("ss", $username, $hashedUserPassword);
// s = string, s = string

// Execute the statement and check user is created successfully
if ($CreateUserstmt->execute()) {
    echo json_encode(["message" => "Registration successful"]);
} else {
    echo "Error: " . $CreateUserstmt->error;
}

// Close
$CreateUserstmt->close();
$conn->close();
