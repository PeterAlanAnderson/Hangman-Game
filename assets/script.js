// Peter Anderson's Hangman Game assignment, 2018
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// ***********************Constant Global Variables*****************
let numWins = 0;
let guessesLeft = 12;
let lettersFound = ["_","_","_","_","_","_"];
let secretWord = "FOOBAR";
let lettersToFind = secretWord.split("");
console.log(lettersToFind);
let secretWordCounter = 0;
let lettersAlreadyGuessed = "";




// ************************Methods***********************


// Method prints out the 4 variables used in game tracking

function printVars() {
    $("#numWins").text(numWins);
    $("#currentWord").text(lettersFound);
    $("#numGuessesRemaining").text("Guesses left: "+guessesLeft);    
    $("#lettersAlreadyGuessed").text("Guesses so far: "+lettersAlreadyGuessed);
}


// Win and loss functions track progress,
// then reset the game state.

function winner() {
    randomWord();
    console.log("the secret word is "+secretWord)
    numWins++;
    guessesLeft = 12;
    guessesSoFar = "";
    printVars();    
}

function loser() {
    randomWord();
    console.log("the new word is "+secretLetter)
    // shame++
    guessesLeft = 12;
    guessesSoFar = "";
    printVars();
}

function addLetterToGuessed(keyInput) {
    if (lettersAlreadyGuessed.length === 0) { //skips the comma if this is the first letter
        lettersAlreadyGuessed = keyInput;
    } else {
        lettersAlreadyGuessed = lettersAlreadyGuessed + ", " + keyInput;
        console.log("added "+lettersAlreadyGuessed+" to letters already guessed");
    }
    guessesLeft--;
    printVars();
}



function addLetterToFound(keyInput) {           
    for (i=0;i<lettersToFind;i++) {                             //we know the letter is in here, but we don't know where or how many duplicates
        if (keyInput === lettersToFind[i]) {                    //so we'll check every spot with a for loop until we find it
            lettersFound[i] = keyInput;                         //then assign it to the location in question in lettersFound
            lettersToFind[i] = "_";                             //then replace that spot on the lettersToFind with a blank space        
        }
    }
    addLetterToGuessed(keyInput);
}


// Uses a random number to pick a goal word.
// Assigns new goal word to secretWord variable.

function randomWord() {
    let wordList = [EARTH, SUN, MOON, MERCURY, SATURN, JUPITER, MARS, VENUS, URANUS, NEPTUNE, ASTEROID, COMET, STAR, ANDROMEDA, PLUTO, GALAXY];
    let rnum = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = wordList[rnum];
    lettersToFind = secretWord.split();

    console.log(secretWord);
    console.log(lettersToFind);
}




// Listens for key input and assigns each press to a variable,
// then calls the function to add a letter to the game.

document.addEventListener('keypress', (event) => {
    let keyName = event.key.toUpperCase();
    console.log("key press detected: "+keyName);
    letterLocation = lettersToFind.indexOf(keyName);
    if (lettersFound.indexOf(keyName)===-1) {               //if the player hasn't already found this letter
        if (lettersAlreadyGuessed.indexOf(keyName)===-1) {               //and if the player hasn't guessed this letter and not found it
            if (letterLocation===-1) {                          //and if the letter isn't found in the secret word
                addLetterToGuessed(keyName);                    //add the letter to the guessed letters queue
            } else {                                            //the only remaining case is where the letter has not been guessed/found but it is present
                addLetterToFound(keyName);      //so add it to the found letters queue
            }
        }
    }
});

    
    
            