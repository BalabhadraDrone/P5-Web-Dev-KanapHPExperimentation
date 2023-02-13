// Created a function for the product page

function displaySingleProduct(productInfo) {
  // Targeted the html parent container that hold the image, name, price etc.
    let soloContainer = document.getElementsByClassName('item');
    let title = document.getElementById('title')
    title.textContent = productInfo.name
    
    let price = document.getElementById('price')
    price.textContent = productInfo.price
  
    let details = document.getElementById('description')
    details.textContent = productInfo.description

    let picture = document.getElementsByClassName('item__img')[0];
    picture.innerHTML = `  <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">  `;

    let colorsOption = document.getElementById('colors')
    productInfo.colors.forEach((element) => {
    colorsOption.innerHTML += `<option value="${element}">${element}</option>`;
    });
}

// For The Quantity
let addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', () => {
  let cart = localStorage.getItem('cart');
  let color = document.getElementById('colors').value;
  let quantity = document.getElementById('quantity').value;

  // if / else statments for color
  if (color == "") {
    alert("please select a color");
  }
  else {
    let products = [];

    if (cart == null) {
      products.push({ _id: id, quantity: parseInt(quantity), color: color});
      localStorage.setItem('cart', JSON.stringify(products));
    }
    else {

      let cart = JSON.parse(localStorage.getItem('cart'));
      let index = cart.findIndex((object) => object._id == id && object.color == color);

      if (index != -1) {

        cart[index].quantity += parseInt(quantity);
      }
      else {
        cart.push({ _id: id, quantity: parseInt(quantity),color: color });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
})

//http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926

let productId = new URLSearchParams(window.location.search).get('id')
// Third Attempt on the Product Page. Repeated fetch data from the main script file, this time adding the underscore to the id portion. 
fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json())
.then((data) => {
  displaySingleProduct(data);
})
// Establishing error protocols. Placing a custom error message using query selector . textContent. Unsure about the purpose for console.error.
.catch((error) => {
  document.querySelector('h1').textContent = 'No way, Brozay!';
  console.error('Error: ', error);
});