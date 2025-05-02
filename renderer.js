let interval = null;
let remainingSeconds = 0;
let isPaused = false;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const display = document.getElementById('display');
const controls = document.getElementById('controls');
const inputFields = document.getElementById('input-fields');

function startCountdown() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  remainingSeconds = (hours * 3600) + (minutes * 60);

  if (remainingSeconds <= 0) {
    alert('Please enter a valid time!');
    return;
  }

  hideUI();
  runCountdown();
}

function runCountdown() {
    updateDisplay();

    interval = setInterval(() => {
      remainingSeconds--;
      updateDisplay();
  
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        interval = null;
        showTimeUpScreen();
      }
    }, 1000);
}

function pauseCountdown() {
    clearInterval(interval);
    interval = null;
    isPaused = true;
    showUI();
  }
  
  function resumeCountdown() {
    if (remainingSeconds > 0 && !interval) {
      isPaused = false;
      hideUI();
      runCountdown();
    }
  }
  

function stopCountdown() {
  clearInterval(interval);
  interval = null;
}

function resetCountdown() {
  stopCountdown();
  isPaused = false;
  remainingSeconds = 0;
  hoursInput.value = '';
  minutesInput.value = '';
  updateDisplay();
  showUI();
}

function togglePause() {
    if (isPaused) {
      resumeCountdown();
    } else {
      pauseCountdown();
    }
  }

function updateDisplay() {
  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  display.innerText = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function hideUI() {
  controls.style.display = 'none';
  inputFields.style.display = 'none';
  display.classList.add('large');
}

function showUI() {
  controls.style.display = 'flex';
  inputFields.style.display = 'flex';
  display.classList.remove('large');
}

function showTimeUpScreen() {
    document.body.classList.add('times-up');
    display.innerText = "Time's Up!";
    display.classList.add('huge');
  }
  

// document.addEventListener('keydown', (e) => {
//   if (e.code === 'Space') {
//     e.preventDefault();
//     if (remainingSeconds > 0) togglePause();
//   }
// });

// document.addEventListener('keydown', (e) => {
//     if (document.body.classList.contains('times-up')) {
//       resetCountdown();
//       document.body.classList.remove('times-up');
//       display.classList.remove('huge');
//       return;
//     }
  
//     if (e.code === 'Space') {
//       e.preventDefault();
//       if (remainingSeconds > 0) togglePause();
//     }
//   });

document.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('times-up')) {
      resetCountdown();
      document.body.classList.remove('times-up');
      display.classList.remove('huge');
      return;
    }
  
    if (e.code === 'Space') {
      e.preventDefault();
      if (remainingSeconds > 0) togglePause();
    }
  });
