async function getMyOrders(targetTable, pNum) {
  let response = await fetch(
    "http://localhost/php-project/server/myOrders.php",
    {
      method: "POST",
      body: JSON.stringify({ paginateNum: pNum }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  console.log(data);
  if (data["notAuthorized"]) {
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  } else {
    let table = targetTable.getElementsByTagName("table")[0];
    let tableView = document.getElementById("ordersProductsDetails");
    table.innerHTML = "";
    let tableHead = createOrderHead(data[0]);
    table.append(tableHead);
    tableBody = document.createElement("tbody");
    table.append(tableBody);
    data.forEach((element) => {
      let row = createMyOrdersRow(
        element,
        element["order_id"],
        tableView,
        getOrdersProducts
      );
      tableBody.append(row);
    });
  }
}

function createOrderHead(rowContent) {
  let tableHead = document.createElement("thead");
  let tr = document.createElement("tr");
  for (const key in rowContent) {
    if (Object.hasOwnProperty.call(rowContent, key)) {
      if (
        key == "user_id" ||
        key == "order_id" ||
        key == "product_id" ||
        key == "admin_id" ||
        key == "category_id"
      ) {
        continue;
      } else {
        let td = createTableHeadColumn(key);
        tr.append(td);
      }
    }
  }

  let td = createTableHeadColumn("Action");
  tr.append(td);
  tableHead.append(tr);
  return tableHead;
}

function createMyOrdersRow(
  rowContent,
  btnEventRefrence,
  tableView,
  calledFunction,
  userName
) {
  let tr = document.createElement("tr");
  let firstKey = Object.keys(rowContent)[1];
  for (const key in rowContent) {
    if (Object.hasOwnProperty.call(rowContent, key)) {
      let td = "";
      if (
        key == "user_id" ||
        key == "order_id" ||
        key == "product_id" ||
        key == "admin_id" ||
        key == "category_id"
      ) {
        continue;
      } else if (key == firstKey) {
        td = createTablebodyFirstColumn(
          rowContent[firstKey],
          btnEventRefrence,
          tableView,
          calledFunction,
          userName
        );
        tr.append(td);
      } else {
        td = createTablebodyColumn(rowContent[key]);
        tr.append(td);
      }
    }
  }
  if (rowContent["order_status"] === "processing") {
    td = createTablebodyColumn("");
    td.classList.add(...["align-middle"]);
    td.innerHTML = `                            <button
        class="btn  btn-sm bg-gradient-danger"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onclick = "cancel(${rowContent["order_id"]})"
    >
        Cancel
    </button>`;
    tr.append(td);
  } else {
    td = createTablebodyColumn("");
    td.classList.add(...["align-middle"]);
    tr.append(td);
  }
  return tr;
}

function cancel(id) {
  let model = document.getElementById("exampleModal");
  model.style = "display: block; opacity: 1;";
  let confirm = document.getElementById("ok");
  confirm.onclick = function () {
    cancelOrder(id);
  };
}
async function cancelOrder(id) {
  let response = await fetch(
    "http://localhost/php-project/server/cancelOrder.php",
    {
      method: "post",
      body: JSON.stringify({ order_id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  if (data["notAuthorized"]) {
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  } else {
    if (data["success"]) {
      window.location.reload();
    } else {
      alert("error");
    }
  }
}

async function getMyOrdersCount() {
  let data = await fetch(
    "http://localhost/php-project/server/myOrdersPaginate.php"
  );
  let response = await data.json();
  if (response["notAuthorized"]) {
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  } else {
    let dataLength = response["count"];
    let viewLength = 3;
    let paginateNum = Math.ceil(dataLength / viewLength);
    createPagination(paginateNum);
  }
}

function createPagination(paginateNum) {
  let paginateContainer = document.getElementById("paginationContainer");
  paginateContainer.innerHTML = "";
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
  let table = document.getElementById("myOrders");
  getMyOrders(table, 1);
  for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", () => {
      activepage[0].classList.remove("active");
      pages[i].classList.add("active");
      activepage = parentContainer.getElementsByClassName("active");
      let activepageValue = parseInt(activepage[0].firstChild.innerText);
      getMyOrders(table, activepageValue);
    });
  }
}

getMyOrdersCount();

async function getMyOrdersTimeCount(dateFrom, dateTo, table) {
  let data = await fetch(
    "http://localhost/php-project/server/myOrdersWithTimePaginate.php",
    {
      method: "post",
      body: JSON.stringify({ dateFrom: dateFrom, dateTo: dateTo }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let response = await data.json();
  if (response["notAuthorized"]) {
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  } else {
    let dataLength = response["count"];
    let viewLength = 3;
    let paginateNum = Math.ceil(dataLength / viewLength);
    createPaginationTime(paginateNum, dateFrom, dateTo, table);
  }
}

function createPaginationTime(paginateNum, dateFrom, dateTo, table) {
  let paginateContainer = document.getElementById("paginationContainer");
  paginateContainer.innerHTML = "";
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

  setActivePageTime(dateFrom, dateTo, table);
}

function setActivePageTime(dateFrom, dateTo, table) {
  let parentContainer = document.getElementById("paginationContainer");
  let pages = parentContainer.getElementsByClassName("paginate");
  let activepage = parentContainer.getElementsByClassName("active");
  pages[0].classList.add("active");
  // let table = document.getElementById("myOrders");
  getOrdersAtTime(dateFrom, dateTo, table, 1);
  for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", () => {
      activepage[0].classList.remove("active");
      pages[i].classList.add("active");
      activepage = parentContainer.getElementsByClassName("active");
      let activepageValue = parseInt(activepage[0].firstChild.innerText);
      getOrdersAtTime(dateFrom, dateTo, table, activepageValue);
    });
  }
}
async function getOrdersAtTime(dateFrom, dateTo, targetTable, pNum) {
  let response = await fetch(
    "http://localhost/php-project/server/myOrdersWithTime.php",
    {
      method: "post",
      body: JSON.stringify({
        dateFrom: dateFrom,
        dateTo: dateTo,
        paginateNum: pNum,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await response.json();
  if (data["notAuthorized"]) {
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  } else {
    let table = targetTable.getElementsByTagName("table")[0];
    let tableView = document.getElementById("ordersProductsDetails");
    table.innerHTML = "";
    let tableHead = createOrderHead(data[0]);
    table.append(tableHead);
    tableBody = document.createElement("tbody");
    table.append(tableBody);
    data.forEach((element) => {
      let row = createMyOrdersRow(
        element,
        element["order_id"],
        tableView,
        getOrdersProducts
      );
      tableBody.append(row);
    });
  }
}

let table = document.getElementById("myOrders");
let search = document.getElementById("search");
search.onclick = function () {
  let table = document.getElementById("myOrders");
  let dateFrom = document.getElementById("dateFrom").value;
  let dateTo = document.getElementById("dateTo").value;
  getMyOrdersTimeCount(dateFrom, dateTo, table);
};

//---- grabbing elements for functions
let logout_Btn = document.getElementById("logoutBtn");
//////////////////////////////// LOUGOUT FUNCTION ////////////////////////////////////
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
    window.location = "http://localhost/php-project/user_pages/sign-in.html";
  }
});
