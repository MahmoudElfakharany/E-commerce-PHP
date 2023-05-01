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
    $request = json_decode(file_get_contents("php://input"), true);
    $paginateNum = $request['paginateNum'];
    $viewLength = 3;
    $offset = $viewLength * ($paginateNum - 1);
    $query = "SELECT * from users limit $viewLength OFFSET  $offset";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    if ($result) {

        $user = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($user);
    } else {
        echo json_encode(["Error" => "check Your Connection"]);
    }
}