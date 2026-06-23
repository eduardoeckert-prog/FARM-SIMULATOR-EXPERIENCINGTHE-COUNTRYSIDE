// achievements.js

const achievements = [];

const achievementList = [

    {
        id: "first_steps",
        title: "Primeiros Passos",
        description:
            "Explorou a fazenda pela primeira vez.",
        condition: stats =>
            stats.distanceWalked >= 50
    },

    {
        id: "lake_explorer",
        title: "Explorador do Lago",
        description:
            "Visitou um lago da propriedade.",
        condition: stats =>
            stats.discoveries.includes("lake")
    },

    {
        id: "forest_guardian",
        title: "Guardião da Natureza",
        description:
            "Encontrou a área de preservação.",
        condition: stats =>
            stats.discoveries.includes("forest")
    },

    {
        id: "farmer",
        title: "Agricultor",
        description:
            "Visitou uma área agrícola.",
        condition: stats =>
            stats.discoveries.includes("crops")
    },

    {
        id: "animal_friend",
        title: "Amigo dos Animais",
        description:
            "Observou os animais da fazenda.",
        condition: stats =>
            stats.animalsSeen >= 3
    },

    {
        id: "builder",
        title: "Conhecedor da Fazenda",
        description:
            "Visitou todas as construções principais.",
        condition: stats =>
            stats.buildingsVisited >= 4
    },

    {
        id: "nature_lover",
        title: "Amante da Natureza",
        description:
            "Visitou o lago e a área de preservação.",
        condition: stats =>
            stats.discoveries.includes("lake") &&
            stats.discoveries.includes("forest")
    },

    {
        id: "full_explorer",
        title: "Explorador Completo",
        description:
            "Encontrou todas as áreas importantes.",
        condition: stats =>
            stats.discoveryCount >= 5
    }
];

export function updateAchievements(stats) {

    achievementList.forEach(achievement => {

        if (isUnlocked(achievement.id)) return;

        if (achievement.condition(stats)) {

            achievements.push(achievement.id);

            showAchievement(achievement);

            console.log(
                "Conquista desbloqueada:",
                achievement.title
            );
        }
    });
}

export function isUnlocked(id) {
    return achievements.includes(id);
}

export function getAchievements() {
    return achievements;
}

export function getAchievementCount() {
    return achievements.length;
}

export function resetAchievements() {
    achievements.length = 0;
}

function showAchievement(achievement) {

    const popup =
        document.createElement("div");

    popup.className =
        "achievement-popup";

    popup.innerHTML = `
        <h3>Conquista Desbloqueada</h3>
        <strong>${achievement.title}</strong>
        <p>${achievement.description}</p>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    }, 100);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {

            popup.remove();

        }, 500);

    }, 4000);
}
