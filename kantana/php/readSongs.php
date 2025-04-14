<?php

include "config.php";

$sql = "SELECT * FROM tblsonglist";
$result = $con->query($sql);

$songs = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = [
            "videoId" => $row["videoId"],
            "title" => $row["title"],
            "duration" => $row["duration"],
            "channel" => $row["channel"]
        ];
    }
}

// Return as JSON
header('Content-Type: application/json');
echo json_encode($songs);