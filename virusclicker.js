/* =========================
   HEGUEZONE VIRUS CLICKER
========================= */

const virusButton = document.getElementById("virusButton");

const virusCountEl = document.getElementById("virusCount");
const ppsCountEl = document.getElementById("ppsCount");
const infectionLevelEl = document.getElementById("infectionLevel");

const alertFill = document.getElementById("alertFill");
const alertText = document.getElementById("alertText");

const terminalLog = document.getElementById("terminalLog");

/* upgrades */

const autoClickUpgrade = document.getElementById("autoClickUpgrade");
const firewallUpgrade = document.getElementById("firewallUpgrade");
const serverUpgrade = document.getElementById("serverUpgrade");
const aiUpgrade = document.getElementById("aiUpgrade");

/* valores */

let virus = 0;

let pps = 0;

let infection = 3;

let clickPower = 1;

/* custos */

let autoCost = 25;
let firewallCost = 120;
let serverCost = 350;
let aiCost = 900;

/* logs terminal */

const logs = [

"> neural scanner activated...",
"> suspicious entity found...",
"> malware spreading...",
"> firewall damaged...",
"> infected memory sector detected...",
"> restoring digital stability...",
"> antivirus protocol started...",
"> quantum purge initialized...",
"> removing corrupted packets...",
"> system integrity recovering...",
"> deep scan running...",
"> dangerous executable isolated...",
"> virus signature updated...",
"> unknown AI attempting breach...",
"> digital corruption contained..."

];

/* atualizar hud */

function updateHUD(){

    virusCountEl.innerText = Math.floor(virus);

    ppsCountEl.innerText = pps;

    infectionLevelEl.innerText = infection + "%";

    alertFill.style.width = infection + "%";

    if(infection < 30){

        alertText.innerText =
        "SYSTEM STABLE";

    }else if(infection < 60){

        alertText.innerText =
        "DIGITAL INSTABILITY DETECTED";

    }else if(infection < 85){

        alertText.innerText =
        "CRITICAL MALWARE ACTIVITY";

    }else{

        alertText.innerText =
        "SYSTEM FAILURE IMMINENT";

    }

}

/* clique principal */

virusButton.addEventListener("click", () => {

    virus += clickPower;

    infection -= 0.15;

    if(infection < 0){
        infection = 0;
    }

    /* efeito botão */

    virusButton.style.transform = "scale(.92)";

    setTimeout(() => {

        virusButton.style.transform = "scale(1)";

    },80);

    /* popup floating */

    createFloatingText("+1");

    /* terminal */

    randomLog();

    updateHUD();

});

/* texto flutuando */

function createFloatingText(text){

    const floating =
    document.createElement("div");

    floating.classList.add("floating-text");

    floating.innerText = text;

    document.body.appendChild(floating);

    const rect =
    virusButton.getBoundingClientRect();

    floating.style.left =
    rect.left + rect.width/2 + "px";

    floating.style.top =
    rect.top + "px";

    setTimeout(() => {

        floating.remove();

    },1000);

}

/* logs aleatórios */

function randomLog(){

    const p =
    document.createElement("p");

    p.innerText =
    logs[Math.floor(Math.random()*logs.length)];

    terminalLog.prepend(p);

    if(terminalLog.children.length > 18){

        terminalLog.removeChild(
        terminalLog.lastChild
        );

    }

}

/* sistema automático */

setInterval(() => {

    virus += pps;

    infection += 0.08;

    if(infection > 100){

        infection = 100;

    }

    updateHUD();

    /* game over */

    if(infection >= 100){

        alert(
        "☣ SYSTEM FAILURE ☣"
        );

        location.reload();

    }

},1000);

/* upgrade 1 */

autoClickUpgrade.addEventListener("click", () => {

    if(virus >= autoCost){

        virus -= autoCost;

        pps += 1;

        autoCost =
        Math.floor(autoCost * 1.4);

        autoClickUpgrade.innerHTML = `
        <span>🧠 Neural Scanner</span>
        <small>${autoCost} DATA</small>
        `;

        randomLog();

        updateHUD();

    }

});

/* upgrade 2 */

firewallUpgrade.addEventListener("click", () => {

    if(virus >= firewallCost){

        virus -= firewallCost;

        pps += 5;

        firewallCost =
        Math.floor(firewallCost * 1.5);

        firewallUpgrade.innerHTML = `
        <span>🛡 Firewall Quantum</span>
        <small>${firewallCost} DATA</small>
        `;

        randomLog();

        updateHUD();

    }

});

/* upgrade 3 */

serverUpgrade.addEventListener("click", () => {

    if(virus >= serverCost){

        virus -= serverCost;

        pps += 10;

        serverCost =
        Math.floor(serverCost * 1.6);

        serverUpgrade.innerHTML = `
        <span>💾 Server Cleaner</span>
        <small>${serverCost} DATA</small>
        `;

        randomLog();

        updateHUD();

    }

});

/* upgrade 4 */

aiUpgrade.addEventListener("click", () => {

    if(virus >= aiCost){

        virus -= aiCost;

        pps += 25;

        aiCost =
        Math.floor(aiCost * 1.8);

        aiUpgrade.innerHTML = `
        <span>🤖 AntiVirus AI</span>
        <small>${aiCost} DATA</small>
        `;

        randomLog();

        updateHUD();

    }

});

/* MATRIX BACKGROUND */

const canvas =
document.getElementById("matrixCanvas");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const letters =
"01HEGUEZONEVIRUSERRORMALWARE";

const fontSize = 16;

const columns =
canvas.width / fontSize;

const drops = [];

for(let i=0;i<columns;i++){

    drops[i] = 1;

}

function drawMatrix(){

    ctx.fillStyle =
    "rgba(0,0,0,0.08)";

    ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
    );

    ctx.fillStyle =
    "#00ff9d";

    ctx.font =
    fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
        letters[
        Math.floor(
        Math.random()*letters.length
        )
        ];

        ctx.fillText(
        text,
        i * fontSize,
        drops[i] * fontSize
        );

        if(
        drops[i] * fontSize >
        canvas.height &&
        Math.random() > 0.975
        ){

            drops[i] = 0;

        }

        drops[i]++;

    }

}

setInterval(drawMatrix,35);

/* floating style */

const style =
document.createElement("style");

style.innerHTML = `

.floating-text{

    position:fixed;

    color:#00f7ff;

    font-size:26px;

    font-weight:900;

    pointer-events:none;

    z-index:9999;

    animation:floatUp 1s forwards;

    text-shadow:
    0 0 10px #00f7ff,
    0 0 20px #00f7ff;
}

@keyframes floatUp{

    0%{
        opacity:1;
        transform:
        translateY(0px)
        scale(1);
    }

    100%{
        opacity:0;
        transform:
        translateY(-90px)
        scale(1.5);
    }

}

`;

document.head.appendChild(style);

/* iniciar */

updateHUD();

randomLog();
randomLog();
randomLog();

/* =========================================
   BLOCO 5 — GAME FEEL INSANO
========================================= */

/* COMBO */

let combo = 0;
let comboTimer = null;

/* LEVEL */

let level = 1;

/* CRITICAL */

let criticalChance = 0.12;

/* SHAKE */

function screenShake(power = 8){

    document.body.animate([

        { transform:`translate(0px,0px)` },

        {
            transform:
            `translate(${Math.random()*power-power/2}px,
            ${Math.random()*power-power/2}px)`
        },

        {
            transform:
            `translate(${Math.random()*power-power/2}px,
            ${Math.random()*power-power/2}px)`
        },

        { transform:`translate(0px,0px)` }

    ],{

        duration:180

    });

}

/* PARTICLES */

function createParticleBurst(x,y,color="#00f7ff"){

    for(let i=0;i<16;i++){

        const particle =
        document.createElement("div");

        particle.classList.add("particle");

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.background = color;

        const dx =
        (Math.random()-0.5)*220;

        const dy =
        (Math.random()-0.5)*220;

        particle.style.setProperty("--dx",dx+"px");
        particle.style.setProperty("--dy",dy+"px");

        document.body.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },1000);

    }

}

/* MENSAGEM GIGANTE */

function giantMessage(text,color="#00f7ff"){

    const msg =
    document.createElement("div");

    msg.classList.add("giant-message");

    msg.innerText = text;

    msg.style.color = color;

    document.body.appendChild(msg);

    setTimeout(()=>{

        msg.remove();

    },1800);

}

/* CLICK UPGRADE */

virusButton.addEventListener("click",()=>{

    combo++;

    clearTimeout(comboTimer);

    comboTimer = setTimeout(()=>{

        combo = 0;

    },1800);

    let gain = clickPower;

    /* critical */

    if(Math.random() < criticalChance){

        gain *= 5;

        giantMessage(
        "CRITICAL PURGE",
        "#ff004c"
        );

        screenShake(16);

    }

    /* combo bonus */

    if(combo >= 15){

        gain *= 2;

        giantMessage(
        "COMBO x2",
        "#00ff9d"
        );

    }

    virus += gain;

    /* popup */

    createFloatingText(
    "+" + gain
    );

    /* particles */

    const rect =
    virusButton.getBoundingClientRect();

    createParticleBurst(

        rect.left + rect.width/2,

        rect.top + rect.height/2

    );

    /* danger effects */

    if(infection >= 70){

        screenShake(10);

    }

    /* level system */

    if(virus >= level * 500){

        level++;

        giantMessage(
        "LEVEL " + level,
        "#00f7ff"
        );

        clickPower++;

        infection -= 5;

        if(infection < 0){

            infection = 0;

        }

    }

    updateHUD();

});

/* DYNAMIC DANGER */

setInterval(()=>{

    if(infection >= 75){

        document.body.classList.add(
        "danger-mode"
        );

    }else{

        document.body.classList.remove(
        "danger-mode"
        );

    }

},300);

/* RANDOM EVENTS */

setInterval(()=>{

    const chance =
    Math.random();

    /* malware spike */

    if(chance < 0.15){

        infection += 8;

        giantMessage(
        "MALWARE SPIKE",
        "#ff004c"
        );

        screenShake(18);

        randomLog();

    }

    /* recovery */

    else if(chance < 0.28){

        infection -= 5;

        if(infection < 0){

            infection = 0;

        }

        giantMessage(
        "SYSTEM RECOVERED",
        "#00ff9d"
        );

    }

    updateHUD();

},18000);

/* AUTO SAVE */

setInterval(()=>{

    const save = {

        virus,
        pps,
        infection,
        level,
        clickPower,
        autoCost,
        firewallCost,
        serverCost,
        aiCost

    };

    localStorage.setItem(

        "virusSave",

        JSON.stringify(save)

    );

},4000);

/* LOAD SAVE */

function loadSave(){

    const save =
    localStorage.getItem("virusSave");

    if(save){

        const data =
        JSON.parse(save);

        virus = data.virus || 0;

        pps = data.pps || 0;

        infection = data.infection || 3;

        level = data.level || 1;

        clickPower =
        data.clickPower || 1;

        autoCost =
        data.autoCost || 25;

        firewallCost =
        data.firewallCost || 120;

        serverCost =
        data.serverCost || 350;

        aiCost =
        data.aiCost || 900;

    }

}

loadSave();

/* PARTICLE STYLE */

const extraStyle =
document.createElement("style");

extraStyle.innerHTML = `

/* particles */

.particle{

    position:fixed;

    width:10px;
    height:10px;

    border-radius:50%;

    pointer-events:none;

    z-index:99999;

    animation:
    particleMove 1s forwards;
}

@keyframes particleMove{

    0%{

        opacity:1;

        transform:
        translate(0px,0px)
        scale(1);

    }

    100%{

        opacity:0;

        transform:
        translate(var(--dx),var(--dy))
        scale(0);

    }

}

/* giant msg */

.giant-message{

    position:fixed;

    top:50%;
    left:50%;

    transform:
    translate(-50%,-50%);

    font-size:64px;

    font-weight:900;

    z-index:999999;

    text-shadow:
    0 0 20px currentColor,
    0 0 60px currentColor;

    animation:
    giantFade 1.8s forwards;

    pointer-events:none;
}

/* animation */

@keyframes giantFade{

    0%{

        opacity:0;

        transform:
        translate(-50%,-50%)
        scale(.5);

    }

    20%{

        opacity:1;

        transform:
        translate(-50%,-50%)
        scale(1);

    }

    100%{

        opacity:0;

        transform:
        translate(-50%,-50%)
        scale(1.4);

    }

}

/* danger mode */

.danger-mode{

    animation:
    dangerFlash .5s infinite;
}

@keyframes dangerFlash{

    0%{

        filter:hue-rotate(0deg);

    }

    50%{

        filter:
        hue-rotate(-20deg)
        brightness(1.1);

    }

    100%{

        filter:hue-rotate(0deg);

    }

}

`;

document.head.appendChild(extraStyle);

/* =========================================
   BLOCO FINAL — POLIMENTO AAA
========================================= */

/* =========================================
   SONS
========================================= */

const clickSound = new Audio(
"public/assets/audios/musicooin.mp3"
);

const levelSound = new Audio(
"public/assets/audios/switch.mp3"
);

clickSound.volume = 0.35;
levelSound.volume = 0.45;

/* MUSIC LOOP */

const bgMusic = new Audio(
"public/assets/audios/cyberambient.mp3"
);

bgMusic.loop = true;
bgMusic.volume = 0.18;

/* iniciar música após interação */

document.body.addEventListener("click",()=>{

    bgMusic.play().catch(()=>{});

},{ once:true });

/* =========================================
   CLICK SOUND
========================================= */

virusButton.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();

});

/* =========================================
   ACHIEVEMENTS
========================================= */

const achievements = [

{
    amount:100,
    text:"FIRST PURGE"
},

{
    amount:500,
    text:"MALWARE HUNTER"
},

{
    amount:1500,
    text:"SYSTEM SAVIOR"
},

{
    amount:5000,
    text:"DIGITAL GOD"
}

];

let unlocked = [];

/* popup */

function achievementPopup(text){

    const pop =
    document.createElement("div");

    pop.classList.add("achievement-popup");

    pop.innerHTML = `
    🏆 ACHIEVEMENT UNLOCKED
    <span>${text}</span>
    `;

    document.body.appendChild(pop);

    setTimeout(()=>{

        pop.remove();

    },4000);

}

/* check */

function checkAchievements(){

    achievements.forEach(a=>{

        if(

            virus >= a.amount &&

            !unlocked.includes(a.text)

        ){

            unlocked.push(a.text);

            achievementPopup(a.text);

            levelSound.play();

        }

    });

}

/* =========================================
   BOSS EVENT
========================================= */

let bossActive = false;

function startBossEvent(){

    if(bossActive) return;

    bossActive = true;

    giantMessage(
    "BOSS VIRUS DETECTED",
    "#ff004c"
    );

    infection += 20;

    screenShake(22);

    const boss =
    document.createElement("div");

    boss.classList.add("boss-virus");

    boss.innerHTML = "☣";

    document.body.appendChild(boss);

    let hp = 250;

    boss.addEventListener("click",()=>{

        hp -= clickPower;

        createParticleBurst(

            window.innerWidth/2,

            window.innerHeight/2,

            "#ff004c"

        );

        if(hp <= 0){

            boss.remove();

            bossActive = false;

            virus += 500;

            infection -= 25;

            if(infection < 0){

                infection = 0;

            }

            giantMessage(
            "BOSS DESTROYED",
            "#00ff9d"
            );

            updateHUD();

        }

    });

}

/* evento aleatório */

setInterval(()=>{

    if(Math.random() < 0.18){

        startBossEvent();

    }

},45000);

/* =========================================
   GLITCH RANDOM
========================================= */

setInterval(()=>{

    if(Math.random() < 0.15){

        document.body.classList.add(
        "hard-glitch"
        );

        setTimeout(()=>{

            document.body.classList.remove(
            "hard-glitch"
            );

        },300);

    }

},8000);

/* =========================================
   VITÓRIA
========================================= */

function victoryMode(){

    giantMessage(
    "SYSTEM PURIFIED",
    "#00ff9d"
    );

    document.body.classList.add(
    "victory-mode"
    );

}

/* detectar vitória */

setInterval(()=>{

    if(

        infection <= 0 &&

        virus >= 3000

    ){

        victoryMode();

    }

},2000);

/* =========================================
   CURSOR CUSTOM
========================================= */

const cursor =
document.createElement("div");

cursor.classList.add("cyber-cursor");

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

/* =========================================
   CRT EFFECT
========================================= */

const crt =
document.createElement("div");

crt.classList.add("crt-overlay");

document.body.appendChild(crt);

/* =========================================
   CHECK LOOP
========================================= */

setInterval(()=>{

    checkAchievements();

},1000);

/* =========================================
   STYLES FINAL
========================================= */

const aaaStyle =
document.createElement("style");

aaaStyle.innerHTML = `

/* achievement */

.achievement-popup{

    position:fixed;

    right:30px;
    top:30px;

    width:320px;

    padding:20px;

    border-radius:20px;

    background:
    linear-gradient(
    145deg,
    rgba(0,0,0,.95),
    rgba(0,255,255,.08)
    );

    border:1px solid rgba(0,255,255,.2);

    color:#00f7ff;

    z-index:999999;

    box-shadow:
    0 0 35px rgba(0,255,255,.18);

    animation:
    achievementAnim .5s ease;
}

.achievement-popup span{

    display:block;

    margin-top:12px;

    color:white;

    font-size:22px;

    font-weight:900;
}

/* boss */

.boss-virus{

    position:fixed;

    left:50%;
    top:50%;

    transform:
    translate(-50%,-50%);

    width:260px;
    height:260px;

    border-radius:50%;

    background:
    radial-gradient(circle,
    rgba(255,0,80,.28),
    rgba(0,0,0,.95));

    display:flex;
    justify-content:center;
    align-items:center;

    font-size:120px;

    color:#ff004c;

    z-index:99999;

    cursor:pointer;

    animation:
    bossPulse 2s infinite;

    box-shadow:
    0 0 60px rgba(255,0,80,.5);
}

/* cursor */

.cyber-cursor{

    position:fixed;

    width:18px;
    height:18px;

    border-radius:50%;

    border:2px solid #00f7ff;

    pointer-events:none;

    transform:
    translate(-50%,-50%);

    z-index:999999;

    box-shadow:
    0 0 20px #00f7ff;
}

/* crt */

.crt-overlay{

    position:fixed;

    inset:0;

    pointer-events:none;

    z-index:9999;

    background:
    repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,.03),
    rgba(255,255,255,.03) 1px,
    transparent 2px,
    transparent 4px);

    mix-blend-mode:soft-light;

    opacity:.15;
}

/* glitch */

.hard-glitch{

    animation:
    hardGlitch .2s infinite;
}

@keyframes hardGlitch{

    0%{

        transform:
        translate(2px,-2px);

        filter:hue-rotate(0deg);

    }

    50%{

        transform:
        translate(-2px,2px);

        filter:hue-rotate(-25deg);

    }

    100%{

        transform:
        translate(0px,0px);

        filter:hue-rotate(0deg);

    }

}

/* victory */

.victory-mode{

    animation:
    victoryGlow 3s infinite;
}

@keyframes victoryGlow{

    0%{

        filter:
        hue-rotate(0deg)
        brightness(1);

    }

    50%{

        filter:
        hue-rotate(50deg)
        brightness(1.2);

    }

    100%{

        filter:
        hue-rotate(0deg)
        brightness(1);

    }

}

/* animations */

@keyframes bossPulse{

    0%{

        transform:
        translate(-50%,-50%)
        scale(1);

    }

    50%{

        transform:
        translate(-50%,-50%)
        scale(1.08);

    }

    100%{

        transform:
        translate(-50%,-50%)
        scale(1);

    }

}

@keyframes achievementAnim{

    from{

        opacity:0;

        transform:
        translateX(60px);

    }

    to{

        opacity:1;

        transform:
        translateX(0px);

    }

}

`;

document.head.appendChild(aaaStyle);