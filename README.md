# 👗 The Fashion Sense - Official E-Commerce Website

සුපිරිම තත්වයේ Multi-Page Clothing & Fashion Store Website එකක්!
HTML, Modern CSS, සහ Vanilla JavaScript පාවිච්චි කරලා නිර්මාණය කර ඇති අතර, ඔයාට ඕනෑම විදියකට ඉතා පහසුවෙන් Customize (Edit) කරගත හැක.

---

## 🌟 Pages & Features (අඩංගු පිටු සහ විශේෂාංග)

1. **`index.html` (Home Page)**:
   - Modern Luxury Header with Announcement Top-Bar.
   - High-Fashion Editorial Hero Banner with CTA buttons.
   - Core Value Badges (Islandwide Delivery, 100% Quality, 7-Day Exchange, Cash on Delivery).
   - Shop by Category (Women's Edit, Men's Essentials, Urban Streetwear, Accessories).
   - Interactive Product Tabs (All, New Drops, Best Sellers, Special Deals).
   - Promotional Lookbook Banner with Countdown Timer.
   - Verified Customer Reviews & Testimonials.
   - VIP Sense Club Newsletter Subscription.
   - Comprehensive Footer with Social Links & Colombo Store details.

2. **`shop.html` (Shop / Catalog Page)**:
   - Real-time search by product title & category.
   - Category filtering (All, Women, Men, Streetwear, Accessories).
   - Size filter pills.
   - Price & Rating Sorting (Low to High, High to Low, Top Rated).
   - Responsive product grid with badges (Sale, Hot, New).

3. **`product-detail.html` (Individual Product Page)**:
   - Interactive Multi-angle Image Gallery with clickable preview thumbnails.
   - Color picker swatches.
   - Size selection buttons & size guide link.
   - Quantity selector (+ / -).
   - Direct "Add to Bag" and direct **"Order via WhatsApp"** buttons.
   - Fabric specifications & garment care guide.
   - "You May Also Like" Related Products section.

4. **`cart.html` (Bag & Checkout Page)**:
   - Interactive shopping bag table with quantity changers and instant removal.
   - Promo coupon code verification (`FASHIONSENSE` or `TFSVIP10`).
   - Automated delivery calculation (Free for orders over Rs. 5,000, otherwise Rs. 350).
   - **Order via WhatsApp**: Automatically formats the entire cart into a clean WhatsApp order message with item names, sizes, quantities, and total amount!
   - Integrated Cash on Delivery (COD) Checkout modal form.

5. **`about.html` (About Our Atelier)**:
   - Brand story & ethos.
   - Core pillars (Sustainable natural fabrics, master tailoring, fair wage atelier).
   - Key statistics counters (10K+ Happy Customers, 100% Sourced, 4.9★, 48h Dispatch).

6. **`contact.html` (Contact & Store Location)**:
   - Interactive Contact Inquiry form.
   - Store details (No. 42, Galle Road, Colombo 03, Sri Lanka).
   - Embedded Google Map of Colombo.
   - Interactive FAQ accordion for Cash on Delivery, Exchange policy, and Delivery times.

---

## 🛠️ How to Edit & Customize (ඔයාට ඕන විදියට වෙනස් කරගන්නා ආකාරය)

### 1. අලුත් ඇඳුම් (Products) සහ මිල ගණන් වෙනස් කරන්න:
[`js/products.js`](file:///c:/Users/siyum/OneDrive/Desktop/the%20fashin%20sens/js/products.js) file එක Open කරන්න. එහි ඇති `PRODUCTS_DATA` array එක තුල ඇති items පහසුවෙන් edit කළ හැක:
```javascript
{
  id: 1,
  title: "Minimalist Oversized Linen Shirt", // ඇඳුමේ නම
  category: "men",                         // category එක (men, women, unisex, accessories)
  categoryName: "Men's Collection",
  price: 4850,                             // විකුණන මිල (රුපියල් වලින්)
  originalPrice: 6200,                     // Discount පෙන්වීමට පෙර මිල
  badge: "Sale",                           // Badge එක ("Sale", "Hot", "New", හෝ null)
  rating: 4.9,
  reviewsCount: 38,
  image: "https://images.unsplash.com/...", // ප්‍රධාන Photo එකේ Link එක
  gallery: [ ... ],                        // අමතර Photos
  sizes: ["S", "M", "L", "XL"],            // ලබාගත හැකි Sizes
  colors: ["#ffffff", "#2b2b2b"],          // Colors
  description: "Crafted from 100% breathable organic linen...",
  featured: true,
  tab: "new"
}
```

### 2. ඔයාගෙ WhatsApp Number එක දාන්න:
Orders කෙලින්ම ඔයාගෙ WhatsApp එකට ලබාගැනීමට:
- [`js/main.js`](file:///c:/Users/siyum/OneDrive/Desktop/the%20fashin%20sens/js/main.js) file එකේ `94771234567` ඇති තැන් ඔයාගේ WhatsApp අංකයට වෙනස් කරන්න (උදා: `9471xxxxxxx`).
- HTML පිටු වල පහල ඇති WhatsApp Floating Button එකෙත් `https://wa.me/94771234567` ඇති තැන ඔයාගේ Number එක දාන්න.

### 3. Website එකේ පාටවල් (Brand Colors) වෙනස් කරන්න:
[`css/style.css`](file:///c:/Users/siyum/OneDrive/Desktop/the%20fashin%20sens/css/style.css) file එකේ මුලින්ම ඇති `:root` variables වෙනස් කරන්න:
```css
:root {
  --primary-color: #111111;   /* ප්‍රධාන පාට (Black) */
  --accent-color: #d4af37;    /* Luxury Gold පාට */
  --secondary-color: #e63946; /* Sale / Offer Red පාට */
  --bg-light: #fbfbfb;       /* පසුබිම් පාට */
}
```

### 4. Website එක Open කර බලන ආකාරය:
- `index.html` file එක උඩ double-click කරන්න (Chrome, Edge, Firefox හෝ ඕනෑම Browser එකකින් open වේ).
- Server එකක් run කිරීමට අවශ්‍ය නොවේ! 100% offline වුවද සියලු interactivity සහ LocalStorage cart එක ක්‍රියාත්මක වේ.

---

Crafted with care for **The Fashion Sense** 💎
