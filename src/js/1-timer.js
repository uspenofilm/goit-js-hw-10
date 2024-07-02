import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/izitoast.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

class Timer {
  constructor() {
    this.isActive = false;
  }

  start(targetTime) {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtn.disabled = true;
    inputEl.disabled = true;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;
      const time = this.getTimeComponent(deltaTime);
      this.updateTime(time);
      if (deltaTime < 1000) {
        clearInterval(intervalId);
        inputEl.disabled = false;
        this.isActive = false;
        const time = this.getTimeComponent(0);
        this.updateTime(time);
      }
      console.log(time);
    }, 1000);
  }

  getTimeComponent(deltaInMs) {
    const ms = deltaInMs % 1000;
    const totalSeconds = (deltaInMs - ms) / 1000;

    const seconds = totalSeconds % 60;
    const totalMinutes = (totalSeconds - seconds) / 60;

    const minutes = totalMinutes % 60;
    const totalHours = (totalMinutes - minutes) / 60;

    const hours = totalHours % 24;
    const totalDays = (totalHours - hours) / 24;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      totalDays: String(totalDays).padStart(2, '0'),
    };
  }

  updateTime({ totalDays, hours, minutes, seconds }) {
    daysSpan.textContent = `${totalDays}`;
    hoursSpan.textContent = `${hours}`;
    minutesSpan.textContent = `${minutes}`;
    secondsSpan.textContent = `${seconds}`;
  }
}

const timer = new Timer();
let targetTime;

startBtn.addEventListener('click', () => timer.start(targetTime));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    targetTime = selectedDates[0].getTime();
    if (targetTime <= Date.now()) {
      startBtn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: './img/error.svg',
        progressBarColor: '#B51B1B',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '24px',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
