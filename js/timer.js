/***** กำหนดวันเริ่มคบกัน (YYYY-MM-DD) *****/
const START_DATE = 'oct 07, 2025'; // แก้เป็นของคุณ

const $counter = document.getElementById('counter');

function makeUnit(n,label){
  const d = document.createElement('div');
  d.className='unit';
  d.innerHTML = `<div class="n">${n.toString().padStart(2,'0')}</div><div class="l">${label}</div>`;
  return d;
}

function diffParts(from, to){
  // คำนวณ ปี/เดือน/วัน/ชั่วโมง/นาที/วินาที แบบใช้งานง่าย (approx. เดือน=30วัน)
  let ms = to - from;
  if (ms<0) ms = 0;
  const sec = Math.floor(ms/1000);
  const minute = Math.floor(sec/60);
  const hour = Math.floor(minute/60);
  const day = Math.floor(hour/24);
  const year = Math.floor(day/365);
  const month = Math.floor((day%365)/30);
  const days = Math.floor((day%365)%30);
  const hours = hour%24;
  const minutes = minute%60;
  const seconds = sec%60;
  return {year,month:month,day:days,hour:hours,minute:minutes,second:seconds};
}

function render(){
  const from = new Date(START_DATE);
  const now  = new Date();
  const p = diffParts(from, now);
  $counter.innerHTML = '';
  $counter.append(
    makeUnit(p.year,'Years'),
    makeUnit(p.month,'Months'),
    makeUnit(p.day,'Days'),
    makeUnit(p.hour,'Hours'),
    makeUnit(p.minute,'Minutes'),
    makeUnit(p.second,'Seconds'),
  );
}

render();
setInterval(render,1000);
