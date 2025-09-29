// Smooth scroll
function scrollToKontakt() {
  document.getElementById("kontakt").scrollIntoView({ behavior: "smooth" });
}

// FAQ toggle
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const toggle = item.querySelector(".toggle");

  question.addEventListener("click", () => {
    if (answer.style.display === "block") {
      answer.style.display = "none";
      toggle.textContent = "+";
    } else {
      answer.style.display = "block";
      toggle.textContent = "-";
    }
  });
});

// Copy email
function copyEmail() {
  navigator.clipboard.writeText("info@contentbakery.cz");
  alert("Email zkopírován!");
}

// Vanta background
VANTA.BIRDS({
  el: "#hero",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  backgroundColor: 0xebebeb,
  color1: 0x303491,
  color2: 0x2c2498,
  colorMode: "lerp",
  birdSize: 0.80,
  wingSpan: 25.00,
  separation: 57.00,
  alignment: 51.00,
  cohesion: 21.00,
  quantity: 4.00
})
