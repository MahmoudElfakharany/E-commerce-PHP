////////// GRABBING DATA INPUT ELEMNTS /////////////////////
let nameField = document.getElementById("name");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let passwordConfirmField = document.getElementById("confirmPassword");
let roomNumberField = document.getElementById("roomNumber");
let submit = document.getElementById("submit");
let imageField = document.getElementById("image");
let errorToastText = document.getElementById("errormsg");
let errorToastBody = document.getElementById("dangerToast");

////////// GRABBING WARNING MSGS //////////////////////////
let warningMsg = document.getElementById("warningmsg");
let usernameRequired = document.getElementById("usernameRequired");
let usernameInvalid = document.getElementById("usernameInvalid");
let emailRequired = document.getElementById("emailRequired");
let emailInvalid = document.getElementById("emailInvalid");
let invalidpassword = document.getElementById("invalidpassword");
let requiredpassword = document.getElementById("requiredpassword");
let roomrequired = document.getElementById("roomrequired");
let roominvalid = document.getElementById("invalidroom");
let imagerequired = document.getElementById("picrequired");

////////// NAME VALIDATION ////////////////////////////////

let testUser = 0;

let nameTrue = nameField.addEventListener("input", function () {
  if (nameField.value != "" && /^[a-zA-Z]+$/.test(nameField.value) == true) {
    usernameInvalid.style.display = "none";
    usernameRequired.style.display = "none";
    testUser = 1;
  } else if (/^[a-zA-Z]+$/.test(nameField.value) == false) {
    usernameInvalid.style.display = "block";
    testUser = 0;
  } else {
    usernameRequired.style.display = "block";
    testUser = 0;
  }
});

//////// EMAIL VALIDATION ////////////////////////////////////
let testMail = 0;
const regx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let mailTrue = emailField.addEventListener("input", function () {
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
let testPass = 0;
let passTrue = passwordField.addEventListener("input", function () {
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

////// PASSWORD CONFIRM VALIDATION //////////////////////////
let testconfrim = 0;
passwordConfirmField.addEventListener("input", function () {
  if (passwordConfirmField.value != passwordField.value) {
    warningMsg.style.display = "block";
    testconfrim = 0;
  } else {
    warningMsg.style.display = "none";
    testconfrim = 1;
  }
});

//////// ROOM VALIDATION ////////////////////////////////
let testroom = 0;
let roomTrue = roomNumberField.addEventListener("input", function () {
  if (roomNumberField.value.length != 3) {
    roominvalid.style.display = "block";
    roomrequired.style.display = "none";
    testroom = 0;
  } else if (roomNumberField.value.length == 0) {
    roomrequired.style.display = "block";
    testroom = 0;
  } else {
    roominvalid.style.display = "none";
    roomrequired.style.display = "none";

    testroom = 1;
  }
});

//////// IMAGE VALIDATION ///////////////////////////////
let testimage = 0;
let imageTrue = imageField.addEventListener("input", function () {
  if (imageField.value == "") {
    imagerequired.style.display = "block";
    testimage = 0;
  } else {
    imagerequired.style.display = "none";
    testimage = 1;
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

submit.addEventListener("click", (e) => {
  e.preventDefault();

  // GETTING THE VALUES //////////////////////////////
  let name = nameField.value;
  let email = emailField.value;
  let password = passwordField.value;
  let roomNo = roomNumberField.value;
  let profPic = imageField.value;

  /////// CONFIRMATION BEFORE SUMBIT ////////////////////
  if (testUser == 0) {
    usernameInvalid.style.display = "block";
  } else if (testMail == 0) {
    emailInvalid.style.display = "block";
  } else if (testPass == 0) {
    invalidpassword.style.display = "block";
  } else if (testconfrim == 0) {
    warningMsg.style.display = "block";
  } else if (testroom == 0) {
    roominvalid.style.display = "block";
  } else if (testimage == 0) {
    imagerequired.style.display = "block";
  } else if (passwordField.value != passwordConfirmField.value) {
    warningMsg.style.display = "block";
  } else {
    // CREATING JSON//////////////////////////////

    let name = nameField.value;
    let email = emailField.value;
    let password = passwordField.value;
    let room = roomNumberField.value;
    let userPic = imageField.files[0];

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("roomNo", room);
    formData.append("image", userPic);

    // SENDING DATA /////////////////////////////
    send_data(formData);
  }
});

async function send_data(formdata) {
  let response = await fetch("http://localhost/php-project/server/signUp.php", {
    method: "POST",
    body: formdata,
  });
  let data = await response.json();

  if (data["status"] == true) {
    window.open(
      "http://localhost/php-project/user_pages/sign-in.html",
      "_self"
    );
  } else if (data["error"] == true) {
    showToast(data);
  }
}
