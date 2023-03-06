const refs = {
    btnStartChangeColor: document.querySelector('[data-start]'),
    btnStopChangeColor: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

const INTERVAL_CHANGE_COLOR = 1000;
let intervalId = null;

refs.btnStartChangeColor.addEventListener('click', onStartChangeColor);
refs.btnStopChangeColor.addEventListener('click', onStopChangeColor);

// після натискання кнопки «Start», раз на секунду колір фону <body> змінюється  на випадкове значення
// доки зміна теми запущена, кнопка «Start»  неактивна (disabled).

function onStartChangeColor() {
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_CHANGE_COLOR);
    
    refs.btnStartChangeColor.setAttribute("disabled", "");
};
// натисканням на кнопку «Stop» зміна кольору фону зупиняється

function onStopChangeColor() {
    clearInterval(intervalId);
    refs.btnStartChangeColor.removeAttribute("disabled");  
};

// Для генерування випадкового кольору використовується функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}