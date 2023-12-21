const body = document.body;
const relaxInput = document.querySelector('.relax-input');
const btnPlus = document.querySelector('.plus');
const btnMinus = document.querySelector('.minus');
const startBtn = document.querySelector('.start-btn');
const beginBtn = document.querySelector('.begin-btn');
const stopBtn = document.querySelector('.stop-btn');
const inputContainer = document.querySelector('.input-container');
const clockBlock = document.querySelector('.clock-container');
const timerBlock = document.querySelector('.timer-block');
const timer = document.querySelector('.timer');
const musicLight = document.querySelector('.music-light');
const musicDark = document.querySelector('.music-dark');

// theme change
const switcher = document.querySelector('.switch__checkbox');

switcher.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (body.classList.contains('relax-light')) {
      body.classList.remove('relax-light');
      body.classList.add('relax-dark');
      musicLight.pause();
      musicDark.currentTime = 0;
      musicDark.play();
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (body.classList.contains('relax-dark')) {
      body.classList.remove('relax-dark');
      body.classList.add('relax-light');
      musicDark.pause();
      musicLight.currentTime = 0;
      musicLight.play();
    }
  }
})

//clock
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novenber", "December"];

function setTime() {
  const time = new Date;
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360) + ((minutes/60)*30)}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360) + ((seconds/60)*6)}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;

  timeEl.innerText = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  dateEl.innerText = `${days[day]}, ${months[month]} ${date}`;

}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime();
setInterval(setTime, 1000);

//relax

btnPlus.addEventListener('click', function() {
  this.previousElementSibling.stepUp()
} );
btnMinus.addEventListener('click', function() {
  this.nextElementSibling.stepDown()
} );

startBtn.addEventListener('click', function() {
  inputContainer.classList.remove('display-none');
  startBtn.classList.add('display-none');
});

beginBtn.addEventListener('click', function() {
  
  let relaxTime = Number(relaxInput.value);
  let timerTime = relaxTime * 60;

  if (relaxTime <= 0) return;

  inputContainer.classList.add('display-none');
  timerBlock.classList.remove('display-none');
  clockBlock.classList.add('visibility-hidden');
  if (switcher.checked) {
    body.classList.add('relax-dark');
    musicDark.currentTime = 0;
    musicDark.play();

    startTimer(timerTime);
    let end = setTimeout(stopRelax, relaxTime * 60000);
    stopBtn.addEventListener('click', () => {clearTimeout(end)});
    
  } else {
    body.classList.add('relax-light');
    musicLight.currentTime = 0;
    musicLight.play();

    startTimer(timerTime);
    let end = setTimeout(stopRelax, relaxTime * 60000);
    stopBtn.addEventListener('click', () => {clearTimeout(end)});
  }

})

stopBtn.addEventListener('click', stopRelax);

function stopRelax() {
  relaxInput.value = 1;
  timer.innerText = '';
  body.classList.remove('relax-dark','relax-light')
  clockBlock.classList.remove('visibility-hidden');
  timerBlock.classList.add('display-none');
  startBtn.classList.remove('display-none');
  musicDark.pause();
  musicLight.pause();

}

//timer
function startTimer(timerTime) { 

  timerTime -= 1; //отнимаю 1 секунду для визуальной точности прерывания таймера
  let timerRelax = setTimeout(function tick() {
    
    let timerMinutes = Math.floor(timerTime / 60);
    let timerSeconds = timerTime % 60;
    let seconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
    timer.innerText = `${timerMinutes}:${seconds}`;
    timerTime--;

    if (timerTime == 0) return;

    timerRelax = setTimeout(tick, 1000);
  }, 1000)

  stopBtn.addEventListener('click', () => {clearTimeout(timerRelax)});

}
