
// The functionality of the web Start here
// 1ST Step is to target the shop div element inside the index
// Below code is used to target the shop div element
let shop = document.getElementById("shop");

// 2ND Step
// Below code is used to create a Basket array object and fetching the data from localstorage
let basket =JSON.parse(localStorage.getItem("data")) || [];

// 3RD Step is to create a function that will generate each item inside the shop div element
// Below code is use to create a function to generate the item inside the shop div element
// Below start the code to generateShop function
const generateShop = () => {

    // The foodItemData is an array of an object inside the data.js
    const shopHTML = foodItemData.map((cartx) => {

        let {id, image, name, category, price } = cartx

        // Below code is used to search the basket if their is data inside it
        let searchCart = basket.find((cartx) => cartx.id === id) || []

        // Below code is used to check if searchCart is empty
        if (!searchCart) {
            console.log("Search Cart is empty")
        }

        let buttonHTML = searchCart.quantity ? `
            <div class="quantityDiv"> 
                <img src="./assets/images/icon-decrement-quantity.svg" alt="" onclick="removeFromCart(${id})" >
                    <p>${search.quantity}</p> 
                    <img src="./assets/images/icon-increment-quantity.svg" alt="" onclick="addToCart(${id})" > 
            </div> 
        `
        : 
        `
            <p class="cart" onclick="addToCart(${id})"> 
                <img src="./assets/images/icon-add-to-cart.svg" alt=""> 
                Add to Cart 
            </p> 
        `; 
        {/* // End of the button code */}

        // Start of template function 
        return `

            <!-- Below is the list product Div 1  -->
            <div class="listProductDiv" id=item-id-${id}>
               <div class="imgButtonDiv">
                    <img src=${image.desktop} alt="" class="img1">
                    ${buttonHTML}
               </div>

                <!-- Below code show the details of the product  -->
                <div class="details">
                    <p class="productName">${category}</p>
                    <p class="productDesc"> ${name}</p>
                    <p class="price">$${price.toFixed(2)}</p>
                </div> 
            </div>
        `;
        // End of template function 
    }).join("");


    shop.innerHTML = shopHTML;
};
// End start the code to generateShop function


// Below code is used to call the function to generate the item inside the shop div element
generateShop();


// 4TH Step is to create a function that will target the button plus and minus button with update
// Below code is used to create a ADD TO CART function
let addToCart = (id) => {
    let cartId = id;

    // Below code is used to searchCart
    let searchCart = basket.find((cartx) => cartx.id === cartId.id);

    // Set the conditions for searchCart
    if (searchCart === undefined) {
        
        // Below code is used to add item to the basket array
        basket.push({
            id: cartId.id,
            item: 1
        });
    } else {
        // Below code is used to increment the search item
        searchCart.item +=1
    }

    console.log(basket)
    update(cartId.id);

    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(basket)); 
  

    generateCartItem();

}
// End of ADD TO CART function



// Below code is used to create  a  REMOVE FROM CART function
let removeFromCart = (id) => {
    let cartId = id;

    // Below code is used to searchCart
    let searchCart = basket.find((cartx) => cartx.id === cartId.id);

    // Below code is the if esle condition
    if(searchCart === undefined) return;
    else if(searchCart.item === 0) return;
    else  {
        // Below code is used to reduce the search item
        searchCart.item -=1;
    }

    update(cartId.id);
    // console.log("Minus is Working");
    basket = basket.filter((x) => x.item !== 0);

    generateCartItem();
    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(basket));

}
// End of REMOVE FROM CART function


// Below code is used to create an UPDATE function
let update = () => {

    // Below code is used to searchCart
    let searchCart = basket.find((cartx) => cartx.id === id);
    console.log(searchCart.item)

    // Below code is used to call the function calculator
    calculator()

    totalAmount();
}
// End of UPDATE function

// Below code is used to get the Total Quantity
const getTotalQuantity = () => {
    return basket.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );
}

// Below code is used to create a CALCULATE function
// Below code is used to display total amount ontop of the basket
let calculator = () => {
    document.getElementById("cartAmount").innerHTML =
    `Your Cart (${getTotalQuantity()})`;
}
// End of CALCULATOR function



// Below code is used to call the function calculator
calculator();



// ------------- SHOPPING CART SECTION OF THE WEB -----------------------------
// Below code is used to target the label inside the cart.html
let label = document.getElementById("label");
// Below code is used to target the shoppingcart div inside the cart.html
let shoppingcart = document.getElementById("shoppingCarts");


// Below code is used to create a generateCart function
let generateCartItem = () => {

    // Below code is used to check if the basket is greater than 0
    if (basket.length !==0) {
        
        let cartHTML = basket.map((x) => {
            let {id, item} = x;

            // Below code is used to create a search inside the basket
            // Below foodItemData is inside the data.js
            let searchCart = foodItemData.find((y) => y.id === id) || [];

            let { name = "", price = 0 } = searchCart;
            // Below code return the Cart HTML
            return `
                <div class="" id="shoppingCarts">
                    <p class="cartName">${searchCart.name} with Berries</p>
                    <div class="cartPriceDiv">
                        <div class="cartPrice">    
                            <p class="">${searchCart.item}x</p>
                            <p class="">@ $${(searchCart.price).toFixed(2)}</p>
                            <p class="">$ ${(searchCart.item * searchCart.price).toFixed(2)}</p>
                        </div>
                        <img src="./assets/images/icon-remove-item.svg" alt="" class="removeBTN" onclick="removeItem(${id})">
                    </div>

                </div>
            `;
        }).join(" ");

        shoppingcart.innerHTML = cartHTML;

    } else {
        shoppingcart.innerHTML = 
        `<div class="emptyCart"> 
            <img src="./assets/images/illustration-empty-cart.svg" alt="" class="emptyCartImg" /> 
            <p class="emptyCartText">
                Your added items will appear here
            </p> 
        </div> `; 
        
    }
}
// End of GENERATE CART ITEM function


// Below code is used to call the generateCartItem
generateCartItem();



// Below code is used to remove item from the cart basket
let removeItem = (id) => {
    let cartId = id;
    basket = basket.filter((x) => x.id !== cartId.id);

    generateCartItem();
    totalAmount();
    calculator();
    //  Below code is use to save on the localstorage
    localStorage.setItem("data", JSON.stringify(basket));
};



// Below code is used to generate Total Amount
let totalAmount = () => {
    if(basket.length !==0) {
        let amount = basket.map((x) => {
            let {item, id} =x;
            let searchCart = foodItemData.find((y) =>y.id === id) || [];
            return item * searchCart.price;
        }).reduce((x,y) => x+y, 0);
        label.innerHTML = `
        <div class="totalPrice" id="label">
            <p>Order Total</p>
            <p>$ ${amount}</p>
        </div>
        <button class="checkout" onclick="checkoutBtn()" id="checkoutBtn">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        <!---- Below code is the Modal-Box Pop-pu---->
        <!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Your Total Bill is $ ${amount} Please Proceed to Payment Page</h2>
                <a href="https://paystack.com/pay/0k11jyecpz"><button class="addToCart payment">Payment</button></a>
            </div>
        </div>
        `;
    } else return;
}; 



totalAmount();



// Below code is use to create a Box-Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var checkoutBtn = document.getElementById("checkoutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
checkoutBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}