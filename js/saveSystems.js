// saveSystem.js

const SAVE_KEY = "ecofazenda_save";

export function saveGame(data) {

    try {

        const saveData = {
            version: "1.0",
            saveDate: new Date().toISOString(),
            ...data
        };

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(saveData)
        );

        console.log("Jogo salvo.");

        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar:",
            error
        );

        return false;
    }
}

export function loadGame() {

    try {

        const rawSave =
            localStorage.getItem(SAVE_KEY);

        if (!rawSave) {
            return null;
        }

        return JSON.parse(rawSave);

    } catch (error) {

        console.error(
            "Erro ao carregar:",
            error
        );

        return null;
    }
}

export function deleteSave() {

    localStorage.removeItem(SAVE_KEY);

    console.log("Save removido.");
}

export function hasSave() {

    return localStorage.getItem(SAVE_KEY) !== null;
}

export function autoSave(gameStateGetter) {

    setInterval(() => {

        try {

            const gameState =
                gameStateGetter();

            saveGame(gameState);

        } catch (error) {

            console.error(
                "Erro no autosave:",
                error
            );
        }

    }, 60000); // salva a cada 1 minuto
}

export function exportSave() {

    const saveData =
        localStorage.getItem(SAVE_KEY);

    if (!saveData) return null;

    const blob = new Blob(
        [saveData],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "ecofazenda-save.json";

    link.click();

    URL.revokeObjectURL(url);
}

export function importSave(file) {

    const reader = new FileReader();

    reader.onload = event => {

        try {

            const save =
                JSON.parse(event.target.result);

            localStorage.setItem(
                SAVE_KEY,
                JSON.stringify(save)
            );

            location.reload();

        } catch {

            alert(
                "Arquivo de save inválido."
            );
        }
    };

    reader.readAsText(file);
}
