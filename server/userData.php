<?php
require("./env.php");
session_start();
if (!array_key_exists("id",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

} else {
    $u_Id = $_SESSION['id'];
    $query = "SELECT user_name ,user_pic FROM  users where user_id = $u_Id";

    $sql = $conn->prepare($query);
    $sql->execute();

    $result = $sql->execute();
    if ($result) {
        $user_Data = $sql->fetch(PDO::FETCH_ASSOC);
        echo json_encode($user_Data);
    }
}