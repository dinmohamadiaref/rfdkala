document.addEventListener("DOMContentLoaded", () => {
  console.log("Packages JS loaded");

  const packageCards = document.querySelectorAll(".package-card");

  // کلیک روی کل کارت
  packageCards.forEach(card => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link) {
        window.location.href = link;
      }
    });
  });
});