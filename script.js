/* Products Data */
const products = [
  {
    id: 1,
    name: "Bluetooth Headphones",
    price: 499,
    image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 799,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 999,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 299,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 1299,
    image: "https://images.unsplash.com/photo-1625130694338-4110ba634e59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    name: "i-Pad",
    price: 49999,
    image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

let cartItems = [];
let cartTotal = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // ADOBE DATA LAYER: PAGE VIEW
  window.adobeDataLayer.push({
    "event": "pageView",
    "page": {
      "pageName": "EasyBuy Home",
      "siteSection": "Electronics",
      "language": "en-US"
    }
  });
});
/* --- Navigation & Hero Tracking --- */
document.getElementById('nav-products').addEventListener('click', () => {
  window.adobeDataLayer.push({ "event": "navClick", "linkName": "Products Link" });
});

document.getElementById('heroShopBtn').addEventListener('click', () => {
  window.adobeDataLayer.push({ "event": "heroClick", "buttonName": "Shop Now" });
});





function renderProducts() {
  const productSection = document.getElementById('products-section');
  if (!productSection) return;

  productSection.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  cartTotal += price;
  updateCartUI();

  window.adobeDataLayer.push({
    "event": "cartAdd",
    "product": {
      "productName": productName,
      "price": price,
      "currency": "INR"
    },
    "cart": {
      "totalValue": cartTotal,
      "itemCount": cartItems.length
    }
  });

  console.log(`${productName} added to cart`);
}

function updateCartUI() {
  // Update count in header
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.innerText = cartItems.length;

  // Update total in modal
  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.innerText = cartTotal;

  // Update list in modal
  const list = document.getElementById("cartItemsList");
  if (list) {
    list.innerHTML = "";
    cartItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name}</span>
        <span>₹${item.price} <button onclick="removeFromCart(${index})" class="remove-btn">x</button></span>
      `;
      list.appendChild(li);
    });
  }
}

function removeFromCart(index) {
  const item = cartItems[index];
  
  // ADOBE DATA LAYER: REMOVE FROM CART
  window.adobeDataLayer.push({
    "event": "cartRemove",
    "product": { "name": item.name, "price": item.price }
  });
  });
  // -----------------------------

  cartTotal -= item.price;
  cartItems.splice(index, 1);
  updateCartUI();
}

function toggleCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;

  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
  window.adobeDataLayer.push({
    "event": isOpening ? "cartOpened" : "cartClosed",
    "cartValue": cartTotal
  });
  
}


// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Attach event listener to the cart button
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
  cartBtn.addEventListener('click', toggleCart);
}
// Add click listeners for tracking modal buttons
document.getElementById('cartBtn').addEventListener('click', toggleCart);
document.getElementById('closeCartBtn').addEventListener('click', toggleCart);

/* --- Checkout Tracking --- */
document.getElementById('checkoutBtn').addEventListener('click', () => {
  // TRACK: Checkout Initiated
  window.adobeDataLayer.push({
    "event": "checkoutClick",
    "cartData": {
      "revenue": cartTotal,
      "itemCount": cartItems.length,
      "items": cartItems.map(i => i.name)
    }
  });
  alert('Checkout action captured in Data Layer!');
});
