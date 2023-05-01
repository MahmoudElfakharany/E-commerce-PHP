<?php
require("./env.php");

$orders_count_Query = "SELECT order_id FROM orders ";


$sql_1 = $conn->prepare($orders_count_Query);
$sql_1->execute();

$count = $sql_1->rowCount();

echo json_encode($count);