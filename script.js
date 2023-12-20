//open and close button

function toggleContent() {
  var hiddenContent = document.getElementById("hiddenContent");
  hiddenContent.style.display = (hiddenContent.style.display === "none" || hiddenContent.style.display === "") ? "block" : "none";
}

function hideContent() {
  document.getElementById("hiddenContent").style.display = "none";
}









//this is winning result code

const winningResults = document.getElementById('winingResult');




//game logic
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let ourScore = parseInt(localStorage.getItem('ourScore')) || 0;

//display initial scores
updateScore();

//update the score 
function updateScore() {
  document.getElementById('computerScore').textContent = computerScore;
  document.getElementById('ourScore').textContent = ourScore;


  //save score into localstorage
  localStorage.setItem('ourScore', ourScore)
  localStorage.setItem('computerScore', computerScore)
}

const OPPONENT = [
  "paper", "scissors", "rock"
]

const choiceButtons = document.querySelectorAll('.choice-btn')

const resultDivs = document.querySelector('.gamePlay')

const nextBoxBtn = document.querySelector('.rules');
choiceButtons.forEach(button => button.addEventListener('click', () => chooseTurn(button.value)))



//get reandom choice
function getRandomChoice() {
  const randomIndex = Math.floor(Math.random() * OPPONENT.length);
  return OPPONENT[randomIndex];
}
//chooseTurn function
function chooseTurn(userChoice) {

  const computerChoice = getRandomChoice();
  

  displayResults([userChoice, computerChoice]);
  displayWinner([userChoice, computerChoice]);
  // updateScore(); //update score after each turn
}
//display winner

function displayWinner(results) {
  
  const firstchildSp = document.getElementById('firstchildspecial');
 
  setTimeout(() => {
    const [userChoice, computerChoice] = results;
   
    const resultWinner = document.querySelector(".resultsWinner");
    
    // const playAgainBtn = resultWinner.querySelector(".play-again");
    
    const secondchildSp = document.getElementById('secondchildspecial');
    var isUserWin = isWinner(results);
    if (isUserWin) {
      firstchildSp.classList.add('results__result')

      resultWinner.innerHTML = `
    <h3 class="results__text">YOU WIN</h3>
      <p>AGAINST PC</p>
      <button class="play-again"  onclick="clickAgain(event)">Play Again</button>
     

    `;
      const nextBtn = document.createElement('button')

      nextBtn.style.paddingLeft = '15px'
      nextBtn.classList.add('newNextBtn')
      nextBtn.innerHTML = '<a href="./result.html">NEXT</a>'
      nextBoxBtn.appendChild(nextBtn);
    
      ourScore++;
    }
    else if (userChoice === computerChoice) {
  
      resultWinner.innerHTML = `
    <h3 class="results__text">TIE UP </h3>
   
    <button class="play-again"onclick="clickAgain(event)">Play Again</button>
  

    `;

    }
    else {
 
      secondchildSp.classList.add('results__result')
      
      resultWinner.innerHTML = `
    <h3 class="results__text">YOU LOST</h3>
      <p>AGAINST PC</p>
      <button class="play-again" onclick="clickAgain(event)" >Play Again</button>

    `;
      computerScore++;
    }
    resultWinner.style.display = 'block';
    updateScore();
   

  }, 1000)
  
  
 



}


//is Winner funciton
function isWinner(results) {
  const [userChoice, computerChoice] = results;


  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    return true; // User wins
  } else {
    return false; // User loses or it's a tie
  }
}








//display the value
function displayResults(results) {
  
  const [userChoice, computerChoice] = results;
  
  resultDivs.style.display = 'none'

  winningResults.innerHTML = `
<div class='picked'>
<h2 class="results__heading">YOU PICKED</h2>
<h2 class="results__heading">PC PICKED</h2>
</div>
<div class='winners'>
<div class="ansBox choice-three  " id='firstchildspecial' >
<img src="./assests/${userChoice}.png" alt="Paper" />
</div>
<div class="resultsWinner hidden">
    <h3 class="results__text"></h3>
    <p></p>
    
</div>
<div class="ansBox secondBox choice-two" id='secondchildspecial'>
<img src="./assests/${computerChoice}.png" alt="Paper" />
</div>



 
</div>

`


  setTimeout(() => {
    const userChoiceBox = document.querySelector('.secondBox');
    userChoiceBox.style.display = 'flex';
    
    

  }, 1000);



}




function clickAgain(event) {
  event.preventDefault();

  location.reload();




  
}

