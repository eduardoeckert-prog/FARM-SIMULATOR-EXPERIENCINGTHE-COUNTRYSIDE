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

    direction.set(0, 0, 0);

    /*
    DIREÇÃO
    */

    if (keys["KeyW"]) direction.z -= 1;
    if (keys["KeyS"]) direction.z += 1;
    if (keys["KeyA"]) direction.x -= 1;
    if (keys["KeyD"]) direction.x += 1;

    direction.normalize();

    /*
    VELOCIDADE
    */

    const speed = keys["ShiftLeft"] ? RUN_SPEED : WALK_SPEED;

    /*
    CORREÇÃO W / S (direção correta)
    - forward agora aponta corretamente no eixo -Z
    */

    forward.set(
        Math.sin(yaw),
        0,
        -Math.cos(yaw)
    );

    right.set(
        Math.cos(yaw),
        0,
        Math.sin(yaw)
    );

    /*
    MOVIMENTO HORIZONTAL
    */

    camera.position.addScaledVector(
        forward,
        direction.z * speed * delta
    );

    camera.position.addScaledVector(
        right,
        direction.x * speed * delta
    );

    /*
    PULO
    */

    if (keys["Space"] && onGround) {
        velocityY = JUMP_FORCE;
        onGround = false;
    }

    /*
    GRAVIDADE
    */

    velocityY -= GRAVITY * delta;
    camera.position.y += velocityY * delta;

    /*
    CHÃO (AGORA USA TERRENO REAL)
    */

    const groundY = getTerrainHeight(
        camera.position.x,
        camera.position.z
    );

    const playerHeight = 2;

    if (camera.position.y < groundY + playerHeight) {

        camera.position.y = groundY + playerHeight;
        velocityY = 0;
        onGround = true;
    }
}
