<?php
session_start(); // use session, to read session handler

if(!isset($_SESSION['user_id'])){
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error"=> "You are Unauthorized"]);
    
    exit;
}
