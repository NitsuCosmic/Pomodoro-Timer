const timeText = document.querySelector("#time");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
let minutes = 25;
let time = minutes * 60;
let isPaused = true;
let id = null;

timeText.textContent = fancyTimeFormat(time);

function fancyTimeFormat(duration) {
	const hrs = Math.floor(duration / 3600);
	const mins = Math.floor((duration % 3600) / 60);
	const secs = Math.floor(duration % 60);

	let time = `${hrs > 0 ? hrs.toString().padStart(2, "0") + ":" : ""}${mins
		.toString()
		.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

	return time;
}

function countDownTimer() {
	if (isPaused) return;

	time--;
	if (time >= 0) {
		timeText.textContent = fancyTimeFormat(time);
	} else {
		clearInterval(id);
		id = null; // Reset id so it can be started again
	}
}

startBtn.addEventListener("click", () => {
	isPaused = !isPaused;
	startBtn.textContent = isPaused ? "Start" : "Pause";

	if (!isPaused && id === null) {
		id = setInterval(countDownTimer, 1000);
	}
});

resetBtn.addEventListener("click", () => {
	minutes = 25;
	time = minutes * 60; // Reset time based on new minutes value
	isPaused = true; // Ensure timer is paused
	clearInterval(id); // Clear any existing interval
	id = null; // Reset id so it can be started again

	// Update display
	timeText.textContent = fancyTimeFormat(time);
	startBtn.textContent = "Start"; // Reset button text
});
