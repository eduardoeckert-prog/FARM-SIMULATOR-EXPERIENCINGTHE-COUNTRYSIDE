import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { scene, camera, renderer, setupScene } from "./scene.js";
import { setupControls, updateControls } from "./systems/controls.js";

import { createTerrain } from "./world/terrain.js";
import { createWater } from "./world/lakes.js";
import { createVegetation } from "./world/tree.js";
import { createBuildings } from "./world/building.js";

import { createCrops, updateCrops } from "./farming/crops.js";
import { createAnimals, updateAnimals } from "./animals/animals.js";

import { updateClimate } from "./systems/climate.js";
import { updateTime } from "./systems/timeSystem.js";

import { updateHUD } from "./ui/hud.js";
import { updateInteraction } from "./interaction.js";

let clock;

/*
=========================================
INICIALIZAÇÃO
=========================================
*/

function init() {
    clock = new THREE.Clock();

    setupScene();
    setupControls();

    createTerrain();
    createWater();
    createVegetation();
    createBuildings();

    createCrops();
    createAnimals();

    animate();
}

/*
=========================================
LOOP PRINCIPAL
=========================================
*/

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    updateControls(delta);

    updateTime(delta);
    updateClimate(delta);

    updateCrops(delta);
    updateAnimals(delta);

    updateInteraction();
    updateHUD();

    renderer.render(scene, camera);
}

/*
=========================================
REDIMENSIONAMENTO
=========================================
*/

window.addEventListener("resize", () => {
    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

/*
=========================================
INICIAR
=========================================
*/

init();
