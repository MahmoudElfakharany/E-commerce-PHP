<?php
session_start();

require("./env.php");

if (!$_SESSION) {
    $response = [
        "error" => true,
    ];
    echo json_encode($response);
} else {
    $rooms_Query = "SELECT product_id FROM products ";


    $sql_1 = $conn->prepare($rooms_Query);
    $sql_1->execute();

    $row_count = $sql_1->rowCount();




    $page_count = 0;
    $items_per_page = 8;
    $page = $row_count / $items_per_page;
    if ($row_count === 0) {
    } else {
        $page_count = (int)ceil($row_count / $items_per_page);
        if ($page > $page_count) {
            $page = 1;
        }
    }



    echo ($page_count);
}
