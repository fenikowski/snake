//head potato rotation
const potatoRotation = function(rotation) {
  switch (rotation) {
    case "up":
      potato.style.transform = "rotate(270deg)";
      break;
    case "left":
      potato.style.transform = "rotateY(180deg)";
      break;
    case "down":
      potato.style.transform = "rotate(90deg)";
      break;
    case "right":
      potato.style.transform = "rotate(0deg)";
      break;
  }
};

const tailRotation = function(tailRotationParameter, tailParameter) {
  switch (tailRotationParameter) {
    case "up":
      tailParameter.style.transform = "rotate(270deg)";
      break;
    case "left":
      tailParameter.style.transform = "rotateY(180deg)";
      break;
    case "down":
      tailParameter.style.transform = "rotate(90deg)";
      break;
    case "right":
      tailParameter.style.transform = "rotate(0deg)";
      break;
  }
};

//CATCHING THE COOKIE FUNCTION!!!

//eaten cookie variable
let eatenCookies = 0;
let cookieIsEaten = 0;

//eating function
const catchingTheCookie = function(position) {
  if (
    document.querySelector(`div.board>div.${"position" + position}`).childNodes
      .length > 0
  ) {
    const statementArray = [
      ...document.querySelector(`div.board>div.${"position" + position}`)
        .childNodes
    ];

    if (statementArray[0].className == "cookie") {
      //removing cookie
      document
        .querySelector(`div.board>div.${"position" + position}`)
        .removeChild(
          document.querySelector(`div.board>div.${"position" + position}`)
            .childNodes[0]
        );

      //animation + sound
      dragonBite.play();
      // setTimeout(dun.play(), 400);

      //scoreboard
      const cookieScore = document.createElement("img");
      cookieScore.setAttribute("src", "img/cookie.png");
      scoreboard.appendChild(cookieScore);

      eatenCookies++;
      document.querySelector(
        "div.score p"
      ).textContent = `Cookies eaten: ${eatenCookies}`;

      cookieIsEaten = 1;
    }
  }
};

//potato head animation
const eatingAnimation = function(position) {
  if (cookieIsEaten == 1) {
    document
      .querySelector(`div.board>div.${"position" + position}>div`)
      .classList.replace("potato", "potatoEating1");
    setTimeout(function() {
      document
        .querySelector(`div.board>div.${"position" + position}>div`)
        .classList.replace("potatoEating1", "potatoEating2");
    }, gameSpeed / 4);
    setTimeout(function() {
      document
        .querySelector(`div.board>div.${"position" + position}>div`)
        .classList.replace("potatoEating2", "potatoEating3");
    }, gameSpeed / 2);
    setTimeout(function() {
      document
        .querySelector(`div.board>div.${"position" + position}>div`)
        .classList.replace("potatoEating3", "potato");
    }, (gameSpeed / 4) * 3);
  }
};

//creation of a new cookie function

const createNewCookie = function() {
  let positionCheck = board[Math.floor(Math.random() * 100 + 1)];
  while (positionCheck.hasChildNodes() == true) {
    positionCheck = board[Math.floor(Math.random() * 100 + 1)];
    console.log("nie mozna utworzyc ciastka");
  }
  positionCheck.appendChild(cookie);
  cookieIsEaten = 0;
};

//MOVEMENT FUNCTION VARIABLES

//movement function variable
let movementDirection = 0;

//additional viarables x99

const tailActualStateArray = [];
for (let i = 1; i < 100; i++) {
  tailActualStateArray.push((window["tailActualState" + i] = 0));
}

const tailActualPositionArray = [];
for (let i = 1; i < 100; i++) {
  tailActualPositionArray.push((window["tailActualPosition" + i] = 0));
}

const tailRotationArray = [];
for (let i = 1; i < 100; i++) {
  tailRotationArray.push((window["tailRotation" + i] = 0));
}

const headPotatoLastPositionArray = [];
for (let i = 1; i < 100; i++) {
  headPotatoLastPositionArray.push((window["headPotatoLastPosition" + i] = 0));
}

//creating new 99 potato tails
const tail = [];
for (let i = 1; i < 100; i++) {
  tail.push((window["tail" + i] = 0));
  tail[i - 1] = document.createElement("div");
  tail[i - 1].classList.add("potatoTail");
}

//game over variable
let gameOver = false;

// THE MOVEMENT FUNCTION

const movement = function(direction) {
  if (gameOver == false) {
    //potato position number
    let divClass = potato.parentElement.className;
    let position = Number(divClass.slice(8, 11));
    headPotatoLastPositionArray[0] = position;

    //removing potato from initial position
    document
      .querySelector(`div.${divClass}`)
      .removeChild(document.querySelector(`div.${divClass}`).childNodes[0]);

    //HEAD POTATO MOVEMENT
    //moving onto a new one

    switch (direction) {
      case "up":
        position <= 10 ? (position += 90) : (position -= 10);
        catchingTheCookie(position);
        document
          .querySelector(`div.board>div.${"position" + position}`)
          .appendChild(potato);
        eatingAnimation(position);
        break;

      case "right":
        position % 10 != 0 ? position++ : (position -= 9);
        catchingTheCookie(position);
        document
          .querySelector(`div.board>div.${"position" + position}`)
          .appendChild(potato);
        eatingAnimation(position);
        break;

      case "down":
        position > 90 ? (position -= 90) : (position += 10);
        catchingTheCookie(position);
        document
          .querySelector(`div.board>div.${"position" + position}`)
          .appendChild(potato);
        eatingAnimation(position);
        break;

      case "left":
        (position - 1) % 10 != 0 ? position-- : (position += 9);
        catchingTheCookie(position);
        document
          .querySelector(`div.board>div.${"position" + position}`)
          .appendChild(potato);
        eatingAnimation(position);
        break;
    }

    //head rotation

    potatoRotation(direction);

    // TAIL CREATION ALGORYTHM
    for (let i = 1; i < 98; i++) {
      if (eatenCookies >= i) {
        //potato tail position number
        if (tailActualStateArray[i - 1] == 1) {
          let divClass1 = tail[i - 1].parentElement.className;
          let position1 = Number(divClass1.slice(8, 11));
          headPotatoLastPositionArray[i] = position1;
        }

        //removing tail from initial position
        if (tailActualStateArray[i - 1] == 1) {
          document
            .querySelector(`div.position${tailActualPositionArray[i - 1]}`)
            .removeChild(
              document.querySelector(
                `div.position${tailActualPositionArray[i - 1]}`
              ).childNodes[0]
            );
        }

        // tail creation
        document
          .querySelector(
            `div.board>div.${"position" + headPotatoLastPositionArray[i - 1]}`
          )
          .appendChild(tail[i - 1]);

        //tail rotation
        tailRotation(tailRotationArray[i - 1], tail[i - 1]);

        //tail variable
        tailActualStateArray[i - 1] = 1;

        //tail position
        tailActualPositionArray[i - 1] = headPotatoLastPositionArray[i - 1];
      }
    }
    if (cookieIsEaten == 1) {
      createNewCookie();
    }

    for (let i = 98; i > 0; i--) {
      tailRotationArray[i] = tailRotationArray[i - 1];
    }

    tailRotationArray[0] = direction;

    // GAME OVER FUNCTION

    const lastStatement = document.body.querySelectorAll("div.board>div");

    lastStatement.forEach(function(pole) {
      if (pole.childNodes.length > 1) {
        console.log("jestem in");
        const lastArray = [...pole.childNodes];
        if (lastArray[0].className == "potato") {
          setTimeout(function() {
            gameOver = true;
            setTimeout(function() {
              document
                .querySelector("div.gameOver")
                .classList.add("gameOverOn");
              document
                .querySelector("div.gameOverInfo")
                .classList.add("gameOverInfoOn");
              document
                .querySelector("div.gameOverInfo i:nth-of-type(1)")
                .addEventListener("click", function() {
                  location.reload(false);
                });
              document
                .querySelector("div.gameOverInfo i:nth-of-type(2)")
                .addEventListener("click", function() {
                  window.location.pathname = "/";
                });
              divWrap.classList.add("blurOn");

              for (let i = 0; i <= eatenCookies; i++) {
                setTimeout(function() {
                  document.querySelector(
                    "div.gameOverInfo p:nth-of-type(3)"
                  ).textContent = i;
                }, (2000 / eatenCookies) * i);
              }
              setTimeout(function() {
                chaChing.play();
              }, 2000);
            });
          }, gameSpeed / 2);
        }
      }
    });
  }
};

// INTERVAL

// game start
let gameStarted = false;

startBtn.addEventListener("click", function() {
  //menu disapperance
  startBtnFunction();

  //start sound effect
  gong.play();

  //CREATION OF POTATO
  board[Math.floor(Math.random() * 100 + 1)].appendChild(potato);

  //FIRST MOVEMENT
  // randomizing
  const firstMove = Math.floor(Math.random() * 4 + 1);
  let movementDirection = 0;
  if (firstMove == 1) {
    movementDirection = "up";
  } else if (firstMove == 2) {
    movementDirection = "right";
  } else if (firstMove == 3) {
    movementDirection = "down";
  } else if (firstMove == 4) {
    movementDirection = "left";
  }

  // game start value
  gameStarted = true;

  //PLACING 1st COOKIE

  setTimeout(function() {
    let positionCheck = board[Math.floor(Math.random() * 100 + 1)];
    while (positionCheck === true) {
      positionCheck = board[Math.floor(Math.random() * 100 + 1)];
    }
    positionCheck.appendChild(cookie);
  }, 1000);

  //CONTROLS !!!
  let clickedKey = 0;
  window.addEventListener("keydown", function(event) {
    if (clickedKey == 0 || eatenCookies == 0) {
      switch (event.key) {
        case "ArrowDown":
          movementDirection = "down";
          clickedKey = "down";
          break;
        case "ArrowUp":
          movementDirection = "up";
          clickedKey = "up";
          break;
        case "ArrowLeft":
          movementDirection = "left";
          clickedKey = "left";
          break;
        case "ArrowRight":
          movementDirection = "right";
          clickedKey = "right";
          break;
      }
    } else {
      // controlsColor('initial');
      switch (event.key) {
        case "ArrowDown":
          if (clickedKey != "up") {
            movementDirection = "down";
            clickedKey = "down";
          }
          break;
        case "ArrowUp":
          if (clickedKey != "down") {
            movementDirection = "up";
            clickedKey = "up";
          }
          break;
        case "ArrowLeft":
          if (clickedKey != "right") {
            movementDirection = "left";
            clickedKey = "left";
          }
          break;
        case "ArrowRight":
          if (clickedKey != "left") {
            movementDirection = "right";
            clickedKey = "right";
          }
          break;
      }
    }
    controlsColor(clickedKey);
    setTimeout(function() {
      controlsColor("initial");
    }, 250);
  });

  //MOBILE CONTROLS

  const leftBtn = document.querySelector("div.leftBtn");
  const rightBtn = document.querySelector("div.rightBtn");

  function movementChange() {
    let side = this.dataset.side;
    if (side == "left") {
      switch (movementDirection) {
        case "left":
          movementDirection = "down";
          break;
        case "down":
          movementDirection = "right";
          break;
        case "right":
          movementDirection = "up";
          break;
        case "up":
          movementDirection = "left";
          break;
      }
    }
    if (side == "right") {
      switch (movementDirection) {
        case "left":
          movementDirection = "up";
          break;
        case "down":
          movementDirection = "left";
          break;
        case "right":
          movementDirection = "down";
          break;
        case "up":
          movementDirection = "right";
          break;
      }
    }
  }

  leftBtn.addEventListener("click", movementChange);
  rightBtn.addEventListener("click", movementChange);

  // GAME INICIALIZATION
  console.log(movementDirection);
  const myVar = setInterval(function() {
    movement(movementDirection);
    myStopFunctionVariable = 1;
  }, gameSpeed);

  function myStopFunction() {
    clearInterval(myVar);
  }
  return movementDirection;
});

// Returns key in console
window.addEventListener("keypress", logKey);

function logKey(e) {
  console.log(` ${e.code}`);
}
