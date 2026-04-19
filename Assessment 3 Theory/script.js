let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

updateCartUI();

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=50');
  const data = await res.json();
  return data.products;
}

function updateCartUI() {
  document.getElementById('cartCount').textContent = cart.length;
}

function toggleCart() {
  const dropdown = document.getElementById('cartDropdown');
  dropdown.style.display =
    dropdown.style.display === 'block' ? 'none' : 'block';

  renderCart();
}

/* ✅ FIXED ADD */
function addToCart(id) {
  const product = allProducts.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      qty: 1
    });
  }

  saveCart();
}

/* ✅ FIXED CART (NO IMAGE) */
function renderCart() {
  const container = document.getElementById('cartItems');

  if (cart.length === 0) {
    container.innerHTML = "<p style='padding:10px;'>Cart is empty</p>";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const price = Number(item.price);
    const qty = Number(item.qty);

    total += price * qty;

    return `
      <div class="cart-item">

        <div class="cart-info">
          <p>${item.title}</p>
          <p>₹${price}</p>

          <div class="qty">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>

        <span class="remove-btn" onclick="removeItem(${index})">❌</span>
      </div>
    `;
  }).join('') + `
    <div class="cart-footer">
      <h3>Total: ₹${total}</h3>
      <button class="buy-btn" onclick="checkout()">Proceed to Buy</button>
    </div>
  `;
}

/* QTY */
function increaseQty(index) {
  cart[index].qty++;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  renderCart();
}

function checkout() {
  alert("✅ Order Placed!");
  cart = [];
  saveCart();
}

/* PRODUCTS */
function render(products) {
  const grid = document.getElementById('grid');

  grid.innerHTML = products.map(p => {
    const discounted = p.price - (p.price * p.discountPercentage / 100);

    return `
      <div class="card">
        <img src="${p.thumbnail}" />
        <div class="card-body">
          <p>${p.title}</p>
          <p>₹${discounted.toFixed(2)}</p>
        </div>
        <div class="card-buttons">
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `;
  }).join('');
}

/* INIT */
(async function init(){
  allProducts = await fetchProducts();
  render(allProducts);
})();