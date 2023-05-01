<?php
session_start();
require("./env.php");

if (!$_SESSION['email']) {
    $response = [
        "error" => true,
    ];
    echo json_encode($response);
} else {
    // $currentPage=$_POST[""]
    $email = $_SESSION['email'];


    //////////////// get page number///////////////
    $data = json_decode(file_get_contents('php://input'), true);



    ///////////////// get products ////////////////////////////////
    // determine page number from 
    $page = 1;
    if (!empty($data['pageCount'])) {
        $page = $data["pageCount"];
        if (false === $page) {
            $page = 1;
        }
    }

    // set the number of items to display per page
    $items_per_page = 8;

    // build query
    $offset = ($page - 1) * $items_per_page;
    $products_Query = "SELECT p.* , c.category_name FROM products p join category c on p.category_id = c.category_id where p.product_availability = 'available' LIMIT " . $offset . "," . $items_per_page;
    $user_Query = "SELECT user_id, user_name , user_pic,user_room FROM users where user_email = '$email' ";
    $rooms_Query = "SELECT user_room FROM users ";


    $sql_1 = $conn->prepare($products_Query);
    $result_1 = $sql_1->execute();

    $sql_2 = $conn->prepare($user_Query);
    $result_2 = $sql_2->execute();

    $sql_3 = $conn->prepare($rooms_Query);
    $result_3 = $sql_3->execute();

    if ($result_1 && $result_2) {
        $products = $sql_1->fetchAll(PDO::FETCH_ASSOC);
        $user = $sql_2->fetchAll(PDO::FETCH_ASSOC);
        $rooms = $sql_3->fetchAll(PDO::FETCH_ASSOC);

        $response = [
            "products" => $products,
            "user" => $user,
            "allRooms" => $rooms,
        ];
        echo json_encode($response);
    }
}