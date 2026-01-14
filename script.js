/* ================= PAGE LOAD ANIMATIONS ================= */
document.querySelectorAll('.animate-fadeUp').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
});

/* ================= SLIDER ================= */
const slides = document.querySelectorAll(".slide");
let current = 0;
let interval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
    });
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
    resetAutoSlide();
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    resetAutoSlide();
}

function startAutoSlide() {
    if (slides.length) interval = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

startAutoSlide();

/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let isOpen = false;

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        mobileMenu.classList.toggle("translate-x-0");
        mobileMenu.classList.toggle("translate-x-[60vw]");
        menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    document.querySelectorAll("#mobileMenu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("translate-x-[60vw]");
            mobileMenu.classList.remove("translate-x-0");
            menuBtn.textContent = "☰";
            isOpen = false;
        });
    });
}

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ================= PAGE TRANSITION ================= */
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && href.endsWith(".html")) {
            e.preventDefault();
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    });
});

/* ================= TYPEWRITER ================= */
const title = document.getElementById("casualTitle");
const text = "CASUAL WEAR";
let index = 0;

function typeText() {
    if (title && index < text.length) {
        title.textContent += text.charAt(index++);
        setTimeout(typeText, 120);
    }
}
window.addEventListener("load", typeText);

/* ================= PRODUCTS ================= */
const products = [
    { id: 1, name: "Floral Short Jumpsuit", category: "Dresses", price: "$97.99", img: "./images/jumpsuit.jpg", badge: "Hot", rating: 4 },
    { id: 2, name: "Embroidered Flowy Jacket", category: "Jackets", price: "$56.89", img: "./images/jacket.webp", badge: "Available", rating: 5 },
    { id: 3, name: "Furry Hooded Parka", category: "Winter", price: "$77.98", img: "./images/hooked-parka.jpg", badge: "Grab Now", rating: 5 },
    { id: 4, name: "Wrap Back Dress", category: "Dresses", price: "$59.90", img: "./images/wrap.jpg", badge: "Sale", rating: 4 },
    { id: 5, name: "Short Dress", category: "Dresses", price: "$79.90", img: "./images/short.webp", badge: "20% OFF", rating: 5 },

    // 🔥 NEW DRESSES
    { id: 6, name: "Elegant Evening Gown", category: "Dresses", price: "$129.99", img: "./images/evening gown.webp", badge: "Luxury", rating: 5 },
    { id: 7, name: "Summer Floral Maxi", category: "Dresses", price: "$89.49", img: "./images/maxi.jpg", badge: "Trending", rating: 4 },

    // 🧥 JACKETS
    { id: 8, name: "Classic Denim Jacket", category: "Jackets", price: "$69.99", img: "./images/denim-jacket.webp", badge: "New", rating: 5 },
    { id: 9, name: "Leather Biker Jacket", category: "Jackets", price: "$149.90", img: "./images/leather-jacket.jpg", badge: "Premium", rating: 5 },

    // ❄ WINTER WEAR
    { id: 10, name: "Knitted Wool Sweater", category: "Winter", price: "$49.99", img: "./images/wool-sweater.avif", badge: "Warm", rating: 4 },
    { id: 11, name: "Long Winter Coat", category: "Winter", price: "$119.99", img: "./images/long-winter-coat.webp", badge: "Best Seller", rating: 5 },

    // 👖 BOTTOMS
    { id: 12, name: "High Waist Blue Jeans", category: "Bottoms", price: "$64.90", img: "./images/highwaist-jeans.webp", badge: "Popular", rating: 5 },
    { id: 13, name: "Tailored Formal Trousers", category: "Bottoms", price: "$72.50", img: "./images/trousers.jpg", badge: "Office Wear", rating: 4 },

    // 👕 TOPS
    { id: 14, name: "Casual Cotton T-Shirt", category: "Tops", price: "$29.99", img: "./images/t-shirt.webp", badge: "Everyday", rating: 4 },
    { id: 15, name: "Silk Party Blouse", category: "Tops", price: "$54.99", img: "./images/blouse.webp", badge: "Party", rating: 5 }
];


const grid = document.getElementById("productGrid");

/* ================= CART HELPERS ================= */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById("cartCount");

    if (countEl) {
        countEl.textContent = count;
        countEl.style.display = count === 0 ? "none" : "flex";
    }
}

/* ================= ADD TO CART ================= */
function addToCart(id, btn) {
    let cart = getCart();
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            img: product.img,
            priceValue: parseFloat(product.price.replace("$", "")),
            quantity: 1
        });
    }

    setCart(cart);

    // Button feedback
    if (btn) {
        btn.innerText = "Added ✓";
        btn.classList.add("bg-green-600");
        setTimeout(() => {
            btn.innerText = "Add to Cart";
            btn.classList.remove("bg-green-600");
        }, 1500);
    }
}

/* ================= PRODUCT GRID ================= */
if (grid) {
    products.forEach(product => {
        grid.innerHTML += `
        <div class="group transition duration-500 hover:-translate-y-[1vh]">

            <div class="relative bg-[#f6f6f6] rounded overflow-hidden cursor-pointer"
                onclick="openProduct(${product.id})">

                ${product.badge ? `
                <span class="absolute top-[1vh] left-[1vh]
                bg-pink-500 text-white md:text-[0.7vw] text-[2vw]
                px-[0.8vw] py-[0.3vh] rounded">${product.badge}</span>` : ""}

                <img src="${product.img}"
                    class="w-full h-[32vh] object-cover
                    transition duration-700 group-hover:scale-105">
            </div>

            <h3 class="mt-[2vh] md:text-[1vw] text-[3vw] font-medium">
                ${product.name}
            </h3>

            <div class="flex gap-[0.3vw] mt-[0.8vh] text-yellow-500">
                ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
            </div>

            <p class="mt-[0.8vh] md:text-[0.95vw] text-[2.2vw] text-gray-600">
                ${product.price}
            </p>

            <button
                onclick="event.stopPropagation(); addToCart(${product.id}, this)"
                class="mt-[1.5vh] w-full bg-black text-white
                py-[1vh] md:text-[0.9vw] text-[3vw]
                rounded transition hover:bg-[#c08b7a]">
                Add to Cart
            </button>

        </div>`;
    });
}

/* ================= PRODUCT PAGE REDIRECT ================= */
function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", updateCartCount);


