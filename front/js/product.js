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

let addToCartElement = document.getElementById('addToCart');
    addToCartElement.addEventListener("click", () => {
      let cart = localStorage.getItem('cart');
      let color = document.getElementById('colors').value;
      let quantity = document.getElementById('quantity').value;

      //If Statement for the color and quantity selection
      if (color == "") {
        alert("Oops! Forgot The Color!");
      }

      if (quantity == [0]) {
        alert("Please Add Selection");
      }
      else {
        quantity.push(quantity);
      }
      localStorage.setItem("_id", JSON.stringify(_id));
    });

