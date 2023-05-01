<?php 
require('./env.php');
session_start();
if (!array_key_exists("id",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

} else {
    $ID = $_SESSION['id'];
    // $ID = 4;
    $request = json_decode(file_get_contents("php://input"), true);
    $dateFrom = $request['dateFrom'];
    $dateTo = $request['dateTo'];
    $paginateNum = $request['paginateNum'];
    $viewLength = 3;
    $offset = $viewLength * ($paginateNum - 1);
    $query = "SELECT orders.order_id, orders.order_date, orders.total,orders.order_status, 
    orders.notes from orders where user_id = $ID AND 
    date(orders.order_date) between '$dateFrom' AND '$dateTo' 
    limit $viewLength OFFSET $offset";

    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}