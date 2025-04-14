<?php

include "config.php";

if (isset($_POST['videoId']) && isset($_POST['title']) && isset($_POST['duration']) && isset($_POST['channel'])) {

    $videoId = $_POST['videoId'];
    $title = $_POST['title'];
    $duration = $_POST['duration'];
    $channel = $_POST['channel'];

    // Check if the videoId already exists
    $checkSql = "SELECT videoId FROM tblsonglist WHERE videoId = ?";
    $checkStmt = $con->prepare($checkSql);
    $checkStmt->bind_param("s", $videoId);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows == 0) {
        // If not exists, insert the new record
        $insertSql = "INSERT INTO tblsonglist (videoId, title, duration, channel) VALUES (?, ?, ?, ?)";
        $insertStmt = $con->prepare($insertSql);
        $insertStmt->bind_param("ssss", $videoId, $title, $duration, $channel);
        $insertStmt->execute();
        $insertStmt->close();
    }

    $checkStmt->close();
}
