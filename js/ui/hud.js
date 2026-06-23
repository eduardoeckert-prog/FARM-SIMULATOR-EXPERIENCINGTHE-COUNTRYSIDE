// hud.js

let timeElement;
let climateElement;
let seasonElement;
let discoveryElement;

let discoveryTimeout = null;

export function createHUD() {

    const hud = document.createElement("div");
    hud.id = "hud";

    hud.innerHTML = `
        <div id="hud-top">
            <div id="hud-time">06:00</div>
            <div id="hud-climate">Ensolarado</div>
            <div id="hud-season">Primavera</div>
        </div>

        <div id="discovery-box"></div>
    `;

    document.body.appendChild(hud);

    timeElement = document.getElementById("hud-time");
    climateElement = document.getElementById("hud-climate");
    seasonElement = document.getElementById("hud-season");
    discoveryElement = document.getElementById("discovery-box");
}

export function updateHUD(timeData, climateData, seasonData) {

    if (timeElement && timeData) {
        timeElement.textContent =
            `${String(timeData.hours).padStart(2, "0")}:${String(timeData.minutes).padStart(2, "0")}`;
    }

    if (climateElement && climateData) {
        climateElement.textContent = climateData;
    }

    if (seasonElement && seasonData) {
        seasonElement.textContent = seasonData;
    }
}

export function showDiscovery(message) {

    if (!discoveryElement) return;

    discoveryElement.textContent = message;
    discoveryElement.classList.add("show");

    clearTimeout(discoveryTimeout);

    discoveryTimeout = setTimeout(() => {
        discoveryElement.classList.remove("show");
    }, 5000);
}

export function hideDiscovery() {

    if (!discoveryElement) return;

    discoveryElement.classList.remove("show");
}

export function updateLocationName(locationName) {

    let locationElement =
        document.getElementById("hud-location");

    if (!locationElement) {

        locationElement =
            document.createElement("div");

        locationElement.id = "hud-location";

        document
            .getElementById("hud-top")
            ?.appendChild(locationElement);
    }

    locationElement.textContent = locationName;
}

export function updateEnvironmentInfo(info) {

    let infoElement =
        document.getElementById("hud-environment");

    if (!infoElement) {

        infoElement =
            document.createElement("div");

        infoElement.id = "hud-environment";

        document
            .getElementById("hud")
            ?.appendChild(infoElement);
    }

    infoElement.textContent = info;
}