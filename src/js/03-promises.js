import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

// функція для створення проміса з певним position та delay
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay})
        } else {
          reject({position, delay})
        }
    }, delay)
  })
}

// функція, яка запускається при події submit на формі
function onCreatePromises(event) {
  event.preventDefault();

  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);
  let delay = Number(event.currentTarget.delay.value);

  if (!isValidPositiveNumber({ step, amount, delay })) {
    Notiflix.Notify.failure('ERROR! Invalid value. Please enter a positive number.');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;
  };
  form.reset();
};

// функція, яка робить перевірку коректності введених даних (поитивне число)

function isValidPositiveNumber(value) {
  return !isNaN(value) && Number(value) > 0;
}

// замість console.log(), використовуємо бібліотеку notiflix

function onSuccess({ position, delay, step }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {time: step});
};

function onError({ position, delay, step }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {time: step});
};
