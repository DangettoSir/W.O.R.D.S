gsap.registerPlugin(Draggable);

const rhymeBox = document.getElementById('rhyme-box');
const correctBox = document.getElementById('correct-box');
const incorrectBox = document.getElementById('incorrect-box');
const wordBox = document.getElementById('word-box');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');

let gameStarted = false;
let score = 0;

const rhymingWords = [
	{ word: 'cat', rhyme: 'hat', correct: true },
	{ word: 'dog', rhyme: 'log', correct: true },
	{ word: 'sun', rhyme: 'fun', correct: true },
	{ word: 'tree', rhyme: 'bee', correct: true },
	{ word: 'house', rhyme: 'mouse', correct: true },
	{ word: 'bird', rhyme: 'word', correct: true },
	{ word: 'car', rhyme: 'star', correct: true },
	{ word: 'fish', rhyme: 'dish', correct: true },
	{ word: 'apple', rhyme: 'emble', correct: false },
	{ word: 'book', rhyme: 'look', correct: true },
	{ word: 'flower', rhyme: 'power', correct: true },
	{ word: 'mountain', rhyme: 'fountain', correct: true },
	{ word: 'elephant', rhyme: 'talent', correct: false },
	{ word: 'umbrella', rhyme: 'cella', correct: false },
	{ word: 'computer', rhyme: 'shooter', correct: false },
	{ word: 'rainbow', rhyme: 'below', correct: true },
	{ word: 'bicycle', rhyme: 'icicle', correct: false },
	{ word: 'telephone', rhyme: 'alone', correct: false },
	{ word: 'helicopter', rhyme: 'adopter', correct: true },
	{ word: 'pineapple', rhyme: 'apple', correct: false },
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        scoreEl.textContent = `Score: ${score}`;
        shuffleArray(rhymingWords);
        displayRhyme();
        createWordDrags();
    }
}

function displayRhyme() {
    rhymeBox.textContent = rhymingWords[0].word;
}

function createWordDrags() {
    const wordEl = document.createElement('div');
    wordEl.textContent = rhymingWords[0].rhyme;
    wordEl.classList.add('draggable');

    wordBox.appendChild(wordEl);

    gsap.set(wordEl, { x: Math.random() * 400, y: Math.random() * 200 });

    new Draggable(wordEl, {
        onDragEnd: (e) => {
            const { x, y } = e.target.getBoundingClientRect();
            const correctX = correctBox.getBoundingClientRect().x;
            const correctY = correctBox.getBoundingClientRect().y;
            const incorrectX = incorrectBox.getBoundingClientRect().x;
            const incorrectY = incorrectBox.getBoundingClientRect().y;

            if (Math.abs(x - correctX) < 50 && Math.abs(y - correctY) < 50) {
                if (rhymingWords[0].correct) {
                    e.target.classList.add('correct');
                    score++;
                    scoreEl.textContent = `Score: ${score}`;
                } else {
                    e.target.classList.add('incorrect');
                }
            } else if (Math.abs(x - incorrectX) < 50 && Math.abs(y - incorrectY) < 50) {
                if (!rhymingWords[0].correct) {
                    e.target.classList.add('correct');
                } else {
                    e.target.classList.add('incorrect');
                }
            } else {
                e.target.classList.add('incorrect');
            }

            setTimeout(() => {
                e.target.remove();
                rhymingWords.shift();
                if (rhymingWords.length > 0) {
                    displayRhyme();
                    createWordDrags();
                } else {
                    alert(`Game over! Your final score is ${score}.`);
                    gameStarted = false;
                }
            }, 500);
        },
    });
}

startBtn.addEventListener('click', startGame);
