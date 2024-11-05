let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

// The purpose of this function is to be called at the start of each round in order to generate a new target number
const generateTarget = () => {
    let randInt = Math.floor(Math.random() * 10);
    return randInt;
}

// The purpose of this function is to be called each round to determine which guess is closest to the target number
const compareGuesses = (user, computer, secret) => {
    let userGuessDif = Math.abs(user - secret);
    let compGuessDif = Math.abs(computer - secret);

    if ((user === computer) || (user === secret)) { 
        return true;
    } else if (computer === secret) {
        return false;
    } else if (userGuessDif < compGuessDif) { 
        return true;
    } else if (userGuessDif > compGuessDif) {
        return false;
    } else if (userGuessDif === compGuessDif) {
        return true;
    }
}

// The purpose of this function is to be used to correctly increase the winner's score after each round
const updateScore = winner => {
    if (winner === 'human') {
        humanScore += 1;
    } else if (winner === 'computer') {
        computerScore += 1;
    } else {
        humanScore += 1;
    }
}

const advanceRound = () => {
    currentRoundNumber+=1;
}


