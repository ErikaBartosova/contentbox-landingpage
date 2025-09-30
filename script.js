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
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  backgroundColor: 0xebebeb,
  color1: 0x303491,
  color2: 0x2c2498,
  birdSize: 0.8,
  quantity: 4
})

// Překlady
const translations = {
  cs: {
    "hero-title": "All-in-one platforma pro tvorbu online kampaní",
    "hero-subtitle": "Briefing, překlady, schvalování a reporty – vše v jedné aplikaci.",
    "hero-cta": "Navázat spojení",
    "benefits-title": "Klíčové benefity",
    "benefit1-title": "Nový projekt spustíte během pár kliknutí.",
    "benefit1-text": "Stačí zvolit kanály a formáty, doplnit brief a vše máte pod kontrolou.",
    "benefit2-title": "Texty i grafika vždy po ruce.",
    "benefit2-text": "Objednejte copywritera nebo využijte AI překlady do 21 jazyků.",
    "benefit3-title": "Finance a tým pod kontrolou.",
    "benefit3-text": "Sledujte náklady i komunikaci v reálném čase přímo v aplikaci.",
    "faq1-q": "Podporuje ContentBox i vícejazyčné kampaně?",
    "faq1-a": "Ano. U každého formátu si můžete nastavit požadované jazyky.",
    "contact-title": "Máte zájem o spolupráci nebo se chcete na něco zeptat?",
    "copy-btn": "Zkopírovat email"
  },
  en: {
    "hero-title": "All-in-one platform for online campaign management",
    "hero-subtitle": "Briefing, translations, approvals and reports – all in one app.",
    "hero-cta": "Get in touch",
    "benefits-title": "Key Benefits",
    "benefit1-title": "Start a new project in just a few clicks.",
    "benefit1-text": "Choose channels and formats, fill in the brief and keep everything under control.",
    "benefit2-title": "Texts and graphics always at hand.",
    "benefit2-text": "Order a copywriter or use AI translations into 21 languages.",
    "benefit3-title": "Finance and team under control.",
    "benefit3-text": "Track costs and communicate in real time directly in the app.",
    "faq1-q": "Does ContentBox support multilingual campaigns?",
    "faq1-a": "Yes. For each format you can set the required languages.",
    "contact-title": "Interested in cooperation or have a question?",
    "copy-btn": "Copy email"
  }
};

// Funkce pro přepnutí jazyka
function setLanguage(lang) {
  const elements = translations[lang];
  for (let key in elements) {
    const el = document.getElementById(key);
    if (el) el.textContent = elements[key];
  }
}

// Přidáme posluchače
document.querySelectorAll(".lang-dropdown li").forEach(li => {
  li.addEventListener("click", () => {
    setLanguage(li.dataset.lang);
  });
});

// Nastavit výchozí jazyk
setLanguage("cs");

/* ---------- LANGUAGES (dropdown + persist) ---------- */
const langEl   = document.getElementById('lang');
const langBtn  = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const langCode = document.getElementById('langCode');

function setLang(code){
  localStorage.setItem('cb_lang', code);
  langCode.textContent = code.toUpperCase();
  document.documentElement.setAttribute('lang', code);
  // vizuálně aktivní položka
  langMenu.querySelectorAll('li').forEach(li=>{
    li.classList.toggle('active', li.dataset.lang === code);
  });
}

// Otevření na klik (pro touch) – funguje i mimo :hover
langBtn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = langEl.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  if(open){
    langMenu.style.opacity = '1';
    langMenu.style.visibility = 'visible';
    langMenu.style.transform = 'translateY(0)';
  }else{
    langMenu.removeAttribute('style');
  }
});

// Výběr jazyka
langMenu?.querySelectorAll('li').forEach(li=>{
  li.addEventListener('click', ()=>{
    setLang(li.dataset.lang);
    langEl.classList.remove('open');
    langMenu.removeAttribute('style');
  });
});

// Klik mimo – zavřít
document.addEventListener('click', ()=>{
  langEl?.classList.remove('open');
  langMenu?.removeAttribute('style');
});

// Init
setLang(localStorage.getItem('cb_lang') || 'cs');


/* ---------- SMOOTH SCROLL (z tvého původního kódu) ---------- */
function scrollToKontakt() {
  document.getElementById("kontakt").scrollIntoView({ behavior: "smooth" });
}

/* ---------- FAQ toggle (původní) ---------- */
document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-question");
  const a = item.querySelector(".faq-answer");
  const t = item.querySelector(".toggle");
  if(!q || !a || !t) return;
  q.addEventListener("click", () => {
    const open = a.style.display === "block";
    a.style.display = open ? "none" : "block";
    t.textContent = open ? "+" : "-";
  });
});

/* ---------- Copy email (původní) ---------- */
function copyEmail() {
  navigator.clipboard.writeText("info@contentbakery.cz");
  alert("Email zkopírován!");
}

/* ---------- VANTA background (původní) ---------- */
if(typeof VANTA !== "undefined"){
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

