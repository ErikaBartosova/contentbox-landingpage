/* ===== Smooth scroll ===== */
function scrollToId(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.getElementById("toKontakt")?.addEventListener("click",()=>scrollToId("kontakt"));
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const hash = a.getAttribute("href");
    if(hash && hash.length>1){
      e.preventDefault();
      scrollToId(hash.slice(1));
    }
  });
});

/* ===== FAQ toggle (s plynulou animací) ===== */
document.querySelectorAll(".faq-item").forEach(item=>{
  const q = item.querySelector(".faq-question");
  const a = item.querySelector(".faq-answer");
  q.addEventListener("click",()=>{
    const open = item.classList.toggle("open");
    if(open){
      a.style.maxHeight = a.scrollHeight + "px";
      a.style.opacity = "1";
    }else{
      a.style.maxHeight = "0px";
      a.style.opacity = "0";
    }
  });
});

/* ===== Language dropdown (hover + klik) ===== */
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

/* ===== VANTA DOTS (hero) ===== */
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#hero");
  if (!el || !window.VANTA) return;

  window.VANTA.DOTS({
    el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x0542e8,
    backgroundColor: 0xe9eaf0,
    showLines: false,
    size: 1.9,
    spacing: 10.0
  });
});

/* ===== BENEFITY: lazy-load videí + fade-in ===== */
(function(){
  const blocks = document.querySelectorAll('.benefit-block.fade-on-scroll');
  const videos = document.querySelectorAll('.benefit-video');

  const blockObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        blockObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  blocks.forEach(b=>blockObserver.observe(b));

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
  }, { threshold: 0.5 });
  videos.forEach(v=>videoObserver.observe(v));
})();

/* ===== Copy email button ===== */
document.getElementById("copyEmail")?.addEventListener("click",()=>{
  const btn = document.getElementById("copyEmail");
  const span = btn.querySelector(".copy-text");
  navigator.clipboard.writeText("info@contentbakery.cz").then(()=>{
    const prev = span.textContent;
    btn.classList.add("copied");
    span.textContent = "Zkopírováno!";
    setTimeout(()=>{
      btn.classList.remove("copied");
      span.textContent = prev;
    }, 1400);
  });
});
