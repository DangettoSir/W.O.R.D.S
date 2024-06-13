const startButton = document.getElementById('startButton');
const content = document.querySelector('.content');
const screenContainer = document.querySelector('.screen-container');

startButton.addEventListener('click', () => {
	playStartSound();
  startButton.style.animation = 'none';

  startButton.style.display = 'none';

  content.style.display = 'block';
	screenContainer.style.display = 'block';

  initThreeJSScene();
});
function playStartSound() {
  const errorSoundFile = "/assets/media/start.mp3";
  const audio = new Audio(errorSoundFile);
  audio.play();
}


const whisperSound = document.getElementById('whisperSound');

const button = document.querySelector('.blinking-button');
let animationId;

function shakeRandomly() {
	const randomX = Math.floor(Math.random() * 21) - 10;
	const randomY = Math.floor(Math.random() * 21) - 10; 
	button.style.transform = `translate(${randomX}px, ${randomY}px)`;
	animationId = requestAnimationFrame(shakeRandomly);
}

button.addEventListener('mouseover', () => {
	animationId = requestAnimationFrame(shakeRandomly);
	whisperSound.play();
});

button.addEventListener('mouseout', () => {
	cancelAnimationFrame(animationId);
	button.style.transform = 'translate(0, 0)';
	whisperSound.pause();
});