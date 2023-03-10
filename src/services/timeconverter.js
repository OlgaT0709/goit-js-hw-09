// вираховуємо скільки вміщується днів,годин,хвилин та секунд в мілісекундах
// отримає мілісекунди (time) повертає дні, години, хвилини, секунди 

export default function getTimeComponents(time) {
    const days = pad(Math.floor((time / (1000 * 60 * 60 * 24))));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60 )));
    const mins = pad(Math.floor((time % (1000 * 60 * 60 )) / (1000 * 60 )));
    const secs = pad(Math.floor((time % (1000 * 60 )) / (1000 )));

    return {days, hours, mins, secs};
};

// записує число у форматі string 00
function pad(value) {
    return String(value).padStart(2, '0');
}

