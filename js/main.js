/**
 * ==========================================================================
 * THE FASHION SENSE - MAIN APPLICATION ENGINE
 * --------------------------------------------------------------------------
 * Cart, Wishlist, Quickview, Mobile Menu & Dynamic Interactivity
 * ==========================================================================
 */

// Initialize Cart & Wishlist from localStorage
let cart = JSON.parse(localStorage.getItem('tfs_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('tfs_wishlist')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCartDrawer();
  updateHeaderBadges();
  renderMiniCart();
  initToast();
  initQuickViewModal();

  // Page Specific Inits
  if (document.getElementById('home-products-grid')) {
    initHomePage();
  }
  if (document.getElementById('shop-products-grid')) {
    initShopPage();
  }
  if (document.getElementById('product-detail-container')) {
    initDetailPage();
  }
  if (document.getElementById('cart-items-table')) {
    initCartPage();
  }
});

/* ==========================================================================
   HEADER & MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }
}

function updateHeaderBadges() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadges.forEach(b => b.textContent = totalCartQty);

  wishlistBadges.forEach(b => b.textContent = wishlist.length);
}

/* ==========================================================================
   CART SYSTEM & OFFCANVAS DRAWER
   ========================================================================== */
function initCartDrawer() {
  const cartTriggers = document.querySelectorAll('.trigger-cart-drawer');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('closeCartDrawer');

  if (!cartDrawer || !cartOverlay) return;

  function openDrawer() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeDrawer);
}

function addToCart(productId, size = null, color = null, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : 'Standard');
  const chosenColor = color || (product.colors && product.colors.length ? product.colors[0] : '#000000');

  // Check if item already exists with exact size & color
  const existingIndex = cart.findIndex(
    item => item.id === productId && item.size === chosenSize && item.color === chosenColor
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: chosenSize,
      color: chosenColor,
      quantity: quantity
    });
  }

  saveCart();
  updateHeaderBadges();
  renderMiniCart();
  showToast(`"${product.title}" added to your bag!`);

  // If on cart page, re-render it
  if (document.getElementById('cart-items-table')) {
    initCartPage();
  }
}

function updateCartQuantity(index, newQty) {
  if (newQty <= 0) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = newQty;
  saveCart();
  updateHeaderBadges();
  renderMiniCart();

  if (document.getElementById('cart-items-table')) {
    initCartPage();
  }
}

function removeFromCart(index) {
  const removed = cart.splice(index, 1);
  saveCart();
  updateHeaderBadges();
  renderMiniCart();
  showToast(`Removed item from cart.`);

  if (document.getElementById('cart-items-table')) {
    initCartPage();
  }
}

function saveCart() {
  localStorage.setItem('tfs_cart', JSON.stringify(cart));
}

function renderMiniCart() {
  const container = document.getElementById('miniCartItems');
  const subtotalEl = document.getElementById('miniCartSubtotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4>Your bag is currently empty</h4>
        <p>Explore our latest arrivals to find your fit.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top: 15px; font-size: 0.85rem; padding: 10px 20px;">Start Shopping</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    return;
  }

  let subtotal = 0;
  let html = '';

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-variant">Size: <strong>${item.size}</strong></div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-cart-item" onclick="removeFromCart(${index})">
              <i class="fa-regular fa-trash-can"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
}

/* ==========================================================================
   WISHLIST SYSTEM
   ========================================================================== */
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = PRODUCTS_DATA.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed from wishlist.`);
  } else {
    wishlist.push(productId);
    showToast(`Saved "${product ? product.title : 'item'}" to your wishlist!`);
  }

  localStorage.setItem('tfs_wishlist', JSON.stringify(wishlist));
  updateHeaderBadges();
  updateWishlistButtons();
}

function updateWishlistButtons() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const icon = btn.querySelector('i');
    if (wishlist.includes(id)) {
      btn.classList.add('active');
      if (icon) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#ef4444';
      }
    } else {
      btn.classList.remove('active');
      if (icon) {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '';
      }
    }
  });
}

/* ==========================================================================
   PRODUCT CARD HTML GENERATOR
   ========================================================================== */
function generateProductCard(product) {
  const isWishlisted = wishlist.includes(product.id);
  const badgeHtml = product.badge 
    ? `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` 
    : '';

  const origPriceHtml = product.originalPrice 
    ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` 
    : '';

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-thumb">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        <div class="product-badge-wrap">
          ${badgeHtml}
        </div>
        <div class="product-actions-hover">
          <button class="card-action-btn btn-wishlist ${isWishlisted ? 'active' : ''}" 
                  data-id="${product.id}" 
                  title="Save to Wishlist" 
                  onclick="toggleWishlist(${product.id})">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart" ${isWishlisted ? 'style="color:#ef4444;"' : ''}></i>
          </button>
          <button class="card-action-btn" title="Quick View" onclick="openQuickView(${product.id})">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="card-action-btn" title="Add to Bag" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-bag-shopping"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryName}</div>
        <h3 class="product-title">
          <a href="product-detail.html?id=${product.id}">${product.title}</a>
        </h3>
        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <span>${product.rating}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-bottom">
          <div class="price-wrap">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${origPriceHtml}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${product.id})">
            + Add
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   HOMEPAGE CONTROLLER
   ========================================================================== */
function initHomePage() {
  const container = document.getElementById('home-products-grid');
  const tabs = document.querySelectorAll('.product-tabs .tab-btn');

  function renderTab(tabKey) {
    let filtered = PRODUCTS_DATA;
    if (tabKey !== 'all') {
      filtered = PRODUCTS_DATA.filter(p => p.tab === tabKey || (tabKey === 'new' && p.badge === 'New'));
    }
    if (filtered.length === 0) filtered = PRODUCTS_DATA.slice(0, 8);

    container.innerHTML = filtered.map(generateProductCard).join('');
    updateWishlistButtons();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.dataset.tab);
    });
  });

  // Initial load
  renderTab('all');
}

/* ==========================================================================
   SHOP PAGE CONTROLLER
   ========================================================================== */
function initShopPage() {
  const container = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-product-count');
  const sortSelect = document.getElementById('sort-products');
  const categoryInputs = document.querySelectorAll('input[name="filter-cat"]');
  const searchInput = document.getElementById('shop-search-input');

  function filterAndSort() {
    let list = [...PRODUCTS_DATA];

    // Category filter
    const selectedCats = Array.from(categoryInputs)
      .filter(i => i.checked)
      .map(i => i.value);

    if (selectedCats.length > 0 && !selectedCats.includes('all')) {
      list = list.filter(p => selectedCats.includes(p.category));
    }

    // Keyword Search
    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
    }

    // Sorting
    if (sortSelect) {
      const sortVal = sortSelect.value;
      if (sortVal === 'price-low') {
        list.sort((a, b) => a.price - b.price);
      } else if (sortVal === 'price-high') {
        list.sort((a, b) => b.price - a.price);
      } else if (sortVal === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      }
    }

    if (countEl) countEl.textContent = `${list.length} Products Found`;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <h3>No products match your criteria</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">Try clearing filters or search another keyword.</p>
        </div>
      `;
    } else {
      container.innerHTML = list.map(generateProductCard).join('');
    }

    updateWishlistButtons();
  }

  // Event Listeners
  categoryInputs.forEach(i => i.addEventListener('change', filterAndSort));
  if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
  if (searchInput) searchInput.addEventListener('input', filterAndSort);

  // Check URL query param e.g. shop.html?cat=women
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    categoryInputs.forEach(input => {
      input.checked = input.value === catParam;
    });
  }

  filterAndSort();
}

/* ==========================================================================
   PRODUCT DETAIL PAGE CONTROLLER
   ========================================================================== */
function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')) || 1;
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  document.title = `${product.title} - The Fashion Sense`;

  // Render product details
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.image];

  let thumbsHtml = galleryImages.map((img, i) => `
    <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="changeDetailImage('${img}', this)">
      <img src="${img}" alt="${product.title}">
    </div>
  `).join('');

  let sizesHtml = product.sizes.map((s, i) => `
    <button type="button" class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize(this, '${s}')">${s}</button>
  `).join('');

  let colorsHtml = product.colors.map((c, i) => `
    <span class="color-swatch ${i === 0 ? 'active' : ''}" style="background-color: ${c}" onclick="selectColor(this, '${c}')"></span>
  `).join('');

  container.innerHTML = `
    <div class="product-detail-layout">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="gallery-main">
          <img id="mainDetailImg" src="${galleryImages[0]}" alt="${product.title}">
        </div>
        <div class="gallery-thumbs">
          ${thumbsHtml}
        </div>
      </div>

      <!-- Product Information -->
      <div class="detail-info">
        <div class="breadcrumbs" style="margin-bottom: 12px; color: var(--text-muted);">
          <a href="index.html">Home</a> / <a href="shop.html?cat=${product.category}">${product.categoryName}</a> / ${product.title}
        </div>
        <h1>${product.title}</h1>
        
        <div class="product-rating" style="margin-bottom: 18px;">
          <i class="fa-solid fa-star"></i>
          <span style="font-weight: 700;">${product.rating}</span>
          <span class="rating-count">(${product.reviewsCount} verified customer reviews)</span>
        </div>

        <div class="detail-price">
          <span>${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price" style="font-size: 1.2rem;">${formatPrice(product.originalPrice)}</span>` : ''}
          ${product.badge ? `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
        </div>

        <p class="detail-desc">${product.description}</p>

        <!-- Color Selector -->
        <div style="margin-bottom: 20px;">
          <span class="selector-label">Color: <strong id="selectedColorName">Default</strong></span>
          <div class="color-options">
            ${colorsHtml}
          </div>
        </div>

        <!-- Size Selector -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <span class="selector-label" style="margin: 0;">Size: <strong id="selectedSizeName">${product.sizes[0]}</strong></span>
            <a href="#size-guide" style="font-size: 0.8rem; text-decoration: underline; color: var(--text-muted);">Size Guide</a>
          </div>
          <div class="size-boxes" id="detailSizeBoxes">
            ${sizesHtml}
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="qty-action-row">
          <div class="detail-qty-stepper">
            <button type="button" onclick="adjustDetailQty(-1)">-</button>
            <input type="text" id="detailQtyInput" value="1" readonly>
            <button type="button" onclick="adjustDetailQty(1)">+</button>
          </div>
          <button class="btn btn-primary" style="flex-grow: 1;" onclick="handleDetailAddToCart(${product.id})">
            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
          </button>
          <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})" title="Wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>

        <!-- WhatsApp Quick Order -->
        <a href="https://wa.me/94771234567?text=Hi%20The%20Fashion%20Sense,%20I'm%20interested%20in%20ordering%20${encodeURIComponent(product.title)}%20(${formatPrice(product.price)})" 
           target="_blank" 
           class="btn" 
           style="width: 100%; background-color: #25d366; color: #fff; margin-bottom: 30px;">
          <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Order via WhatsApp
        </a>

        <!-- Extra Perks -->
        <div style="border-top: 1px solid var(--border-color); padding-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.85rem;">
          <div><i class="fa-solid fa-truck-fast" style="color: var(--accent-color); margin-right: 8px;"></i> Islandwide Delivery 2-3 Days</div>
          <div><i class="fa-solid fa-rotate-left" style="color: var(--accent-color); margin-right: 8px;"></i> 7-Day Easy Exchange</div>
          <div><i class="fa-solid fa-shield-check" style="color: var(--accent-color); margin-right: 8px;"></i> 100% Genuine Fabrics</div>
          <div><i class="fa-solid fa-credit-card" style="color: var(--accent-color); margin-right: 8px;"></i> Cash on Delivery Available</div>
        </div>
      </div>
    </div>
  `;

  // Render Related Products
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = PRODUCTS_DATA.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    relatedGrid.innerHTML = related.map(generateProductCard).join('');
    updateWishlistButtons();
  }
}

// Helpers for detail page
window.changeDetailImage = function(src, thumbEl) {
  const main = document.getElementById('mainDetailImg');
  if (main) main.src = src;
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
};

let currentDetailSize = null;
let currentDetailColor = null;

window.selectSize = function(btn, size) {
  document.querySelectorAll('#detailSizeBoxes .size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentDetailSize = size;
  const nameEl = document.getElementById('selectedSizeName');
  if (nameEl) nameEl.textContent = size;
};

window.selectColor = function(el, color) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  currentDetailColor = color;
};

window.adjustDetailQty = function(delta) {
  const input = document.getElementById('detailQtyInput');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
};

window.handleDetailAddToCart = function(productId) {
  const input = document.getElementById('detailQtyInput');
  const qty = input ? parseInt(input.value) || 1 : 1;
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const size = currentDetailSize || (product.sizes ? product.sizes[0] : 'Standard');
  const color = currentDetailColor || (product.colors ? product.colors[0] : '#000000');
  addToCart(productId, size, color, qty);
};

/* ==========================================================================
   CART PAGE CONTROLLER (cart.html)
   ========================================================================== */
function initCartPage() {
  const tableBody = document.getElementById('cart-items-table');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const shippingEl = document.getElementById('cartShipping');

  if (!tableBody) return;

  if (cart.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; color: #ccc; margin-bottom: 12px; display: block;"></i>
          <h3>Your shopping cart is empty</h3>
          <p style="color: var(--text-muted); margin: 8px 0 20px;">Discover timeless styles designed to elevate your wardrobe.</p>
          <a href="shop.html" class="btn btn-primary">Browse Collections</a>
        </td>
      </tr>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (shippingEl) shippingEl.textContent = formatPrice(0);
    if (totalEl) totalEl.textContent = formatPrice(0);
    return;
  }

  let subtotal = 0;
  let html = '';

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    html += `
      <tr>
        <td style="display: flex; gap: 16px; align-items: center;">
          <img src="${item.image}" alt="${item.title}" style="width: 70px; height: 85px; object-fit: cover; border-radius: 6px;">
          <div>
            <h4 style="font-size: 0.95rem; margin-bottom: 4px;">${item.title}</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Size: ${item.size}</div>
          </div>
        </td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <div class="qty-stepper">
            <button onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td style="font-weight: 700;">${formatPrice(itemTotal)}</td>
        <td>
          <button style="color: #ef4444; font-size: 1.1rem;" onclick="removeFromCart(${index})" title="Remove item">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;

  // Free delivery over Rs. 5000 in Sri Lanka
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 350;
  const grandTotal = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(grandTotal);
}

// WhatsApp Checkout Trigger
window.checkoutViaWhatsApp = function() {
  if (cart.length === 0) {
    alert("Your shopping cart is empty!");
    return;
  }

  let subtotal = 0;
  let message = `*NEW ORDER - THE FASHION SENSE*\n\n`;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    message += `${i + 1}. *${item.title}*\n   Size: ${item.size} | Qty: ${item.quantity} | ${formatPrice(itemTotal)}\n`;
  });

  const shipping = subtotal > 5000 ? 0 : 350;
  const grandTotal = subtotal + shipping;

  message += `\n*Subtotal:* ${formatPrice(subtotal)}`;
  message += `\n*Delivery:* ${shipping === 0 ? 'FREE' : formatPrice(shipping)}`;
  message += `\n*Total Amount:* ${formatPrice(grandTotal)}`;
  message += `\n\n*Customer Details:*\nName: \nAddress: \nPhone Number: \nPreferred Payment: (Cash on Delivery / Bank Transfer)`;

  const encoded = encodeURIComponent(message);
  // User can change this WhatsApp number in README or here
  window.open(`https://wa.me/94771234567?text=${encoded}`, '_blank');
};

/* ==========================================================================
   QUICK VIEW MODAL
   ========================================================================== */
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickView');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

window.openQuickView = function(productId) {
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!modal || !content || !product) return;

  content.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.title}" class="quickview-img">
    </div>
    <div style="display: flex; flex-direction: column;">
      <span class="product-category" style="margin-bottom: 4px;">${product.categoryName}</span>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 10px;">${product.title}</h2>
      
      <div class="product-rating" style="margin-bottom: 12px;">
        <i class="fa-solid fa-star"></i>
        <span>${product.rating}</span>
        <span class="rating-count">(${product.reviewsCount} reviews)</span>
      </div>

      <div class="detail-price" style="margin-bottom: 16px;">
        <span>${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
      </div>

      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
        ${product.description}
      </p>

      <div style="margin-bottom: 24px;">
        <span class="selector-label">Sizes Available:</span>
        <div class="size-boxes">
          ${product.sizes.map(s => `<span class="size-btn" style="cursor: default;">${s}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top: auto; display: flex; gap: 12px;">
        <button class="btn btn-primary" style="flex-grow: 1;" onclick="addToCart(${product.id}); document.getElementById('quickViewModal').classList.remove('active');">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag
        </button>
        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">
          Full Details
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function initToast() {
  if (!document.getElementById('toastNotice')) {
    const toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span id="toastMsg">Notification message</span>`;
    document.body.appendChild(toast);
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
