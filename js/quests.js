// quests.js

import { showDiscovery } from "../ui/hud.js";

const discoveries = [];

const discoveryPoints = [
    {
        id: "lake",
        name: "Lago da Fazenda",
        message:
            "Você encontrou um lago utilizado para armazenamento de água."
    },

    {
        id: "forest",
        name: "Área de Preservação",
        message:
            "Você encontrou uma área de preservação ambiental."
    },

    {
        id: "silo",
        name: "Silo",
        message:
            "Você encontrou um silo de armazenamento de grãos."
    },

    {
        id: "barn",
        name: "Celeiro",
        message:
            "Você encontrou o celeiro principal."
    },

    {
        id: "crops",
        name: "Área Agrícola",
        message:
            "Você encontrou uma área de produção agrícola."
    }
];

export function updateDiscoveries(player) {

    discoveryPoints.forEach(point => {

        if (isDiscovered(point.id)) return;

        const dx =
            player.position.x - point.x;

        const dz =
            player.position.z - point.z;

        const distance =
            Math.sqrt(dx * dx + dz * dz);

        if (distance < 20) {

            discoveries.push(point.id);

            showDiscovery(point.message);

            console.log(
                "Nova descoberta:",
                point.name
            );
        }
    });
}

export function isDiscovered(id) {
    return discoveries.includes(id);
}

export function getDiscoveries() {
    return discoveries;
}

export function getDiscoveryCount() {
    return discoveries.length;
}

export function resetDiscoveries() {
    discoveries.length = 0;
}

export function registerDiscoveryPoint(
    id,
    name,
    message,
    x,
    z
) {

    discoveryPoints.push({
        id,
        name,
        message,
        x,
        z
    });
}