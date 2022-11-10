// mobile navbar logic
const toggle = document.querySelector(".mobile-nav-toggle-container");

toggle.addEventListener("click", () => {
    const sidebar = document.querySelector(".mobile-sidebar");
    sidebar.classList.toggle("open-close-sidebar");
});