// sustainability.js

export const sustainability = {
  fertility: 100,
  waterUsage: 0,
  treesPlanted: 0,
  environmentalImpact: 0
};

export function useWater(amount = 1) {
  sustainability.waterUsage += amount;

  sustainability.environmentalImpact += amount * 0.05;

  if (sustainability.environmentalImpact > 100) {
    sustainability.environmentalImpact = 100;
  }
}

export function consumeSoil(amount = 0.05) {
  sustainability.fertility -= amount;

  if (sustainability.fertility < 0) {
    sustainability.fertility = 0;
  }
}

export function fertilizeSoil(amount = 5) {
  sustainability.fertility += amount;

  if (sustainability.fertility > 100) {
    sustainability.fertility = 100;
  }
}

export function plantTree() {
  sustainability.treesPlanted++;

  sustainability.environmentalImpact -= 2;

  if (sustainability.environmentalImpact < 0) {
    sustainability.environmentalImpact = 0;
  }
}

export function updateSustainability(deltaTime) {

  // recuperação natural da fertilidade

  sustainability.fertility += 0.002 * deltaTime;

  if (sustainability.fertility > 100) {
    sustainability.fertility = 100;
  }

  // árvores ajudam o ambiente

  sustainability.environmentalImpact -=
    sustainability.treesPlanted * 0.0002 * deltaTime;

  if (sustainability.environmentalImpact < 0) {
    sustainability.environmentalImpact = 0;
  }
}

export function getSustainabilityData() {
  return {
    fertility: sustainability.fertility,
    waterUsage: sustainability.waterUsage,
    treesPlanted: sustainability.treesPlanted,
    environmentalImpact: sustainability.environmentalImpact
  };
}