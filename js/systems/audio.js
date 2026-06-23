// sounds.js

let sounds = {};

export function createSounds() {
    sounds = {
        birds: new Audio("assets/sounds/birds.mp3"),
        wind: new Audio("assets/sounds/wind.mp3"),
        water: new Audio("assets/sounds/water.mp3"),
        cows: new Audio("assets/sounds/cows.mp3"),
        rain: new Audio("assets/sounds/rain.mp3")
    };

    Object.values(sounds).forEach(sound => {
        sound.loop = true;
        sound.volume = 0;
    });
}

export function startAmbientSounds() {
    Object.values(sounds).forEach(sound => {
        sound.play().catch(() => {});
    });
}

export function updateSounds(climateState = "sunny", playerPosition = null) {

    // Sons base
    if (sounds.birds) {
        sounds.birds.volume =
            climateState === "sunny" ? 0.35 : 0.05;
    }

    if (sounds.wind) {
        sounds.wind.volume =
            climateState === "storm" ? 0.4 : 0.15;
    }

    if (sounds.rain) {
        sounds.rain.volume =
            climateState === "rain" || climateState === "storm"
                ? 0.5
                : 0;
    }

    // Sons opcionais de ambiente
    if (sounds.water && playerPosition) {
        sounds.water.volume = 0.2;
    }

    if (sounds.cows && playerPosition) {
        sounds.cows.volume = 0.15;
    }
}

export function stopSounds() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}