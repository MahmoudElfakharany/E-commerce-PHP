<?php
session_start();
require("./env.php");

if (!$_SESSION) {
    $response = [
        "error" => true,
    ];
    echo json_encode($response);
} else {
    $email = $_SESSION['email'];

    $data = json_decode(file_get_contents('php://input'), true);

    $serchInput = $data["searchdata"];
    $products_Query = "SELECT p.* , c.category_name FROM products p JOIN category c ON p.category_id = c.category_id WHERE p.product_availability = 'available' AND p.product_name LIKE  '$serchInput%'";
    $sql = $conn->prepare($products_Query);
    $sql->execute();
    $result = $sql->execute();


    if ($result) {
        $products = $sql->fetchAll(PDO::FETCH_ASSOC);


        $response = [
            "searchedPrdoucts" => $products,

        ];
        echo json_encode($response);
    }
}