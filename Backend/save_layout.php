<?php

header("Content-Type: application/json");

include "db.php";

$data = file_get_contents("php://input");

if (!$data) {

    echo json_encode([
        "success" => false
    ]);

    exit;
}

$conn->query("DELETE FROM layouts");

$stmt = $conn->prepare(
    "INSERT INTO layouts(layout_data)
     VALUES (?)"
);

$stmt->bind_param("s", $data);

$stmt->execute();

echo json_encode([
    "success" => true
]);