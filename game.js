const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;
let flashText = "";
let flashTimer = 0;
let shake = 0;
let particles = [];

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

const hitSound = new Audio("audios/hit.mp3");
const loseSound = new Audio("audios/lose.mp3");

const paddle = {
    x: canvas.width / 2 - 60,
    y: canvas.height - 25,
    w: 120,
    h: 12,
    speed: 8
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 7,
    dx: 4,
    dy: -4
};

const keys = {
    left: false,
    right: false
};

const brickRow = 4;
const brickCol = 9;
const brickW = 55;
const brickH = 18;
const brickPad = 8;
const brickOffsetTop = 35;
const brickOffsetLeft = 30;

let bricks = [];

const colors = [
    "#ff0000","#ff8800","#e1ff00","#66ff00",
    "#00ff88","#00ffff","#0099ff","#2f00ff","#c800ff"
];

for(let c=0;c<brickCol;c++){
    bricks[c]=[];
    for(let r=0;r<brickRow;r++){
        bricks[c][r]={x:0,y:0,status:1};
    }
}

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft"||e.key==="a") keys.left=true;
    if(e.key==="ArrowRight"||e.key==="d") keys.right=true;
});

document.addEventListener("keyup",(e)=>{
    if(e.key==="ArrowLeft"||e.key==="a") keys.left=false;
    if(e.key==="ArrowRight"||e.key==="d") keys.right=false;
});

function createParticles(x,y,color){
    for(let i=0;i<12;i++){
        particles.push({
            x:x,
            y:y,
            dx:(Math.random()-0.5)*5,
            dy:(Math.random()-0.5)*5,
            size:Math.random()*4+2,
            life:25,
            color:color
        });
    }
}

function drawParticles(){
    particles.forEach((p,index)=>{
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillRect(p.x,p.y,p.size,p.size);
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        if(p.life<=0){
            particles.splice(index,1);
        }
    });
}

function drawPaddle(){
    let pulse = Math.sin(Date.now()*0.01)*8+15;

    ctx.shadowColor="#00ffff";
    ctx.shadowBlur=pulse;
    ctx.fillStyle="#00f7ff";
    ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle="#ffffff";
    ctx.shadowColor="#00ffff";
    ctx.shadowBlur=20;
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(let c=0;c<brickCol;c++){
        for(let r=0;r<brickRow;r++){
            if(bricks[c][r].status===1){
                let bx = c*(brickW+brickPad)+brickOffsetLeft;
                let by = r*(brickH+brickPad)+brickOffsetTop;
                bricks[c][r].x=bx;
                bricks[c][r].y=by;

                ctx.fillStyle = colors[c];
                ctx.shadowColor = colors[c];
                ctx.shadowBlur = 15;
                ctx.fillRect(bx,by,brickW,brickH);
            }
        }
    }
}

function collisionDetection(){
    for(let c=0;c<brickCol;c++){
        for(let r=0;r<brickRow;r++){
            let b = bricks[c][r];
            if(b.status===1){
                if(ball.x>b.x && ball.x<b.x+brickW && ball.y>b.y && ball.y<b.y+brickH){
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score++;
                    scoreEl.innerText = score;
                    hitSound.play();

                    flashText = "BLOCK RESTORED";
                    flashTimer = 25;
                    shake = 8;

                    createParticles(ball.x, ball.y, colors[c]);

                    if(score===brickRow*brickCol){
                        alert("PONG404 RECOVERED");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawFlashText(){
    if(flashTimer>0){
        ctx.font="bold 28px Orbitron";
        ctx.fillStyle="rgba(0,255,255,"+(flashTimer/25)+")";
        ctx.shadowColor="#00ffff";
        ctx.shadowBlur=20;
        ctx.fillText(flashText, canvas.width/2-120, canvas.height/2);
        flashTimer--;
    }
}

function draw(){
    let offsetX = 0;
    let offsetY = 0;

    if(shake>0){
        offsetX = (Math.random()-0.5)*shake;
        offsetY = (Math.random()-0.5)*shake;
        shake -= 0.5;
    }

    ctx.save();
    ctx.translate(offsetX, offsetY);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBricks();
    drawPaddle();
    drawBall();
    drawParticles();
    drawFlashText();
    collisionDetection();

    ctx.restore();

    if(keys.left && paddle.x>0) paddle.x -= paddle.speed;
    if(keys.right && paddle.x<canvas.width-paddle.w) paddle.x += paddle.speed;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x+ball.dx > canvas.width-ball.r || ball.x+ball.dx < ball.r){
        ball.dx = -ball.dx;
    }

    if(ball.y+ball.dy < ball.r){
        ball.dy = -ball.dy;
    }

    else if(ball.y+ball.dy > canvas.height-ball.r){
        if(ball.x > paddle.x && ball.x < paddle.x+paddle.w){
            ball.dy = -ball.dy;
        }else{
            lives--;
            livesEl.innerText = lives;
            loseSound.play();

            if(!lives){
                alert("SYSTEM FAILURE");
                document.location.reload();
            }else{
                ball.x = canvas.width/2;
                ball.y = canvas.height/2;
                ball.dx = 4;
                ball.dy = -4;
                paddle.x = canvas.width/2 - 60;
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();