<?php

header("Content-Type: application/json");

include "db.php";

$conn->query("DELETE FROM layouts");

echo json_encode([
    "success" => true
]);