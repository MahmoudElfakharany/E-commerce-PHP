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
    if (isset($_FILES['productImage'])) {

        /// RECIEVING DATA ////////////////////////////
        $productName = $_POST["productName"];
        $productPrice = $_POST["productPrice"];
        $productAmount = $_POST["productAmount"];
        $productCategory = $_POST["productCategory"];
        $adminId = 1;

        //// RENAMING IMAGES  //////////////////////
        $extension = pathinfo($_FILES['productImage']['name'], PATHINFO_EXTENSION);
        $new_name = time() . '.' . $extension;

        //// VALIDATIONS ///////////////////////////////
        $pictype = mime_content_type($_FILES['productImage']['tmp_name']);
        if ($productName == "") {
            $outMsg = "Product Name can't Be NULL";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if ($productPrice == "") {
            $outMsg = "Product Price can't Be NULL";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if ($productAmount == "" || $productAmount < 0) {
            $outMsg = "Product Amount can't Be NULL or negative number";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if ($productCategory == "" || $productCategory <= 0) {
            $outMsg = "Product Category can't Be NULL";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if ($adminId == "" || $adminId <= 0) {
            $outMsg = "You must be Admin to add Product";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if ($_FILES['productImage']['size'] > 1000000) {
            $outMsg = "Please Enter an image less than 1mb";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if (($extension != 'jpeg') && ($extension != 'jpg') && ($extension != 'png')) {
            $outMsg = "Please Enter a valid image extention";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else if (($pictype != 'image/jpeg') && ($pictype != 'image/jpg') && ($pictype != 'image/png')) {
            $outMsg = "Please Enter a valid image type";
            echo json_encode(["error" => true, "msg" => "$outMsg"]);
        } else {
            //// MOVING IMAGES TO SERVER ////////////////////////
            move_uploaded_file($_FILES['productImage']['tmp_name'], '../products_images/' . $new_name);
            $data = array(
                'image_source' => 'users_images/' . $new_name
            );


            ///// CHECKING IF E-MAIL ALREADY EXSITS /////////////////
            $query = "SELECT * FROM products WHERE product_name = '$productName'; ";
            $sql = $conn->prepare($query);
            $sql->execute();
            $result = $sql->execute();
            if ($result) {

                $product = $sql->fetch();

                if ($product) {
                    $outMsg = "The product already Exists";
                    echo json_encode(["error" => true, "msg" => "$outMsg"]);
                } else {
                    ///// INSERTING IN DATABASE ////////////////////////////
                    $query = "INSERT INTO products (product_name,product_price, product_picture, category_id, admin_id) 
                VALUES ('$productName','$productPrice','$new_name', '$productCategory', $adminId) ";
                    $sql = $conn->prepare($query);
                    $sql->execute();
                    echo json_encode(["error" => false, "msg" => "Product Successfully Added"]);
                }
            }


        }

    }
}
?>