import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'hero-form-dialog',
  templateUrl: './hero-form-dialog.component.html',
})
export class HeroFormDialog implements OnInit {

  public userUpdateForm!: FormGroup;
  public user: Hero;

  public errors:any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private _heroService: HeroService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {user: Hero},
    private dialogRef: MatDialogRef<HeroFormDialog>
  ) {
    this.user = data.user;

    this.userUpdateForm = this.formBuilder.group({
      position: [
        '',
        [
          Validators.required
        ]
      ],
      name: [
        '',
        [
          Validators.required
        ]
      ],
      strength: [
        '',
        [
          Validators.required
        ]
      ],
      speed: [
        '',
        [
          Validators.required
        ]
      ],
      endurance: [
        '',
        [
          Validators.required
        ]
      ]
    })
  }

  ngOnInit(): void {
    this.userUpdateForm.patchValue(this.user);
  }

  userUpdate(){
    this.user = this.userUpdateForm.value;
    this._heroService.updateHero(this.user.position, this.user);

    this.dialogRef.close({ data: {user: this.user} })
  }

}
