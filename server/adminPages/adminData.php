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
    $adminEmail=$_SESSION['admin'];
    $query = "SELECT admin_name ,admin_pic from admins where admin_email ='$adminEmail'";
    $sql = $conn->prepare($query);
    $result = $sql->execute();
    // echo ($result);
    if ($result) {
        $admin_Data = $sql->fetch(PDO::FETCH_ASSOC);
        echo json_encode($admin_Data);
    } else {
        echo json_encode(["Error => Check your Connection"]);
    }
}