import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "../scene.js";
import { getTerrainHeight } from "./world/terrain.js";

const crops = [];

/*
=================================
CRIAR PLANTAÇÕES
=================================
*/

export function createCrops() {

    createField(
        -80,
        40,
        "corn"
    );

    createField(
        80,
        40,
        "soy"
    );

    createField(
        -80,
        120,
        "wheat"
    );

    createField(
        80,
        120,
        "beans"
    );

}

/*
=================================
CRIAR CAMPO
=================================
*/

function createField(
    centerX,
    centerZ,
    type
) {

    const fieldSize = 30;
    const spacing = 2;

    for (
        let x = -fieldSize;
        x <= fieldSize;
        x += spacing
    ) {

        for (
            let z = -fieldSize;
            z <= fieldSize;
            z += spacing
        ) {

            createPlant(
                centerX + x,
                centerZ + z,
                type
            );

        }

    }

}

/*
=================================
CRIAR PLANTA
=================================
*/

function createPlant(
    x,
    z,
    type
) {

    let color = 0x44aa44;

    switch (type) {

        case "corn":
            color = 0xc9b458;
            break;

        case "soy":
            color = 0x3f8f3f;
            break;

        case "wheat":
            color = 0xe0c95a;
            break;

        case "beans":
            color = 0x2f7f2f;
            break;

    }

    const geometry =
        new THREE.CylinderGeometry(
            0.08,
            0.08,
            1,
            6
        );

    const material =
        new THREE.MeshStandardMaterial({
            color
        });

    const plant =
        new THREE.Mesh(
            geometry,
            material
        );

    const groundY =
        getTerrainHeight(x, z);

    plant.position.set(
        x,
        groundY + 0.5,
        z
    );

    plant.castShadow = true;

    scene.add(plant);

    crops.push({
        mesh: plant,
        growth: Math.random() * 0.5,
        type
    });

}

/*
=================================
ATUALIZAR PLANTAÇÕES
=================================
*/

export function updateCrops(delta) {

    for (const crop of crops) {

        if (crop.growth < 1) {

            crop.growth +=
                delta * 0.01;

            const scale =
                0.3 +
                crop.growth * 1.7;

            crop.mesh.scale.y =
                scale;

        }

    }

}

/*
=================================
RETORNAR CULTURAS
=================================
*/

export function getCrops() {
    return crops;
}
