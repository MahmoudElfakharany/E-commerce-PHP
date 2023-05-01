<?php 
require('./env.php');
session_start();
$ID = json_decode(file_get_contents("php://input"), true)['order_id'];

$query = "UPDATE orders set order_status = 'canceled' where order_id = $ID";
$sql = $conn->prepare($query);
$result = $sql->execute();
if($result){
    echo json_encode(["success"=>true]);
}

