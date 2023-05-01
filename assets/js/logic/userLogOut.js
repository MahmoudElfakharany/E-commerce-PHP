let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", async function () {
    let formData = new FormData();
    formData.append("logout", true);
    let logoutSent = await fetch(
      "http://localhost/php-project/server/signIn.php",
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