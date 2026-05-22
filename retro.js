// Passo a Passo:
// Passo 1: quando clickar botao, marcar como selecionado (para alterar o visual dele)

// verificar o click
const botoes = document.querySelectorAll(".botao");

// Passo 2:
const jogo = document.querySelectorAll(".jogo");

botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {

        // remover o selecionado anteriormente
        desselecionarBotao();

        // adicionar a classe ".selecionado"
        botao.classList.add("selecionado");

        // Passo 2: quando clickar no jogo, mostrar a descrição

        // remover o selecionado anteriormente
        desselecionarJogo();

        // adicionar a classe ".selecionado"
        jogo[indice].classList.add("selecionado");

    });
});
function desselecionarJogo() {
    const jogoSelecionado = document.querySelector(".jogo.selecionado");
    jogoSelecionado.classList.remove("selecionado");
}

function desselecionarBotao() {
    const botaoSelecionado = document.querySelector(".botao.selecionado");
    botaoSelecionado.classList.remove("selecionado");
}

