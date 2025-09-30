let currentLang = "cs";

const translations = {
  cs: {
    heroHeading: "All-in-one platforma pro tvorbu online kampaní",
    heroSub: "Briefing, překlady, schvalování a reporty – vše v jedné aplikaci.",
    menuApp: "O aplikaci",
    menuFaq: "FAQ",
    menuContact: "Kontakt",
    btnLogin: "Log in",
    btnContact: "Navázat spojení",
  },
  en: {
    heroHeading: "All-in-one platform for creating online campaigns",
    heroSub: "Briefing, translations, approvals and reports – all in one app.",
    menuApp: "About",
    menuFaq: "FAQ",
    menuContact: "Contact",
    btnLogin: "Log in",
    btnContact: "Get in touch",
  }
};

// ✅ Přepínání jazyků
function toggleLanguage() {
  currentLang = currentLang === "cs" ? "en" : "cs";
  const t = translations[currentLang];

  document.getElementById("heroHeading").innerText = t.heroHeading;
  document.getElementById("heroSub").innerText = t.heroSub;

  document.getElementById("menuApp").innerText = t.menuApp;
  document.getElementById("menuFaq").innerText = t.menuFaq;
  document.getElementById("menuContact").innerText = t.menuContact;

  document.getElementById("btnLogin").innerText = t.btnLogin;
  document.getElementById("btnContact").innerText = t.btnContact;
}

// ✅ Smooth scroll (kontakt button)
function scrollToKontakt() {
  document.getElementById("kontakt").scrollIntoView({ behavior: "smooth" });
}

// ✅ FAQ toggle (otevírání/skrývání odpovědí)
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

// ✅ Copy email do schránky
function copyEmail() {
  navigator.clipboard.writeText("info@contentbakery.cz");
  alert("Email zkopírován!");
}

// ✅ Vanta background efekt
if (typeof VANTA !== "undefined") {
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
  });
}
