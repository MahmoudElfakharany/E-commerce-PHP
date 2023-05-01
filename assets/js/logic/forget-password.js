// GRABBING THE ELEMTNS //////////////////////////////
let nameField = document.getElementById("name");
let emailField = document.getElementById("email");
let roomNumberField = document.getElementById("roomnumber");
let passwordField = document.getElementById("newpassword");
let passwordConfirmField = document.getElementById("passwordconfirmation");
let changePassword = document.getElementById("changepassword");
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

////// password confirm //////////////////////////
passwordConfirmField.addEventListener("keyup", function () {
  if (passwordConfirmField.value != passwordField.value) {
    warningMsg.style.display = "block";
  } else {
    warningMsg.style.display = "none";
  }
});

///////// FIRING ERROR /////////////////////////
function showToast(data) {
  errorToastText.innerText = data["msg"];
  errorToastBody.classList.add("show");
  setTimeout(() => {
    errorToastBody.classList.remove("show");
  }, 4000);
}

// ON CLICK //////////////////////////////

changePassword.addEventListener("click", (e) => {
  e.preventDefault();

  // GETTING THE VALUES //////////////////////////////
  let name = nameField.value;
  let email = emailField.value;
  let roomNo = roomNumberField.value;
  let password = passwordField.value;
  let confirmedPassword = passwordConfirmField.value;

  /////// CONFIRMATION BEFORE SUMBIT ////////////////////
  if (testUser == 0) {
    usernameRequired.style.display = "block";
  } else if (testMail == 0) {
    emailRequired.style.display = "block";
  } else if (testPass == 0) {
    requiredpassword.style.display = "block";
  } else if (testroom == 0) {
    roomrequired.style.display = "block";
  } else if (password != confirmedPassword) {
    warningMsg.style.display = "block";
  } else {
    // CREATING JSON//////////////////////////////
    let Data = {
      name: name,
      email: email,
      roomNo: roomNo,
      password: password,
    };
    let changedData = JSON.stringify(Data);

    // console.log(changedData);

    // SENDING DATA /////////////////////////////
    send_changes(changedData);
  }
});

async function send_changes(formdata) {
  let response = await fetch(
    "http://localhost/php-project/server/forget-password.php",
    {
      method: "POST",
      body: formdata,
    }
  );
  let data = await response.json();
  // console.log(data);

  if (data["status"] == true) {
    showToast(data);
  } else {
    window.open(
      "http://localhost/php-project/user_pages/sign-in.html",
      "_self"
    );
  }
}
