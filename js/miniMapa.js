// minimap.js

let minimap;
let playerMarker;
let worldObjects = [];

const MAP_SIZE = 180;
const WORLD_SIZE = 1000;

export function createMinimap() {

    minimap = document.createElement("div");
    minimap.id = "minimap";

    minimap.innerHTML = `
        <div id="minimap-player"></div>
    `;

    document.body.appendChild(minimap);

    playerMarker =
        document.getElementById("minimap-player");
}

export function addMapObject(x, z, type = "generic") {

    if (!minimap) return;

    const marker = document.createElement("div");

    marker.classList.add("map-object");
    marker.classList.add(`map-${type}`);

    const mapX =
        ((x + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE;

    const mapZ =
        ((z + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE;

    marker.style.left = `${mapX}px`;
    marker.style.top = `${mapZ}px`;

    minimap.appendChild(marker);

    worldObjects.push(marker);
}

export function updateMinimap(player) {

    if (!playerMarker || !player) return;

    const mapX =
        ((player.position.x + WORLD_SIZE / 2) /
            WORLD_SIZE) *
        MAP_SIZE;

    const mapZ =
        ((player.position.z + WORLD_SIZE / 2) /
            WORLD_SIZE) *
        MAP_SIZE;

    playerMarker.style.left = `${mapX}px`;
    playerMarker.style.top = `${mapZ}px`;
}

export function clearMinimap() {

    worldObjects.forEach(obj => obj.remove());

    worldObjects = [];
}

export function registerBuildings(buildings = []) {

    buildings.forEach(building => {

        addMapObject(
            building.position.x,
            building.position.z,
            "building"
        );

    });
}

export function registerLakes(lakes = []) {

    lakes.forEach(lake => {

        addMapObject(
            lake.position.x,
            lake.position.z,
            "water"
        );

    });
}

export function registerAnimals(animals = []) {

    animals.forEach(animal => {

        addMapObject(
            animal.position.x,
            animal.position.z,
            "animal"
        );

    });
}