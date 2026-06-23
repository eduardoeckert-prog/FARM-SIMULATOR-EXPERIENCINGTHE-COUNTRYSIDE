// menus.js

let menuContainer;
let creditsContainer;

export function createMenu(onStart = null) {

    menuContainer = document.createElement("div");
    menuContainer.id = "main-menu";

    menuContainer.innerHTML = `
        <div class="menu-panel">

            <h1 class="menu-title">
                EcoFazenda
            </h1>

            <p class="menu-subtitle">
                Experiencie o campo virtualmente
            </p>

            <button id="start-button" class="menu-button">
                Entrar na Fazenda
            </button>

            <button id="credits-button" class="menu-button">
                Créditos
            </button>

        </div>
    `;

    document.body.appendChild(menuContainer);

    const startButton =
        document.getElementById("start-button");

    const creditsButton =
        document.getElementById("credits-button");

    startButton.addEventListener("click", () => {

        hideMenu();

        if (onStart) {
            onStart();
        }
    });

    creditsButton.addEventListener("click", () => {
        showCredits();
    });
}

export function hideMenu() {

    if (menuContainer) {
        menuContainer.style.display = "none";
    }
}

export function showMenu() {

    if (menuContainer) {
        menuContainer.style.display = "flex";
    }
}

export function showCredits() {

    if (creditsContainer) {
        creditsContainer.style.display = "flex";
        return;
    }

    creditsContainer = document.createElement("div");
    creditsContainer.id = "credits-screen";

    creditsContainer.innerHTML = `
        <div class="credits-panel">

            <h2>Créditos</h2>

            <p>
                Projeto desenvolvido para o Concurso Agrinho.
            </p>

            <p>
                Objetivo: permitir que pessoas conheçam e explorem
                uma fazenda virtual de forma livre e imersiva.
            </p>

            <p>
                Tecnologias:
                HTML, CSS, JavaScript e Three.js
            </p>

            <p>
                Autor: Eduardo
            </p>

            <button id="close-credits">
                Voltar
            </button>

        </div>
    `;

    document.body.appendChild(creditsContainer);

    document
        .getElementById("close-credits")
        .addEventListener("click", hideCredits);
}

export function hideCredits() {

    if (creditsContainer) {
        creditsContainer.style.display = "none";
    }
}

export function toggleMenu() {

    if (!menuContainer) return;

    if (
        menuContainer.style.display === "none" ||
        menuContainer.style.display === ""
    ) {
        showMenu();
    } else {
        hideMenu();
    }
}