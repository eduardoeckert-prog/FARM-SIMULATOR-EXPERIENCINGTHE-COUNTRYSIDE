// fish.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const fishes = [];

function createFishMesh(color = 0x8888ff) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 8, 8),
    new THREE.MeshStandardMaterial({ color })
  );

  body.scale.set(1.5, 0.8, 0.8);

  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.15, 0.3, 6),
    new THREE.MeshStandardMaterial({ color })
  );

  tail.rotation.z = Math.PI / 2;
  tail.position.x = -0.35;

  group.add(body);
  group.add(tail);

  return group;
}

function spawnFish(type, x, y, z) {

  const color =
    type === "tilapia"
      ? 0x777777
      : 0xc0c0ff;

  const fish = {
    type,
    mesh: createFishMesh(color),
    direction: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.5,
    centerX: x,
    centerZ: z,
    swimRadius: 10 + Math.random() * 10
  };

  fish.mesh.position.set(x, y, z);

  fishes.push(fish);

  return fish;
}

export function createFish(scene) {

  // Cardume de tilápias

  for (let i = 0; i < 15; i++) {

    const fish = spawnFish(
      "tilapia",
      Math.random() * 12 - 6,
      -0.4,
      Math.random() * 12 - 6
    );

    scene.add(fish.mesh);
  }

  // Cardume de lambaris

  for (let i = 0; i < 25; i++) {

    const fish = spawnFish(
      "lambari",
      20 + Math.random() * 10,
      -0.3,
      20 + Math.random() * 10
    );

    scene.add(fish.mesh);
  }

  return fishes;
}

export function updateFish(deltaTime) {

  fishes.forEach(fish => {

    if (Math.random() < 0.01) {
      fish.direction +=
        (Math.random() - 0.5) * 1.5;
    }

    fish.mesh.position.x +=
      Math.cos(fish.direction) *
      fish.speed *
      deltaTime;

    fish.mesh.position.z +=
      Math.sin(fish.direction) *
      fish.speed *
      deltaTime;

    fish.mesh.rotation.y =
      -fish.direction;

    const dx =
      fish.mesh.position.x - fish.centerX;

    const dz =
      fish.mesh.position.z - fish.centerZ;

    const distance =
      Math.sqrt(dx * dx + dz * dz);

    if (distance > fish.swimRadius) {

      fish.direction =
        Math.atan2(
          fish.centerZ - fish.mesh.position.z,
          fish.centerX - fish.mesh.position.x
        );
    }

    fish.mesh.position.y =
      -0.35 +
      Math.sin(
        performance.now() * 0.003 +
        fish.mesh.position.x
      ) * 0.05;
  });
}

export function getFish() {
  return fishes;
}
