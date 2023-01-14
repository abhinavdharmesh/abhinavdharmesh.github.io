<?php

$referrer = $_POST["referrer"];
$time_spent = $_POST["time_spent"];
$user_agent = $_POST["user_agent"];

echo "Referrer: " . $referrer . "<br>";
echo "Time spent: " . $time_spent . "<br>";
echo "User agent: " . $user_agent . "<br>";

$servername = "db4free,net";
$username = "abhinavd";
$password = "qwerty12345";
$dbname = "deeznuts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO visits (referrer, time_spent, user_agent) VALUES ('$referrer', '$time_spent', '$user_agent')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
