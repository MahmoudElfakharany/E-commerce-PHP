<?php

session_start();

require("./env.php");

if (!array_key_exists("admin",$_SESSION))
{
    
    $notAuthorized = [
        "notAuthorized"=>true
    ];
    echo json_encode($notAuthorized);
    
    
}
else if ($_POST["getAdmin"])
{
    $admin_email = $_SESSION['admin'];
    //------ getting admin info 
    $admin_query = "SELECT admin_name , admin_pic FROM admins WHERE admin_email = '$admin_email' ";

    $sql = $conn->prepare($admin_query);
    $sql->execute();
    $admin = $sql->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        "admin" => $admin
    ]);

}
else if (isset($_FILES['image']))
{


    /// RECIEVING DATA ////////////////////////////
    $username = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];	
    $roomNo = $_POST["roomNo"];
    
    //// RENAMING IMAGES  //////////////////////
	$extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
	$new_name = time() . '.' . $extension;

    //// VALIDATIONS ///////////////////////////////
    $nameregx = "/^[a-zA-Z]+$/";
    $emailregx = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    $pictype = mime_content_type($_FILES['image']['tmp_name']);
    if (!preg_match($nameregx,$username))
    {
        $outMsg = "Invalid name";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);        
    }
    else if(!preg_match($emailregx,$email))
    {
        $outMsg = "Invalid E-mail";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if(strlen($password)<8)
    {
        $outMsg = "Invalid Password";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if (strlen($roomNo)!=3)
    {
        $outMsg = "Invalid room number";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if ($_FILES['image']['size']>1000000)
    {
        $outMsg = "Please Enter an image less than 1mb";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if (($extension!='jpeg') && ($extension!='jpg') && ($extension!='png'))
    {
        $outMsg = "Please Enter a valid image extention";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else if (($pictype!='image/jpeg') && ($pictype!='image/jpg') && ($pictype!='image/png'))
    {
        $outMsg = "Please Enter a valid image type";
        echo json_encode(["error" => true, "msg" => "$outMsg"]);
    }
    else
    {
        //// MOVING IMAGES TO SERVER ////////////////////////
        move_uploaded_file($_FILES['image']['tmp_name'], 'users_images/' . $new_name);
        $data = array(
            'image_source'		=>	'users_images/' . $new_name
        );


        ///// CHECKING IF E-MAIL ALREADY EXSITS /////////////////
        $query = "SELECT * FROM users WHERE user_email = '$email'; ";
        $sql = $conn->prepare($query);
        $sql->execute();
        $result = $sql->execute();
        if ($result) {
            
            $users = $sql->fetch();

            if ($users)
            {
                $outMsg = "E-mail already Exists";
                echo json_encode(["error" => true, "msg" => "$outMsg"]);
            }
            else
            {
                ///// INSERTING IN DATABASE ////////////////////////////
                $query = "INSERT INTO users (user_name,user_email,user_password,user_pic,user_room) VALUES ('$username','$email','$password','$new_name','$roomNo') ";
                $sql = $conn->prepare($query);
                $sql->execute();
                echo json_encode([
                    "status" => true,
                    "admin" => $admin
                ]);
            }
        }


    }

}
?>