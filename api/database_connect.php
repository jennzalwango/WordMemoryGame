<?php
//this helps connect the database created
$servername = "localhost";
$username = "kwm50yg_papers63";
$password = "papers@stu170663"; 
$dbname = "kwm50yg_wordGame_stu170663";

// create the connection to the db
$conn = new mysqli($servername, $username, $password, $dbname);

//check the connection to the db
if ($conn->connect_error) {
    die("". $conn->connect_error);
}
