
// import { foodData } from "./data.js";


// The functionality of the website is here
// 1ST Step is to target the container div element inside the index
// Below code is used to target the container div element
let container = document.getElementById("container");


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
        let search = foodBasket.find((item) => item.id === id) || {};

        // Below code is the UI of the button that will be displayed on the website
        // Start of the button code
        
        const buttonHTML = search.quantity > 0 ? 
        `<div class="quantityDiv">
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
   return container.innerHTML = html;

};



// 4TH Step is to call the generateShop function to display the items on the website
generateShop();


// 5TH Step is to create a function that will add the item to the cart when the user clicks on the add to cart button
// Below code is used to create a function that will add the item to the cart when the user clicks on the add to cart button
let addToCart = (id) => {
    // The search method is used to find the item inside the basket array object
    let search = foodBasket.find((item) => item.id === id);
    // CHECK IF ITEM EXISTS IN CART
    if (search === undefined) {
        foodBasket.push({
            id: id,
            quantity: 1,
        });
    }   
    else {
        search.quantity += 1;
    }

    // Below code is used to save the data to localstorage
    localStorage.setItem("data", JSON.stringify(foodBasket));

    // Below code is used to call the generateShop function to update the UI of the website
    generateShop();
};

// 6TH Step is to create a function that will remove the item from the cart when the user clicks on the remove from cart button
// Below code is used to create a function that will remove the item from the cart when the user clicks on the remove from cart button
let removeFromCart = (id) => {
    // The search method is used to find the item inside the basket array object
    let search = foodBasket.find((item) => item.id === id);
    // CHECK IF ITEM EXISTS IN CART
    if (search === undefined) return;
    else if (search.quantity === 0) return;
    else {
        search.quantity -= 1;
    }   

    // Below code is used to save the data to localstorage
    localStorage.setItem("data", JSON.stringify(foodBasket));

    // Below code is used to call the generateShop function to update the UI of the website
    generateShop();
};

// 7TH


// 7TH Step is to create a function that will calculate the total price of the items in the cart and display it on the website
// Below code is used to create a function that will calculate the total price of the items in the cart and display it on the website
let calculateTotal = () => {
    cartonIcon = document.getElementById("total");
    cartonIcon.innerHTML = `Your Cart (${foodBasket.map((item) => item.quantity).reduce((x,y) => x+y,0)})`;
};


calculateTotal();



