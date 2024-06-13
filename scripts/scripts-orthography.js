const gameImage = document.getElementById('game-image');
const wordList = document.getElementById('word-list');
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const roundCount = document.getElementById('round-count');
const scoreDisplay = document.getElementById('score');

let currentRound = 1;
let score = 0;
let selectedWords = [];
let gameData = [];

const difficultyData = {
  easy: [
    {
      image: '../assets/wordsmithing/easy/dog.jpg',
      correctWord: 'dog',
      wrongWords: ['cat', 'bird', 'fish']
    },
    {
      image: '../assets/wordsmithing/easy/apple.jpg',
      correctWord: 'apple',
      wrongWords: ['banana', 'orange', 'pear']
    },
		{
      image: '../assets/wordsmithing/easy/giraffe.jpg',
      correctWord: 'giraffe',
      wrongWords: ['gippo', 'elephant', 'bear']
    },
		{
      image: '../assets/wordsmithing/easy/snake.jpg',
      correctWord: 'snake',
      wrongWords: ['hamster', 'lion', 'lizzard']
    },
		{
      image: '../assets/wordsmithing/easy/butterfly.jpg',
      correctWord: 'butterfly',
      wrongWords: ['rat', 'ant', 'fly']
    },
  ],
  normal: [
    {
      image: '../assets/wordsmithing/normal/abacus.jpg',
      correctWord: 'abacus',

      wrongWords: ['calculator', 'ruler', 'compass']
    },
    {
      image: '../assets/wordsmithing/normal/sextant.jpg',
      correctWord: 'sextant',
      wrongWords: ['theodolite', 'planimeter', 'orrery']
    },
		{
      image: '../assets/wordsmithing/normal/zipper.jpg',
      correctWord: 'zipper',
      wrongWords: ['cloth', 'jeans', 'lightning ']
    },
		{
      image: '../assets/wordsmithing/normal/umbrella.jpg',
      correctWord: 'umbrella',
      wrongWords: ['raincover', 'lollipop', 'shotgun']
    },
		{
      image: '../assets/wordsmithing/normal/doorknob.jpg',
      correctWord: 'doorknob',
      wrongWords: ['doorhand', 'entrance', 'mechanism']
    },
		{
      image: '../assets/wordsmithing/normal/compass.jpg',
      correctWord: 'compass',
      wrongWords: ['map', 'magnite', 'orrery']
    },
		{
      image: '../assets/wordsmithing/normal/micrometer.jpg',
      correctWord: 'micrometer',
      wrongWords: ['scissors', 'umbrella', 'ladder']
    },
  ],
  hard: [
    {
      image: '../assets/wordsmithing/hard/beaker.jpg',
      correctWord: 'beaker',
      wrongWords: ['glass', 'cup', 'bowl']
    },
		{
      image: '../assets/wordsmithing/hard/seismograph.jpg',
      correctWord: 'seismograph',
      wrongWords: ['thermometer', 'computer', 'Dr.Clainer thing :)']
    }
  ],
  pain: [
    {
      image: '../assets/wordsmithing/pain/astrolabe.jpg',
      correctWord: 'astrolabe',
      wrongWords: ['micrometer', 'seismograph', 'orrery']
    },
    {
      image: '../assets/wordsmithing/pain/theodolite.jpg',
      correctWord: 'theodolite',
      wrongWords: ['planimeter', 'micrometer', 'sextant']
    },
		{
      image: '../assets/wordsmithing/pain/orrery.jpg',
      correctWord: 'orrery',
      wrongWords: ['seismograph', 'planet', 'abacus']
    },
		{
      image: '../assets/wordsmithing/pain/bunsenburner.jpg',
      correctWord: 'bunsen burner',
      wrongWords: ['matchstick', 'lighter', 'candle']
    },
  ]
};

function startGame() {
  const difficulty = difficultySelect.value;
  gameData = difficultyData[difficulty];
  currentRound = 1;
  score = 0;
  roundCount.textContent = currentRound;
  scoreDisplay.textContent = score;
  startRound();
}

function startRound() {
  const currentData = gameData[currentRound - 1];
  gameImage.src = currentData.image;
  displayWords(currentData.correctWord, currentData.wrongWords);
}

function displayWords(correctWord, wrongWords) {
  wordList.innerHTML = '';
  const allWords = [correctWord, ...wrongWords];
  shuffleArray(allWords);

  allWords.forEach(word => {
    const wordSpan = document.createElement('span');
    wordSpan.textContent = word;
    wordSpan.addEventListener('click', () => selectWord(wordSpan));
    wordList.appendChild(wordSpan);
  });

  gsap.from('.word-list span', { y: '100%', opacity: 0, duration: 0.5, stagger: 0.1 });
}

function selectWord(wordSpan) {
  // Deselect previously selected word
  const selectedWordSpan = wordList.querySelector('.selected');
  if (selectedWordSpan) {
    selectedWordSpan.classList.remove('selected');
  }

  wordSpan.classList.add('selected');
  selectedWords = [wordSpan.textContent];
}

function submitAnswer() {
  const currentData = gameData[currentRound - 1];

  if (currentData && selectedWords.includes(currentData.correctWord)) {
    score++;
    alert('Correct!');
    markCorrectWord();
  } else {
    alert('Incorrect. Please try again.');
  }

  currentRound++;
  roundCount.textContent = currentRound;
  scoreDisplay.textContent = score;

  if (currentRound > gameData.length) {
    alert(`Game over! Your final score is ${score}.`);
  } else {
    startRound();
  }

  selectedWords = [];
}


function markCorrectWord() {
  const correctWordSpan = Array.from(wordList.getElementsByTagName('span')).find(
    (span) => span.textContent === gameData[currentRound - 1].correctWord
  );
  if (correctWordSpan) {
    correctWordSpan.classList.add('correct');
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', submitAnswer);
