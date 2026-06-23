// interaction.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const interactables = [];

let camera = null;
let currentMessage = "";
let messageTimer = 0;

export function setupInteraction(playerCamera) {
  camera = playerCamera;

  window.addEventListener("keydown", (event) => {
    if (event.code === "KeyE") {
      interact();
    }
  });
}

export function registerInteractable(
  object,
  title,
  description,
  radius = 4
) {
  interactables.push({
    object,
    title,
    description,
    radius
  });
}

function interact() {

  if (!camera) return;

  let closest = null;
  let closestDistance = Infinity;

  interactables.forEach(item => {

    const distance =
      camera.position.distanceTo(
        item.object.position
      );

    if (
      distance < item.radius &&
      distance < closestDistance
    ) {
      closest = item;
      closestDistance = distance;
    }
  });

  if (closest) {

    currentMessage =
      `${closest.title}\n${closest.description}`;

    messageTimer = 8;
  }
}

export function updateInteraction(deltaTime) {

  if (messageTimer > 0) {
    messageTimer -= deltaTime;

    if (messageTimer <= 0) {
      currentMessage = "";
    }
  }
}

export function getInteractionMessage() {
  return currentMessage;
}

export function getNearbyInteractable() {

  if (!camera) return null;

  let closest = null;
  let closestDistance = Infinity;

  interactables.forEach(item => {

    const distance =
      camera.position.distanceTo(
        item.object.position
      );

    if (
      distance < item.radius &&
      distance < closestDistance
    ) {
      closest = item;
      closestDistance = distance;
    }
  });

  return closest;
}
