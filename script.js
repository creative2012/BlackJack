const playBtnStart = document.querySelector('#play');
const hitBtnStart = document.querySelector('#hit');
const playBtn = document.getElementById('play');
const hitBtn = document.getElementById('hit');
const stayBtn = document.getElementById('stay');
const controls = document.getElementById('controls');
const playerCardCont = document.getElementById('PlayerCardContainer');
const dealerCardCont = document.getElementById('DealerCardContainer');

var playerTotal = 0;
var dealerTotal = 0;

const cards =[
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
    'clubs_queen'
]
const values=[
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
    10
] 

function getRand(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function buttonsControl(x){

    if(x == 'newGame'){
        
        controls.style.gridTemplateColumns = "auto auto";
        playBtn.style.opacity = '0';
        playBtn.style.position= 'absolute';
        hitBtn.style.display = 'block';
        stayBtn.style.display = 'block';
    }
    if(x == "showHitStay"){
        
        playBtn.style.display = 'none';
        hitBtn.style.display = 'block';
        stayBtn.style.display = 'block';
        stayBtn.style.opacity = '1';
        hitBtn.style.opacity = '1';
    }

}

function createCard(target, x, score){

    var randomCard = getRand(0,11);
    var id = Date.now() + getRand(1,300);
    
    var card = cards[randomCard];

    //create and add card to the page
    var newCard = document.createElement("div");
    newCard.id = id;
    newCard.classList.add(x);
    target.appendChild(newCard);
    document.getElementById(id).classList.toggle('out');
    document.getElementById(id).style.backgroundImage = 'url(images/fronts/'+card+'.svg)';
    document.getElementById(id).classList.toggle('margin');

    //wait for card then toggle class for transition effect
    waitForCard(id).then((elm) => {
        setTimeout(function (){
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


function playPoker(){
    
    buttonsControl('newGame');
    setTimeout(function (){
    dealerTotal = createCard(dealerCardCont,'dealerCard',dealerTotal);
    },100);
    setTimeout(function (){
    dealerTotal = createCard(dealerCardCont,'dealerCard',dealerTotal);
    console.log(dealerTotal);
    },200);
    
    
    setTimeout(function (){
    playerTotal = createCard(playerCardCont,'playerCard',playerTotal);
    },1500);
    setTimeout(function (){
    playerTotal = createCard(playerCardCont,'playerCard',playerTotal);
    console.log(playerTotal);
    },1700);
    setTimeout(function (){
    checkScore();
    },3500);
    
    
    setTimeout(function (){
    buttonsControl('showHitStay');
    },3500);
    
}
function checkScore(){
    
    // if(playerTotal == 21){
    //     alert("You got black Jack!");
    //     return;
    // }
    // if(playerTotal > 21){
    //     alert("bust");
    //     return;
    // }
    // if(dealerTotal == 21){
    //     alert("Dealer Got black Jack!");
    //     return;
    // }

}





// Add event listener to generate button
playBtnStart.addEventListener('click', playPoker);
hitBtnStart.addEventListener('click', function() { 
    playerTotal = createCard(playerCardCont,'playerCard',playerTotal); 
    console.log(playerTotal);
    setTimeout(function (){
    checkScore();
    },500);
});
