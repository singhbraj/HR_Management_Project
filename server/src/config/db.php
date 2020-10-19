<?php


function connect_db() {
	$server = 'localhost'; // this may be an ip address instead
	$user = 'root';
	$pass = '';
	$database = 'practice';
    $connection = new mysqli($server, $user, $pass, $database);
    
    if ($connection->connect_errno) {
        echo "Failed to connect to MySQL: " . $connection->connect_error;
    }

	return $connection;
}