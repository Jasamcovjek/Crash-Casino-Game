// script by zqyix
let multiplier = 1.00;
let isPlaying = false;
let interval;
let countdown = 3;
const maxMultiplier = 1000.00;
const countdownElement = document.getElementById('countdown');
const multiplierElement = document.getElementById('multiplier');
const dragonElement = document.getElementById('dragon');
const betButton = document.getElementById('bet-button');
const cashoutButton = document.getElementById('cashout-button');
const toastElement = document.getElementById('toast');

betButton.addEventListener('click', startCountdown);
cashoutButton.addEventListener('click', cashOut);

function startCountdown() {
    if (isPlaying) return;
    countdown = 3;
    showToast(`Bet Placed`);
    countdownElement.innerText = countdown;
    betButton.disabled = true;
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.innerText = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownElement.innerText = '';
            startGame();
        }
    }, 1000);
}

function startGame() {
    isPlaying = true;
    multiplier = 1.00;
    multiplierElement.innerText = `${multiplier.toFixed(2)}x`;
    cashoutButton.disabled = false;

    interval = setInterval(() => {
        multiplier += 0.01;
        multiplierElement.innerText = `${multiplier.toFixed(2)}x`;
        dragonElement.style.bottom = `${20 + multiplier * 5}%`;
        dragonElement.style.transform = `translate(-50%, 1) rotate(${multiplier * 3}deg)`;
        if (Math.random() < 0.01 || multiplier >= maxMultiplier) {
            setTimeout(() => gameOver(false), Math.random() * 2000 + 3000);
        }
    }, 100);
}

function cashOut() {
    if (!isPlaying) return;
    showToast(`Congratulations! You cashed out at ${multiplier.toFixed(2)}x!`);
    cashoutButton.disabled = true;
}

function gameOver(cashedOut) {
    clearInterval(interval);
    isPlaying = false;
    betButton.disabled = false;
    cashoutButton.disabled = true;
    dragonElement.style.bottom = '20%';
    dragonElement.style.transform = `translate(-50%, 0) rotate(0deg)`;
    if (!cashedOut) {
        showToast(`Oops! The game crashed at ${multiplier.toFixed(2)}x.`);
    }
}

function showToast(message) {
    toastElement.innerText = message;
    toastElement.classList.add('show');
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}