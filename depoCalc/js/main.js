let myForm = document.forms[0];

let sumWas = document.querySelector('.gist__sum--was');
let sumWill = document.querySelector('.gist__sum--will');
let gistAfter = document.querySelector('.gist__gistogr--green');

myForm.initial.oninput = calculate;
myForm.time.onchange = calculate;
myForm.percent.oninput = calculate;

myForm.initial.addEventListener('input', function() {
  let value = this.value;
  if (value.length > 13) {
    this.value = value.slice(0, 13);
  }
});
function calculate() {
  let init = +myForm.initial.value;
  if(!init) return;
  let time = myForm.time.value / 12;
  if(!time) return;
  let perc = myForm.percent.value * 0.01;
  if(!perc) return;

  let res = Math.round(init * (1+time*perc));
  sumWas.innerHTML = init;
  sumWill.innerHTML = res;

  let newHeight = res / myForm.initial.value*100 + 'px';
  gistAfter.style.height = newHeight;
}
calculate();