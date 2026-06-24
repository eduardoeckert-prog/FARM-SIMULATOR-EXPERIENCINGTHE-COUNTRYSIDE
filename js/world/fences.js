import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { scene } from "../scene.js";
import { getTerrainHeight } from "./terrain.js";

const buildings = [];

/*
=================================
CRIAR CONSTRUÇÕES
=================================
*/

export function createBuildings() {

    createFarmHouse();
    createBarn();
    createSilo();
    createChickenCoop();
    createCorral();

}

/*
=================================
CASA
=================================
*/

function createFarmHouse() {

    const house = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(12, 6, 10),
        new THREE.MeshStandardMaterial({
            color: 0xe8d8c3
        })
    );

    base.position.y = 3;

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(
            9,
            4,
            4
        ),
        new THREE.MeshStandardMaterial({
            color: 0xaa3333
        })
    );

    roof.position.y = 8;
    roof.rotation.y = Math.PI / 4;

    house.add(base);
    house.add(roof);

    placeBuilding(house, 0, 0);
}

/*
=================================
CELEIRO
=================================
*/

function createBarn() {

    const barn = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(
            20,
            10,
            15
        ),
        new THREE.MeshStandardMaterial({
            color: 0xcc2222
        })
    );

    body.position.y = 5;

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(
            14,
            6,
            4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x444444
        })
    );

    roof.position.y = 13;
    roof.rotation.y = Math.PI / 4;

    barn.add(body);
    barn.add(roof);

    placeBuilding(
        barn,
        35,
        -10
    );
}

/*
=================================
SILO
=================================
*/

function createSilo() {

    const silo = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(
            4,
            4,
            18,
            24
        ),
        new THREE.MeshStandardMaterial({
            color: 0xbdbdbd
        })
    );

    body.position.y = 9;

    const top = new THREE.Mesh(
        new THREE.ConeGeometry(
            4.5,
            5,
            24
        ),
        new THREE.MeshStandardMaterial({
            color: 0x888888
        })
    );

    top.position.y = 20.5;

    silo.add(body);
    silo.add(top);

    placeBuilding(
        silo,
        -35,
        -15
    );
}

/*
=================================
GALINHEIRO
=================================
*/

function createChickenCoop() {

    const coop = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(
            8,
            4,
            6
        ),
        new THREE.MeshStandardMaterial({
            color: 0xd7a86e
        })
    );

    body.position.y = 2;

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(
            6,
            3,
            4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x7b2d26
        })
    );

    roof.position.y = 5.5;
    roof.rotation.y = Math.PI / 4;

    coop.add(body);
    coop.add(roof);

    placeBuilding(
        coop,
        20,
        25
    );
}

/*
=================================
CURRAL
=================================
*/

function createCorral() {

    const fenceMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8b5a2b
        });

    const size = 30;

    for (let i = -size; i <= size; i += 3) {

        createFencePost(
            i,
            0,
            55,
            fenceMaterial
        );

        createFencePost(
            i,
            0,
            85,
            fenceMaterial
        );
    }

    for (let i = 55; i <= 85; i += 3) {

        createFencePost(
            -30,
            0,
            i,
            fenceMaterial
        );

        createFencePost(
            30,
            0,
            i,
            fenceMaterial
        );
    }
}

/*
=================================
POSTE DE CERCA
=================================
*/

function createFencePost(
    x,
    y,
    z,
    material
) {

    const post =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5,
                2,
                0.5
            ),
            material
        );

    const terrainY =
        getTerrainHeight(x, z);

    post.position.set(
        x,
        terrainY + 1,
        z
    );

    post.castShadow = true;

    scene.add(post);
}

/*
=================================
POSICIONAR CONSTRUÇÃO
=================================
*/

function placeBuilding(
    building,
    x,
    z
) {

    const y =
        getTerrainHeight(x, z);

    building.position.set(
        x,
        y,
        z
    );

    building.traverse(obj => {

        if (obj.isMesh) {

            obj.castShadow = true;
            obj.receiveShadow = true;

        }

    });

    scene.add(building);

    buildings.push(building);
}

/*
=================================
RETORNAR CONSTRUÇÕES
=================================
*/

export function getBuildings() {
    return buildings;
}
