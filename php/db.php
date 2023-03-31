<?php
$host = 'localhost';
$username = 'root';
$password = '';
$db = 'fanodb';

$connection = new mysqli($host, $username, $password);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
$sql = "CREATE DATABASE IF NOT EXISTS $db";

if($connection->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $connection->error;
}
