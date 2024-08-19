const jogoElements = document.querySelectorAll("[data-jogo]");
const borda = document.querySelector("[data-borda]");
const reiniciarBtn = document.getElementById("reiniciar");

let VezBola;

const casosGanhou = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function IniciarJogo() {
    for (const jogo of jogoElements) {
        jogo.classList.remove('x', 'bola');
        jogo.addEventListener("click", Click, { once: true });
    }    

    VezBola = false;
    borda.classList.add("x");
}

function verificarGanhador(JogadorAtual) {
    return casosGanhou.some(combos => {
        return combos.every(index => {
            return jogoElements[index].classList.contains(JogadorAtual);
        });
    });
}

function casaMarca(jogo, classToAdd) {
    jogo.classList.add(classToAdd);
}

function Turnos() {
    VezBola = !VezBola;

    borda.classList.remove('bola', 'x');

    if (VezBola) {
        borda.classList.add('bola');
    } else {
        borda.classList.add('x');  
    }
}

function Click(e) {
    const jogo = e.target;
    const classToAdd = VezBola ? 'bola' : 'x';

    // Marca a casa com X ou O
    casaMarca(jogo, classToAdd);

    // Faz um pequeno atraso para garantir que o DOM seja atualizado antes de verificar a vitória
    setTimeout(() => {
        const EbaGanhou = verificarGanhador(classToAdd);
        if (EbaGanhou) {
            alert(`${classToAdd.toUpperCase()} ganhou!`);
            IniciarJogo();
            return;
        }
        
        Turnos();
    }, 100);  // 100ms de atraso para garantir a atualização do DOM
}

reiniciarBtn.addEventListener("click", IniciarJogo);

IniciarJogo();
