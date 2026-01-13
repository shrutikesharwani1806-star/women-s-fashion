/* ================= PRODUCT DATA (ALL 15 PRODUCTS) ================= */
const products = [
    {
        id: 1,
        name: "Floral Short Jumpsuit",
        price: "$97.99",
        img: "./images/jumpsuit.jpg",
        rating: 4,
        colors: ["#000000", "#7b3f00", "#c08b7a"],
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { user: "Aanya", rating: 5, text: "Beautiful dress & perfect fitting!" },
            { user: "Neha", rating: 4, text: "Very comfortable and stylish." }
        ]
    },
    {
        id: 2,
        name: "Embroidered Flowy Jacket",
        price: "$56.89",
        img: "./images/jacket.webp",
        rating: 5,
        colors: ["#000000", "#444444"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Riya", rating: 5, text: "Looks premium and elegant." }
        ]
    },
    {
        id: 3,
        name: "Furry Hooded Parka",
        price: "$77.98",
        img: "./images/hooked-parka.jpg",
        rating: 5,
        colors: ["#2c2c2c", "#8b4513"],
        sizes: ["M", "L", "XL"],
        reviews: [
            { user: "Karan", rating: 5, text: "Perfect for winters!" }
        ]
    },
    {
        id: 4,
        name: "Wrap Back Dress",
        price: "$59.90",
        img: "./images/wrap.jpg",
        rating: 4,
        colors: ["#000000", "#a0522d"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Simran", rating: 4, text: "Good fabric, nice fit." }
        ]
    },
    {
        id: 5,
        name: "Short Dress",
        price: "$79.90",
        img: "./images/short.webp",
        rating: 5,
        colors: ["#000000", "#ff69b4"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Isha", rating: 5, text: "Absolutely loved it!" }
        ]
    },
    {
        id: 6,
        name: "Elegant Evening Gown",
        price: "$129.99",
        img: "./images/evening gown.webp",
        rating: 5,
        colors: ["#000000", "#800020"],
        sizes: ["M", "L", "XL"],
        reviews: [
            { user: "Megha", rating: 5, text: "Looks royal!" }
        ]
    },
    {
        id: 7,
        name: "Summer Floral Maxi",
        price: "$89.49",
        img: "./images/maxi.jpg",
        rating: 4,
        colors: ["#f5deb3", "#ffb6c1"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Anjali", rating: 4, text: "Lightweight & comfy." }
        ]
    },
    {
        id: 8,
        name: "Classic Denim Jacket",
        price: "$69.99",
        img: "./images/denim-jacket.webp",
        rating: 5,
        colors: ["#1e3a8a"],
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { user: "Rahul", rating: 5, text: "Great quality denim." }
        ]
    },
    {
        id: 9,
        name: "Leather Biker Jacket",
        price: "$149.90",
        img: "./images/leather-jacket.jpg",
        rating: 5,
        colors: ["#000000"],
        sizes: ["M", "L", "XL"],
        reviews: [
            { user: "Arjun", rating: 5, text: "Premium look and feel." }
        ]
    },
    {
        id: 10,
        name: "Knitted Wool Sweater",
        price: "$49.99",
        img: "./images/wool-sweater.avif",
        rating: 4,
        colors: ["#d2691e", "#708090"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Pooja", rating: 4, text: "Warm and cozy." }
        ]
    },
    {
        id: 11,
        name: "Long Winter Coat",
        price: "$119.99",
        img: "./images/long-winter-coat.webp",
        rating: 5,
        colors: ["#2f4f4f"],
        sizes: ["M", "L", "XL"],
        reviews: [
            { user: "Nikhil", rating: 5, text: "Best winter coat!" }
        ]
    },
    {
        id: 12,
        name: "High Waist Blue Jeans",
        price: "$64.90",
        img: "./images/highwaist-jeans.webp",
        rating: 5,
        colors: ["#1e40af"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Kriti", rating: 5, text: "Perfect fitting jeans." }
        ]
    },
    {
        id: 13,
        name: "Tailored Formal Trousers",
        price: "$72.50",
        img: "./images/trousers.jpg",
        rating: 4,
        colors: ["#000000", "#4b5563"],
        sizes: ["M", "L", "XL"],
        reviews: [
            { user: "Siddharth", rating: 4, text: "Office perfect wear." }
        ]
    },
    {
        id: 14,
        name: "Casual Cotton T-Shirt",
        price: "$29.99",
        img: "./images/t-shirt.webp",
        rating: 4,
        colors: ["#ffffff", "#000000"],
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { user: "Varun", rating: 4, text: "Soft fabric." }
        ]
    },
    {
        id: 15,
        name: "Silk Party Blouse",
        price: "$54.99",
        img: "./images/blouse.webp",
        rating: 5,
        colors: ["#800020", "#000000"],
        sizes: ["S", "M", "L"],
        reviews: [
            { user: "Naina", rating: 5, text: "Perfect party wear!" }
        ]
    }
];

/* ================= FETCH PRODUCT FROM URL ================= */
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find(p => p.id === productId);

if (!product) {
    alert("Product not found");
    window.location.href = "index.html";
}

/* ================= BASIC INFO ================= */
document.getElementById("productImg").src = product.img;
document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = product.price;
document.getElementById("productRating").innerHTML =
    "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

/* ================= COLORS ================= */
let selectedColor = "";
const colorBox = document.getElementById("colorOptions");

product.colors.forEach(color => {
    const div = document.createElement("div");
    div.className =
        "w-[5vw] h-[5vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full cursor-pointer border";
    div.style.background = color;

    div.onclick = () => {
        selectedColor = color;
        [...colorBox.children].forEach(c => c.classList.remove("ring-2"));
        div.classList.add("ring-2", "ring-black");
    };

    colorBox.appendChild(div);
});

/* ================= SIZES ================= */
let selectedSize = "";
const sizeBox = document.getElementById("sizeOptions");

product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.textContent = size;
    btn.className =
        "border px-[3vw] py-[1vh] hover:bg-black hover:text-white transition";

    btn.onclick = () => {
        selectedSize = size;
        [...sizeBox.children].forEach(b =>
            b.classList.remove("bg-black", "text-white")
        );
        btn.classList.add("bg-black", "text-white");
    };

    sizeBox.appendChild(btn);
});

/* ================= CART ================= */
function addToCart() {
    if (!selectedColor || !selectedSize) {
        alert("Please select color & size");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
        item =>
            item.id === product.id &&
            item.color === selectedColor &&
            item.size === selectedSize
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            img: product.img,
            priceValue: parseFloat(product.price.replace("$", "")), // ✅ FIX
            color: selectedColor,
            size: selectedSize,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}


/* ================= REVIEWS ================= */
const reviewBox = document.getElementById("reviews");
product.reviews.forEach(r => {
    reviewBox.innerHTML += `
    <div class="border-b pb-[2vh]">
      <p class="text-yellow-500">${"★".repeat(r.rating)}${"☆".repeat(
        5 - r.rating
    )}</p>
      <p class="font-medium mt-[0.5vh]">${r.user}</p>
      <p class="text-gray-600">${r.text}</p>
    </div>
  `;
});

