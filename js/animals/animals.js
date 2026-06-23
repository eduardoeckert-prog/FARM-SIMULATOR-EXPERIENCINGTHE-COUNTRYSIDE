// animals.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const animals = [];

function createCow(x, z) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  body.position.y = 1;

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f5 })
  );

  head.position.set(1.3, 1.1, 0);

  group.add(body);
  group.add(head);

  group.position.set(x, 0, z);

  return {
    mesh: group,
    type: "cow",
    speed: 0.8,
    hunger: 100,
    thirst: 100,
    direction: Math.random() * Math.PI * 2
  };
}

function createSheep(x, z) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  body.position.y = 0.8;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );

  head.position.set(0.7, 0.8, 0);

  group.add(body);
  group.add(head);

  group.position.set(x, 0, z);

  return {
    mesh: group,
    type: "sheep",
    speed: 0.6,
    hunger: 100,
    thirst: 100,
    direction: Math.random() * Math.PI * 2
  };
}

function createChicken(x, z) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xffffcc })
  );

  body.position.y = 0.35;

  group.add(body);

  group.position.set(x, 0, z);

  return {
    mesh: group,
    type: "chicken",
    speed: 1.2,
    hunger: 100,
    thirst: 100,
    direction: Math.random() * Math.PI * 2
  };
}

export function createAnimals(scene) {

  for (let i = 0; i < 6; i++) {
    const cow = createCow(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );

    animals.push(cow);
    scene.add(cow.mesh);
  }

  for (let i = 0; i < 8; i++) {
    const sheep = createSheep(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );

    animals.push(sheep);
    scene.add(sheep.mesh);
  }

  for (let i = 0; i < 12; i++) {
    const chicken = createChicken(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );

    animals.push(chicken);
    scene.add(chicken.mesh);
  }

  return animals;
}

export function updateAnimals(deltaTime) {

  animals.forEach(animal => {

    animal.hunger -= 0.15 * deltaTime;
    animal.thirst -= 0.2 * deltaTime;

    if (animal.hunger < 0) animal.hunger = 0;
    if (animal.thirst < 0) animal.thirst = 0;

    if (Math.random() < 0.005) {
      animal.direction += (Math.random() - 0.5) * 2;
    }

    animal.mesh.position.x +=
      Math.cos(animal.direction) *
      animal.speed *
      deltaTime;

    animal.mesh.position.z +=
      Math.sin(animal.direction) *
      animal.speed *
      deltaTime;

    animal.mesh.rotation.y = -animal.direction;

    const limit = 95;

    if (
      animal.mesh.position.x > limit ||
      animal.mesh.position.x < -limit
    ) {
      animal.direction = Math.PI - animal.direction;
    }

    if (
      animal.mesh.position.z > limit ||
      animal.mesh.position.z < -limit
    ) {
      animal.direction = -animal.direction;
    }
  });
}

export function getAnimals() {
  return animals;
}
