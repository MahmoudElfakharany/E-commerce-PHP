////////// GRABBING DATA INPUT ELEMNTS /////////////////////
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let signin = document.getElementById("signin");

////////// GRABBING WARNING MSGS //////////////////////////
let emailRequired = document.getElementById("emailrequired");
let emailInvalid = document.getElementById("emailinvalid");
let requiredpassword = document.getElementById("passwordrequired");
let invalidpassword = document.getElementById("passwordinvalid");
let errorToastText = document.getElementById("errormsg");
let errorToastBody = document.getElementById("dangerToast");

//////// EMAIL VALIDATION ////////////////////////////////////
var testMail = 0;
const regx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var mailTrue = emailField.addEventListener("input", function () {
  if (regx.test(emailField.value) == true) {
    emailRequired.style.display = "none";
    emailInvalid.style.display = "none";
    testMail = 1;
    return true;
  } else if (emailField.value != "" && regx.test(emailField.value) == false) {
    emailRequired.style.display = "none";
    emailInvalid.style.display = "block";
    testMail = 0;
  } else {
    testMail = 0;
    return false;
  }
});

//////// PASSWORD VALIDATION ////////////////////////////////
var testPass = 0;
var passTrue = passwordField.addEventListener("input", function () {
  if (passwordField.value.length >= 8) {
    invalidpassword.style.display = "none";
    requiredpassword.style.display = "none";
    testPass = 1;
  } else {
    invalidpassword.style.display = "block";
    requiredpassword.style.display = "none";
    testPass = 0;
  }
});

//////// FIRING ERROR ////////////////////////////////////
function showToast(data) {
  errorToastText.innerText = data["msg"];
  errorToastBody.classList.add("show");
  setTimeout(() => {
    errorToastBody.classList.remove("show");
  }, 4000);
}

//////// ON CLICK ///////////////////////////////////////

signin.addEventListener("click", (e) => {
  e.preventDefault();

  // GETTING THE VALUES //////////////////////////////
  let email = emailField.value;
  let password = passwordField.value;

  /////// CONFIRMATION BEFORE SUMBIT ////////////////////
  if (testMail == 0) {
    emailInvalid.style.display = "block";
  } else if (testPass == 0) {
    invalidpassword.style.display = "block";
  } else {
    // CREATING JSON/////////////////////////////
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // SENDING DATA /////////////////////////////
    send_data(formData);
  }
});

async function send_data(formdata) {
  let response = await fetch("http://localhost/php-project/server/signIn.php", {
    method: "POST",
    body: formdata,
  });
  let data = await response.json();
  console.log(data);

  if (data["status"] == true) {
    window.open("http://localhost/php-project/user_pages/home.html", "_self");
  } else if (data["error"] == true) {
    showToast(data);
  }
}
