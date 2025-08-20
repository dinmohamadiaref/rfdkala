const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// ایجاد overlay اگر وجود نداشت
let overlay = document.querySelector(".overlay");
if (!overlay) {
  overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
}

// باز و بسته کردن منو با همبرگر
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  overlay.classList.toggle("active");
});

// کلیک روی overlay -> بستن منو
overlay.addEventListener("click", () => {
  navLinks.classList.remove("show");
  overlay.classList.remove("active");
});

// کلیک روی لینک‌های داخل منو -> بستن منو و اجازه به مرورگر برای هدایت طبیعی
const navItems = navLinks.querySelectorAll("a");
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
    overlay.classList.remove("active");
    // اجازه بده مرورگر رفتار پیش‌فرض لینک را انجام دهد (بدون preventDefault یا setTimeout)
  });
});