<?php 
require_once ('../env.php');
session_start();

    $ID = json_decode(file_get_contents("php://input"), true)['user_id'];

    $query = "SELECT orders.order_id, orders.order_date, orders.total, orders.notes from orders where user_id = $ID";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
