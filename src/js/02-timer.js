import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import getTimeComponents from '../services/timeconverter';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    showDays: document.querySelector('[data-days]'),
    showHours: document.querySelector('[data-hours]'),
    showMinutes: document.querySelector('[data-minutes]'),
    showSeconds: document.querySelector('[data-seconds]'),
    inputDate: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
}

// додаємо оформлення елементів інтерфейсу
refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.timer.style.marginTop = '10px';
refs.timer.style.color = 'blue';
refs.timer.style.fontSize = '14px';

const INTERVAL_CHANGE = 1000;
let intervalId = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  // Перевіряємо дату, щоб була в майбутньому.
  onClose(selectedDates) {   
        const selectedDate = selectedDates[0];
        if (selectedDate <= options.defaultDate) {
        alert("Please choose a date in the future");
        } else {
            refs.btnStart.disabled = false;
        };
    },
};

// ініціалізуємо бібліотеку"flatpickr"  на елементі input[type="text"]
flatpickr(refs.inputDate, options);

// очистка попереднього інтервалу та обнулення часу
refs.inputDate._flatpickr.calendarContainer.addEventListener('mousedown', () => {
    clearInterval(intervalId);
    startTimerInterface();  
});

// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
refs.btnStart.addEventListener('click', onClickBtnStart)

function onClickBtnStart() {
    clearInterval(intervalId);  
    refs.btnStart.disabled = true;        
    const selectedDate =  refs.inputDate._flatpickr.selectedDates[0]
    startTimer(selectedDate, options.defaultDate);
};

// Таймер
function startTimer(selectedDate, defaultDate) {
    let deltaTime = selectedDate - defaultDate;
    timerInterfaceUpdate(deltaTime);
    intervalId = setInterval(() => {
        deltaTime -= INTERVAL_CHANGE;
        if (deltaTime <= 1000) {
            clearInterval(intervalId);
            finishTimerInterface()
            return;
        };
        timerInterfaceUpdate(deltaTime);
        
    }, INTERVAL_CHANGE);
    
};

// оновлює інтерфейс таймеру
function timerInterfaceUpdate(time) {
    const { days, hours, mins, secs } = getTimeComponents(time);
        refs.showDays.textContent = `${days}`;
        refs.showHours.textContent = `${hours}`;
        refs.showMinutes.textContent = `${mins}`;
        refs.showSeconds.textContent = `${secs}`;
}

// початковий інтерфейс таймеру
function startTimerInterface() {
    refs.showDays.textContent = '00';
    refs.showHours.textContent = '00';
    refs.showMinutes.textContent = '00';
    refs.showSeconds.textContent = '00';
};

// фінальний інтерфейс таймеру
function finishTimerInterface() {
    startTimerInterface(); 
    refs.timer.style.color = 'red';
    refs.timer.style.fontSize = '50px';
    setTimeout(() => {
        refs.timer.style.color = 'blue';
        refs.timer.style.fontSize = '14px';
    }, 3000);
};


      

