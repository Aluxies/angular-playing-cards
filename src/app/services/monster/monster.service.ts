import { Injectable } from '@angular/core';
import { Monster } from '../../models/monsters.model';
import { MonsterType } from '../../utils/monsters.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem("monsters", JSON.stringify(this.monsters));
  }

  private load() {
    const monstersData = localStorage.getItem("monsters");
    if (monstersData) {
      this.monsters = JSON.parse(monstersData).map((monsterJSON: any ) => Object.assign(new Monster(), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id))
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    const monster1 = new Monster();
    monster1.id = this.assignId();
    monster1.name = "Sparkachu";
    monster1.image = "assets/monsters/monster-sparkachu.jpg";
    monster1.type = MonsterType.ELECTRIC;
    monster1.hp = 80;
    monster1.figureCaption = "N°001 Monster";
    monster1.attackName = "Electro ball";
    monster1.attackStrength = 40;
    monster1.attackDescription = "Hurls a sphere of electricity at its target, dealing electric damage and potentially paralyzing its foe.";

    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.assignId();
    monster2.name = "Goupamber";
    monster2.image = "assets/monsters/monster-goupamber.jpg";
    monster2.type = MonsterType.FIRE;
    monster2.hp = 70;
    monster2.figureCaption = "N°002 Monster";
    monster2.attackName = "Fire throw";
    monster2.attackStrength = 40;
    monster2.attackDescription = "Unleashes a stream of blazing flames, scorching its target.";

    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.assignId();
    monster3.name = "Dunorok";
    monster3.image = "assets/monsters/monster-dunorok.jpg";
    monster3.type = MonsterType.FIGHT;
    monster3.hp = 50;
    monster3.figureCaption = "N°003 Monster";
    monster3.attackName = "Claw Swipe";
    monster3.attackStrength = 30;
    monster3.attackDescription = "Swipes at its target with its claws.";

    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.assignId();
    monster4.name = "Aqualis";
    monster4.image = "assets/monsters/monster-aqualis.jpg";
    monster4.type = MonsterType.WATER;
    monster4.hp = 80;
    monster4.figureCaption = "N°004 Monster";
    monster4.attackName = "Typhoon";
    monster4.attackStrength = 50;
    monster4.attackDescription = "Flaps its wings with force, generating a swirling typhoon that drenches and buffets its target with wind and water.";

    this.monsters.push(monster4);

    const monster5 = new Monster();
    monster5.id = this.assignId();
    monster5.name = "Busheaf";
    monster5.image = "assets/monsters/monster-busheaf.jpg";
    monster5.type = MonsterType.PLANT;
    monster5.hp = 60;
    monster5.figureCaption = "N°005 Monster";
    monster5.attackName = "Unknow";
    monster5.attackStrength = 0;
    monster5.attackDescription = "Unknown.";

    this.monsters.push(monster5);

    const monster6 = new Monster();
    monster6.id = this.assignId();
    monster6.name = "Draco";
    monster6.image = "assets/monsters/monster-draco.jpg";
    monster6.type = MonsterType.DRAGON;
    monster6.hp = 70;
    monster6.figureCaption = "N°006 Monster";
    monster6.attackName = "Unknow";
    monster6.attackStrength = 0;
    monster6.attackDescription = "Unknown.";

    this.monsters.push(monster6);

    const monster7 = new Monster();
    monster7.id = this.assignId();
    monster7.name = "Sunleigh";
    monster7.image = "assets/monsters/monster-sunleigh.jpg";
    monster7.type = MonsterType.ELECTRIC;
    monster7.hp = 70;
    monster7.figureCaption = "N°007 Monster";
    monster7.attackName = "Unknow";
    monster7.attackStrength = 0;
    monster7.attackDescription = "Unknown.";

    this.monsters.push(monster7);

    const monster8 = new Monster();
    monster8.id = this.assignId();
    monster8.name = "Glowimp";
    monster8.image = "assets/monsters/monster-glowimp.jpg";
    monster8.type = MonsterType.ELECTRIC;
    monster8.hp = 50;
    monster8.figureCaption = "N°008 Monster";
    monster8.attackName = "Unknow";
    monster8.attackStrength = 0;
    monster8.attackDescription = "Unknown.";

    this.monsters.push(monster8);
    
    const monster9 = new Monster();
    monster9.id = this.assignId();
    monster9.name = "Glowalker";
    monster9.image = "assets/monsters/monster-glowalker.jpg";
    monster9.type = MonsterType.ELECTRIC;
    monster9.hp = 90;
    monster9.figureCaption = "N°009 Monster";
    monster9.attackName = "Unknow";
    monster9.attackStrength = 0;
    monster9.attackDescription = "Unknown.";

    this.monsters.push(monster9);
  }

  private assignId(): number {
    return this.currentIndex++;
  }

  getAll(): Monster[] {
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.assignId()
    this.monsters.push(monsterCopy.copy());
    this.save();
    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(monster => monster.id === monsterCopy.id);
    
    if (monsterIndex >= 0) {
      console.log({monsterIndex});
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }
    return monsterCopy;
  }
  
  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === id);

    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }

}
