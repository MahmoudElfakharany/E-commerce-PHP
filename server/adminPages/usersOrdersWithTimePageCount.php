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
    $dateFrom = $request['dateFrom'];
    $dateTo = $request['dateTo'];
    $query = "SELECT orders.user_id, users.user_name, sum(orders.total) as 'totalPrice' 
    FROM orders , users WHERE orders.user_id = users.user_id AND order_status!='canceled'
    AND date(orders.order_date) between '$dateFrom' AND '$dateTo' GROUP BY(orders.user_id)";

    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["count"=>count($data)]);
}