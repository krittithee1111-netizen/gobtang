const grid = document.getElementById('grid');
const winTxt = document.getElementById('winTxt');

const sources = [
  'images/3275.jpg','images/3278.jpg','images/3288.jpg','images/3305.jpg',
  'images/3303.jpg','images/3316.jpg','images/00.jpg','images/11.jpg'
]; // ใช้ 8 ภาพ -> คู่ละ 2 = 16 ใบ

let first=null, lock=false, matched=0;

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function build(){
  const pairs = shuffle([...sources, ...sources]);
  grid.innerHTML=''; matched=0; winTxt.style.display='none';

  pairs.forEach((src, idx)=>{
    const tile = document.createElement('div');
    tile.className='card-tile';
    tile.dataset.key = src;

    const front = document.createElement('div');
    front.className='face front'; front.textContent='?';

    const back = document.createElement('div');
    back.className='face back';
    back.innerHTML = `<img src="${src}" alt="">`;

    tile.append(front, back);

    tile.addEventListener('click', ()=>{
      if (lock || tile.classList.contains('flip')) return;
      tile.classList.add('flip');
      if (!first){ first = tile; return; }

      // second
      lock = true;
      if (first.dataset.key === tile.dataset.key){
        matched += 2;
        setTimeout(()=>{ first=null; lock=false; if (matched===pairs.length){ winTxt.style.display='block'; } }, 260);
      }else{
        setTimeout(()=>{
          first.classList.remove('flip');
          tile.classList.remove('flip');
          first=null; lock=false;
        }, 550);
      }
    });

    grid.appendChild(tile);
  });
}

function restartGame(){ build(); }
build();
