<?php

define("db_server", "localhost");
define("db_user", "root");
define("db_pass", "");
define("db_name", "oikantana");

$con = mysqli_connect(db_server, db_user, db_pass, db_name);
if ($con === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// define("db_server", "sql207.byetcluster.com");
// define("db_user", "b17_38405973");
// define("db_pass", "Geszer25");
// define("db_name", "b17_38405973_oikantana");

// $con = mysqli_connect(db_server, db_user, db_pass, db_name);

// if ($con === false) {
//     die("ERROR: Could not connect. " . mysqli_connect_error());
// }