<?php

require("../env.php");
session_start();
if (!array_key_exists("admin",$_SESSION))
{  
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);

}else{
    $Category_name = json_decode(file_get_contents("php://input"), true)['C_name'];
    $query = "SELECT * from category where category_name ='$Category_name'";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    if ($result) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        if(count($data)){
            echo json_encode(["success" => false, "msg" => "this Category is already Exist"]); 
        }
        else{
            $query = "INSERT INTO category (category_name) values('$Category_name')";
            $sql = $conn->prepare($query);
            $result = $sql->execute();
            if($result){
                echo json_encode(["success" => true]);
            }
        }
    }
}

