// waterSystem.js

import { useWater } from "./farming/sustainability.js";

const waterData = {
    totalWater: 10000,
    rainBonus: 0,
    irrigationUsage: 0
};

export function updateWaterSystem(
    deltaTime,
    weather = "sunny"
) {

    if (
        weather === "rain" ||
        weather === "storm"
    ) {
        waterData.totalWater +=
            2 * deltaTime;

        waterData.rainBonus +=
            2 * deltaTime;
    }

    waterData.totalWater -=
        waterData.irrigationUsage *
        deltaTime;

    if (waterData.totalWater < 0) {
        waterData.totalWater = 0;
    }
}

export function consumeWater(
    amount = 1
) {

    if (
        waterData.totalWater <
        amount
    ) {
        return false;
    }

    waterData.totalWater -= amount;

    useWater(amount);

    return true;
}

export function addWater(
    amount = 1
) {
    waterData.totalWater += amount;
}

export function getWaterData() {

    return {
        totalWater:
            waterData.totalWater,

        rainBonus:
            waterData.rainBonus,

        irrigationUsage:
            waterData.irrigationUsage
    };
}

export function setIrrigationUsage(
    value
) {
    waterData.irrigationUsage = value;
}
