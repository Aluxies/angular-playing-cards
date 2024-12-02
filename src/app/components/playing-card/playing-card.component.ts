import { Component, computed, input } from '@angular/core';
import { Monster } from '../../models/monsters.model';
import { MonsterTypeProperties } from '../../utils/monsters.utils';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})

export class PlayingCardComponent {
  monster = input(new Monster());
  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });
  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;
  });
}
