let submit = document.getElementById("save");
submit.onclick = function(){
    let productName = document.getElementById("product-name").value;
    let productPrice = document.getElementById("product-price").value;
    let productAmount = document.getElementById("product-amount").value;
    let productCategory = document.getElementById("Category").value;
    let productImage = document.getElementById("product_image").files[0];
    let formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productAmount", productAmount);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);
    addProduct(formData);
    
}

async function addProduct(formdata) {
    let response = await fetch("http://localhost/php-project/server/adminPages/addProduct.php", {
      method: "POST",
      body: formdata,
    });
    let data = await response.json();
    let msgContainer = document.getElementById("server-msg");
    if(data['notAuthorized']){
      window.location = "http://localhost/php-project/admin/AdminSign-in.html";
    }
    else{
      if(data['error']){
        msgContainer.innerHTML = data['msg'];
        msgContainer.style.display="block";
        msgContainer.style.color = "red";
      }
      else{
        msgContainer.innerHTML = data['msg'];
        msgContainer.style.color = "#397e5e";
        msgContainer.style.display="block";
      }
    }
}


let addCategoryBtn= document.getElementById("addCategory");
let categoryName= document.getElementById("category-name");

addCategoryBtn.onclick = function(){
  addCategory(categoryName.value);
}

