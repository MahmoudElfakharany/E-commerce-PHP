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
    $paginateNum = $request['paginateNum'];
    $viewLength = 4;
    $offset = $viewLength * ($paginateNum - 1);

    $query = "SELECT orders.user_id, users.user_name, sum(orders.total) as 'totalPrice' 
    FROM orders , users WHERE orders.user_id = users.user_id
    AND date(orders.order_date) between '$dateFrom' AND '$dateTo' GROUP BY(orders.user_id) limit $viewLength OFFSET  $offset";

    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}