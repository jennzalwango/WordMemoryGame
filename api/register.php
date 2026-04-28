<?php
require 'database_connection.php';

// Get data from the register form safely
$username = $_POST['username'];
$age = $_POST['age'];
$password = $_POST['password'];

// Hash the password for security reasons
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL statement
$CreateUserstmt = $conn->prepare("INSERT INTO Users (username, age, user_password) VALUES (?, ?, ?)");

// Bind parameters
$CreateUserstmt->bind_param("sis", $username, $age, $hashedPassword);
// s = string, i = integer, s = string

// Execute the statement and check user is created successfully
if ($CreateUserstmt->execute()) {
    echo "User registered successfully";
} else {
    echo "Error: " . $CreateUserstmt->error;
}

// Close
$CreateUserstmt->close();
$conn->close();
