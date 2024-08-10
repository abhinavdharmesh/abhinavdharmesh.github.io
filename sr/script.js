let words = [];
let currentIndex = 0;
let isPlaying = false;
let intervalId;

const textInput = document.getElementById('textInput');
const textDisplay = document.getElementById('textDisplay');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const speedControl = document.getElementById('speedControl');
const fontSizeControl = document.getElementById('fontSizeControl');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const currentWordLabel = document.getElementById('currentWord');

function updateSeekBar() {
    seekBar.value = (currentIndex / (words.length - 1)) * 100;
    currentWordLabel.textContent = `${currentIndex + 1} / ${words.length}`;
}

function startReading() {
    if (words.length === 0) {
        words = textInput.value.trim().split(/\s+/);
        seekBar.max = words.length - 1;
        updateSeekBar();
    }
    if (currentIndex < words.length) {
        textDisplay.textContent = words[currentIndex];
        updateSeekBar();
        currentIndex++;
    } else {
        stopReading();
    }
}

function stopReading() {
    clearInterval(intervalId);
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        stopReading();
    } else {
        intervalId = setInterval(startReading, speedControl.value);
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

seekBar.addEventListener('input', () => {
    currentIndex = Math.round((seekBar.value / 100) * (words.length - 1));
    textDisplay.textContent = words[currentIndex];
    updateSeekBar();
});

speedControl.addEventListener('input', () => {
    if (isPlaying) {
        clearInterval(intervalId);
        intervalId = setInterval(startReading, speedControl.value);
    }
});

// Event listener for text size control
fontSizeControl.addEventListener('input', () => {
    textDisplay.style.fontSize = `${fontSizeControl.value}px`;
});

darkModeSwitch.addEventListener('change', () => {
    if (darkModeSwitch.checked) {
        document.body.style.backgroundColor = '#0d1117';
        document.body.style.color = '#c9d1d9';
        textDisplay.style.backgroundColor = '#161b22';
        textDisplay.style.borderColor = '#30363d';
        textInput.style.backgroundColor = '#161b22';
        textInput.style.color = '#c9d1d9';
    } else {
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.color = '#333';
        textDisplay.style.backgroundColor = '#ffffff';
        textDisplay.style.borderColor = '#ddd';
        textInput.style.backgroundColor = '#ffffff';
        textInput.style.color = '#333';
    }
});

// Initialize dark mode based on user preference or default
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkModeSwitch.checked = true;
    darkModeSwitch.dispatchEvent(new Event('change'));
} else {
    darkModeSwitch.checked = false;
}
