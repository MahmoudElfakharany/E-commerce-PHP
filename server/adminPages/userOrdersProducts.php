<?php 
require_once ('../env.php');
session_start();

    $ID = json_decode(file_get_contents("php://input"), true)['order_id'];

    $query = "SELECT orderedproducts.order_id, orderedproducts.product_id, orderedproducts.quantity,
    products.product_name, category.category_name, products.product_picture, products.product_price
    from orderedproducts, products, category
    where orderedproducts.order_id = orderedproducts.order_id AND
    orderedproducts.product_id = products.product_id AND
    products.category_id = category.category_id 
    AND orderedproducts.order_id = $ID";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
