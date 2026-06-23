// collisions.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const colliders = [];

export function addCollider(object, radius = 1) {

  colliders.push({
    object,
    radius
  });
}

export function removeCollider(object) {

  const index = colliders.findIndex(
    c => c.object === object
  );

  if (index !== -1) {
    colliders.splice(index, 1);
  }
}

export function clearColliders() {
  colliders.length = 0;
}

export function checkCollisions(
  currentPosition,
  nextPosition,
  playerRadius = 0.5
) {

  for (const collider of colliders) {

    if (!collider.object) continue;

    const dx =
      nextPosition.x -
      collider.object.position.x;

    const dz =
      nextPosition.z -
      collider.object.position.z;

    const distance =
      Math.sqrt(dx * dx + dz * dz);

    const minDistance =
      collider.radius + playerRadius;

    if (distance < minDistance) {

      return {
        collision: true,
        object: collider.object
      };
    }
  }

  return {
    collision: false,
    object: null
  };
}

export function canMoveTo(
  currentPosition,
  nextPosition,
  playerRadius = 0.5
) {

  const result = checkCollisions(
    currentPosition,
    nextPosition,
    playerRadius
  );

  return !result.collision;
}

export function getColliders() {
  return colliders;
}

export function createFenceCollider(
  startX,
  startZ,
  endX,
  endZ,
  segments = 10
) {

  const stepX =
    (endX - startX) / segments;

  const stepZ =
    (endZ - startZ) / segments;

  for (let i = 0; i <= segments; i++) {

    const dummy = new THREE.Object3D();

    dummy.position.set(
      startX + stepX * i,
      0,
      startZ + stepZ * i
    );

    addCollider(dummy, 0.8);
  }
}

export function debugColliders(scene) {

  colliders.forEach(collider => {

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        collider.radius,
        12,
        12
      ),
      new THREE.MeshBasicMaterial({
        wireframe: true
      })
    );

    sphere.position.copy(
      collider.object.position
    );

    scene.add(sphere);
  });
}
