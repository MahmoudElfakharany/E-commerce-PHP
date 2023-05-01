async function getUserData() {
    let data = await fetch(
        "http://localhost/php-project/server/userData.php"
    );
    let res = await data.json();
    console.log(res);
    if(res['notAuthorized']){
        window.location = "http://localhost/php-project/user_pages/sign-in.html";
      }
      else{
    displayUserData(res);
      }
}

function displayUserData(resData) {
    var img = document.getElementById("user_image");
    img.setAttribute("src", "../server/users_images/" + resData["user_pic"]);
    var name = document.getElementById("user_name");
    name.innerHTML = "Welcome " + resData["user_name"];
}

getUserData();