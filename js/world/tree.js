import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "./scene.js";
import { getTerrainHeight } from "./terrain.js";

const trees = [];

/*
=================================
CRIAR VEGETAÇÃO
=================================
*/

export function createVegetation() {

    createForest();
    createScatteredTrees();

}

/*
=================================
ÁRVORE
=================================
*/

function createTree(x, z) {

    const tree = new THREE.Group();

    /*
    -------------------------
    TRONCO
    -------------------------
    */

    const trunkGeometry =
        new THREE.CylinderGeometry(
            0.5,
            0.8,
            5,
            8
        );

    const trunkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6b4423
        });

    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );

    trunk.position.y = 2.5;

    trunk.castShadow = true;
    trunk.receiveShadow = true;

    tree.add(trunk);

    /*
    -------------------------
    COPA
    -------------------------
    */

    const leavesGeometry =
        new THREE.SphereGeometry(
            3,
            16,
            16
        );

    const leavesMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2f8f2f
        });

    const leaves =
        new THREE.Mesh(
            leavesGeometry,
            leavesMaterial
        );

    leaves.position.y = 6;

    leaves.castShadow = true;
    leaves.receiveShadow = true;

    tree.add(leaves);

    /*
    -------------------------
    POSIÇÃO
    -------------------------
    */

    const y =
        getTerrainHeight(x, z);

    tree.position.set(
        x,
        y,
        z
    );

    scene.add(tree);

    trees.push(tree);
}

/*
=================================
BOSQUE
=================================
*/

function createForest() {

    for (let i = 0; i < 120; i++) {

        const x =
            -250 +
            Math.random() * 120;

        const z =
            -250 +
            Math.random() * 120;

        createTree(x, z);

    }

}

/*
=================================
ÁRVORES ESPALHADAS
=================================
*/

function createScatteredTrees() {

    for (let i = 0; i < 250; i++) {

        const x =
            (Math.random() - 0.5) *
            800;

        const z =
            (Math.random() - 0.5) *
            800;

        /*
        Evita excesso no centro
        */

        if (
            Math.abs(x) < 80 &&
            Math.abs(z) < 80
        ) {
            continue;
        }

        createTree(x, z);

    }

}

/*
=================================
OBTER ÁRVORES
=================================
*/

export function getTrees() {
    return trees;
}
