const form = document.getElementById("loginForm");
const statusText = document.getElementById("statusText");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    statusText.style.opacity = 1;

    // fake login success
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});
