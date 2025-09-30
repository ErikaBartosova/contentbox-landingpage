/* ===== Smooth scroll na Kontakt ===== */
function scrollToKontakt() {
  const el = document.getElementById('kontakt');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ===== FAQ toggle – ponechávám pro další sekce, pokud už máš markup ===== */
document.querySelectorAll(".faq-item")?.forEach(item => {
  const q = item.querySelector(".faq-question");
  const a = item.querySelector(".faq-answer");
  const t = item.querySelector(".toggle");
  if (!q || !a) return;
  q.addEventListener("click", () => {
    const open = a.style.display === "block";
    a.style.display = open ? "none" : "block";
    if (t) t.textContent = open ? "+" : "−";
  });
});

/* ===== Copy email (pokud tlačítko používáš) ===== */
function copyEmail() {
  navigator.clipboard.writeText("info@contentbakery.cz");
  alert("Email zkopírován!");
}

/* ===== VANTA HALO na hero (nové pozadí) ===== */
let vantaRef = null;
document.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA && document.getElementById('hero')) {
    vantaRef = VANTA.HALO({
      el: "#hero",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      baseColor: 0x442ed2,
      backgroundColor: 0xd7d7ed,
      amplitudeFactor: 3.00,
      size: 1.60
    });
  }
});

/* ===== Jazyková roletka – stabilní (nezmizí při přejezdu) ===== */
const lang = document.getElementById('lang');
const btn  = document.getElementById('langBtn');
const menu = document.getElementById('langMenu');
const code = document.getElementById('langCode');

if (lang && btn && menu && code) {
  let hideTimer;

  const open = () => {
    clearTimeout(hideTimer);
    lang.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    hideTimer = setTimeout(() => {
      lang.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }, 120); // malá prodleva – pohodlné přejetí myší
  };

  btn.addEventListener('mouseenter', open);
  btn.addEventListener('focus', open);
  lang.addEventListener('mouseleave', close);
  lang.addEventListener('blur', close, true);

  // klik na přepnutí jazyka
  menu.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      const val = b.dataset.lang;
      code.textContent = val === 'en' ? 'en' : 'cs';
      lang.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      // tady případně přepni texty – nyní jen vizuální přepnutí kódu
    });
  });
}
