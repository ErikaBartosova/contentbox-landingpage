/* ===== I18N loader & applier ===== */
const I18N = { dict: null };
async function loadI18n() {
  if (I18N.dict) return I18N.dict;
  try {
    const res = await fetch('translations.json?v=1', { cache: 'no-store' });
    I18N.dict = await res.json();
  } catch (e) {
    console.warn('I18N: nepodařilo se načíst translations.json', e);
    I18N.dict = { cs: {}, en: {} };
  }
  return I18N.dict;
}
function applyI18n(lang = 'cs') {
  const dict = I18N.dict?.[lang] || {};
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key && dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (key && dict[key] != null) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const pairs = el.dataset.i18nAttr.split(',');
    pairs.forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });
  document.documentElement.lang = lang;
}

/* ===== Smooth scroll ===== */
function scrollToId(id){
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.getElementById("toKontakt")?.addEventListener("click", () => scrollToId("kontakt"));
document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const target = a.getAttribute("href")?.slice(1);
    if (target) scrollToId(target);
  });
});

/* ===== FAQ toggle (plynulá animace výšky) ===== */
(function(){
  const items = document.querySelectorAll(".faq-item");
  if(!items.length) return;

  items.forEach(item=>{
    const btn = item.querySelector(".faq-question");
    const ans = item.querySelector(".faq-answer");
    if(!btn || !ans) return;

    // zavřít – vynulovat výšku
    const collapse = () => {
      ans.style.maxHeight = "0px";
      item.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
    };

    // otevřít – nastavit scrollHeight
    const expand = () => {
      item.classList.add("open");
      ans.style.maxHeight = ans.scrollHeight + "px";
      btn.setAttribute("aria-expanded","true");
    };

    btn.addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      // zavřít ostatní (akordeon)
      items.forEach(i=>{
        if(i!==item){
          const a=i.querySelector(".faq-answer");
          if(a){a.style.maxHeight="0px";}
          i.classList.remove("open");
          i.querySelector(".faq-question")?.setAttribute("aria-expanded","false");
        }
      });
      isOpen ? collapse() : expand();
    });

    // při resize přepočítej výšku, pokud je otevřené
    window.addEventListener("resize", ()=>{
      if(item.classList.contains("open")){
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });
})();

/* ===== Copy email (i18n) ===== */
document.getElementById("copyEmail")?.addEventListener("click", () => {
  navigator.clipboard.writeText("info@contentbakery.cz").then(() => {
    const b = document.getElementById("copyEmail");
    if (!b) return;
    const prev = b.textContent;

    // původně:
    // b.textContent = "Zkopírováno!";

    // nově – vezme text podle zvoleného jazyka (fallback na CZ)
    const lang = localStorage.getItem("cb_lang") || "cs";
    const copied = (I18N?.dict?.[lang]?.["contact.copied"]) || "Zkopírováno!";
    b.textContent = copied;

    setTimeout(() => (b.textContent = prev), 1200);
  }).catch(()=>{ /* tiché selhání (např. http, safari) */ });
});

/* ===== Language dropdown (hover i klik) ===== */
(function(){
  const wrap    = document.getElementById("lang");
  const btn     = document.getElementById("langBtn");
  const menu    = document.getElementById("langMenu");
  const current = document.getElementById("langCurrent");
  if (!wrap || !btn || !menu || !current) return;

  const saved = localStorage.getItem("cb_lang") || "cs";
  current.textContent = saved; mark(saved);

  // načti překlady a aplikuj uložený jazyk po loadu
  loadI18n().then(() => applyI18n(saved));

  let timer = null;
  const open  = () => { menu.classList.add("show");  btn.setAttribute("aria-expanded","true");  };
  const close = () => { menu.classList.remove("show"); btn.setAttribute("aria-expanded","false"); };

  btn.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.contains("show") ? close() : open();
  });
  [wrap, menu].forEach(el => {
    el.addEventListener("mouseenter", () => { clearTimeout(timer); open(); });
    el.addEventListener("mouseleave", () => { timer = setTimeout(close, 120); });
  });
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) close(); });

  menu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const code = li.dataset.lang;
      if (!code) return;
      current.textContent = code;
      localStorage.setItem("cb_lang", code);
      mark(code);
      close();
      applyI18n(code);
    });
  });

  function mark(code){
    menu.querySelectorAll("li").forEach(li => {
      li.classList.toggle("active", li.dataset.lang === code);
    });
  }
})();

/* ===== VANTA DOTS background (jen hero) – guard na dostupnost knihovny ===== */
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#hero");
  if (!el || typeof VANTA === "undefined" || !VANTA.DOTS) return;

  try {
    VANTA.DOTS({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0542e8,       // opravený hex
      backgroundColor: 0xe9eaf0,
      showLines: false,
      size: 1.9,
      spacing: 10.0
    });
  } catch(e){ /* tiché selhání, stránka běží dál */ }
});

/* ==========
   BENEFITY: lazy-loading videí + fade-in bloků (s fallbackem)
   ========== */
(function(){
  const blocks = document.querySelectorAll('.benefit-block.fade-on-scroll');
  const videos = document.querySelectorAll('.benefit-video');

  // Fallback když IntersectionObserver není
  const hasIO = "IntersectionObserver" in window;

  if (hasIO) {
    // Fade-in bloků
    const blockObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          blockObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    blocks.forEach(b => blockObserver.observe(b));

    // Lazy-load + autoplay/pause
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video  = entry.target;
        const source = video.querySelector('source');
        if (entry.isIntersecting) {
          if (source && source.dataset.src && !source.src) {
            source.src = source.dataset.src;
            video.load();
          }
          video.play().catch(()=>{ /* ignoruj autoplay blok */ });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    videos.forEach(v => videoObserver.observe(v));
  } else {
    // Jednoduchý fallback: vše viditelné a videa hned běží
    blocks.forEach(b => b.classList.add('visible'));
    videos.forEach(v => {
      const s = v.querySelector('source');
      if (s && s.dataset.src && !s.src) { s.src = s.dataset.src; v.load(); }
      v.play().catch(()=>{});
    });
  }
})();
