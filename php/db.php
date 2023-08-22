<?php
session_start();
$host = 'localhost';
$username = 'root';
$password = '';
$db = 'fano_db';
$charset  = 'utf8mb4';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); //устанавливаем режим информирования об ошибках

$connection = new mysqli($host, $username, $password, $db);
$connection->set_charset($charset); //установка кодировки
$connection->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1); //для возвращения из бд типизированных данных
// $connection = new mysqli($host, $username, $password, $db);

// if ($connection->connect_error) {
//     die("Connection failed: " . $connection->connect_error);
// }
// $sql = "CREATE DATABASE IF NOT EXISTS $db";

// if($connection->query($sql) === TRUE) {
//     echo "Database created successfully";
// } else {
//     echo "Error creating database: " . $connection->error;
// }
