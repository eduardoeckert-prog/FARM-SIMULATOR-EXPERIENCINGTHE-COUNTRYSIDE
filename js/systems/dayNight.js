// dayNight.js

let timeOfDay = 8; // 08:00

const DAY_SPEED = 0.02;

export function updateDayNight(deltaTime) {

    timeOfDay += DAY_SPEED * deltaTime;

    if (timeOfDay >= 24) {
        timeOfDay = 0;
    }
}

export function getTimeOfDay() {
    return timeOfDay;
}

export function getFormattedTime() {

    const hours = Math.floor(timeOfDay);

    const minutes = Math.floor(
        (timeOfDay - hours) * 60
    );

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function isDay() {
    return timeOfDay >= 6 && timeOfDay < 18;
}

export function isNight() {
    return !isDay();
}
