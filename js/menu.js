

// Load menu.html into all pages
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  if (!header) return;

  fetch("menu.html")
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;

      // After menu is loaded, setup hamburger toggle
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");

      // Create overlay for mobile menu
      let overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);

      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        overlay.classList.toggle("active");
      });

      overlay.addEventListener("click", () => {
        navLinks.classList.remove("show");
        overlay.classList.remove("active");
      });
    })
    .catch(err => console.error("Error loading menu:", err));
});