// behaviors.js

export function updateAnimalBehavior(animal, animals, deltaTime) {

    switch (animal.type) {

        case "cow":
            updateCowBehavior(animal);
            break;

        case "sheep":
            updateSheepBehavior(animal, animals);
            break;

        case "chicken":
            updateChickenBehavior(animal);
            break;
    }
}

function updateCowBehavior(animal) {

    // Vacas mudam pouco de direção

    if (Math.random() < 0.001) {

        animal.direction +=
            (Math.random() - 0.5) * 0.8;
    }
}

function updateSheepBehavior(animal, animals) {

    // Ovelhas tentam ficar próximas de outras ovelhas

    let centerX = 0;
    let centerZ = 0;
    let count = 0;

    animals.forEach(other => {

        if (
            other !== animal &&
            other.type === "sheep"
        ) {

            centerX += other.mesh.position.x;
            centerZ += other.mesh.position.z;

            count++;
        }
    });

    if (count === 0) return;

    centerX /= count;
    centerZ /= count;

    const dx =
        centerX - animal.mesh.position.x;

    const dz =
        centerZ - animal.mesh.position.z;

    const targetDirection =
        Math.atan2(dz, dx);

    animal.direction +=
        (targetDirection - animal.direction) *
        0.01;
}

function updateChickenBehavior(animal) {

    // Galinhas são agitadas

    if (Math.random() < 0.02) {

        animal.direction +=
            (Math.random() - 0.5) * 2.5;
    }
}
