// Retrieving elements

let alphabetButtons = document.getElementById('alphabet');
let wordToGuess = document.getElementById('word');
let startGame = document.getElementById('start-button');
let topicChooser = document.getElementById('topic');
let difficultyChooser = document.getElementById('difficulty');
let livesSpan = document.getElementById('lives');
let giveUpButton = document.getElementById('give-up');
let hangmanDiv = document.getElementById('hangman');

// Declaring global variables
let alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

let things = ['apple', 'knife', 'automobile', 'factory', 'smartphone', 'programming',
'glasses', 'notebook', 'galaxy', 'universe', 'police', 'mountains', 'cinema', 'bunny',
'spaceship'];
let movies = ['Frozen', 'Mission Impossible', 'Brooklyn Nine Nine', 'Casino Royale',
'Resident Evil', 'The Dirt', 'Look mom I can fly', 'Money heist', 'The nun', 'Family Guy', 
'Big Bang theory', 'suicide Squad', 'Rogue one', 'Empire strikes back'];

let bodyParts = ['base', 'stand', 'hanging1', 'hanging2', 'head', 'torso', 
'hands', 'left-leg', 'right-leg'];

let pickedWord; // holds the word to be guessed
let guessing; // String appearing as our current guess
let guessedWordArray; // array that holds the current guess' status
let originalWordArray; // array that holds the letter in the original word
let nrLives = 9;
let topic = 'things';
let difficulty = 'medium';
let badGuesses;
let n; // store the nr of lives for the given difficulty

// Event listeners

alphabetButtons.addEventListener('click', function(event){
    // registers click of an alphabet button
    let isButton = event.target.nodeName == 'BUTTON';
    let guessLetter = event.target.innerHTML;
    if (isButton){
        let letterButton = document.getElementById(guessLetter + '-button');
        if (pickedWord){
            if (pickedWord.includes(guessLetter) ||pickedWord.includes(guessLetter.toUpperCase())){
                wordToGuess.innerHTML = makeGuess(pickedWord, guessLetter);
                wordToGuess.innerHTML = makeGuess(pickedWord, guessLetter.toUpperCase());
                console.log(guessLetter);
                letterButton.className = 'good-button';
            } else {
                letterButton.className = 'wrong-button';
                nrLives = nrLives - 1;
                livesSpan.innerHTML = nrLives;
                hangmanDiv.appendChild(createPart(bodyParts[badGuesses]));
                badGuesses++;
            };
        }  else {wordToGuess.innerHTML = "Hit start before guessing!"};
        // When game ends
        if(wordToGuess.innerHTML.includes('_')==false && pickedWord.length > 1){
            wordToGuess.innerHTML = "Congratulations, you guessed the word " + pickedWord + "! <br> Hit start to play again"
        };
        if(nrLives < 1){
            wordToGuess.innerHTML = 'Oh no, you are out of guesses';
            nrLives = 0;
        };
    };
});

startGame.addEventListener('click', function(){
    // starts the game with the start game button
    clearDiv(hangmanDiv);
    badGuesses = 0;
    if(topic == 'movies'){
        let randomIndex = Math.floor(Math.random()*movies.length);
        pickedWord = movies[randomIndex];
    } else if(topic == 'things'){
        let randomIndex = Math.floor(Math.random()*things.length);
        pickedWord = things[randomIndex];
    } else{
        let combined = things.concat(movies);
        let randomIndex = Math.floor(Math.random()*combined.length);
        pickedWord = combined[randomIndex];
    }
    console.log(pickedWord);
    guessing = initWord(pickedWord);
    originalWordArray = pickedWord.split('');
    wordToGuess.innerHTML = guessing;
    nrLives = adjustLives(difficulty);
    livesSpan.innerHTML = nrLives;
    for (i=0; i <= alphabetArray.length; i++){ // resets all buttons
        alphabetButtons.childNodes[i].className = 'button';
    };
});

giveUpButton.addEventListener('click', function(){
    wordToGuess.innerHTML = 'Oh no, you give up so easy! The word you could not guess was ' + pickedWord;
});

topicChooser.addEventListener('change', function(event){
    topic = event.target.value;
});

difficultyChooser.addEventListener('change', function(event){
    difficulty = event.target.value;
});


// Functions

//creating the abc buttons
for (letter in alphabetArray){
    let button = createButton(alphabetArray[letter]);
    alphabetButtons.appendChild(button);
};

//initializing lives (might change it for hard setting)
livesSpan.innerHTML = nrLives;

function createButton(text){
    let newButton = document.createElement('button');
    newButton.className = 'button';
    newButton.id = text + '-button';
    newButton.innerHTML = text;
    return(newButton);
};


function initWord(word){
    let l = word.length;
    guessedWordArray = [];
    for(i=0; i < l; i++){
        guessedWordArray[i] = '_';
    };
    return(guessedWordArray.join(''))
};

function makeGuess(word, letter){
    for(i=0; i < word.length; i++){
        if (originalWordArray[i] == letter){
            guessedWordArray[i] = letter;
        };
    };
    return(guessedWordArray.join(''));
};

function adjustLives(difficulty){
    if(difficulty == 'easy'){
        n = 12;
    } else if(difficulty == 'medium'){
        n = 9;
    } else if(difficulty == 'hard'){
        n = 5;
    };
    return(n);
};

function createPart(partName){
    let newDiv = document.createElement('div');
    newDiv.id = partName;
    return(newDiv);
};

function clearDiv(div){
    while(div.firstChild){
        div.removeChild(div.firstChild);
    };
};