// Peter Anderson's Hangman Game assignment, 2018
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// ***********************Constant Global Variables*****************
let numWins = 0;
let guessesLeft = 12;
const wordList = ["EARTH", "SUN", "MOON", "MERCURY", "SATURN", "JUPITER", "MARS", "VENUS", "URANUS", "NEPTUNE", "ASTEROID", "COMET", "STAR", "ANDROMEDA", "PLUTO", "GALAXY"];
let secretWord = wordList[Math.floor(Math.random() * wordList.length)];
let lettersFound = [];
console.log(secretWord);
let lettersToFind = secretWord.split("");
console.log("lettersToFind is set to "+(lettersToFind));
console.log(lettersToFind);
let secretWordCounter = 0;
let lettersAlreadyGuessed = "";






// ************************Methods***********************

function setLettersFoundToSpaces() {
    lettersFound = [];
    for (i=0;i<secretWord.length;i++) {
        lettersFound[i] = "_";
        console.log("lettersFound is now "+lettersFound);
    }
}


// Method prints out the 4 variables used in game tracking

function printVars() {
    $("#numWins").text(numWins);
    $("#currentWord").text(lettersFound);
    $("#numGuessesRemaining").text("Guesses left: "+guessesLeft);    
    $("#lettersAlreadyGuessed").text("Guesses so far: "+lettersAlreadyGuessed);
}


setLettersFoundToSpaces()
window.onload = function () { document.getElementById("currentWord").innerHTML=lettersFound};
//I'm starting the game HERE because I read that I need to have functions only called below where they are defined... so here ya go.



//And that's it, the game's variables are all set to run.




function winner() {
    numWins++;
    randomWord();
    console.log("the secret word is "+secretWord);
    lettersFound = [];
    lettersToFind = secretWord.split("");
    console.log("lettersToFind is set to "+(lettersToFind));
    guessesLeft = 12;
    setLettersFoundToSpaces();
    lettersAlreadyGuessed = "";
    printVars();    
}

function loser() {
    // shame++;
    randomWord();
    console.log("the secret word is "+secretWord);
    lettersFound = [];
    lettersToFind = secretWord.split("");
    console.log("lettersToFind is set to "+(lettersToFind));
    guessesLeft = 12;
    setLettersFoundToSpaces();
    lettersAlreadyGuessed = "";
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
    console.log("add letter to found started with "+keyInput);           
    for (i=0;i<lettersToFind.length;i++) {                             //we know the letter is in here, but we don't know where or how many duplicates
        if (keyInput === lettersToFind[i]) {
            console.log("letters to find pass "+(i+1)+" comparing "+(keyInput)+" to "+lettersToFind[i]);                    //so we'll check every spot with a for loop until we find it
            lettersFound[i] = keyInput;                         //then assign it to the location in question in lettersFound
            lettersToFind[i] = "_";                             //then replace that spot on the lettersToFind with a blank space        
        }
    }
    checkWinLoss(keyInput);
}

function checkWinLoss(keyInput) {
    console.log("checking win/loss");
    let checkPhrase = secretWord.split("");
    if (lettersFound.toString() === checkPhrase.toString()) {
        winner();
    } else {
        if (guessesLeft === 1) {
            loser();
        } else {
            addLetterToGuessed(keyInput);
        }
    }
}


// Uses a random number to pick a goal word.
// Assigns new goal word to secretWord variable.

function randomWord() {
    
    // let rnum = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    lettersToFind = secretWord.split("");

    console.log(secretWord);
    console.log(lettersToFind);
}




// Listens for key input and assigns each press to a variable,
// then calls the function to add a letter to the game.

document.addEventListener('keypress', (event) => {
    let keyName = event.key.toUpperCase();
    console.log("key press detected: "+keyName);
    letterLocation = lettersToFind.indexOf(keyName);
    if (lettersAlreadyGuessed.indexOf(keyName)===-1){
        if (letterLocation != -1) {
            console.log("aw snap we found "+keyName+"!")
            addLetterToFound(keyName);
        } else {
            console.log("dang we didn't find "+keyName+"!")
            checkWinLoss(keyName);
        }
    }    
    
        
});
    


    
    
            