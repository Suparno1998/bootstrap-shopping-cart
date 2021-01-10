var menuItems = [
    {
        name : "Sandwich",
        price : 99,
        category : "Main Course",
        FreeDelivery : "Yes",
        active : "Yes",
        dateOfLaunch : "01-21-2020" 
    },
    {
        name : "Noodles",
        price : 199,
        category : "Main Course",
        FreeDelivery : "No",
        active : "Yes",
        dateOfLaunch : "07-19-2020" 
    },
    {
        name : "Pop-corn Chicken",
        price : 85,
        category : "Starter",
        FreeDelivery : "Yes",
        active : "Yes",
        dateOfLaunch : "09-16-2020" 
    },  
    {
        name : "Mango Lassi",
        price : 50,
        category : "Starter",
        FreeDelivery : "No",
        active : "Yes",
        dateOfLaunch : "08-17-2020" 
    },  
    {
        name : "Black Forest Cake",
        price : 100,
        category : "Dessert",
        FreeDelivery : "Yes",
        active : "Yes",
        dateOfLaunch : "12-13-2020" 
    },  
    {
        name : "Strawberry Custard",
        price : 150,
        category : "Dessert",
        FreeDelivery : "No",
        active : "Yes",
        dateOfLaunch : "11-14-2020" 
    }, 
    {
        name : "Kadai Chicken",
        price : 180,
        category : "Main Course",
        FreeDelivery : "No",
        active : "No",
        dateOfLaunch : "09-12-2020" 
    },
    {
        name : "Chocolate Pudding",
        price : 230,
        category : "Dessert",
        FreeDelivery : "No",
        active : "No",
        dateOfLaunch : "10-15-2020" 
    },
]
var cart = []
function formatDate(date,order) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(order == 'ymd')
        return [year, month, day].join('-');
    if(order == 'dmy')
        return [day,month,year].join('-')
}
function PopulateMenu(){
    var tableElement = document.getElementById('tableContainer')
    tableElement.innerHTML= ""
    var tableString = "<table class='table table-striped table-hover table-bordered'><thead class='thead-dark'><th>Item Name</th><th>Item Price</th><th>Category</th><th>Free Delivery</th><th>Active on Menu</th><th>Date Of Launch</th><th>Action Item</th><th>Delete Item</th></thead>"
    for(var item in menuItems){
        var temp =  `<tr><td>${menuItems[item].name}</td><td>${menuItems[item].price}</td><td>${menuItems[item].category}</td><td>${menuItems[item].FreeDelivery}</td><td>${menuItems[item].active}</td><td>${formatDate(menuItems[item].dateOfLaunch,"dmy")}</td><td><button class="btn btn-primary" onClick="OpenEdit(${item})">Edit</button></td><td><button class="btn btn-danger" onClick="deleteItem(${item})">Delete</button></td></tr>`
        tableString+=temp
    }
    tableString += "</table>"
    tableElement.innerHTML = tableString
}
function deleteItem(index){
    menuItems.splice(index,1)
    PopulateMenu()
    alert('Item deleted Successfully')
}
function OpenEdit(index){
    var name = document.getElementById('editname')
    var price = document.getElementById('editprice')
    var category = document.getElementById('editcategory')
    var del = document.getElementById('editdel')
    var id = document.getElementById('index')
    var active = document.getElementById('editactive')
    var launch = document.getElementById('editlaunch')
    name.value = ""
    price.value = ""
    category.value = ""
    del.value = ""
    active.value = ""
    launch.value = ""
    id.value = null
    if(index >= 0){
        name.value = menuItems[index].name
        price.value = menuItems[index].price
        category.value = menuItems[index].category
        del.value = menuItems[index].FreeDelivery
        active.value = menuItems[index].active
        launch.value = formatDate(new Date(menuItems[index].dateOfLaunch),"ymd")
        id.value = index
    }
    $('#editModal').modal('show')
}
function edit(){
    var data = $('#editform').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    var index = parseInt(data['index'])
    delete data.index
    if(index != -1){
        menuItems[index] = data
        alert('Menu Item Edited Successfully')
    }
    else{
        menuItems.push(data)
        alert('Menu Item Added Successfully')
    }
    //console.log(menuItems
    PopulateMenu()
    $('#editModal').modal('hide')
}
function close(){
    $('#editModal').modal('hide')
}
function closeCart(){
    $('#cartModal').modal('hide')
}
function populateCustomer(){
    $('#add-alert').hide()
    var menu = document.getElementById('menuContainer')
    menu.innerHTML = ""
    temp = ""
    for(var item in menuItems){
        if(menuItems[item].active === 'Yes'){
            var card = `<div class="col-md-3 mt-3"><div class="card">
                <div class="card-body">
                <h5 class="card-title">${menuItems[item].name}</h5>
                <p class="card-text">Price : ${menuItems[item].price} || Category : ${menuItems[item].category} <br> Free Delivery Option : ${menuItems[item].FreeDelivery}</p>
                <a href="#" class="btn btn-primary" onClick="addToCart(${item})">Add To Cart</a>
                </div>
                </div></div>`
            temp += card
        }
    }
    menu.innerHTML = temp
}
function clearCart(){
    var cartAlert = document.getElementById('cart-alert')
    cart = []
    populateCart()
    cartAlert.innerText = "Nothing to delete"
    $('#cart-alert').show()
    setTimeout(function(){
        $("#cart-alert").hide(); 
    }, 2000);
    $('#cart-modal').show()
}
function addToCart(index){
    var idx = cart.findIndex(e => e.name === menuItems[index].name)
    if(idx != -1){
        cart[idx].quantity += 1
        $('#add-alert').show()
        return
    }
    cart.push({
        name : menuItems[index].name,
        price : menuItems[index].price,
        quantity : 1,
    })
    $('#add-alert').show()
    setTimeout(function(){
        $("#add-alert").hide(); 
    }, 2000);
}
function deleteCartItem(index){
    var cartAlert = document.getElementById('cart-alert')
    if(cart.length-1 >= index){
        cart.splice(index,1)
        populateCart()
        cartAlert.innerText = "Item deleted successfully"
        $('#cart-alert').show()
        setTimeout(function(){
            $("#cart-alert").hide(); 
        }, 2000);
    }
    else{
        cartAlert.innerText = "Nothing to delete"
        $('#cart-alert').show()
        setTimeout(function(){
            $("#cart-alert").hide(); 
        }, 2000);
    }
}
function populateCart(){
    console.log(cart)
    var h = document.getElementById('cartHolder')
    if(cart.length == 0)
    {
        h.innerHTML = "<h3> Cart is Empty. Go ahead,add something from the menu</h3>"
    }
    else{
        h.innerHTML = ""
        quantity = 0
        total = 0
        var temp = "<table class='table table-striped table-hover table-bordered'><thead class='thead-dark'><th>Item Name</th><th>Item Price</th><th>Quantity</th><th>Subtotal</th><th>Delete Item</th></thead>"
        for(item in cart){
            temp += `<tr><td>${cart[item].name}</td><td>${cart[item].price}</td><td><input type="number" id="inp${item}"class="form-control" value="${cart[item].quantity}" oninput="changeQuantity(${item})" min="1"></td><td>${cart[item].quantity*cart[item].price}</td><td><button class="btn btn-danger" onClick="deleteCartItem(${item})">Delete</button></td></tr>`
            quantity += cart[item].quantity
            total += (cart[item].quantity*cart[item].price)
        }
        temp += `<tr><td><strong>Total</strong></td><td></td><td>${quantity}</td><td>${total}</td><td></tr>`
        h.innerHTML = temp+"</table>"
    }
}
function viewCart(){
    populateCart()
    $('#cartModal').modal('show')
    $("#cart-alert").hide();
}
function checkout(){
    var cartAlert = document.getElementById('cart-alert')
    if(cart.length <= 0){
        cartAlert.innerText = "You cannot checkout with empty cart"
        $("#cart-alert").show();
        return
    }
    cartAlert.innerText = "You have successfully checked out"
    $("#cart-alert").show();
    setTimeout(function(){
        $("#cart-alert").hide(); 
    }, 2000);
    //window.location.href="success.html"

}
function changeQuantity(index){
    var inp = document.getElementById(`inp${index}`)
    q = inp.value
    cart[index].quantity = parseInt(q)
    console.log(cart)
    populateCart()
}