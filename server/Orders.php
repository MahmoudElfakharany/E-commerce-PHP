<?php

session_start();
require("./env.php");

/////////////// check authorization to access the page //////////////////////////
if (!array_key_exists("admin",$_SESSION))
{
    
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);
    
    
}
else 
{
    ///////////////// get products ////////////////////////////////
$admin_email = $_SESSION['admin'];
//------ getting admin info 
$admin_query = "SELECT admin_name , admin_pic FROM admins WHERE admin_email = '$admin_email' ";
//------ getting info of orders
$order_query = "SELECT u.user_name , o.room_no , o.order_date ,o.order_status , o.total , count(op.product_id) as no_products
 FROM orders o join users u on o.user_id = u.user_id join orderedproducts op on o.order_id = op.order_id
  join products p on op.product_id = p.product_id join category c on p.category_id = c.category_id group by o.order_id order by o.order_id;";
 
 // ------ getting info of ordered products
$product_query = "SELECT  op.quantity , p.product_name , p.product_picture , p.product_price , c.category_name
FROM orders o join users u on o.user_id = u.user_id join orderedproducts op on o.order_id = op.order_id 
join products p on op.product_id = p.product_id join category c on p.category_id = c.category_id order by o.order_id;";

$sql = $conn->prepare($admin_query);
$sql->execute();
$admin = $sql->fetch(PDO::FETCH_ASSOC);

$sql1 = $conn->prepare($order_query);
$sql1->execute();
$result = $sql1->execute();
$orders = $sql1->fetchAll(PDO::FETCH_ASSOC);

$sql2 = $conn->prepare($product_query);
$sql2->execute();
$result2 = $sql2->execute();
$products = $sql2->fetchAll(PDO::FETCH_ASSOC);

//------ creating array that hold all
$all=[
    "orders"=>$orders,
    "products"=>$products,
    "admin"=>$admin
];



//----------- sending response
if ($result) {
    echo json_encode($all);
}
else 
{
    $error = [
        "error"=>true
    ];
    echo json_encode($error);
}
//////////////// reciving status changes //////////////////////
if(array_key_exists("status",$_POST))
{
    $changedStatus = $_POST["status"];
    $targetOrder = $_POST["targetOrder"];
    $updateStatus = "UPDATE orders SET order_status = '$changedStatus' WHERE order_date = '$targetOrder';";

    $sql3 = $conn->prepare($updateStatus);
    $sql3->execute();
}

}
?>

