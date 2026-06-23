// infoPoints.js

import { updateEnvironmentInfo } from "./hud.js";

const infoPoints = [];

const visitedPoints = new Set();

export function addInfoPoint(
    x,
    z,
    radius,
    title,
    description
) {

    infoPoints.push({
        x,
        z,
        radius,
        title,
        description
    });
}

export function createInfoPoints() {

    addInfoPoint(
        0,
        0,
        10,
        "Centro da Fazenda",
        "Área principal da propriedade rural."
    );

    addInfoPoint(
        -80,
        40,
        12,
        "Plantação de Milho",
        "O milho é utilizado para alimentação humana e animal."
    );

    addInfoPoint(
        80,
        40,
        12,
        "Plantação de Soja",
        "A soja é uma das culturas mais produzidas do Brasil."
    );

    addInfoPoint(
        -80,
        120,
        12,
        "Plantação de Trigo",
        "O trigo é utilizado na produção de farinhas e alimentos."
    );

    addInfoPoint(
        80,
        120,
        12,
        "Plantação de Feijão",
        "O feijão é uma importante fonte de proteínas vegetais."
    );

    addInfoPoint(
        30,
        -30,
        15,
        "Área de Preservação",
        "A vegetação nativa ajuda a proteger o solo e a biodiversidade."
    );

    addInfoPoint(
        15,
        15,
        10,
        "Lago",
        "A água é fundamental para animais, plantas e atividades da fazenda."
    );
}

export function updateInfoPoints(playerPosition) {

    let nearbyPoint = null;

    for (const point of infoPoints) {

        const dx =
            playerPosition.x - point.x;

        const dz =
            playerPosition.z - point.z;

        const distance =
            Math.sqrt(dx * dx + dz * dz);

        if (distance <= point.radius) {

            nearbyPoint = point;

            const id =
                `${point.title}_${point.x}_${point.z}`;

            if (!visitedPoints.has(id)) {
                visitedPoints.add(id);
            }

            break;
        }
    }

    if (nearbyPoint) {

        updateEnvironmentInfo(
            `${nearbyPoint.title}\n${nearbyPoint.description}`
        );

    } else {

        updateEnvironmentInfo("");
    }
}

export function getInfoPoints() {
    return infoPoints;
}

export function getVisitedPointsCount() {
    return visitedPoints.size;
}