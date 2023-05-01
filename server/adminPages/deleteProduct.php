<?php 
require('../env.php');
session_start();
if (!array_key_exists("admin",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

} else {
    $ID = json_decode(file_get_contents("php://input"), true)['product_id'];
    $query = "DELETE from products where product_id = $ID";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    if ($result) {
        echo json_encode(["success" => true]);
    }
}
