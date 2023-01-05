const playBtnStart = document.querySelector('#play');
const hitBtnStart = document.querySelector('#hit');
const playBtn = document.getElementById('play');
const hitBtn = document.getElementById('hit');
const stayBtn = document.getElementById('stay');
const controls = document.getElementById('controls');
const playerCardCont = document.getElementById('PlayerCardContainer');
const dealerCardCont = document.getElementById('DealerCardContainer');
const alerts = document.getElementById('alerts');
const playerScore = document.getElementById('playerScore');
const dealerScore = document.getElementById('dealerScore');

var playerTotal = 0;
var dealerTotal = 0;
var hiddenCardId = 0;
var score = {
    win: 0,
    lost: 0,
    draw: 0
}

const cards = [
    'clubs_2',
    'clubs_3',
    'clubs_4',
    'clubs_5',
    'clubs_6',
    'clubs_7',
    'clubs_8',
    'clubs_9',
    'clubs_10',
    'clubs_ace',
    'clubs_jack',
    'clubs_king',
    'clubs_queen',
    'diamonds_2',
    'diamonds_3',
    'diamonds_4',
    'diamonds_5',
    'diamonds_6',
    'diamonds_7',
    'diamonds_8',
    'diamonds_9',
    'diamonds_10',
    'diamonds_ace',
    'diamonds_jack',
    'diamonds_king',
    'diamonds_queen',
    'hearts_2',
    'hearts_3',
    'hearts_4',
    'hearts_5',
    'hearts_6',
    'hearts_7',
    'hearts_8',
    'hearts_9',
    'hearts_10',
    'hearts_ace',
    'hearts_jack',
    'hearts_king',
    'hearts_queen',
    'spades_2',
    'spades_3',
    'spades_4',
    'spades_5',
    'spades_6',
    'spades_7',
    'spades_8',
    'spades_9',
    'spades_10',
    'spades_ace',
    'spades_jack',
    'spades_king',
    'spades_queen'
]
const values = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    10,
    10,
    10,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    10,
    10,
    10,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    10,
    10,
    10,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    10,
    10,
    10,
]

var activeCards = [];

function getRand(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function buttonsControl(x) {

    if (x == 'newGame') {

        controls.style.gridTemplateColumns = "auto auto";
        playBtn.disabled = true;
        playBtn.style.opacity = '0';
        playBtn.style.position = 'absolute';
        hitBtn.style.display = 'block';
        stayBtn.style.display = 'block';
    }
    if (x == "showHitStay") {

        playBtn.style.display = 'none';
        hitBtn.style.display = 'block';
        stayBtn.style.display = 'block';
        stayBtn.style.opacity = '1';
        hitBtn.style.opacity = '1';
    }
    if (x == "disable") {
        hitBtn.disabled = true;
        return true;
    }
    if (x == "enable") {
        hitBtn.disabled = false;
        return false;
    }
    if (x == "endGame") {

        playBtn.style.display = 'none';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
        stayBtn.style.opacity = '0';
        hitBtn.style.opacity = '0';
        controls.style.gridTemplateColumns = "auto";
        playBtn.disabled = false;
        playBtn.style.display = 'block';
        playBtn.innerText = "Another Game?"

        setTimeout(function () {
            playBtn.style.opacity = '1';

        }, 1000)

    }
    if (x == "dealerTurn") {

        stayBtn.style.opacity = '0';
        hitBtn.style.opacity = '0';
        stayBtn.disabled = true;
    }

}
//create new card 
function createCard(target, x, score, hidden = false) {

    var randomCard = getRand(0, 51);
    var id = Date.now() + getRand(1, 300);


    var card = cards[randomCard];

    //create and add card to the page
    var newCard = document.createElement("div");
    newCard.id = id;
    newCard.classList.add(x);
    target.appendChild(newCard);
    document.getElementById(id).classList.toggle('out');
    document.getElementById(id).style.backgroundImage = 'url(images/fronts/' + card + '.svg)';

    if (hidden) {
        hiddenCardId = id;
        document.getElementById(id).classList.toggle('block');
    }

    document.getElementById(id).classList.toggle('margin');
    activeCards.push(id);
    //wait for card then toggle class for transition effect
    waitForCard(id).then((elm) => {
        setTimeout(function () {
            document.getElementById(id).classList.toggle('out');

        }, 10)

    });

    return score += values[randomCard];

}
//wait for an element to appear on page function - Credits: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForCard(selector) {
    return new Promise(resolve => {
        if (document.getElementById(selector)) {
            return resolve(document.getElementById(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.getElementById(selector)) {
                resolve(document.getElementById(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
function clearLastGame() {

    alerts.style.opacity = 0;
    activeCards.forEach(removeCards);
    activeCards = [];
    playerTotal = 0;
    dealerTotal = 0;
    playerScore.innerText = '';
    dealerScore.innerText = '';
    stayBtn.disabled = false;

}
function removeCards(i) {

    var elem = document.getElementById(i);
    elem.parentNode.removeChild(elem);


}

function playBj() {

    clearLastGame();
    buttonsControl('newGame');

    setTimeout(function () {
        dealerTotal = createCard(dealerCardCont, 'dealerCard', dealerTotal);

    }, 100);
    setTimeout(function () {
        dealerTotal = createCard(dealerCardCont, 'dealerCard', dealerTotal, true);

    }, 200);



    setTimeout(function () {
        playerTotal = createCard(playerCardCont, 'playerCard', playerTotal);
    }, 1500);
    setTimeout(function () {
        playerTotal = createCard(playerCardCont, 'playerCard', playerTotal);
        playerScore.innerText = playerTotal;
    }, 1700);



    setTimeout(function () {
        if (!checkBj()) {
            setTimeout(function () {
                buttonsControl('showHitStay');
            }, 100);
        }
    }, 3500);




}
function updateScore(x) {

    if(x === 'lost'){
        score.lost ++
        document.getElementById('lost').innerText = "Lost: " + score.lost;
    }
    else if(x === 'win'){
        score.win++
        document.getElementById('wins').innerText = "Wins: " + score.win;
    }
    else if(x === 'draw'){
        score.draw ++;
        document.getElementById('draw').innerText = "Draws: " + score.draw;
    } else {
        score.win ++;
        score.bj ++;
        document.getElementById('wins').innerText = "Wins: " + score.win;
        document.getElementById('wins').innerText = "BlackJack: " + score.bj;
    }


}
function checkScore() {

    if (playerTotal > 21) {
        alerts.innerText = "Bust!"
        alerts.style.opacity = 1;
        updateScore('lost');
        document.getElementById(hiddenCardId).classList.toggle('block');
        dealerScore.innerText = dealerTotal;
        buttonsControl('endGame');
    } else {
        buttonsControl('enable');
    }

}
function checkBj() {

    if (dealerTotal == 21) {
        document.getElementById(hiddenCardId).classList.toggle('block');
        dealerScore.innerText = dealerTotal;
        alerts.innerText = "Dealer Wins!"
        updateScore('lost');
        alerts.style.opacity = 1;
        buttonsControl('endGame');
        return true;
    }
    if (playerTotal == 21) {
        alerts.innerText = "$$ BlackJack! You win! $$"
        updateScore('bj');
        alerts.style.opacity = 1;
        buttonsControl('endGame');
        return true;
    } else {
        buttonsControl('enable');
        return false;
    }

}
function dealerTurn() {
    buttonsControl('dealerTurn');
    document.getElementById(hiddenCardId).classList.toggle('block');
    dealerScore.innerText = dealerTotal;

    var tick = 0;
    setTimeout(function () {
        while (dealerTotal < 16) {

            dealerTotal = createCard(dealerCardCont, 'dealerCard', dealerTotal);
            dealerScore.innerText = dealerTotal;
            tick++;

        }
    }, 500);
        if (tick == 0 && dealerTotal > playerTotal) {

            alerts.innerText = "Dealer wins!"
            updateScore('lost');
            alerts.style.opacity = 1;
            buttonsControl('endGame');
            return;

        }
        else if (tick == 0 && dealerTotal == playerTotal) {

            alerts.innerText = " its a Stand Off!"
            updateScore('draw');
            alerts.style.opacity = 1;
            buttonsControl('endGame');
            return;

        }
    setTimeout(function () {
        if (dealerTotal > 21) {
            alerts.innerText = "Dealer Bust! You Win!!"
            updateScore('win');
            alerts.style.opacity = 1;
        } else if (playerTotal > dealerTotal) {
            alerts.innerText = "You Win!!"
            updateScore('win');
            alerts.style.opacity = 1;
        }
        else if (dealerTotal == playerTotal) {

            alerts.innerText = "Push"
            updateScore('draw');
            alerts.style.opacity = 1;

        } else {

            alerts.innerText = "Dealer wins!"
            updateScore('lost');
            alerts.style.opacity = 1;

        }
        buttonsControl('endGame');
    }, 3000);

}





// Add event listener to generate button
stayBtn.addEventListener('click', dealerTurn);
playBtnStart.addEventListener('click', playBj);
hitBtnStart.addEventListener('click', function () {
    buttonsControl('disable');
    playerTotal = createCard(playerCardCont, 'playerCard', playerTotal);
    playerScore.innerText = playerTotal;
    setTimeout(function () {
        checkScore();
    }, 1400);
});
