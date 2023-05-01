async function OrderPagination(tableId, ordersView, userId){
    let data = await fetch(
        "http://localhost/php-project/server/adminPages/usersOrdersPaginate.php",{
        method: "post",
        body: JSON.stringify({"user_id" : userId}),
        headers:{
        "Content-Type": "application/json",
        }
    });
    let response = await data.json();
    if(response['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
    }
    else{
       let dataLength = response['count'];
       let viewLength = 3;
       let paginateNum = Math.ceil(dataLength/viewLength);
       createOrderPagination(paginateNum, tableId, ordersView, userId);
    }
 
 } 

 function createOrderPagination(paginateNum,tableId, ordersView, userId){
    let paginateContainer = document.getElementById("paginationContainer");
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
 
    setActiveOrders(tableId, ordersView, userId);
 
 }
 
 function setActiveOrders(tableId, ordersView, userId) {
    let parentContainer = document.getElementById("paginationContainer");
    let pages = parentContainer.getElementsByClassName("paginate");
    let activepage = parentContainer.getElementsByClassName("active");
    pages[0].classList.add("active");
    getOrdersOFuser(tableId, ordersView,1, userId);
    for (let i = 0; i < pages.length; i++) {
      pages[i].addEventListener("click", () => {
        activepage[0].classList.remove("active");
        pages[i].classList.add("active");
        activepage = parentContainer.getElementsByClassName("active");
        let activepageValue = parseInt(activepage[0].firstChild.innerText);
        console.log(activepageValue);
        getOrdersOFuser(tableId, ordersView,activepageValue, userId);
      });
    }
  }


  // OrdersPagination("usersTable", "orders", userId);