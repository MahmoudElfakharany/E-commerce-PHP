<?php

session_start();
require("./env.php");


if (!$_SESSION) {
    $response = [
        "error" => true,
    ];
    // echo json_encode($response);
} else {
    $data = json_decode(file_get_contents('php://input'), true);
    $dataEncode = json_encode($data);

    $user_order_procedure = "call create_order('$dataEncode')";

    $sql = $conn->prepare($user_order_procedure);
    $sql->execute();
}