const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('touchend', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение, чтобы не возникало дополнительных событий

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    const animatedNumber = document.getElementById('animated-number');
    animatedNumber.style.top = `${e.changedTouches[0].clientY - 20}px`; // Смещение на 20 пикселей вверх
    animatedNumber.style.left = `${e.changedTouches[0].clientX - 10}px`; // Смещение на 10 пикселей влево
    animatedNumber.classList.remove('hidden');
    animatedNumber.style.animation = 'none';
    animatedNumber.offsetHeight; // Trigger reflow
    animatedNumber.style.animation = null;

    setTimeout(() => {
        animatedNumber.classList.add('hidden');
    }, 1000); // Ждем 1 секунду (1000 миллисекунд) перед скрытием +1

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});



setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);
