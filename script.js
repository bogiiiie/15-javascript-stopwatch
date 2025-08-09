// Display Current year for the footer
document.getElementById(`year`).textContent = new Date().getFullYear();

// Stopwatch display labels
const minLabel = document.getElementById(`minutes`);
const secLabel = document.getElementById(`seconds`);
const msLabel = document.getElementById(`milliseconds`);

// Control buttons
const startBtn = document.getElementById(`start-btn`);
const pauseBtn = document.getElementById(`pause-btn`);
const resetBtn = document.getElementById(`reset-btn`);
const lapBtn = document.getElementById(`lap-btn`);

// Lap section elements
const lapTimesSection = document.getElementById(`lap-times`);
const lapList = document.getElementById(`lap-list`);

// State tracking
let currentTime = ``;              // Stores formatted time
let startTime;                     // Time when stopwatch started
let elapsedBeforePause = 0;        // Time accumulated before pause
let intervalId;                    // setInterval reference
let laps = 0;                      // Lap count

// Format single digit to two digits (e.g. 4 → 04)
function formatTimeUnit(unit) {
    return String(unit).padStart(2, '0');
}

// Start stopwatch
function startStopWatch() {
    startTime = Date.now() - elapsedBeforePause; // Adjust if resuming

    intervalId = setInterval(() => {
        let elapsed = Date.now() - startTime; // Elapsed ms

        // Convert ms to minutes, seconds, milliseconds
        let minutes = Math.floor(elapsed / 60000);
        let seconds = Math.floor((elapsed % 60000) / 1000);
        let milliseconds = Math.floor((elapsed % 1000) / 10);

        // Update display
        minLabel.textContent = formatTimeUnit(minutes);
        secLabel.textContent = formatTimeUnit(seconds);
        msLabel.textContent = formatTimeUnit(milliseconds);

        // Save for lap logging
        currentTime = `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(milliseconds)}`
    }, 10); // Update every 10 ms
}

// Pause stopwatch
function pauseStopwatch() {
    clearInterval(intervalId); // Stop timer updates
    elapsedBeforePause = Date.now() - startTime; // Store elapsed
}

// Reset stopwatch
function resetStopWatch() {
    pauseStopwatch();
    // Reset display
    minLabel.textContent = formatTimeUnit(0);
    secLabel.textContent = formatTimeUnit(0);
    msLabel.textContent = formatTimeUnit(0);

    elapsedBeforePause = 0; // Reset accumulated time
    intervalId = 0;         // Clear interval reference
    laps = 0;               // Reset lap counter
}

// Start button click
startBtn.onclick = () => {
    startStopWatch();
    startBtn.classList.add(`hidden`);
    pauseBtn.classList.remove(`hidden`);
    lapBtn.classList.remove(`hidden`);
}

// Pause button click
pauseBtn.onclick = () => {
    pauseStopwatch();
    pauseBtn.classList.add(`hidden`);
    startBtn.classList.remove(`hidden`);
}

// Reset button click
resetBtn.onclick = () => {
    resetStopWatch();
    pauseBtn.classList.add(`hidden`);
    startBtn.classList.remove(`hidden`);
    lapBtn.classList.add(`hidden`);
    lapTimesSection.classList.add(`hidden`);
    laps = 0;
    lapList.innerHTML = ``; // Clear laps
}

// Lap button click
lapBtn.onclick = () => {
    laps++; // Increase lap count

    // Show lap section
    lapTimesSection.classList.remove(`hidden`);
    lapTimesSection.classList.add(`flex`);

    // Create new lap item
    const lapItem = `
        <li class="lap-item bg-gray-700 w-full rounded-sm px-4 py-2 flex justify-between items-center">
            <span class="lap-label font-medium">Lap ${laps}</span>
            <span class="lap-time font-mono">${currentTime}</span>
        </li>`;

    lapList.innerHTML += lapItem; // Append lap

    lapList.scrollTop = lapList.scrollHeight; // Auto-scroll to bottom
}
