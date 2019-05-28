document.querySelector('div.start').classList.add('startOn');
document.querySelector('div.startInfo').classList.add('startInfoOn');

const divWrap2 = document.querySelector('div.wrap');
divWrap2.classList.add('blurOn');

const panel = document.querySelector('div.startInfo')

//button hover

document.querySelectorAll('button').forEach(function (item) {
    item.addEventListener('mouseover', function () {
        item.style.borderColor = 'red'
        item.style.color = 'red'
        item.style.cursor = 'pointer'
    })
    item.addEventListener('mouseout', function () {
        item.style.borderColor = 'black'
        item.style.color = 'black'
    })
})


//btn start
const startBtn = document.querySelector('button.startBtn')

const startBtnFunction = function () {
    document.querySelector('div.start').classList.remove('startOn');
    document.querySelector('div.startInfo').classList.remove('startInfoOn');
    divWrap2.classList.remove('blurOn');
    document.querySelector('header').classList.remove('starting')
}


const horrorBtn = document.querySelector('button.horrorBtn')

let horrorBtnFlag = 0;

horrorBtn.addEventListener('click', function () {
    if (horrorBtnFlag == 0) {

        document.querySelector('button.horrorBtn i:nth-of-type(1)').style.display = 'none'
        document.querySelector('button.horrorBtn i:nth-of-type(2)').style.display = 'block'

        document.body.style.backgroundColor = 'black';
        document.querySelectorAll('button').forEach(function (item) {
            item.style.color = 'white'
            item.addEventListener('mouseout', function () {
                item.style.color = 'white'
            })
        })

        document.querySelector('header').style.backgroundColor = '#000000'
        document.querySelector('header').style.backgroundImage = 'linear-gradient(180deg, #000000 50%, #FF0000 100%)'
        document.querySelector('div.board').style.borderColor = 'red';
        document.querySelector('div.board').style.borderWidth = '7px'
        document.querySelector('div.score p').style.color = 'white';
        document.querySelector('div.controls p').style.color = 'white';
        document.querySelectorAll('div.board>div').forEach(function (item) {
            item.style.borderColor = 'rgb(116, 2, 2)';
        });

        horrorBtnFlag = 1;
    } else if (horrorBtnFlag == 1) {
        document.querySelector('button.horrorBtn i:nth-of-type(1)').style.display = 'block'
        document.querySelector('button.horrorBtn i:nth-of-type(2)').style.display = 'none'

        document.body.style.backgroundColor = 'white';
        document.querySelectorAll('button').forEach(function (item) {
            item.style.color = 'black'
            item.addEventListener('mouseout', function () {
                item.style.color = 'black'
            })
        })

        document.querySelector('header').style.backgroundColor = '#FFF'
        document.querySelector('header').style.backgroundImage = 'linear-gradient(0deg, #FFFFFF 0%, #ff0026 28%, #000000 100%)'
        document.querySelector('div.board').style.borderColor = 'black';
        document.querySelector('div.board').style.borderWidth = '4px'
        document.querySelector('div.score p').style.color = 'black';
        document.querySelector('div.controls p').style.color = 'black';
        document.querySelectorAll('div.board>div').forEach(function (item) {
            item.style.borderColor = 'lightgrey';
        });

        horrorBtnFlag = 0;
    }
})

//btn speed
const speedBtn = document.querySelector('button.speedBtn')

speedBtn.addEventListener('click', function () {
    if (gameSpeed == slow) {
        gameSpeed = medium;

        document.querySelector('button.speedBtn i:nth-of-type(1)').style.display = 'block'
        document.querySelector('button.speedBtn i:nth-of-type(2)').style.display = 'none'
        document.querySelector('button.speedBtn i:nth-of-type(3)').style.display = 'none'


    } else if (gameSpeed == medium) {
        gameSpeed = fast;

        document.querySelector('button.speedBtn i:nth-of-type(1)').style.display = 'none'
        document.querySelector('button.speedBtn i:nth-of-type(2)').style.display = 'block'
        document.querySelector('button.speedBtn i:nth-of-type(3)').style.display = 'none'


    } else if (gameSpeed == fast) {
        gameSpeed = slow;

        document.querySelector('button.speedBtn i:nth-of-type(1)').style.display = 'none'
        document.querySelector('button.speedBtn i:nth-of-type(2)').style.display = 'none'
        document.querySelector('button.speedBtn i:nth-of-type(3)').style.display = 'block'

    }
})

//btn music
const musicBtn = document.querySelector('button.musicBtn')

// 
function musicPlay() {
    soundtrack.play();
}


function myStopFunction2() {
    clearInterval(musicPlay);
}

let musicBtnFlag = 0;
musicBtn.addEventListener('click', function () {
    if (musicBtnFlag == 0) {
        setInterval(soundtrack.play(), 87000);
        document.querySelector('button.musicBtn i:nth-of-type(1)').style.display = 'none'
        document.querySelector('button.musicBtn i:nth-of-type(2)').style.display = 'block'
        musicBtnFlag = 1;
    } else if (musicBtnFlag == 1) {
        document.querySelector('button.musicBtn i:nth-of-type(1)').style.display = 'block'
        document.querySelector('button.musicBtn i:nth-of-type(2)').style.display = 'none'
        soundtrack.stop();
        musicBtnFlag = 0;
    }
})