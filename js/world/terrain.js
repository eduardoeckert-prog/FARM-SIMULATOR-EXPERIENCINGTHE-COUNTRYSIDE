import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "../scene.js";

let terrain;

/*
=================================
CRIAR TERRENO
=================================
*/

export function createTerrain() {

    const size = 1000;
    const segments = 150;

    const geometry =
        new THREE.PlaneGeometry(
            size,
            size,
            segments,
            segments
        );

    geometry.rotateX(-Math.PI / 2);

    const vertices =
        geometry.attributes.position;

    /*
    ================================
    RELEVO
    ================================
    */

    for (let i = 0; i < vertices.count; i++) {

        const x = vertices.getX(i);
        const z = vertices.getZ(i);

        let height = 0;

        height +=
            Math.sin(x * 0.01) * 3;

        height +=
            Math.cos(z * 0.01) * 3;

        height +=
            Math.sin((x + z) * 0.02) * 2;

        vertices.setY(i, height);
    }

    geometry.computeVertexNormals();

    /*
    ================================
    MATERIAL DO SOLO
    ================================
    */

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x4d8b31,
            roughness: 1
        });

    terrain =
        new THREE.Mesh(
            geometry,
            material
        );

    terrain.receiveShadow = true;

    scene.add(terrain);
}

/*
=================================
OBTER ALTURA DO TERRENO
=================================
*/

export function getTerrainHeight(x, z) {

    const h1 =
        Math.sin(x * 0.01) * 3;

    const h2 =
        Math.cos(z * 0.01) * 3;

    const h3 =
        Math.sin((x + z) * 0.02) * 2;

    return h1 + h2 + h3;
}

/*
=================================
RETORNAR TERRENO
=================================
*/

export function getTerrain() {
    return terrain;
}
