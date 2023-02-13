// The `listAllProducts` function (which was also used within the `.then(data)` listener) is declcared (positioned before the fetchAPI). Within the `listAllProducts` function `productsList` serves as the (object data?).
function listAllProducts(productsList) {

// a let variable is declared with the title of `productsDisplayArea` that equals to the linked HTML document it is drawn from the "items" ID tag from said document using the `.getElementById (property?)`.
  let productsDisplayArea = document.getElementById('items');

  // Using the for Loop declaration `product (unknown source)` of `productList` (object data within `listAllProducts`) is used to get the data before displaying them on the index page
  for (product of productsList) {

    // a let variable is declared with the title of `productInformation` that equals to a creation of a new HTML element using `createElement`. A hyperlink is created - as of now the purpose is unknown.
    let productInformation = document.createElement('a');

    //an innerHTML property is used for `productInformation` (along with the hyperlink) to create new HTML tags solely through this JavaScript file. The '${}' notation links to the backend Product.js page (for all eight products). `product` represents the source page followed by `.` followed by the specific property. All tags are nested within the anchor tag containing the product ID.
    productInformation.innerHTML = `
      <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;

    // A new declaration is made (`productsDisplayArea`) using `appendChild`, `productInformation` is used as an (object?) to display the innerHTML tags.
    productsDisplayArea.appendChild(productInformation);
  }
}

// The Starting Point: Fetching the API data from the Backend Products.js file (from the models folder). Retrieve data from said file using `listAllProducts` as a function and (data) for the rescource that the function is drawing from.
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    listAllProducts(data);
  })
  // Establishing error protocols. Placing a custom error message using query selector . textContent. Unsure about the purpose for console.error.
  .catch((error) => {
    document.querySelector('h1').textContent = 'No way, Brozay!';
    console.error('Error: ', error);
  });