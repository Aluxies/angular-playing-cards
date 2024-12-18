import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monsters.utils';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../models/monsters.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCardComponent, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;

  formGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required
      ],
    ],
    image: [
      '',
      [
        Validators.required
      ]
    ],
    type: [
      MonsterType.ELECTRIC, [
        Validators.required
      ]],
    hp: [0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]],
    figureCaption: ['', [
      Validators.required
    ]],
    attackName: ['', [
      Validators.required
    ]],
    attackStrength: [0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]],
    attackDescription: ['', [
      Validators.required
    ]]
  });

  monster : Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);

  monsterId = -1;

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['monster']) {
        this.monsterId = parseInt(params['monster']);
        const monsterFound = this.monsterService.get(this.monsterId);
        if (monsterFound) {
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });

  }

  ngOnDestroy(): void {
    this.formValuesSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.monsterService.delete(this.monsterId);
        this.navigateBack();
      }
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      }
    }
  }
}
