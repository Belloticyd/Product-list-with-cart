
// import { foodData } from "./data.js";


// The functionality of the website is here
// 1ST Step is to target the container div element inside the index
// Below code is used to target the container div element
let container = document.getElementById("container");
let cartonIcon = document.getElementById("total");


// 2ND Step
// Below code is used to create a basket of an array object
// Below code is used to create a Basket array object and fetching the data from localstorage
let foodBasket = JSON.parse(localStorage.getItem("data")) || [];


// 3RD Step is to create a function that will generate each item inside the container div element
// Below code is use to create a function to generate the item inside the container div element
let generateShop = () => {  
   
    // The shopItemData is an array of an object inside the data.js
    let html = foodItemData.map((item) => {

        // The id, name, price and image are the properties of the object inside the data.json
        let { id, image, name, price, category  } = item;

        // The search method is used to find the item inside the basket array object
        // CHECK IF ITEM EXISTS IN CART
        let search = foodBasket.find((item) => item.id === id);

        // Below code is the UI of the button that will be displayed on the website
        // Start of the button code
        
        const buttonHTML = search && search.quantity > 0 ? 
        `   
            <div class="quantityDiv">
                <img 
                    src="./assets/images/icon-decrement-quantity.svg"
                    alt=""
                    onclick="removeFromCart(${id})"
                >
                <p>${search.quantity}</p>
                <img src="./assets/images/icon-increment-quantity.svg"
                    alt=""
                    onclick="addToCart(${id})"
                >
            </div>
            
        `
        : 
        `
            <p class="cart" onclick="addToCart(${id})">
                <img src="./assets/images/icon-add-to-cart.svg" alt="">
                Add to Cart
            </p>
        `;
        // End of the button code

        return `
            <!-- Below is the list product Div 1 -->
            <div class="listProductDiv" id="listProductDiv-${id}">
               <div class="imgButtonDiv">
                    <img src=${image.desktop} alt=${name} class="img1">
                    ${buttonHTML}
               </div>

                <!-- Below code show the details of the product -->
                <div class="details">
                    <p class="productName">${name}</p>
                    <p class="productDesc"> ${category}</p>
                    <p class="price">$${price.toFixed(2)}</p>
                </div>
            </div>

        `;

    }).join("");


    // DISPLAY HTML
   container.innerHTML = html;

};



// 4TH Step is to call the generateShop function to display the items on the website
generateShop();


// 5TH Step is to create a function that will add the item to the cart when the user clicks on the add to cart button
// Below code is used to create a function that will add the item to the cart when the user clicks on the add to cart button
let addToCart = (id) => {
    // The search method is used to find the item inside the basket array object

    id = Number(id);
    // Below code is used to create a search function
    let search = foodBasket.find((item) => item.id === id);
    // Below code is the if esle condition
    if(!search) {
        // Below code is used to add item to the basket array
        foodBasket.push({
            id: id,
            quantity: 1
        });

    } else {
        // Below code is used to increment the search item
        search.quantity +=1;
    }
    // console.log(foodBasket)
    update();

    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(foodBasket)); 
};

// 6TH Step is to create a function that will remove the item from the cart when the user clicks on the remove from cart button
// Below code is used to create a function that will remove the item from the cart when the user clicks on the remove from cart button
let removeFromCart = (id) => {
    // The search method is used to find the item inside the basket array object
    id = Number(id);
    // Below code is used to create a search function
    let search = foodBasket.find((item) => item.id === id);
    // Below code is the if esle condition
    if(!search) return;
    search.quantity -=1;

    foodBasket = foodBasket.filter((item) => item.quantity > 0);

    update();
    // console.log("Minus is Working");

    //Below code is used to save on the local Storage
    localStorage.setItem("data", JSON.stringify(foodBasket));
};



// 7TH step is to create a function that will update the quantity of the item in the cart when the user clicks on the add to cart or remove from cart button
let update = (id) => {
    // The search method is used to find the item inside the basket array object
    
    let search = foodBasket.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
    
    cartonIcon.innerHTML = `Your Cart (${search})`;
    // console.log(search.quantity);
    
    generateCart();
    // Below code is used to call the function calculator
    calculateTotal();
};




// 8TH Step is to create a function that will calculate the total price of the items in the cart and display it on the website
// Below code is used to create a function that will calculate the total price of the items in the cart and display it on the website
let calculateTotal = () => {
    let totalQty = foodBasket.reduce((sum, item) => {
        return sum + (item.quantity || 0);
    }, 0);

    cartonIcon.innerHTML = `Your Cart (${totalQty})`;
};


// Below code is uswed to call the function calculateTotal to display the total price of the items in the cart on the website
calculateTotal();


// END OF THE FIRST PART OF THE FIRST DIV INSIDE THE HTML


// START OF THE SECOND PART OF THE SECOND DIV INSIDE THE HTML

let cartContainer = document.getElementById("carts");

// Below code is used to create a generateCart function
let generateCart = () => {

    // Below code is used to check if the foodBasket array is not empty then it will display the items in the cart otherwise it will display the empty cart message
    if(foodBasket.length !== 0) {

        let cartHTML = foodBasket.map((item) => { 
            let { id, quantity } = item;

            // Below code is used to create a search inside the basket
            // Below shopItemData is inside the data.js
            let search = foodItemData.find((data) => data.id === id) || {};
            let { name = "", price = 0 } = search;
            return `
                <div class="cartItem">
                   <p class="cartName">${name}</p>
                    <div class="cartPriceDiv">
                        <div class="cartPrice">    
                            <p class="">${quantity}x</p>
                            <p class="">@ $${price.toFixed(2)}</p>
                            <p class="">$${(quantity * price).toFixed(2)}</p>
                        </div>
                        <img src="./assets/images/icon-remove-item.svg" alt="" class="removeBTN" onclick="removeItem(${id})">
                    </div>
                </div>
            `;
        }).join("");

        cartContainer.innerHTML = cartHTML;
        
    } else {
       
        cartContainer.innerHTML = `
            <div class="emptyCart">
                <img src="./assets/images/illustration-empty-cart.svg" alt="" class="emptyCartImg">
                <p class="emptyCartText">Your added items will appear here</p>
            </div>
        `;
    }
};



generateCart();


// Below code is used to remove item from the cart basket
let removeItem = (id) => {
    
    foodBasket = foodBasket.filter((item) => item.id !== id);

    update();
    generateCart();
    calculateTotal();
    //  Below code is use to save on the localstorage
    localStorage.setItem("data", JSON.stringify(foodBasket));
};



