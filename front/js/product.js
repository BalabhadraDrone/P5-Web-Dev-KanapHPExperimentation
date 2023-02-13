// Created a function for the product page

function displaySingleProduct(productInfo) {
    // Targeted the html parent container that hold the image, name, price etc.
      let soloContainer = document.getElementsByClassName('item');
    
      for (info of product) {
    
        //Tried to create a div with the createElement feature
        let singleDisplay = document.createElement('div');
    
        //Tried to use innerHTML to display the image, name, price and description
        singleDisplay.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h1 class="productName">${product.name}</h1>
        <h4 class="productPrice">${product.price}</h4>
        <p class="productDescription">${product.description}</p>
        `;
    
        soloContainer.appendChild(singleDisplay);
      }
    }
    
    // (Reference) A new let variable is created with the id drawn from the html, a click event option is available for the cart, colors and quantity (never encountered localStorage - will research later)
    let addToCartElement = document.getElementById("addToCart");
    addToCartElement.addEventListener("click", () => {
      let cart = localStorage.getItem("cart");
      let color = document.getElementById("colors").value;
      let quantity = document.getElementById("quantity").value;
    
      // (Reference) if/else statements for the color toggle, there's an alert message if  left blank. The [] result is based on the ID, quantity and color associated with the ID. localStorage is used again for setItem. JSON.stringify (referesher) converted the product data(?).
      if (color == "") {
        alert("please select a color");
      }
      else {
        let products = [];
    
        if (cart == null) {
          listAllProducts.push({ _id: id, quantity: parseInt(quantity), color: color });
          localStorage.setItem("cart", JSON.stringify(products));
        }
        else {
    
          let cart = JSON.parse(localStorage.getitem("cart"));
          let index = cart.findIndex((object) => object._id == id && object.color == color);
    
          if (index != -1) {
    
            cart[index].quantity += parseInt(quantity);
          }
          else {
            cart.push({ _id: id, quantity: parseInt(quantity), color: color });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
    
    // Third Attempt on the Product Page. Repeated fetch data from the main script file, this time adding the underscore to the id portion. 
    fetch(`http://localhost:3000/api/products/${productInfo._id}`)
      .then((response) => response.json())
      .then((data) => {
        displaySingleProduct(data);
      })
      // Establishing error protocols. Placing a custom error message using query selector . textContent. Unsure about the purpose for console.error.
      .catch((error) => {
        document.querySelector('h1').textContent = 'No way, Brozay!';
        console.error('Error: ', error);
      });