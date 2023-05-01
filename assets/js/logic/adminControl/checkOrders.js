let selector = document.getElementById("users");
selector.addEventListener("change", function(){
   let orders = document.getElementById("orders");
   let ordersProductsDetails = document.getElementById("ordersProductsDetails");
   orders.style = " display: none !important";
   ordersProductsDetails.style = " display: none !important";  
   OrderPagination("usersTable", "orders", this.value);
});



let search = document.getElementById("search");
search.onclick = function(){
   let dateFrom = document.getElementById("dateFrom").value;
   let dateTo = document.getElementById("dateTo").value;

   getOrdersPagination(dateFrom, dateTo, "usersTable", "orders");
   
   
}


function createPagination(paginateNum, dateFrom, dateTo, tableId, ordersView){
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

   setActivePage(dateFrom, dateTo, tableId, ordersView);

}

function setActivePage(dateFrom, dateTo, tableId, ordersView) {
   let parentContainer = document.getElementById("paginationContainer");
   let pages = parentContainer.getElementsByClassName("paginate");
   let activepage = parentContainer.getElementsByClassName("active");
   pages[0].classList.add("active");
   getOrdersAtTime(dateFrom, dateTo, tableId, ordersView, 1);
   for (let i = 0; i < pages.length; i++) {
     pages[i].addEventListener("click", () => {
       activepage[0].classList.remove("active");
       pages[i].classList.add("active");
       activepage = parentContainer.getElementsByClassName("active");
       let activepageValue = parseInt(activepage[0].firstChild.innerText);
       console.log(activepageValue);
       getOrdersAtTime(dateFrom, dateTo, tableId, ordersView,activepageValue);
     });
   }
 }

 async function getOrdersPagination(dateFrom, dateTo, tableId, ordersView){
   let data = await fetch(
       "http://localhost/php-project/server/adminPages/usersOrdersWithTimePageCount.php",{
       method: "post",
       body: JSON.stringify({"dateFrom" : dateFrom, "dateTo" : dateTo}),
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
      createPagination(paginateNum, dateFrom, dateTo, tableId, ordersView);
   }

} 
