export enum MonsterType {
    FIGHT = "fight",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water",
    DRAGON = "dragon",
    PLANT = "plant"
}

export interface IMonsterProperties {
    imageUrl: string,
    color: string
}

export const MonsterTypeProperties: {[key: string] : IMonsterProperties} = {
    [MonsterType.FIGHT]: {
        imageUrl: "assets/energies/energy-fight.png",
        color: "rgb(216, 116, 70)"
    },
    [MonsterType.ELECTRIC]: {
        imageUrl: "assets/energies/energy-electric.png",
        color: "rgb(241, 229, 57)"
    },
    [MonsterType.FIRE]: {
        imageUrl: "assets/energies/energy-fire.png",
        color: "rgb(243, 75, 63)"
    },
    [MonsterType.WATER]: {
        imageUrl: "assets/energies/energy-water.png",
        color: "rgb(72, 170, 235)"
    },
    [MonsterType.PLANT]: {
        imageUrl: "assets/energies/energy-plant.png",
        color: "rgb(83, 192, 50)"
    },
    [MonsterType.DRAGON]: {
        imageUrl: "assets/energies/energy-dragon.png",
        color: "rgb(180, 161, 52)"
    }
}

/*
    brown : rgb(216, 116, 70);
    red: rgb(243, 75, 63);
    blue : rgb(72, 170, 235); 
    yellow : rgb(228, 218, 85); 
*/