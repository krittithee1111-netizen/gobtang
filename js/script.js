/***** ตั้งค่าที่นี่ *****/
const SETTINGS = {
  // วัน/เดือน ที่จะใช้เป็นรหัสผ่าน (DDMM) เช่น 0710 = 7 ต.ค.
  PASSCODE: '1234',

  // ข้อความจดหมาย (สามารถแก้ที่ notes.html ได้เช่นกัน)
  NOTE_TEXT:
    'ขอบคุณที่อยู่ข้างกันมาตลอดนะ เราจะเก็บเรื่องราวดี ๆ ของเราต่อไปเรื่อย ๆ รักเธอที่สุดเลย 💗',
};

/***** Keypad หน้ารหัส *****/
function buildKeypad({ mount, inputBox, onSuccess }) {
  const keys = ['1','2','3','4','5','6','7','8','9','←','0','OK'];
  let buf = '';
  const render = ()=>{
    inputBox.textContent = buf.replace(/./g,'•');
  };
  keys.forEach(k=>{
    const b = document.createElement('button');
    b.textContent = k;
    if (k==='OK') b.classList.add('ok');
    b.addEventListener('click', ()=>{
      if (k==='←'){ buf = buf.slice(0,-1); render(); return; }
      if (k==='OK'){
        if (buf === SETTINGS.PASSCODE) onSuccess?.();
        else {
          inputBox.style.borderColor = '#ff758f';
          inputBox.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:220});
          setTimeout(()=> inputBox.style.borderColor = '#ffd6e6', 400);
          buf='';
        }
        render(); return;
      }
      if (buf.length<6){ buf += k; render(); }
    });
    mount.appendChild(b);
  });
  render();
}

/***** Swiper รูป (แบบ Stack + ปัดซ้าย/ขวา) *****/
function buildSwiper(container, images){
  const slides = [];
  images.forEach((src, i)=>{
    const s = document.createElement('div');
    s.className='slide';
    s.style.zIndex = (images.length - i);
    s.style.setProperty('--rot', (Math.random()*6-3)+'deg');
    s.innerHTML = `<img src="${src}" alt="photo ${i+1}">`;
    container.appendChild(s);
    slides.push(s);
  });

  let startX=0, current=null;
  const topSlide = ()=> slides.find(s=>!s.classList.contains('hidden'));
  const onDown = (e)=>{
    current = topSlide(); if(!current) return;
    startX = ('touches' in e ? e.touches[0].clientX : e.clientX);
  };
  const onMove = (e)=>{
    if(!current) return;
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX);
    const dx = x - startX;
    current.style.transform = `translateX(${dx}px) rotate(${dx/20}deg) scale(.98)`;
  };
  const onUp = (e)=>{
    if(!current) return;
    const x = ('changedTouches' in e ? e.changedTouches[0].clientX : e.clientX);
    const dx = x - startX;
    if (Math.abs(dx)>120){
      current.animate([{opacity:1, transform:current.style.transform},{opacity:0, transform:`translateX(${dx>0?800:-800}px) rotate(${dx/10}deg)`}],{duration:260, easing:'ease-out'})
        .onfinish = ()=> current.classList.add('hidden');
    }else{
      current.style.transform = '';
    }
    current = null;
  };

  container.addEventListener('mousedown', onDown);
  container.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  container.addEventListener('touchstart', onDown, {passive:true});
  container.addEventListener('touchmove', onMove, {passive:true});
  container.addEventListener('touchend', onUp);
}
