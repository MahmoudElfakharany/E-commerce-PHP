<?php

require("./env.php");


/////// GETTING DATA /////////////////
$data = json_decode(file_get_contents('php://input'), true);

$name = $data["name"];
$email = $data["email"];
$roomNumber = $data["roomNo"];
$password = $data["password"];


///// RETREIVing FROM DATA ////////////////

$query = "SELECT * FROM users WHERE user_email = '$email' ";

$sql = $conn->prepare($query);
$result = $sql->execute();
$users = $sql->fetch(PDO::FETCH_ASSOC);



////// RETREIVED DATA ///////////////////////////////////////
// print_r($users);
if (!empty($users)) {
    if ($users) {
        $retrieved_name = $users["user_name"];
        $retrieved_room = $users["user_room"];
        $retrieved_email = $users["user_email"];
    }


    ////// VALIDATION BEFORE UPADTING PASSWORD //////////////////
    if(strlen($password)<8)
    {
        $outMsg = "Invalid Password";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if ($email == $retrieved_email) {
        if (($name == $retrieved_name) && ($roomNumber == $retrieved_room)) {
            $query = "UPDATE users SET user_password = '$password' WHERE user_email = '$email' ";
            $sql = $conn->prepare($query);
            $sql->execute();
            echo json_encode(["status" => false]);
        } else if ($name != $retrieved_name) {
            $outMsg = "Your Name Doesn't Match";
            echo json_encode(["status" => true, "msg" => "$outMsg"]);
        } else if ($roomNumber != $retrieved_room) {
            $outMsg = "Your Room Number Doesn't Exist";
            echo json_encode(["status" => true, "msg" => "$outMsg"]);
        }
    }
} else {
    $outMsg = "Your E-mail Doesn't Exist";
    echo json_encode(["status" => true, "msg" => "$outMsg"]);
}
