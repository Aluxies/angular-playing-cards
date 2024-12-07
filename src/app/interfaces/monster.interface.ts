import { MonsterType } from "../utils/monsters.utils";

export interface IMonster {
    id?: number;

    name: string;
    image: string;
    type: MonsterType;
    hp: number;
    figureCaption: string;

    attackName: string;
    attackStrength: number;
    attackDescription: string;
}