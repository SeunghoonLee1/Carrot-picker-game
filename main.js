let timeLimit = 5;
let timePassed = 0;
let timeLeft = 3;
let numCarrots = 3;
let carrotsLeft = 3;
let numBugs = 3;
const bugSize = 50;
const carrotSize = 50;
const container = document.querySelector('.container');
const timeBox = document.querySelector('.time__box');
const playBtn = document.querySelector('.play__button');
const footer = document.querySelector('.footer');
const msgBox = document.querySelector('.message__box');
const msg = document.querySelector('.message');
const replayBtn = document.querySelector('.replay__button');
const carrotNumber = document.querySelector('.carrot__number');
const bugsAndCarrots = document.querySelector('.bugs__and__carrots');
const bugBtn = document.querySelector('.bug__button');
const carrotBtn = document.querySelector('.carrot__button');

let winMsg = `YOU WON! 🧞‍♂️`;
let loseMsg = `YOU LOST 💧`;
let gameOver = false;
timeBox.innerHTML = `0:${timeLimit}`;
carrotNumber.innerHTML = `${numCarrots}`;

// console.log(`footer.clientWidth : ${footer.clientWidth}`);
// console.log(`footer.clientHeight : ${footer.clientHeight}`);
// console.log(footer.getBoundingClientRect);

function countDown(){
  if(gameOver || carrotsLeft === 0){
    timeBox.innerHTML = `0:${timeLeft}`;
    return;
  }
  timeLeft = timeLimit - timePassed;
  if(timeLeft === 0){
    timeBox.innerHTML = `0:0`;
    playBtn.classList.add('time__over')
    displayMessage();
    return;
  }else{
    timeBox.innerHTML = `0:${timeLeft}`;
    timePassed ++;
    setTimeout(countDown, 1000);
  }
}

function displayBugs(){
  let counter = 0;
  for(counter = 0; counter < numBugs; counter++){
    let bugBtn = document.createElement('button');
    bugBtn.setAttribute('class', 'bug__button');
    bugsAndCarrots.appendChild(bugBtn);


    bugBtn.style.left = (Math.random() * (footer.clientWidth - bugSize)) + 'px';
    bugBtn.style.top = (Math.random() * (footer.clientHeight - bugSize)) + 'px';
    bugBtn.addEventListener('click', ()=>{
      console.log('clicked!');
      msg.innerHTML = `${loseMsg}`;
      msgBox.classList.toggle('hidden');
      gameOver = true;
      return;
    });

  }
}

function displayCarrots(){
  let counter = 0;
  carrotsLeft = numCarrots;
  for(counter = 0; counter < numCarrots; counter++){
    console.log(`counter : ${counter}`);
    let carrotBtn = document.createElement('button');
    carrotBtn.setAttribute('class', 'carrot__button');
    carrotBtn.setAttribute('data-id', counter);
    bugsAndCarrots.appendChild(carrotBtn);

    carrotBtn.style.left = (Math.random() * (footer.clientWidth - carrotSize)) + 'px';
    carrotBtn.style.top = (Math.random() * (footer.clientHeight - carrotSize)) + 'px';
    carrotBtn.addEventListener('click', ()=>{
      bugsAndCarrots.removeChild(carrotBtn);
      carrotsLeft = carrotsLeft - 1;
      carrotNumber.innerHTML = carrotsLeft;
      if(carrotsLeft === 0){
        msg.innerHTML = `${winMsg}`;
        msg.classList.toggle('hidden');
        gameOver = true;
        displayMessage();
        return;
      }
      return;
    });
    
  }

}

playBtn.addEventListener('click', countDown);
playBtn.addEventListener('click', ()=>{
  playBtn.innerHTML = `<i class="fas fa-stop-circle"></i>`;
  gameOver = false;
});
playBtn.addEventListener('click', displayBugs);
playBtn.addEventListener('click', displayCarrots);



replayBtn.addEventListener('click', ()=>{
  timePassed = 0;
  gameOver = false;
  const bugsToBeDeleted = document.querySelectorAll('.bug__button');
  bugsToBeDeleted.forEach((element)=>{
    element.remove();
  });
  const carrotsToBeDeleted = document.querySelectorAll('.carrot__button');
  carrotsToBeDeleted.forEach((element)=>{
    element.remove();
  });

  timeBox.innerHTML = `0:${timeLimit}`; 
  carrotNumber.innerHTML = `${numCarrots}`;
  displayBugs();
  displayCarrots();
  displayMessage();
  countDown();
});



function displayMessage(){
  if(carrotsLeft === 0){
    msg.innerHTML = `${winMsg}`;
  }else{
    msg.innerHTML = `${loseMsg}`;
  }
  msgBox.classList.toggle('hidden');
  return;
}


