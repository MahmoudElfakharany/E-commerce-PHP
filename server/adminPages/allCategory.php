<?php


require("../env.php");
session_start();
if (!array_key_exists("admin",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

} else {
    $query = "SELECT * from category";
    $sql = $conn->prepare($query);
    $sql->execute();
    $result = $sql->execute();

    if ($result) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    }
}