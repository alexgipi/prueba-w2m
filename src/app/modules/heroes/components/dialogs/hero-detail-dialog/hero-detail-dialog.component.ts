import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'hero-detail-dialog',
  templateUrl: './hero-detail-dialog.component.html',
})
export class HeroDetailDialog implements OnInit {
  public hero!:Hero;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {user: Hero},
    private dialogRef: MatDialogRef<HeroDetailDialog>
  ) {
    this.hero = data.user;
  }

  ngOnInit(): void {

  }

  modalHeroUpdate() {

    this.dialogRef.close({ data: {openUpdateUserModal:true} })


  }

  deleteUser(){
    this.dialogRef.close({ data: {deleteUser:true} })
  }



}
