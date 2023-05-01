function createTableHeadColumn(innerContent){
    let td= document.createElement("td");
    td.innerHTML = `<h6>${innerContent}</h6>`;
    let columnClasses = ["text-uppercase", "text-secondary", "text-xxs", "font-weight-bolder", "opacity-7", "ps-4"];
    td.classList.add(...columnClasses);
    return td;
}

function createTableHead(rowContent){
    let tableHead = document.createElement("thead");
    let tr= document.createElement("tr");
    for (const key in rowContent) {
        if (Object.hasOwnProperty.call(rowContent, key)) {
            if(key =="user_id" || key == "order_id" || key == "product_id" || key == "admin_id" || key == "category_id"){
                continue;
            }
            else{
                let td = createTableHeadColumn(key);
                tr.append(td);  
            }
       
        }
    }
    tableHead.append(tr);
    return tableHead;

}
function createTablebodyFirstColumn(innerContent, btnEventRefrence, tableView, calledFunction, userName){
    let td= document.createElement("td");
    let columnClasses = ["d-flex", "flex-row", "align-items-baseline", "ps-4"];
    td.classList.add(...columnClasses);
    let btn = createButtonAndEvent(btnEventRefrence, tableView, calledFunction, userName);
    let h6 = document.createElement("h6");
    let h6Classes = ["mb-0", "text-sm"];
    h6.classList.add(...h6Classes);
    h6.innerHTML = innerContent;
    td.append(btn) ;
    td.append(h6) ;
    return td;
}
function createTablebodyColumn(innerContent){
    let td= document.createElement("td");
    td.innerHTML = innerContent;
    let columnClasses = ["text-xs", "font-weight-bold", "mb-0", "ps-4"];
    td.classList.add(...columnClasses);
    return td;
}
function createTableBodyRow(rowContent, btnEventRefrence, tableView, calledFunction, userName){
    let tr= document.createElement("tr");
    let firstKey = Object.keys(rowContent)[1];
    for (const key in rowContent) {
        if (Object.hasOwnProperty.call(rowContent, key)) {
            let td = "";
            if(key =="user_id" || key == "order_id" || key == "product_id" || key == "admin_id" || key == "category_id"){
                continue;
            }
            else if(key == firstKey){
                td = createTablebodyFirstColumn(rowContent[firstKey], btnEventRefrence, tableView, calledFunction, userName);
                tr.append(td);
            }
            else{
                td = createTablebodyColumn(rowContent[key]);
                tr.append(td);   
            }   
        }
    }
    return tr;
}

function createButtonAndEvent(btnEventRefrence, tableView, calledFunction, userName){
    let btn = document.createElement("button");
    btn.innerHTML = '<i class="material-icons">add</i>';
    let columnClasses = ["btn", "btn-link", "text-danger", "p-0", "text-center", "mt-2", "mx-1", "fw-bolder", "removeFromCart"];
    btn.classList.add(...columnClasses);
    // let table = document.getElementById("userOrders");
    btn.addEventListener('click', function(){
        if(btn.innerHTML == '<i class="material-icons">add</i>'){
    
            tableView.style = "display: block !important";

            calledFunction(btnEventRefrence, tableView, userName);
            console.log(btnEventRefrence);
            btn.innerHTML = '<i class="material-icons">remove</i>';
        }
        else if(btn.innerHTML == '<i class="material-icons">remove</i>'){
            btn.innerHTML = '<i class="material-icons">add</i>';
            tableView.style = " display: none !important";


        }
    });
    return btn;
}

async function getAllOrders(tableId, ordersView,pNum) {
    let response = await fetch("http://localhost/php-project/server/adminPages/usersOrders.php", {
        method: "post",
        body: JSON.stringify({"user_id" : 0, "paginateNum": pNum}),
        headers:{
        "Content-Type": "application/json",
        }

    });
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
      else{
        let table = document.getElementById(tableId);
        let tableView = document.getElementById(ordersView);
        table.innerHTML="";
        let tableHead = createTableHead(data[0]);
        table.append(tableHead);
        tableBody = document.createElement("tbody");
        table.append(tableBody);
        getOrdersUsers();
        data.forEach(element => {
            let row = createTableBodyRow(element, element['user_id'], tableView, getOrdersDetails, element['user_name']);
            tableBody.append(row);
            selector.innerHTML += `<option value="${element['user_id']}">${element['user_name']}</option>`
        });
    }
}
async function getOrdersUsers(){
    let response = await fetch("http://localhost/php-project/server/adminPages/usersOrdersAll.php", {
        method: "post",
        body: JSON.stringify({"user_id" : 0}),
        headers:{
        "Content-Type": "application/json",
        }

    });
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
      else{
        let selector = document.getElementById("users");
        selector.innerHTML = "<option value='0' selected>Select a user</option>";
        data.forEach(element => {
            selector.innerHTML += `<option value="${element['user_id']}">${element['user_name']}</option>`
        });
    }
}
async function getOrdersOFuser(tableId, ordersView, Pnum, userId) {
    let response = await fetch("http://localhost/php-project/server/adminPages/usersOrders.php", {
        method: "post",
        body: JSON.stringify({"user_id" : userId, "paginateNum": Pnum}),
        headers:{
        "Content-Type": "application/json",
        }

    });
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
      else{
        let table = document.getElementById(tableId);
        let tableView = document.getElementById(ordersView);
        table.innerHTML="";
        let tableHead = createTableHead(data[0]);
        table.append(tableHead);
        tableBody = document.createElement("tbody");
        table.append(tableBody);

        data.forEach(element => {
            let row = createTableBodyRow(element, element['user_id'], tableView, getOrdersDetails, element['user_name']);
            tableBody.append(row);
        });
    }
}
async function getOrdersAtTime(dateFrom, dateTo, tableId, ordersView, pNum) {
    let response = await fetch("http://localhost/php-project/server/adminPages/usersOrdersWithTime.php", {
        method: "post",
        body: JSON.stringify({"dateFrom" : dateFrom, "dateTo": dateTo, "paginateNum": pNum}),
        headers:{
        "Content-Type": "application/json",
        }

    });
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
      else{
        let table = document.getElementById(tableId);
        let tableView = document.getElementById(ordersView);
        table.innerHTML="";
        let tableHead = createTableHead(data[0]);
        table.append(tableHead);
        tableBody = document.createElement("tbody");
        table.append(tableBody);

        data.forEach(element => {
            let row = createTableBodyRow(element, element['user_id'], tableView, getOrdersDetails, element['user_name']);
            tableBody.append(row);
        });
    }
}
async function getOrdersDetails(id, targetTable) {
    let response = await fetch("http://localhost/php-project/server/adminPages/userOrdersDetails.php", {
        method: "post",
        body: JSON.stringify({"user_id" : id}),
        headers:{
        "Content-Type": "application/json",
    }
    
    });
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
    else{
        let table = targetTable.getElementsByTagName("table")[0];
        let tableView = document.getElementById("ordersProductsDetails");
        table.innerHTML="";
        let tableHead = createTableHead(data[0]);
        table.append(tableHead);
        tableBody = document.createElement("tbody");
        table.append(tableBody);
        data.forEach(element => {
            let row = createTableBodyRow(element, element['order_id'], tableView, getOrdersProducts);
            tableBody.append(row);
        });
    }
   
}


async function getOrdersProducts(id) {
    let response = await fetch("http://localhost/php-project/server/adminPages/userOrdersProducts.php", {
        method: "post",
        body: JSON.stringify({"order_id" : id}),
        headers:{
        "Content-Type": "application/json",
    }
    
});
    let data = await response.json();
    if(data['notAuthorized']){
        window.location = "http://localhost/php-project/admin/AdminSign-in.html";
      }
    else{
        let cardsContainer = document.getElementById("cards");
        cardsContainer.innerHTML="";
        data.forEach(element => {
            let card = createProductOrderCard(element['product_name'], element['category_name'], element['product_picture'], element['quantity'], element["product_price"]);
            cardsContainer.innerHTML +=card;
        });
    }
}

function createProductOrderCard(productName, categoryName, imgPath, amount, price){
return `
    <div class="card-header p-0 mt-4 mx-3 orderCard" >
                        <img src="../server/products_images/${imgPath}" alt="img-blur-shadow" class="img-fluid shadow border-radius-xl">
                        <span class="position-absolute top-20 start-75 translate-middle badge rounded-pill bg-warning p-2">
                          x <span id="Itemscount">${amount}</span>
                        </span>
                        <div class="card-body p-3">
                          <div class="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>${productName}</h5>
                                <span class="badge bg-gradient-info mb-2">${categoryName}</span>
                              
                            </div>
                            <span class="fs-4">${price} EGP</span>
                          </div>
                    </div>
                      </div>
`;
}





