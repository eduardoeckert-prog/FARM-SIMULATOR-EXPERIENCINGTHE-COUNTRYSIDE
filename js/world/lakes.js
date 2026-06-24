import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "../scene.js";

const waterBodies = [];

/*
=================================
CRIAR ÁGUAS
=================================
*/

export function createWater() {

    createMainLake();
    createPond();

}

/*
=================================
LAGO PRINCIPAL
=================================
*/

function createMainLake() {

    const geometry =
        new THREE.CircleGeometry(
            45,
            64
        );

    geometry.rotateX(-Math.PI / 2);

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.85,
            roughness: 0.2,
            metalness: 0.1
        });

    const lake =
        new THREE.Mesh(
            geometry,
            material
        );

    lake.position.set(
        -120,
        0.2,
        -80
    );

    lake.receiveShadow = true;

    scene.add(lake);

    waterBodies.push(lake);
}

/*
=================================
AÇUDE
=================================
*/

function createPond() {

    const geometry =
        new THREE.CircleGeometry(
            20,
            48
        );

    geometry.rotateX(-Math.PI / 2);

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x4da6ff,
            transparent: true,
            opacity: 0.85,
            roughness: 0.2
        });

    const pond =
        new THREE.Mesh(
            geometry,
            material
        );

    pond.position.set(
        90,
        0.15,
        110
    );

    pond.receiveShadow = true;

    scene.add(pond);

    waterBodies.push(pond);
}

/*
=================================
ANIMAÇÃO DA ÁGUA
=================================
*/

export function updateWater(time) {

    for (const water of waterBodies) {

        water.rotation.z =
            Math.sin(time * 0.3) * 0.002;

    }

}

/*
=================================
RETORNAR ÁGUAS
=================================
*/

export function getWaterBodies() {
    return waterBodies;
}
