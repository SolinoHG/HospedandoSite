const grid = document.getElementById("memoryGrid");

const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const integrityEl = document.getElementById("integrity");

/* ICONES */

const icons = [
    "public/assets/images/glitchmeme.jpg",
    "public/assets/images/glitch2.jpg",
    "public/assets/images/glitch3.jpg",
    "public/assets/images/glitch4.jpg",
    "public/assets/images/glitch5.jpg",
    "public/assets/images/glitch6.jpg",
    "public/assets/images/glitch7.jpg",
    "public/assets/images/glitch8.jpg"
];

let cards = [...icons, ...icons];

cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let pairs = 0;

/* CRIAR CARTAS */

cards.forEach(icon => {

    const card = document.createElement("div");

    card.classList.add("memory-card");

    card.dataset.icon = icon;

    card.innerHTML = `
        <div class="card-inner">

            <div class="card-front">
                ?
            </div>

            <div class="card-back">
    <img src="${icon}">
</div>

        </div>
    `;

    card.addEventListener("click", flipCard);

    grid.appendChild(card);

});

/* VIRAR */

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {

        firstCard = this;

        return;
    }

    secondCard = this;

    moves++;

    movesEl.innerText =
        String(moves).padStart(2, "0");

    checkMatch();
}

/* MATCH */

function checkMatch() {

    const isMatch =
        firstCard.dataset.icon ===
        secondCard.dataset.icon;

    if (isMatch) {

        disableCards();

    } else {

        unflipCards();
    }
}

/* DESABILITA */

function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    pairs++;

    pairsEl.innerText =
        String(pairs).padStart(2, "0");

    updateIntegrity();

    resetBoard();

    randomGlitch();

    /* venceu */

    if (pairs === icons.length) {

        setTimeout(() => {

            alert("NEURAL ARCHIVE RECOVERED");

        }, 500);
    }
}

/* DESVIRAR */

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();

    }, 900);
}

/* RESET */

function resetBoard() {

    [firstCard, secondCard] = [null, null];

    lockBoard = false;
}

/* INTEGRIDADE */

function updateIntegrity() {

    let integrity =
        91 + Math.floor((pairs / icons.length) * 9);

    integrityEl.innerText =
        integrity + "%";
}

/* GLITCH ALEATÓRIO */

function randomGlitch() {

    document.body.classList.add("screen-glitch");

    setTimeout(() => {

        document.body.classList.remove("screen-glitch");

    }, 180);
}

/* GLITCH ALEATÓRIO */

setInterval(() => {

    const allCards =
        document.querySelectorAll(".memory-card");

    const random =
        allCards[Math.floor(Math.random() * allCards.length)];

    random.classList.add("corrupted");

    setTimeout(() => {

        random.classList.remove("corrupted");

    }, 400);

}, 2500);