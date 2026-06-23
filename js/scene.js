import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

export const renderer = new THREE.WebGLRenderer({
    antialias: true
});

/*
=========================================
LUZES
=========================================
*/

let sunLight;
let ambientLight;

/*
=========================================
CONFIGURAÇÃO DA CENA
=========================================
*/

export function setupScene() {

    /*
    =========================================
    RENDERER
    =========================================
    */

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        window.devicePixelRatio
    );

    renderer.shadowMap.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );

    /*
    =========================================
    CÂMERA
    =========================================
    */

    camera.position.set(
        0,
        3,
        10
    );

    /*
    =========================================
    CÉU
    =========================================
    */

    scene.background = new THREE.Color(
        0x87ceeb
    );

    scene.fog = new THREE.Fog(
        0x87ceeb,
        120,
        500
    );

    /*
    =========================================
    LUZ AMBIENTE
    =========================================
    */

    ambientLight = new THREE.AmbientLight(
        0xffffff,
        1.2
    );

    scene.add(ambientLight);

    /*
    =========================================
    SOL
    =========================================
    */

    sunLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    sunLight.position.set(
        100,
        150,
        100
    );

    sunLight.castShadow = true;

    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;

    sunLight.shadow.camera.left = -200;
    sunLight.shadow.camera.right = 200;
    sunLight.shadow.camera.top = 200;
    sunLight.shadow.camera.bottom = -200;

    scene.add(sunLight);

    /*
    =========================================
    SOL VISUAL
    =========================================
    */

    const sunGeometry =
        new THREE.SphereGeometry(
            8,
            32,
            32
        );

    const sunMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffff88
        });

    const sunMesh =
        new THREE.Mesh(
            sunGeometry,
            sunMaterial
        );

    sunMesh.position.set(
        300,
        250,
        -300
    );

    scene.add(sunMesh);
}

/*
=========================================
UTILITÁRIOS
=========================================
*/

export function setSkyColor(color) {
    scene.background = new THREE.Color(color);

    if (scene.fog) {
        scene.fog.color.set(color);
    }
}

export function setSunIntensity(value) {
    if (sunLight) {
        sunLight.intensity = value;
    }
}

export function setAmbientIntensity(value) {
    if (ambientLight) {
        ambientLight.intensity = value;
    }
}

export function getSunLight() {
    return sunLight;
}

export function getAmbientLight() {
    return ambientLight;
}
