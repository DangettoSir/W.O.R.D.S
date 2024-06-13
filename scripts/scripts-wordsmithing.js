const startBtn = document.getElementById('startBtn');
const countdown = document.getElementById('countdown');
const gameArea = document.getElementById('gameArea');
const currentWord = document.getElementById('currentWord');
const inputField = document.getElementById('inputField');
const correctWordsDisplay = document.getElementById('correctWords');
const errorsDisplay = document.getElementById('errors');
const wpmDisplay = document.getElementById('wpm');
const timeDisplay = document.getElementById('time');

let words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
             'pomegranate', 'quince', 'rambutan', 'starfruit', 'dragonfruit', 'persimmon', 'durian', 'passionfruit',
             'mango', 'pineapple', 'avocado', 'guava', 'papaya', 'coconut', 'jackfruit', 'lychee', 'mango', 'plantain',
             'pomelo', 'tamarind','onomatopoeia', 'serendipity', 'ephemeral', 'anomaly', 'algorithm', 'paradox', 'sophisticated', 'catastrophe', 'quixotic', 'malfeasance',
             'obfuscate', 'inscrutable', 'sesquipedalian', 'labyrinthine', 'inconceivable', 'extraneous', 'indefatigable', 'pernicious',
             'pulchritudinous', 'denouement', 'vicissitudes', 'ubiquitous', 'zeitgeist', 'antidisestablishmentarianism', 'phantasmagorical',
             'facetious', 'subterfuge', 'mellifluous', 'juxtaposition', 'vexatious'];
let currentIndex = 0;
let correctWords = 0;
let errors = 0;
let startTime;
let timeRemaining = 20;

startBtn.addEventListener('click', startGame);
inputField.addEventListener('input', handleInput);

function startGame() {
  startBtn.classList.add('d-none');
  countdown.classList.remove('d-none');

  let countdownValue = 5;
  const countdownInterval = setInterval(() => {
    countdown.querySelector('span').textContent = countdownValue;
    countdownValue--;
		
    if (countdownValue < 0) {
      clearInterval(countdownInterval);
      countdown.classList.add('d-none');
      gameArea.classList.remove('d-none');
      inputField.value = '';
      inputField.focus();
      startTime = new Date().getTime();
      showNextWord();
      startTimer();
    }
  }, 1000);
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timeRemaining -= 1;
    timeDisplay.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function handleInput() {
  const currentWordText = currentWord.textContent;
  const inputValue = inputField.value;

  if (inputValue.toLowerCase() === currentWordText.toLowerCase()) {
    correctWords++;
    correctWordsDisplay.textContent = correctWords;
    timeRemaining = 20; 
    showNextWord();
  } else if (inputValue.length === currentWordText.length) {
    errors++;
    errorsDisplay.textContent = errors;
  }

  const elapsedTime = new Date().getTime() - startTime;
  const wpm = Math.floor((correctWords / (elapsedTime / 60000)) || 0);
  wpmDisplay.textContent = wpm;

  if (errors >= 4 || correctWords === 10) {
    endGame();
  }
}

function showNextWord() {
  words = shuffleArray(words);
  const prevWords = document.querySelectorAll('#gameArea .word');

  gsap.timeline()
    .to(prevWords, { duration: 0.5, y: '100%', ease: "power2.out", stagger: 0.1 });

  currentWord.textContent = words[currentIndex];

  gsap.timeline()
    .to(currentWord, { duration: 0.5, scale: 1.2, ease: "back.out(1.7)" })
    .to(currentWord, { duration: 0.5, scale: 1, ease: "back.out(1.7)" })
    .to(currentWord, { duration: 0.5, x: -20, ease: "power2.out" })
    .to(currentWord, { duration: 0.5, x: 0, ease: "power2.out" });

  inputField.value = '';
  currentIndex = (currentIndex + 1) % words.length;

  if (currentIndex === 0) {
    endGame();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function endGame() {
	showModal();
  gameArea.classList.add('d-none');
  startBtn.classList.remove('d-none');
  timeRemaining = 20;
  correctWords = 0;
  errors = 0;
  currentIndex = 0;
  correctWordsDisplay.textContent = 0;
  errorsDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  timeDisplay.textContent = 20;

}

function showModal() {
  if (correctWords === 10) {
    alert(`Congratulations! You have correctly typed all 10 words.`);
  } else if (errors >= 4) {
    alert(`Game over! You have made too many errors (${errors}).`);
  }
}
