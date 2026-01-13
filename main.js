/* ================= LOAD & SANITIZE CART ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🔥 Remove broken items (old format without priceValue)
cart = cart.filter(item => typeof item.priceValue === "number");

localStorage.setItem("cart", JSON.stringify(cart));

/* ================= DOM ELEMENTS ================= */
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartWrapper = document.getElementById("cartWrapper");
const summary = document.getElementById("summary");
const subTotalEl = document.getElementById("subTotal");
const totalEl = document.getElementById("total");

/* ================= UPDATE CART COUNT ================= */
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "flex" : "none";
}

/* ================= RENDER CART ================= */
function renderCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        emptyCart.classList.remove("hidden");
        cartWrapper.classList.add("hidden");
        summary.classList.add("hidden");
        updateCartCount();
        return;
    }

    emptyCart.classList.add("hidden");
    cartWrapper.classList.remove("hidden");
    summary.classList.remove("hidden");

    cart.forEach((item, index) => {
        const itemTotal = item.priceValue * item.quantity;
        subtotal += itemTotal;

        cartItems.innerHTML += `
        <div class="grid md:grid-cols-5 gap-[3vh] md:gap-[1vw] items-center border-b pb-[3vh]">

            <div class="flex items-center gap-[4vw] md:gap-[1vw]">
                <img src="${item.img}"
                    class="w-[20vw] h-[20vw] md:w-[6vw] md:h-[6vw]
                    object-cover rounded">

                <div>
                    <p class="text-[4vw] md:text-[1vw] font-medium">${item.name}</p>

                    ${item.size ? `
                        <p class="text-gray-500 text-[3vw] md:text-[0.8vw]">
                            Size: ${item.size}
                        </p>` : ""}

                    ${item.color ? `
                        <div class="flex items-center gap-[0.5vw] mt-[0.5vh]">
                            <span class="text-gray-500 text-[3vw] md:text-[0.8vw]">Color:</span>
                            <span class="w-[3vw] h-[3vw] md:w-[0.8vw] md:h-[0.8vw]
                            rounded-full border" style="background:${item.color}"></span>
                        </div>` : ""}
                </div>
            </div>

            <div class="text-[4vw] md:text-[1vw]">
                $${item.priceValue.toFixed(2)}
            </div>

            <div class="flex items-center justify-center gap-[3vw]">
                <button onclick="changeQty(${index}, -1)"
                    class="border px-[1vw] hover:bg-black hover:text-white transition">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)"
                    class="border px-[1vw] hover:bg-black hover:text-white transition">+</button>
            </div>

            <div class="text-[4vw] md:text-[1vw]">
                $${itemTotal.toFixed(2)}
            </div>

            <button onclick="removeItem(${index})"
                class="text-red-500 text-[5vw] md:text-[1.5vw] hover:scale-110 transition">
                ✕
            </button>
        </div>
        `;
    });

    subTotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = subtotal.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* ================= QUANTITY CONTROLS ================= */
function changeQty(index, value) {
    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

/* ================= INIT ================= */
renderCart();
updateCartCount();

