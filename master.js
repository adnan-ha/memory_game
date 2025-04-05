document.getElementById('startGame').onclick = function () {
  let name = window.prompt(`What's Your Name?`);
  if (name == '') {
    document.getElementById('lay').style.display = 'none';
    document.querySelector('#userName span').innerHTML = 'Unknown';
  } else {
    document.getElementById('lay').style.display = 'none';
    document.querySelector('#userName span').innerHTML = name;
  }
}
let wrong = document.querySelector('#score span');
let gameBoard = document.getElementById('gameBoard');

let cards = Array.from(gameBoard.children);
let length = cards.length;

order(cards);

function order(array) {
  let currentNumber = length;
  let temp;
  while (currentNumber > 0) {
    let randomNumber = Math.floor(Math.random() * length)
    currentNumber -= 1;
    temp = currentNumber;
    array[currentNumber].style.order = randomNumber;
    array[randomNumber].style.order = temp;
  }
  return array;
}

cards.forEach(card => {
  card.addEventListener('click', function () {
    flip(card);
  })
});

function flip(card) {
  card.classList.add('flipped');
  let flip = cards.filter(flipped => flipped.classList.contains('flipped'));
  if (flip.length == 2) {
    document.getElementById('gameBoard').classList.add('none');
    if (flip[0].id == flip[1].id) {
      document.getElementById('correct').play();
      flip[0].classList.remove('flipped');
      flip[0].classList.add('stay');
      flip[1].classList.remove('flipped');
      flip[1].classList.add('stay');
    } else {
      document.getElementById('fail').play();
      wrong.innerHTML = +wrong.innerHTML + 1;
      setTimeout(() => {
        flip[0].classList.remove('flipped');
        flip[1].classList.remove('flipped');
      }, 1000);
    }
    setTimeout(() => {
      document.getElementById('gameBoard').classList.remove('none');
    }, 1000);
  }
}


