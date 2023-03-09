// Імпорт бібліотеки
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('[data-start]'),
    showDays: document.querySelector('[data-days]'),
    showHours: document.querySelector('[data-hours]'),
    showMinutes: document.querySelector('[data-minutes]'),
    showSeconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
}

// додаємо оформлення елементів інтерфейсу
refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.timer.style.marginTop = '10px';
refs.timer.style.color = 'blue';
refs.timer.style.fontSize = '14px';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const INTERVAL_CHANGE = 1000;
let intervalId = null;

refs.btnStart.disabled = true;

// ініціалізуємо бібліотеку"flatpickr"  на елементі input[type="text"]
flatpickr("input#datetime-picker", {
    ...options,
// Перевіряємо дату.
    onChange(selectedDates) {    
        const selectedDate = selectedDates[0];
        if (selectedDate <= options.defaultDate) {
        alert("Please choose a date in the future");
        refs.btnStart.disabled = true;
        } else {
            refs.btnStart.disabled = false;
        };
    },
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        startTimer(selectedDate , options.defaultDate);
      
    },
    
});

// Таймер
function startTimer(selectedDate, defaultDate) {
    clearInterval(intervalId);
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

// фінальний інтерфейс таймеру
function finishTimerInterface() {
    refs.showDays.textContent = '00';
    refs.showHours.textContent = '00';
    refs.showMinutes.textContent = '00';
    refs.showSeconds.textContent = '00';
    refs.timer.style.color = 'red';
    refs.timer.style.fontSize = '50px';
    setTimeout(() => {
        refs.timer.style.color = 'blue';
        refs.timer.style.fontSize = '14px';
    }, 3000);
}

// записує число у форматі string 00
function pad(value) {
    return String(value).padStart(2, '0');
}

// вираховуємо скільки вміщується днів,годин,хвилин та секунд в мілісекундах
function getTimeComponents(time) {
    const days = pad(Math.floor((time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60 )));
    const mins = pad(Math.floor((time % (1000 * 60 * 60 )) / (1000 * 60 )));
    const secs = pad(Math.floor((time % (1000 * 60 )) / (1000 )));

    return {days, hours, mins, secs};
};



// Перевіряємо дату іншим методом
// const refs.calendar = document.querySelector('#datetime-picker'),
// refs.calendar.addEventListener('change', onChangeChooseDate);
// function onChangeChooseDate(event) {
//     const selectedDate = new Date(event.target.value)
//     if (selectedDate <= defaultDate) {
//         alert("Please choose a date in the future");
//         refs.btnStart.disabled = true;
//     } else {
//         refs.btnStart.disabled = false;
//     }
// };


      

