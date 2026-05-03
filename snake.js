const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, direction, food, score, game;

const eatSound = new Audio("public assets/audios/musicooin.mp3");

/* recorde salvo */
let highscore = localStorage.getItem("snakeHighscore") || 0;
document.getElementById("highScoreText").innerText = "Recorde Global: " + highscore;

function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";

    food = {
        x: Math.floor(Math.random() * 25) * box,
        y: Math.floor(Math.random() * 25) * box
    };

    score = 0;
    document.getElementById("scoreText").innerText = "Score Atual: " + score;

    clearInterval(game);
    game = setInterval(draw, 90);
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if ((key === "w" || event.key === "ArrowUp") && direction !== "DOWN") direction = "UP";
    if ((key === "s" || event.key === "ArrowDown") && direction !== "UP") direction = "DOWN";
    if ((key === "a" || event.key === "ArrowLeft") && direction !== "RIGHT") direction = "LEFT";
    if ((key === "d" || event.key === "ArrowRight") && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, 500, 500);

    /* grade digital */
    ctx.strokeStyle = "rgba(0,255,255,0.05)";
    for(let i=0;i<500;i+=20){
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,500);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(500,i);
        ctx.stroke();
    }

    /* cobra */
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ffff" : "#4dffff";
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 15;
        ctx.fillRect(part.x, part.y, box, box);
    });

    /* comida */
    ctx.fillStyle = "#ff0055";
    ctx.shadowColor = "#ff0055";
    ctx.shadowBlur = 20;
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    if (headX === food.x && headY === food.y) {
        score++;
        eatSound.currentTime = 0;
        eatSound.play();
        document.getElementById("scoreText").innerText = "Score Atual: " + score;

        food = {
            x: Math.floor(Math.random() * 25) * box,
            y: Math.floor(Math.random() * 25) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };

    if (
        headX < 0 || headY < 0 ||
        headX >= 500 || headY >= 500 ||
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

    document.getElementById("highScoreText").innerText = "Recorde Global: " + highscore;
    document.getElementById("finalScoreText").innerText = "Pontuação: " + score;
    document.getElementById("gameOverScreen").style.display = "flex";
}

startGame();

function restartGame(){
    document.getElementById("gameOverScreen").style.display = "none";
    startGame();
}