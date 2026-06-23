// climate.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const WEATHER = {
  SUNNY: "sunny",
  CLOUDY: "cloudy",
  RAIN: "rain",
  STORM: "storm"
};

const climate = {
  current: WEATHER.SUNNY,
  timer: 0,
  duration: 120,
  rainParticles: [],
  rainGroup: null
};

let sunLight = null;
let ambientLight = null;

export function setupClimate(scene, directionalLight, ambient) {

  sunLight = directionalLight;
  ambientLight = ambient;

  climate.rainGroup = new THREE.Group();
  scene.add(climate.rainGroup);

  createRain(scene);
}

function createRain(scene) {

  for (let i = 0; i < 1000; i++) {

    const drop = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.3, 0.03),
      new THREE.MeshBasicMaterial({
        color: 0x87ceeb
      })
    );

    drop.position.set(
      Math.random() * 300 - 150,
      Math.random() * 50 + 10,
      Math.random() * 300 - 150
    );

    drop.visible = false;

    climate.rainGroup.add(drop);
    climate.rainParticles.push(drop);
  }
}

function randomWeather() {

  const options = [
    WEATHER.SUNNY,
    WEATHER.CLOUDY,
    WEATHER.RAIN,
    WEATHER.STORM
  ];

  return options[
    Math.floor(Math.random() * options.length)
  ];
}

function applyWeather() {

  switch (climate.current) {

    case WEATHER.SUNNY:

      sunLight.intensity = 2.5;
      ambientLight.intensity = 1.2;

      climate.rainParticles.forEach(drop => {
        drop.visible = false;
      });

      break;

    case WEATHER.CLOUDY:

      sunLight.intensity = 1.2;
      ambientLight.intensity = 0.8;

      climate.rainParticles.forEach(drop => {
        drop.visible = false;
      });

      break;

    case WEATHER.RAIN:

      sunLight.intensity = 0.8;
      ambientLight.intensity = 0.6;

      climate.rainParticles.forEach(drop => {
        drop.visible = true;
      });

      break;

    case WEATHER.STORM:

      sunLight.intensity = 0.3;
      ambientLight.intensity = 0.3;

      climate.rainParticles.forEach(drop => {
        drop.visible = true;
      });

      break;
  }
}

function updateRain(deltaTime) {

  if (
    climate.current !== WEATHER.RAIN &&
    climate.current !== WEATHER.STORM
  ) {
    return;
  }

  climate.rainParticles.forEach(drop => {

    drop.position.y -= 30 * deltaTime;

    if (drop.position.y < 0) {

      drop.position.y =
        Math.random() * 50 + 20;

      drop.position.x =
        Math.random() * 300 - 150;

      drop.position.z =
        Math.random() * 300 - 150;
    }
  });
}

export function updateClimate(deltaTime) {

  climate.timer += deltaTime;

  if (climate.timer >= climate.duration) {

    climate.timer = 0;

    climate.current = randomWeather();

    applyWeather();
  }

  updateRain(deltaTime);
}

export function getCurrentWeather() {
  return climate.current;
}

export function setWeather(weather) {

  climate.current = weather;

  applyWeather();
}
