//game speed
const slow = 500;
const medium = 375;
const fast = 200;

let gameSpeed = medium;

//potato creation
const potato = document.createElement('div')
potato.classList.add('potato')

//cookie creation
const cookie = document.createElement('div');
cookie.classList.add('cookie')

//wrap(blur) div description
const divWrap = document.querySelector('div.wrap')

//board description
const board = document.querySelectorAll('div.board>div')

//score board description
const scoreboard = document.querySelector('div.score')

//music object + sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

const dragonBite = new sound('mp3/dragonBite.mp3')
const gong = new sound('mp3/gong.mp3')
const dun = new sound('mp3/dun.mp3')
const soundtrack = new sound('mp3/soundtrack.mp3')
const chaChing = new sound('mp3/chaChing.mp3')


//CONTROLS

const controlsColor = function (clickedKey) {
    switch (clickedKey) {
        case 'up':
            document.querySelector('div.controls i:nth-of-type(1)').style.color = 'red'
            break;

        case 'left':
            document.querySelector('div.controls i:nth-of-type(2)').style.color = 'red'
            break;

        case 'down':
            document.querySelector('div.controls i:nth-of-type(3)').style.color = 'red'
            break;

        case 'right':
            document.querySelector('div.controls i:nth-of-type(4)').style.color = 'red'
            break;

        case 'initial':
            document.querySelectorAll('div.controls i').forEach(function (item) {
                item.style.color = 'orange'
            })
            break;
    }
}