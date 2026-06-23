// manure.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { fertilizeSoil } from "./sustainability.js";
import { getAnimals } from "./animals.js";

const manurePiles = [];

let storedManure = 0;
let productionTimer = 0;

export function updateManure(deltaTime, scene) {

  productionTimer += deltaTime;

  // produção a cada 30 segundos

  if (productionTimer >= 30) {

    productionTimer = 0;

    const animals = getAnimals();

    animals.forEach(animal => {

      let amount = 0;

      switch (animal.type) {

        case "cow":
          amount = 5;
          break;

        case "sheep":
          amount = 2;
          break;

        case "chicken":
          amount = 1;
          break;
      }

      storedManure += amount;

      createManurePile(
        animal.mesh.position.x,
        animal.mesh.position.z,
        scene
      );
    });
  }
}

function createManurePile(x, z, scene) {

  const pile = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 8, 8),
    new THREE.MeshStandardMaterial({
      color: 0x4b2e05
    })
  );

  pile.position.set(x, 0.15, z);

  manurePiles.push(pile);

  scene.add(pile);
}

export function useManure(amount = 10) {

  if (storedManure < amount) {
    return false;
  }

  storedManure -= amount;

  fertilizeSoil(amount * 0.5);

  return true;
}

export function getStoredManure() {
  return storedManure;
}

export function getManurePiles() {
  return manurePiles;
}

export function clearManure(scene) {

  manurePiles.forEach(pile => {
    scene.remove(pile);
  });

  manurePiles.length = 0;
}
