import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { camera } from "../scene.js";
import { getTerrainHeight } from "../world/terrain.js";

const keys = {};

let yaw = 0;
let pitch = 0;

let velocityY = 0;
let onGround = true;

const WALK_SPEED = 12;
const RUN_SPEED = 20;
const JUMP_FORCE = 8;
const GRAVITY = 25;

const direction = new THREE.Vector3();
const forward = new THREE.Vector3();
const right = new THREE.Vector3();

let pointerLocked = false;

/*
=================================
POINTER LOCK
=================================
*/

export function setupControls() {

    document.addEventListener("click", () => {

        if (!pointerLocked) {
            document.body.requestPointerLock();
        }

    });

    document.addEventListener(
        "pointerlockchange",
        () => {

            pointerLocked =
                document.pointerLockElement ===
                document.body;

        }
    );

    document.addEventListener(
        "mousemove",
        onMouseMove
    );

    window.addEventListener(
        "keydown",
        (e) => {
            keys[e.code] = true;
        }
    );

    window.addEventListener(
        "keyup",
        (e) => {
            keys[e.code] = false;
        }
    );
}

/*
=================================
MOUSE LOOK
=================================
*/

function onMouseMove(event) {

    if (!pointerLocked) return;

    const sensitivity = 0.0025;

    yaw -= event.movementX * sensitivity;
    pitch -= event.movementY * sensitivity;

    const limit = Math.PI / 2 - 0.01;

    pitch = Math.max(-limit, Math.min(limit, pitch));

    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
}

/*
=================================
MOVIMENTO
=================================
*/

export function updateControls(delta) {

    const speed = keys["ShiftLeft"] ? RUN_SPEED : WALK_SPEED;

    // direção fixa baseada na câmera (evita bug de yaw manual)
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
    right.normalize();

    let moveZ = 0;
    let moveX = 0;

    if (keys["KeyW"]) moveZ += 1;
    if (keys["KeyS"]) moveZ -= 1;
    if (keys["KeyD"]) moveX += 1;
    if (keys["KeyA"]) moveX -= 1;

    camera.position.addScaledVector(forward, moveZ * speed * delta);
    camera.position.addScaledVector(right, moveX * speed * delta);

    // pulo + gravidade (mantém simples)
    if (keys["Space"] && onGround) {
        velocityY = JUMP_FORCE;
        onGround = false;
    }

    velocityY -= GRAVITY * delta;
    camera.position.y += velocityY * delta;

    if (camera.position.y < 2) {
        camera.position.y = 2;
        velocityY = 0;
        onGround = true;
    }
}
