/* ===== Smooth scroll ===== */
function scrollToId(id){
  const el=document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const hash=a.getAttribute("href");
    if(hash.length>1){
      e.preventDefault();
      scrollToId(hash.slice(1));
    }
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

/* ===== Copy email ===== */
document.getElementById("copyEmail")?.addEventListener("click",()=>{
  navigator.clipboard.writeText("info@contentbakery.cz").then(()=>{
    const b=document.getElementById("copyEmail");
    b.classList.add("copied");
    const prev=b.querySelector("span").textContent;
    b.querySelector("span").textContent="Zkopírováno!";
    setTimeout(()=>{
      b.classList.remove("copied");
      b.querySelector("span").textContent=prev;
    },1200);
  });
});

/* ===== VANTA DOTS on HERO (žádná mezera pod menu) ===== */
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#hero");
  if (!el) return;

  // eliminace jakékoliv "bílé mezery" pod menu
  document.querySelector(".hero").style.paddingTop = "0";

  VANTA.DOTS({
    el,
    mouseControls:true,
    touchControls:true,
    gyroControls:false,
    minHeight:200.00,
    minWidth:200.00,
    scale:1.00,
    scaleMobile:1.00,
    color:0x0542e8,
    backgroundColor:0xe9eaf0,
    showLines:false,
    size:1.9,
    spacing:10.0
  });
});

/* ==========
   BENEFITY: lazy-load videí (ponecháno)
   ========== */
(function(){
  const videos = document.querySelectorAll('.benefit-video');

  const videoObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const video = entry.target;
      const source = video.querySelector('source');
      if(entry.isIntersecting){
        if(source && source.dataset.src && !source.src){
          source.src = source.dataset.src;
          video.load();
        }
        video.play().catch(()=>{});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.35 });

  videos.forEach(v=>videoObserver.observe(v));
})();

/* ===== FAQ toggle (jen jedna otevřená) ===== */
(function(){
  const items=document.querySelectorAll(".faq-item");
  items.forEach(item=>{
    const q=item.querySelector(".faq-question");
    q.addEventListener("click",()=>{
      // zavřít všechny ostatní
      items.forEach(it=>{ if(it!==item) it.classList.remove("open"); });
      // přepnout aktuální
      item.classList.toggle("open");
    });
  });
})();
