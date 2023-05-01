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

    $request = json_decode(file_get_contents("php://input"), true);
    $ID = $request['user_id'];
    $paginateNum = $request['paginateNum'];
    $viewLength = 3;
    $offset = $viewLength * ($paginateNum - 1);
    if ($ID == 0) {
        $query = "SELECT orders.user_id, users.user_name, sum(orders.total) as 'totalPrice' 
        FROM orders , users WHERE orders.user_id = users.user_id  GROUP BY(orders.user_id)
        LIMIT $viewLength OFFSET  $offset";
    } else {
        $query = "SELECT orders.user_id, users.user_name, sum(orders.total) as 'totalPrice' 
        FROM orders , users WHERE orders.user_id = users.user_id AND orders.user_id= $ID 
        GROUP BY(orders.user_id)  LIMIT $viewLength OFFSET  $offset";
    }
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
