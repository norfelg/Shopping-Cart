const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
const hideCart = document.getElementById("hide-cart-btn")
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Tamis Signature",
    price: 9.45,
    category: "Single Pizza",
  },
  {
    id: 2,
    name: "Pepperoni",
    price: 9.99,
    category: "Single Pizza",
  },
  {
    id: 3,
    name: "Margarita",
    price: 9.69,
    category: "Single Pizza",
  },
  {
    id: 4,
    name: "Kima",
    price: 8.99,
    category: "Single Pizza",
  },
  {
    id: 5,
    name: "Zatar Labna",
    price: 10.99,
    category: "Single Pizza",
  },
  {
    id: 6,
    name: "Chicken Round",
    price: 2.99,
    category: "Single Pizza",
  },
  {
    id: 7,
    name: "Musakhan",
    price: 9.99,
    category: "Single Pizza",
  },
  {
    id: 8,
    name: "Triple Cheese",
    price: 4.99,
    category: "Single Pizza",
  },
  {
    id: 9,
    name: "Kinza Cola",
    price: 3.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road",
    price: 18.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Penne Pasta",
    price: 35.99,
    category: "Pasta",
  },
  {
    id: 12,
    name: "Flask (Karak)",
    price: 25.99,
    category: "Drink",
  },
];

products.forEach(
  ({ name, id, price, category }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">QR ${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `[${currentProductCount}]x`
      : productsContainer.innerHTML += `
      <div id="dessert${id}" class="product cartItem">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p class="price">QR${price}</p>
      </div>
      
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `QR ${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `QR ${tax.toFixed(2)}`;
    cartTotal.textContent = `QR ${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener('click', ()=>{
  isCartShowing = !isCartShowing;
  cartContainer.style.display = isCartShowing? "Block": "none"
})

hideCart.addEventListener("click", ()=>{
  isCartShowing = !isCartShowing;
  cartContainer.style.display = isCartShowing ? "Block": "none"
})

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart))