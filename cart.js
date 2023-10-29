const cart_msg = document.getElementById('cart-msg');
const cart_items = document.getElementById('cart-items');
const overlay = document.getElementById('overlay');

function productName(productimage, productname, productprice) {

    if (localStorage.getItem('cartProducts')) {
        console.log("Adding item in an existing cart ...");
        let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

        const addtocart = {
            name: productname,
            price: productprice,
            image: productimage
        }

        console.log(cartProducts);

        cartProducts.push(addtocart);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        cartcheck();

    } else {

        console.log("Adding 1st item in cart ...")
        let cartProducts = [];
        const addtocart = {
            name: productname,
            price: productprice,
            image: productimage
        }

        cartProducts.push(addtocart);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        cartcheck();
    }

}

function cartcheck() {
    if (localStorage.getItem('cartProducts') && JSON.parse(localStorage.getItem("cartProducts")).length>0) {

        cart_msg.style.display = 'none';
        cart_items.style.display = 'block';
        cart_items.innerHTML = JSON.parse(localStorage.getItem("cartProducts")).length;

    } else {
        cart_msg.style.display = 'block';
        cart_items.style.display = 'none';
    }
}

document.onload = cartcheck();

var cart_detail = document.getElementById("cart-detail");

function cartdetail() {

    if (localStorage.getItem('cartProducts') && JSON.parse(localStorage.getItem("cartProducts")).length>0) {

    overlay.style.display = "block";
    document.body.style.overflow="hidden";
    closeCheckout.style.display = "none";
    cart_detail.style.display = "block";

    const cartProducts = document.getElementById("cart-products");

   const productsInCart = JSON.parse(localStorage.getItem("cartProducts")).map((product, index) => {

   return `
   <div class="cart-item">
       <div class="cart-product-image"><img src="${product.image}" width="70" height="70" alt=""></div>
       <div class="cart-product-name">${product.name}</div>
       <div class="cart-product-price">Rs. ${product.price}</div>
       <div class="cart-product-remove"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgN-h-znxO7YB7HaHpS-zC7Tkjx6xpWo3emDuC-5vLwQxYE0ouI8ugYG99SU7V2jw8D2bLOetfm7FYPS7eu61jrP9NeLhutc2yi8AQbUYz4IRmGzMrYlEb1qJyGEc_Lx2Abj94L4ndrfNief2DFTe7CHwXTswfwpaKdusSSSS-LFchSZxVDpg6f127Pm7k/s1600/minimize.png" onclick="removeitemfromcart(${index});" alt=""></div>
   </div>

   `

   }).join('');

    cartProducts.innerHTML = productsInCart;

    // prints the sum of cart start //

   let totalbill = 0;

   for (var i = 0; i < JSON.parse(localStorage.getItem("cartProducts")).length; i = i + 1) {

       totalbill = totalbill + JSON.parse(localStorage.getItem("cartProducts"))[i].price;
   }

    var productsSum = document.getElementById("products-sum");
    productsSum.innerHTML = "Total: Rs. <strong>"+ totalbill + "</strong>";

    // prints the sum of cart end //
    }
}

function closebtn() {
    cart_detail.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow="auto";
}

function removeitemfromcart(productIndex) {
    console.log("Item has been removed from your cart ...!");
    var cartList = JSON.parse(localStorage.getItem("cartProducts"));
    cartList.splice(productIndex, 1);

    localStorage.setItem("cartProducts", JSON.stringify(cartList));
    cart_items.innerHTML = JSON.parse(localStorage.getItem("cartProducts")).length;

    if (JSON.parse(localStorage.getItem("cartProducts")).length<1) {
        cart_msg.style.display = 'block';
        cart_items.style.display = 'none';
        overlay.style.display = "none";
        closebtn();
    } else {
        cartdetail(); // fetch all records from local storage and display on cart for buyer
    }

}


document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        // console.log("Browser tab is hidden");
        cartcheck();
        closeChkbtn();
        closebtn();
    } else {
        // console.log("Browser tab is visible");
        cartcheck(); // this function checks the local storage and update the cart flags accordingly ...
    }
});


// checkout page products start //

const checkoutFormRightSide = document.getElementById("checkout-form-right-side");

var closeCheckout = document.getElementById("checkout-form");

function showChkbtn() {
    closeCheckout.style.display = "block";
    cart_detail.style.display = "none";
    document.body.style.overflow="none";

    const checkoutPageProducts = JSON.parse(localStorage.getItem("cartProducts")).map((product, index) => {

        return `
        <div class="cart-item">
            <div class="cart-product-image"><img src="${product.image}" width="70" height="70" alt=""></div>
            <div class="cart-product-name">${product.name}</div>
            <div class="cart-product-price">Rs. ${product.price}</div>
        </div>
        `

        }).join('');

        let totalbill = 0;

        for (var i = 0; i < JSON.parse(localStorage.getItem("cartProducts")).length; i = i + 1) {
            totalbill = totalbill + JSON.parse(localStorage.getItem("cartProducts"))[i].price;
        }

        const totalpayable = `
        <div class="cart-item">
            <div class="cart-product-name billdes">Total Payable Amount</div>
            <div class="cart-product-price billamt">Rs. ${totalbill}</div>
        </div>
        `;

        checkoutFormRightSide.innerHTML = checkoutPageProducts + totalpayable;
}

function closeChkbtn() {
    closeCheckout.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow="auto";
}

// checkout page products end //

// cheat sheet //

// document.getElementById("demo").innerHTML = "Hello World";
// console.log(JSON.parse(localStorage.getItem("cartProducts")).length);
// console.log("You have " + JSON.parse(localStorage.getItem("cartProducts")).length + " item(s) in your cart.");
// console.log(JSON.stringify(cartProducts));
// console.log(localStorage.getItem('cartProducts'));

// const cart_msg = document.getElementById('cart-msg');
// const cart_items = document.getElementById('cart-items');

/* add overflow-hidden when users open the modal */
/* $('body').css("overflow", "hidden"); */
/* add overflow-auto when users close the modal */
/* $('body').css("overflow", "auto"); */

/* cheat sheet end */


// let closebtn = document.getElementById("close-cart-detail");

//closebtn.addEventListener("click", function() {
//    cart_detail.style.display = "none";
//    document.body.style.overflow="auto";
//});