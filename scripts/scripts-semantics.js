const words = ['Serendipity', 'Quintessential', 'Ephemeral', 'Enigmatic', 'Sanguine', 'Quixotic', 'Effervescent', 'Idyllic', 'Melancholic', 'Sagacious'];


let score = 0;
let isGamePaused = false;
let wordIndex = 0;

const wordsContainer = document.querySelector('.words-container');
const startGameBtn = document.getElementById('startGame');
const wordModalLabel = document.getElementById('wordModalLabel');
const wordDefinition = document.getElementById('wordDefinition');
const wordTranscription = document.getElementById('wordTranscription');
const wordModal = document.getElementById('wordModal');

startGameBtn.addEventListener('click', startGame);
function startGame() {
  shuffleWords();

  // Start the game loop
  gameLoop();
}

function gameLoop() {
  if (!isGamePaused && wordIndex < words.length) {
    const wordElement = createWordElement(words[wordIndex]);
    wordsContainer.appendChild(wordElement);
    moveWordDown(wordElement);

    wordElement.addEventListener('click', () => {
      catchWord(wordElement, words[wordIndex]);
    });

    wordIndex++;
    requestAnimationFrame(gameLoop);
  } else {
    if (score === 10) {
      alert('You win!');
    } else {
      alert('Game over!');
    }
    resetGame();
  }
}

function createWordElement(word) {
  const wordElement = document.createElement('div');
  wordElement.classList.add('word');
  wordElement.textContent = word;

  const maxX = window.innerWidth - wordElement.offsetWidth;
  wordElement.style.left = `${Math.floor(Math.random() * maxX)}px`;

  return wordElement;
}

function moveWordDown(wordElement, level) {
  const duration = 10 - level;
  gsap.to(wordElement, {
    duration: duration > 5 ? duration : 5,
    y: '100vh',
    onComplete: () => {

      if (!isGamePaused) {
        loseWord(wordElement);
      }
    }
  });
}

function catchWord(wordElement, word) {
  isGamePaused = true;

  showWordModal(word);

  wordsContainer.removeChild(wordElement);

  score++;

  isGamePaused = false;
}

function loseWord(wordElement) {

  wordsContainer.removeChild(wordElement);


  resetGame();
}

function showWordModal(word) {

  wordModalLabel.textContent = word;
  wordDefinition.textContent = 'Definition: This is a sample definition for the word.';
  wordTranscription.textContent = 'Transcription: /ˌwɜːrd/';


  gsap.to(wordModal, { duration: 0.5, scale: 1, opacity: 1 });
  $(wordModal).modal('show');
}

function resetGame() {
  score = 0;
  wordIndex = 0;
  wordsContainer.innerHTML = '';
}

function shuffleWords() {

  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
}
