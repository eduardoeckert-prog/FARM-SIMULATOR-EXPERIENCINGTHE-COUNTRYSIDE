// roads.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "./scene.js";
import { getTerrainHeight } from "./terrain.js";

const roads = [];

export function createRoads() {

    createRoad(
        -120,
        -80,
        0,
        0,
        8
    );

    createRoad(
        0,
        0,
        35,
        -10,
        6
    );

    createRoad(
        0,
        0,
        -35,
        -15,
        6
    );

    createRoad(
        0,
        0,
        20,
        25,
        5
    );
}

function createRoad(
    startX,
    startZ,
    endX,
    endZ,
    width = 6
) {

    const dx = endX - startX;
    const dz = endZ - startZ;

    const length =
        Math.sqrt(
            dx * dx +
            dz * dz
        );

    const geometry =
        new THREE.PlaneGeometry(
            width,
            length
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x8d7b68
        });

    const road =
        new THREE.Mesh(
            geometry,
            material
        );

    road.rotation.x =
        -Math.PI / 2;

    road.rotation.z =
        -Math.atan2(dx, dz);

    const centerX =
        (startX + endX) / 2;

    const centerZ =
        (startZ + endZ) / 2;

    const centerY =
        getTerrainHeight(
            centerX,
            centerZ
        );

    road.position.set(
        centerX,
        centerY + 0.03,
        centerZ
    );

    road.receiveShadow = true;

    scene.add(road);

    roads.push(road);
}

export function getRoads() {
    return roads;
}
