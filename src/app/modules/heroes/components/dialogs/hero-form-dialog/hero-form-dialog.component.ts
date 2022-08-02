import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'hero-form-dialog',
  templateUrl: './hero-form-dialog.component.html',
})
export class HeroFormDialog implements OnInit {

  public heroUpdateForm!: FormGroup;
  public hero: Hero;

  public errors:any[] = [];

  public editMode:boolean = false;

  formButtonText:string = 'HEROES.ADD_HERO';
  formTitle:string = 'HEROES.ADD_HERO';
  constructor(
    private formBuilder: FormBuilder,
    private _heroService: HeroService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {hero: Hero, edit:boolean},
    private dialogRef: MatDialogRef<HeroFormDialog>
  ) {
    this.heroUpdateForm = this.formBuilder.group({
      image: [
        '',
        [
          Validators.pattern(urlReg)
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      strength: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      speed: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],
      endurance: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ]
    })

    this.hero = data?.hero;

    if(this.data.edit) {
      this.editMode = true;
      this.formButtonText = 'HEROES.ACTIONS.SAVE_CHANGES';
      this.formTitle = 'HEROES.EDIT_TITLE';
    }


  }

  ngOnInit(): void {
    this.heroUpdateForm.patchValue(this.hero);
  }


  sendForm(){
    if(this.editMode){
      this.updateHero();

    } else {
      this.createHero();

    }
  }

  createHero(){
    this.hero = this.heroUpdateForm.value;
    console.log(this.hero)
    this._heroService.createHero(this.hero).subscribe(
      response => {
        this.dialogRef.close({ data: {hero: response} })
      }
    )

  }

  updateHero(){
    this.heroUpdateForm.value.id = this.hero.id;
    this.hero = this.heroUpdateForm.value;

    this._heroService.updateHero(this.hero.id, this.hero).subscribe(
      response => {
        this.dialogRef.close({ data: {hero: response} })
      }
    );
  }

}
