/* Smooth scroll */
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

/* FAQ toggle */
document.querySelectorAll(".faq-item").forEach(item=>{
  item.querySelector(".faq-question").addEventListener("click",()=>{
    item.classList.toggle("open");
  });
});

/* Copy email */
document.getElementById("copyEmail")?.addEventListener("click",()=>{
  navigator.clipboard.writeText("info@contentbakery.cz").then(()=>{
    const b=document.getElementById("copyEmail");
    const prev=b.textContent;
    b.textContent="Zkopírováno!";
    setTimeout(()=>b.textContent=prev,1200);
  });
});

/* Language dropdown (hover i klik) */
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

/* VANTA HALO background */
VANTA.HALO({
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
