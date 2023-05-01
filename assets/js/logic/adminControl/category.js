async function addCategory(CName){
    let response = await fetch("http://localhost/php-project/server/adminPages/addCategory.php", {
      method: "post",
      body: JSON.stringify({"C_name" : CName}),
      headers:{
      "Content-Type": "application/json",
      }
  
  });
  let data = await response.json();
  if(data['notAuthorized']){
    window.location = "http://localhost/php-project/admin/AdminSign-in.html";
  }
  else{
    if(data['success']){
      getAllCatgories();
    }
    else{
      alert(data['msg']);
    }
    alert("category Successfuly Added");
  }
}



async function getAllCatgories(){
    let response = await fetch("http://localhost/php-project/server/adminPages/allCategory.php", {
        method: "GET",
    });
    let data = await response.json();
    if(data['notAuthorized']){
      window.location = "http://localhost/php-project/admin/AdminSign-in.html";
    }
    else{
      let select = document.getElementById("Category");
      select.innerHTML = "";
      // let option = document.createElement("option");
      // option.value = "0";
      // option.disabled = "";
      // option.innerHTML = "Select Category";
      // select.append(option);
      let option = `<option value="0" disabled >Select Category</option>`;
      select.innerHTML+=option;

      data.forEach(element => {
        let option = `<option value=${element['category_id']}>${element['category_name']}</option>`;
      select.innerHTML+=option;
          // let option = document.createElement("option");
          // option.value = element['category_id'];
          // option.innerHTML = element['category_name'];
          // option.classList.add("category-option");
          // select.append(option);
          
      });
    } 

}

  getAllCatgories();
  