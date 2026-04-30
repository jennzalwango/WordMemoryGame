<?php
session_start(); 

if(!isset($_SESSION['user_id'])){
    echo json_encode(["error"=> "You are Unauthorized"]);
    http_response_code(401);
    exit;
}
