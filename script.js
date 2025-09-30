/* ===== Smooth scroll ===== */
function scrollToId(id){
  const el=document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({behavior:"smooth",block:"start"});
}
document.getElementById("toKontakt")?.addEventListener("click",()=>scrollToId("kontakt"));
document.querySelectorAll('.nav-link[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    scrollToId(a.getAttribute("href").slice(1));
  });
});

/* ===== FAQ toggle ===== */
document.querySelectorAll(".faq-item").forEach(item=>{
  item.querySelector(".faq-question").addEventListener("click",()=>{
    item.classList.toggle("open");
  });
});

/* ===== Copy email ===== */
document.getElementById("copyEmail")?.addEventListener("click",()=>{
  navigator.clipboard.writeText("info@contentbakery.cz").then(()=>{
    const b=document.getElementById("copyEmail");
    const prev=b.textContent;
    b.textContent="Zkopírováno!";
    setTimeout(()=>b.textContent=prev,1200);
  });
});

/* ===== Language dropdown (hover i klik) ===== */
(function(){
  const wrap=document.getElementById("lang");
  const btn=document.getElementById("langBtn");
  const menu=document.getElementById("langMenu");
  const current=document.getElementById("langCurrent");
  if(!wrap||!btn||!menu||!current) return;

  const saved=localStorage.getItem("cb_lang")||"cs";
  current.textContent=saved; mark(saved);

  let timer=null;
  function open(){ menu.classList.add("show"); btn.setAttribute("aria-expanded","true"); }
  function close(){ menu.classList.remove("show"); btn.setAttribute("aria-expanded","false"); }

  btn.addEventListener("click",e=>{ e.stopPropagation(); menu.classList.contains("show")?close():open(); });
  [wrap,menu].forEach(el=>{
    el.addEventListener("mouseenter",()=>{ clearTimeout(timer); open(); });
    el.addEventListener("mouseleave",()=>{ timer=setTimeout(close,120); });
  });
  document.addEventListener("click",e=>{ if(!wrap.contains(e.target)) close(); });

  menu.querySelectorAll("li").forEach(li=>{
    li.addEventListener("click",()=>{
      const code=li.dataset.lang;
      current.textContent=code;
      localStorage.setItem("cb_lang",code);
      mark(code);
      close();
    });
  });

  function mark(code){
    menu.querySelectorAll("li").forEach(li=>li.classList.toggle("active",li.dataset.lang===code));
  }
})();

// VANTA DOTS background (jen hero)
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#hero");
  if (!el) return;

  VANTA.DOTS({
    el: el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x0542e8,        // opravený hex
    backgroundColor: 0xe9eaf0,
    showLines: false,
    // jemnější, trendovější vzhled (volitelné):
    size: 1.9,
    spacing: 10.0
  });
});

/* =======================
   KLÍČOVÉ BENEFITY
   ======================= */
.benefits {
  background:#fff;
  padding: 120px 24px 120px;
  scroll-margin-top: 120px; /* aby anchor z menu nelezl pod fixed header */
}

.benefits-head {
  max-width: 1691px;
  margin: 0 auto 80px auto;
  text-align: center;
}

.benefits-head h2{
  color:#121212; font-family:'Oswald', sans-serif; font-weight:400;
  font-size:60px; line-height:83.6px; margin:0 0 38px 0;
}
.benefits-lead{
  max-width: 787px; margin:0 auto;
  color:#121212; font-family:'Inter', sans-serif; font-weight:400;
  font-size:24px; line-height:32px;
}
.benefits-lead .dash{ color:#444B54; }
.benefits-lead .green{ color:#00CC66; }
.benefits-lead .dot{ color:#121212; }

/* bloky 50/50 */
.benefit-block{
  max-width: 1691px;
  margin: 0 auto 80px auto;
  background:#EEEEEE;
  border-radius:24px;
  padding:80px 44px;
  display:flex; gap:100px; align-items:center; justify-content:center;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  transform: translateY(12px); opacity:0;
  transition: opacity .5s ease, transform .5s ease;
}
.benefit-block.visible{
  transform: translateY(0); opacity:1;
}
.benefit-block.reverse{ flex-direction: row-reverse; }

.benefit-copy{ width: 481px; max-width: 100%; }
.benefit-copy h3{
  color:#121212; font-family:'Oswald', sans-serif; font-weight:400;
  font-size:40px; line-height:50px; margin:0 0 24px 0;
}
.benefit-copy p{
  color:#121212; font-family:'Inter', sans-serif; font-weight:400;
  font-size:20px; line-height:30.8px; margin:0 0 24px 0;
}

/* CTA v blocích (stejné chování jako jinde: lehké zvětšení + glow) */
.btn-cta{
  display:inline-flex; align-items:center; justify-content:center;
  padding:8px 20px; border-radius:53px; text-decoration:none;
  background:#121212; color:#fff;
  font-family:'Oswald', sans-serif; font-weight:700; font-size:20px; line-height:30.8px;
  letter-spacing:.4px;
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, background-color .18s ease;
}
.btn-cta:hover{
  transform: scale(1.03);
  filter: brightness(0.95);
  box-shadow: 0 0 18px rgba(18,18,18,.25);
}

/* Video box */
.benefit-media{
  width: 810px; max-width: 100%;
}
.benefit-video{
  width: 100%; height: auto; display:block;
  border-radius:16px; outline:2px solid #B3B3B3;
  transition: transform .18s ease, box-shadow .18s ease;
}
.benefit-video:hover{
  transform: scale(1.01);
  box-shadow: 0 10px 26px rgba(0,0,0,.12);
}

/* Responsivita */
@media (max-width: 1200px){
  .benefit-block{ gap:60px; }
  .benefit-media{ width: 620px; }
}
@media (max-width: 992px){
  .benefits{ padding: 80px 20px; }
  .benefits-head h2{ font-size:40px; line-height:50px; }
  .benefit-block, .benefit-block.reverse{ flex-direction: column; gap:40px; padding: 40px 24px; }
  .benefit-copy{ width:100%; }
  .benefit-media{ width:100%; }
}
@media (max-width: 480px){
  .benefits-head h2{ font-size:32px; line-height:40px; }
  .benefits-lead{ font-size:18px; line-height:26px; }
  .benefit-copy h3{ font-size:28px; line-height:36px; }
  .benefit-copy p{ font-size:16px; line-height:24px; }
  .btn-cta{ font-size:18px; }
}



