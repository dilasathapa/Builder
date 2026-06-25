<?php

header("Content-Type: application/json");

include "db.php";

$result = $conn->query(
    "SELECT layout_data
     FROM layouts
     ORDER BY id DESC
     LIMIT 1"
);

if (!$result || $result->num_rows === 0) {

    echo json_encode([
        "objects" => []
    ]);

    exit;
}

$row = $result->fetch_assoc();

echo $row["layout_data"];