/////////////           admin name images     //////////////////

//////////////////////////////////  All Users  ///////////////////////////////////////

async function getAllUsers() {
    let data = await fetch(
        "http://localhost/php-project/server/adminPages/allUsers.php"
    );
    let response = await data.json();
    if(response['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
    }
    else{
      let dataLength = response['count'];
      let viewLength = 3;
      let paginateNum = Math.ceil(dataLength/viewLength);
      createPagination(paginateNum);
        // displayUsersData(response);
    }
}

function createPagination(paginateNum){
    let paginateContainer = document.getElementById("paginationContainer")
    paginateContainer.innerHTML="";
    for (let i = 1; i <= paginateNum; i++) {
        let item = document.createElement("li");
        item.classList.add(...["page-item", "paginate"]);
        let link = document.createElement("a");
        item.append(link);
        link.classList.add(...["page-link", "text-bold"]);
        link.innerHTML = i;
        console.log(link);
        paginateContainer.append(item);
    }

    setActivePage();

}

function setActivePage() {
    let parentContainer = document.getElementById("paginationContainer");
    let pages = parentContainer.getElementsByClassName("paginate");
    let activepage = parentContainer.getElementsByClassName("active");
    pages[0].classList.add("active");
    getUsersData(1);
    for (let i = 0; i < pages.length; i++) {
      pages[i].addEventListener("click", () => {
        activepage[0].classList.remove("active");
        pages[i].classList.add("active");
        activepage = parentContainer.getElementsByClassName("active");
        let activepageValue = parseInt(activepage[0].firstChild.innerText);
        console.log(activepageValue);
        getUsersData(activepageValue);
      });
    }
  }
async function getUsersData(paginateNum){
    let data = await fetch(
        "http://localhost/php-project/server/adminPages/usersData.php",{
        method: "post",
        body: JSON.stringify({"paginateNum" : paginateNum}),
        headers:{
        "Content-Type": "application/json",
        }
    });
    let response = await data.json();
    if(response['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
    }
    else{
        displayUsersData(response);
    }

}

getUsersData(1);

function displayUsersData(responseData) {
    let tableBody = document.getElementById("usersTable");
    tableBody.innerHTML = " ";

    responseData.forEach((element) => {
        let tr = document.createElement("tr");

        let userName = document.createElement("td");
        let divParent = document.createElement("div");
        divParent.classList.add(
            ...["d-flex", "px-2", "py-1", "flex-column", "justify-content-center"]
        );
        let divChild = document.createElement("div");
        divChild.classList.add(
            ...["d-flex", "px-2", "py-1", "flex-column", "justify-content-center"]
        );
        let h6 = document.createElement("h6");
        h6.classList.add(...["mb-0", "text-sm"]);
        h6.innerHTML = element["user_name"];
        divChild.append(h6);
        divParent.append(divChild);
        userName.append(divParent);
        tr.append(userName);

        let room = document.createElement("td");
        let p = document.createElement("p");
        p.classList.add(...["mb-0", "text-xs", "font-weight-bold"]);
        let span = document.createElement("span");
        span.innerHTML = element["user_room"];
        p.append(span);
        room.append(p);
        tr.append(room);

        let userAvatar = document.createElement("td");
        userAvatar.classList.add(...["align-middle", "text-center", "text-sm"]);
        let divAvatar = document.createElement("div");
        divAvatar.classList.add(...["avatar", "avatar-xl", "position-relative"]);
        let avatar = document.createElement("img");
        avatar.classList.add(...["w-100", "border-radius-lg", "h-75", "shadow-sm"]);
        // avatar.setAttribute(
        //     "src",
        //     ".. /server/users_images/" + element["user_pic"]
        // );
        avatar.setAttribute("src", "../server/users_images/" + element["user_pic"]);
        divAvatar.append(avatar);
        userAvatar.append(divAvatar);
        tr.append(userAvatar);

        /////////// Buttons => Edit Delete
        let action = document.createElement("td");
        action.classList.add(
            ...["d-flex", "justify-content-center", "align-items-baseline", "gap-3"]
        );

        let editButton = document.createElement("button");
        editButton.classList.add(...["btn", "btn-sm", "bg-gradient-info"]);
        editButton.innerHTML = "Edit";
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add(...["btn", "btn-sm", "bg-gradient-danger"]);
        deleteButton.onclick= function(){
            confirmDelete(element["user_id"]);
        };
        deleteButton.setAttribute("data-bs-target", "#exampleModal");
        deleteButton.setAttribute("data-bs-toggle", "modal");
        action.append(editButton);
        action.append(deleteButton);
        tr.append(action);
        editButton.onclick = function(){edit(element['user_id'], element['user_name'], element['user_password'], element["user_pic"], element['user_email'], element['user_room'])};
        tableBody.append(tr);

    });

}

function confirmDelete(id){
    let model = document.getElementById("exampleModal");
    model.style = "display: block; opacity: 1;";
    let confirm = document.getElementById("ok");
    confirm.onclick = function(){;
        deleteUser(id);
    }
}


function edit(user_id, user_name, user_password, user_pic, user_email, room_no){
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("user_name", user_name);
    localStorage.setItem("user_password", user_password);
    localStorage.setItem("user_email", user_email);
    localStorage.setItem("user_pic", user_pic);
    localStorage.setItem("room_no", room_no);
    
    window.open("editUserData.html", "_self");

}

async function deleteUser(id){
    let response = await fetch("http://localhost/php-project/server/adminPages/deleteUser.php", {
    method: "post",
    body: JSON.stringify({"userId" : id}),
    headers:{
    "Content-Type": "application/json",
    }
    });
    let data = await response.json();
    if(data['success']){
        window.location.reload();
    }

    
}
getAllUsers();


