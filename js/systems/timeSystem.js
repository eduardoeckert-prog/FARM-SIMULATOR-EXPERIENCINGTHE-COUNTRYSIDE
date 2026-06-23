// timeSystem.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
const timeData = {
  day: 1,
  hour: 6,
  minute: 0,
  timeScale: 60 // 1 segundo real = 1 minuto no jogo
};

let sunLight = null;

export function setupTimeSystem(directionalLight) {
  sunLight = directionalLight;
  updateSun();
}

export function updateTime(deltaTime) {

  let totalMinutes =
    timeData.hour * 60 +
    timeData.minute;

  totalMinutes +=
    deltaTime * timeData.timeScale;

  if (totalMinutes >= 1440) {

    totalMinutes -= 1440;
    timeData.day++;
  }

  timeData.hour =
    Math.floor(totalMinutes / 60);

  timeData.minute =
    Math.floor(totalMinutes % 60);

  updateSun();
}

function updateSun() {

  if (!sunLight) return;

  const dayProgress =
    (timeData.hour * 60 + timeData.minute) /
    1440;

  const angle =
    dayProgress * Math.PI * 2;

  const radius = 120;

  sunLight.position.set(
    Math.cos(angle - Math.PI / 2) * radius,
    Math.sin(angle - Math.PI / 2) * radius,
    30
  );

  const height =
    Math.max(
      0,
      Math.sin(angle - Math.PI / 2)
    );

  sunLight.intensity =
    0.1 + height * 2.4;
}

export function getTimeData() {
  return timeData;
}

export function getFormattedTime() {

  const h =
    String(timeData.hour).padStart(2, "0");

  const m =
    String(timeData.minute).padStart(2, "0");

  return `${h}:${m}`;
}

export function setTime(hour, minute = 0) {

  timeData.hour = hour;
  timeData.minute = minute;

  updateSun();
}

export function getDay() {
  return timeData.day;
}

export function isDaytime() {
  return timeData.hour >= 6 &&
         timeData.hour < 18;
}

export function isNighttime() {
  return !isDaytime();
}

export function getSunIntensity() {

  const progress =
    (timeData.hour * 60 + timeData.minute) /
    1440;

  return Math.max(
    0,
    Math.sin(progress * Math.PI * 2 - Math.PI / 2)
  );
}
