let logout_Btn = document.getElementById("logoutBtn");
logout_Btn.addEventListener("click", async function () {
    let formData = new FormData();
    formData.append("logout", true);
    let logoutSent = await fetch(
      "http://localhost/php-project/server/Admin_Sign_In.php",
      {
        method: "post",
        body: formData,
      }
    );
    let logoutResponse = await logoutSent.json();
    if (logoutResponse["loggedout"] == true) {
      window.location.reload();
    }
  });