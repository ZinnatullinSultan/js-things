let currentMonth = 5; 
let currentYear = 2024; 

/**
 * Обновить календарь
 * @param {none} none без параметра
 */
function updateCalendar() {
  document.querySelector('.container').innerHTML = '';
  createCalendar(".container", currentYear, currentMonth);

  document.getElementById('prevMonth').addEventListener('click', function() {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar();
  });
}

/**
 * Создание календаря
 * @param {string} elem селектор css 
 * @param {Number} year 
 * @param {number} month 
 */
function createCalendar (elem, year, month) { 
  elem = document.querySelector(elem);

  let mon = month-1;
  let d = new Date(year, mon);

  let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  let table = `
  <table >
    <caption>
      <div class="cap__box">
        <button class='btn' id="prevMonth"><</button>
        <div class="cap__text">${months[mon]} ${year}</div>
        <button class='btn' id="nextMonth">></button>
      </div>
    </caption>
    <tr>
      <th>пн</th>
      <th>вт</th>
      <th>ср</th>
      <th>чт</th>
      <th>пт</th>
      <th>сб</th>
      <th>вс</th>
    </tr>  
    <tr>
  `;
  for(let i=0;i<getWeekDay(d); i++){
    table += '<td></td>';
  }

  while (d.getMonth() == mon) {
    table += '<td>'+d.getDate()+'</td>';
    if (getWeekDay(d)%7==6) {
      table +='</tr><tr>';
    }
    d.setDate(d.getDate()+1);
  }

  if (getWeekDay(d) !=0) {
    for (let i = getWeekDay(d); i < 7; i++) {
      table +='<td></td>';
    }
    
  }

  table += '</tr></table>';
  elem.insertAdjacentHTML('afterbegin', table);
}

/**
 * получить день недели от 1 (пн) до 7 (вс)
 * @param {Date} date 
 * @returns {Number} число от 0 до 1
 */
function getWeekDay(date) {
  let day =date.getDay();
  if(day ==0) day = 7;
  return day-1;
}

updateCalendar(); 