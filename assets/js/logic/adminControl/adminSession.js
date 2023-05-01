async function getAdminData() {
    let data = await fetch(
        "http://localhost/php-project/server/adminPages/adminData.php"
    );
    let res = await data.json();
    if(res['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
      else{
        displayAdminData(res);
      }
}

function displayAdminData(resData) {
    var img = document.getElementById("admin_image");
    img.setAttribute("src", "../server/admin_images/" + resData["admin_pic"]);
    var name = document.getElementById("admin_name");
    name.innerHTML = "Welcome " + resData["admin_name"];
}

getAdminData();