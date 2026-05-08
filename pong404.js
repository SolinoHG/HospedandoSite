const canvas = document.getElementById("pongGame");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

const rows = 5;
const cols = 9;

const brickW = 90;
const brickH = 25;
const brickPad = 12;

const offsetTop = 60;
const offsetLeft = 55;

const totalBlocks = rows * cols;

const integrityEl = document.getElementById("integrity");
const blocksLeftEl = document.getElementById("blocksLeft");
const restoreEl = document.getElementById("restore");

let flashText = "";
let flashTimer = 0;

let particles = [];
let shake = 0;

let paddle = {
    x: canvas.width / 2 - 70,
    y: canvas.height - 25,
    w: 140,
    h: 12
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    r: 9,
    dx: 5,
    dy: -5
};

let bricks = [];

for (let c = 0; c < cols; c++) {
    bricks[c] = [];

    for (let r = 0; r < rows; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    paddle.x = e.clientX - rect.left - paddle.w / 2;
});

function drawBall() {

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);

    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 25;

    ctx.fill();
    ctx.closePath();

    // Trail
    ctx.beginPath();

    ctx.arc(
        ball.x - ball.dx * 1.5,
        ball.y - ball.dy * 1.5,
        ball.r - 3,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,247,255,0.3)";
    ctx.fill();

    ctx.closePath();
}

function drawPaddle() {

    ctx.fillStyle = "#00f7ff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 12;

    ctx.fillRect(
        paddle.x,
        paddle.y,
        paddle.w,
        paddle.h
    );
}

function drawBricks() {

    for (let c = 0; c < cols; c++) {

        for (let r = 0; r < rows; r++) {

            if (bricks[c][r].status == 1) {

                let bx = (c * (brickW + brickPad)) + offsetLeft;
                let by = (r * (brickH + brickPad)) + offsetTop;

                bricks[c][r].x = bx;
                bricks[c][r].y = by;

                ctx.fillStyle = `hsl(${c * 35},100%,50%)`;
                ctx.shadowColor = `hsl(${c * 35},100%,50%)`;
                ctx.shadowBlur = 12;

                ctx.fillRect(
                    bx,
                    by,
                    brickW,
                    brickH
                );
            }
        }
    }
}

function createParticles(x, y, color) {

    for (let i = 0; i < 12; i++) {

        particles.push({
            x: x,
            y: y,
            dx: (Math.random() - 0.5) * 6,
            dy: (Math.random() - 0.5) * 6,
            size: Math.random() * 4 + 2,
            life: 30,
            color: color
        });
    }
}

function drawParticles() {

    for (let i = 0; i < particles.length; i++) {

        let p = particles[i];

        ctx.beginPath();

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        p.life--;
    }

    particles = particles.filter(p => p.life > 0);
}

function collision() {

    for (let c = 0; c < cols; c++) {

        for (let r = 0; r < rows; r++) {

            let b = bricks[c][r];

            if (b.status == 1) {

                if (
                    ball.x > b.x &&
                    ball.x < b.x + brickW &&
                    ball.y > b.y &&
                    ball.y < b.y + brickH
                ) {

                    ball.dy = -ball.dy;

                    b.status = 0;

                    score++;

                    document.getElementById("score").innerText = score;

                    // HUD lateral
                    let blocksLeft = totalBlocks - score;

                    let integrity =
                        97 - Math.floor((score / totalBlocks) * 40);

                    let restorePercent =
                        Math.floor((score / totalBlocks) * 100);

                    blocksLeftEl.innerText = blocksLeft;
                    integrityEl.innerText = integrity + "%";
                    restoreEl.innerText = restorePercent + "%";

                    // efeitos
                    flashText = "BLOCK RESTORED";
                    flashTimer = 25;

                    createParticles(
                        ball.x,
                        ball.y,
                        `hsl(${c * 35},100%,50%)`
                    );

                    shake = 4;

                    if (score == totalBlocks) {

                        alert("ARQUIVO TOTALMENTE RESTAURADO");

                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw() {

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Screen shake
    if (shake > 0) {

        let dx = (Math.random() - 0.5) * shake;
        let dy = (Math.random() - 0.5) * shake;

        ctx.setTransform(1, 0, 0, 1, dx, dy);

        shake -= 0.3;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawBricks();
    drawParticles();
    drawBall();
    drawPaddle();

    collision();

    // parede lateral
    if (
        ball.x + ball.dx > canvas.width - ball.r ||
        ball.x + ball.dx < ball.r
    ) {

        ball.dx = -ball.dx;
    }

    // teto
    if (ball.y + ball.dy < ball.r) {

        ball.dy = -ball.dy;
    }

    // chão
    else if (
        ball.y + ball.dy > canvas.height - ball.r
    ) {

        // rebate na barra
        if (
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.w
        ) {

            ball.dy = -ball.dy;
        }

        // perdeu vida
        else {

            lives--;

            document.getElementById("lives").innerText = lives;

            shake = 8;

            if (!lives) {

                alert("SISTEMA FALHOU");

                document.location.reload();
            }

            else {

                ball.x = canvas.width / 2;
                ball.y = canvas.height - 50;

                ball.dx = 5;
                ball.dy = -5;

                paddle.x = canvas.width / 2 - 70;
            }
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    // Texto no meio
    if (flashTimer > 0) {

        ctx.font = "28px Orbitron";

        ctx.fillStyle = "rgba(0,255,255,0.8)";

        ctx.fillText(
            flashText,
            canvas.width / 2 - 120,
            canvas.height / 2
        );

        flashTimer--;
    }

    requestAnimationFrame(draw);
}

draw();


// MATRIX BACKGROUND

const bgCanvas = document.getElementById("matrixBg");
const bgCtx = bgCanvas.getContext("2d");

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const letters =
"01010101HEGUEZONEPONG404SYSERRORRECOVER";

const fontSize = 16;

const columns = bgCanvas.width / fontSize;

let drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {

    bgCtx.fillStyle = "rgba(0,0,0,0.08)";

    bgCtx.fillRect(
        0,
        0,
        bgCanvas.width,
        bgCanvas.height
    );

    bgCtx.fillStyle = "#00f7ff";

    bgCtx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {

        const text =
            letters[Math.floor(Math.random() * letters.length)];

        bgCtx.fillText(
            text,
            i * fontSize,
            drops[i] * fontSize
        );

        if (
            drops[i] * fontSize > bgCanvas.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 35);