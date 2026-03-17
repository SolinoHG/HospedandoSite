const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, direction, food, score, game;

const eatSound = new Audio("sounds/eat.mp3");

// Recorde salvo
let highscore = localStorage.getItem("snakeHighscore") || 0;
document.getElementById("highscore").innerText = highscore;

function startGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";

  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  score = 0;
  document.getElementById("score").innerText = score;

  document.getElementById("gameOver").style.display = "none";

  clearInterval(game);
  game = setInterval(draw, 90);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "w" && direction !== "DOWN") direction = "UP";
  if (key === "s" && direction !== "UP") direction = "DOWN";
  if (key === "a" && direction !== "RIGHT") direction = "LEFT";
  if (key === "d" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 400, 400);

  // Cobra
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? "#00ffff" : "#66ffff";
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 10;
    ctx.fillRect(part.x, part.y, box, box);
  });

  // Comida
  ctx.fillStyle = "#ff0055";
  ctx.shadowColor = "#ff0055";
  ctx.shadowBlur = 15;
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // Comer
  if (headX === food.x && headY === food.y) {
    score++;
    eatSound.play();
    document.getElementById("score").innerText = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Colisão
  if (
    headX < 0 || headY < 0 ||
    headX >= 400 || headY >= 400 ||
    snake.some(part => part.x === newHead.x && part.y === newHead.y)
  ) {
    endGame();
    return;
  }

  snake.unshift(newHead);
}

function endGame() {
  clearInterval(game);

  if (score > highscore) {
    highscore = score;
    localStorage.setItem("snakeHighscore", highscore);
  }

  document.getElementById("highscore").innerText = highscore;
  document.getElementById("finalScore").innerText = "Pontuação: " + score;

  document.getElementById("gameOver").style.display = "flex";
}

function restartGame() {
  startGame();
}

startGame();