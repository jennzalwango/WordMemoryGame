<?php
require("database_connect.php");

//create user table 
$create_user_sql = "CREATE TABLE IF NOT EXISTS Users(
id INT(50) AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL
)ENGINE=InnoDB";

//Check Users table have been created successfuly
if ($conn->query($create_user_sql) === TRUE) {
    echo "Users table created successfully";
} else {
    echo "Error creating Users table: " . $conn->error;
}

//create word table
$create_word_sql = "CREATE TABLE IF NOT EXISTS Words(
id INT(50) AUTO_INCREMENT PRIMARY KEY,
word_name VARCHAR(100) NOT NULL
)ENGINE=InnoDB";

if ($conn->query($create_word_sql) === TRUE) {
    echo "Words table created successfully";
} else {
    echo "Error creating Words table: " . $conn->error;
}

//create game session table
$create_game_session_sql = "CREATE TABLE IF NOT EXISTS GameSession(
id INT AUTO_INCREMENT PRIMARY KEY,
score INT DEFAULT 0,
completed BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB";

if ($conn->query($create_game_session_sql) === TRUE) {
    echo "Game table created successfully";
} else {
    echo "Error creating game table: " . $conn->error;
}

