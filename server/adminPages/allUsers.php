<?php
require("../env.php");
session_start();
if (!array_key_exists("admin",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

} 
else {
    $query = "SELECT * from users";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    if ($result) {

        $user = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["count"=>count($user)]);
    } else {
        echo json_encode(["Error" => "check Your Connection"]);
    }
}