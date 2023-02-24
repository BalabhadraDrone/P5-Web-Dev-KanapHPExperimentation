// Created a function for the product page. (Post-Session 2.20.23) Combining the display with the click events

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

    let addToCartElement = document.getElementById('addToCart');
    addToCartElement.addEventListener("click", () => {
      let cart = localStorage.getItem('cart');
      let color = document.getElementById('colors').value;
      let quantity = document.getElementById('quantity').value;

      //If Statement for the color selection
      if (color == "") {
        alert("Oops! Forgot The Color!");
      }

      if (quantity == [0]) {
        alert("Please Add Selection");
      }
    });
}



// Added a let declaration for the product ID with Search Parameters prior to the fetch API

let productId = new URLSearchParams(window.location.search).get('id')
// Should be the Final Attempt on the Product Page. Repeated fetch data from the main script file. The '${}' is used to draw data from the product page.
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

/* Unrelated - For Reference Only
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}*/
