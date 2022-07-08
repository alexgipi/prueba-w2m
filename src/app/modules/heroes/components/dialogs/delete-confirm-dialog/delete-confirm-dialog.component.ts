import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
})
export class DeleteConfirmDialog implements OnInit {
  public hero!:Hero;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {hero: Hero},
    private dialogRef: MatDialogRef<DeleteConfirmDialog>
  ) {
    this.hero = data.hero;
  }

  ngOnInit(): void {

  }

  deleteHero(){
    this.dialogRef.close({ data: {deleteHero:true} })
  }



}
