let addBtn = document.querySelector('.add');
let clearBtn = document.querySelector('.clear');
let timeInp = document.querySelector('.time');
let textInp = document.querySelector('.text');
let listNot = document.querySelector('.notification__list');
let list = document.querySelector('.list');
let info = document.querySelector('.notification__info');
let audio = document.querySelector('.audioAlert');

update();
addBtn.addEventListener('click',function(){
  let timeNot = timeInp.value;
  let textNot = textInp.value;
  
  if(!timeNot || !textNot) {
    info.textContent = 'Укажите верные данные!';
    info.style.opacity = 1;
    setTimeout(()=> info.style.opacity = 0, 2000 );
    return;
  }
  
  localStorage.setItem(timeNot,textNot);
  update();
})

clearBtn.addEventListener('click',function () { 
  if(localStorage.length && confirm('Очистить список уведомлений?')){
    document.querySelector('.notification__list').hidden =true
    localStorage.clear();
    update();
  }
});

listNot.addEventListener('click',function (e) { 
  if(!e.target.dataset.time) return;
  localStorage.removeItem(e.target.dataset.time);
  update()
})

function update() {
  if(!localStorage.length) listNot.hidden = true;
  else listNot.hidden = false;
  list.innerHTML='';
  info.textContent ='';
  for (let key of Object.keys(localStorage)) {
    list.insertAdjacentHTML('beforeend',
    `
    <div class='notification__item'>
      <div>${key} - ${localStorage.getItem(key)}</div>
      <button data-time ='${key}'>&times</button>
    </div>`);
  }
  timeInp.value='';
  textInp.value='';
  if(document.querySelector('.audioAlert')) document.querySelector('.audioAlert').remove();
}

setInterval(()=>{
  let currentDate = new Date();
  let currentHours = currentDate.getHours();
  if(currentHours<10) currentHours='0'+currentHours;

  let currentMinutes = currentDate.getMinutes();
  if(currentMinutes<10) currentMinutes='0'+currentMinutes;

  let currentTime =`${currentHours}:${currentMinutes}`;
  for (let key of Object.keys(localStorage)) {
    let keyHour = key.split(':')[0];
    let keyMinutes = key.split(':')[1];

    if (key == currentTime || (currentHours == keyHour && currentMinutes > keyMinutes)) {
      document.querySelector(`button[data-time='${key}']`).closest('.notification__item').classList.add('notification__warning');
      if(!document.querySelector('.audioAlert')){
        document.body.insertAdjacentHTML('afterbegin',`<audio loop class='audioAlert'><source src='source/alert.mp3' type='audio/mpeg'></audio>`);
        document.querySelector('.audioAlert').play();
      }
    }
  }
},1000);