/* =========================
   Smooth scroll (CTA + nav)
   ========================= */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("toKontakt")?.addEventListener("click", () => scrollToId("kontakt"));
document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    scrollToId(id);
  });
});

/* =========================
   FAQ toggle (accordion)
   ========================= */
document.querySelectorAll(".faq-item").forEach(item => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

/* =========================
   Copy email to clipboard
   ========================= */
document.getElementById("copyEmail")?.addEventListener("click", () => {
  navigator.clipboard.writeText("info@contentbakery.cz").then(() => {
    const b = document.getElementById("copyEmail");
    if (!b) return;
    const prev = b.textContent;
    b.textContent = "Zkopírováno!";
    setTimeout(() => (b.textContent = prev), 1200);
  });
});

/* =========================
   Language switcher
   - drží se otevřené na hover i focus
   - ukládá zvolený jazyk do localStorage
   ========================= */
(function initLang() {
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  const langWrap = document.getElementById("lang");
  const langCurrent = document.getElementById("langCurrent");

  if (!langBtn || !langMenu || !langWrap || !langCurrent) return;

  // nastav aktuální podle localStorage
  const saved = localStorage.getItem("cb_lang") || "cs";
  langCurrent.textContent = saved;
  markActive(saved);

  let hoverTimer = null;

  function openMenu() {
    langMenu.classList.add("show");
    langBtn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    langMenu.classList.remove("show");
    langBtn.setAttribute("aria-expanded", "false");
  }

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.contains("show") ? closeMenu() : openMenu();
  });

  // držet otevřené při najetí myší
  [langWrap, langMenu].forEach(el => {
    el.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimer);
      openMenu();
    });
    el.addEventListener("mouseleave", () => {
      hoverTimer = setTimeout(closeMenu, 120);
    });
  });

  // volba jazyka
  langMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const code = li.dataset.lang;
      langCurrent.textContent = code;
      localStorage.setItem("cb_lang", code);
      markActive(code);
      closeMenu();
      // případná budoucí logika překladu může žít tady
    });
  });

  // klik mimo zavře
  document.addEventListener("click", (e) => {
    if (!langWrap.contains(e.target)) closeMenu();
  });

  function markActive(code) {
    langMenu.querySelectorAll("li").forEach(li => {
      li.classList.toggle("active", li.dataset.lang === code);
    });
  }
})();

/* =========================
   Vanta HALO background
   ========================= */
VANTA.HALO({
  el: "#hero",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  baseColor: 0x442ed2,        // #442ed2
  backgroundColor: 0xd7d7ed,  // #d7d7ed (ladí s body bg)
  amplitudeFactor: 3.00,
  size: 1.60
});
