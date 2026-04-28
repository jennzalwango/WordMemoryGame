<?php
require('database_connect.php');
header('Content-Type: application/json');

$StateGameSql = "INSERT INTO GameSession (score, completed) VALUES (0, 0)";

if ($conn->query($StateGameSql) === TRUE) {
    $game_id = $conn->insert_id; // get new created ID in a row

    //return it to JS
    echo json_encode([
        "game_id" => $game_id
    ]);
} else {
    echo json_encode([
        "error" => $conn->error
    ]);
}
?>
