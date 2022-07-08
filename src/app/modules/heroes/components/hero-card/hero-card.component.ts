import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailDialog } from '../dialogs/hero-detail-dialog/hero-detail-dialog.component';
import { HeroFormDialog } from '../dialogs/hero-form-dialog/hero-form-dialog.component';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models/hero';


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero!: Hero;
  @Output() onDeleted = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    private _heroService: HeroService,

  ) {}

  ngOnInit(): void {

  }

  modalHeroDetail() {
    const dialogRef = this.dialog.open(HeroDetailDialog, {
      data: { user: this.hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.openUpdateUserModal){
        this.modalHeroUpdate();
      } else if(data?.deleteUser){
        this.deleteUser();
      }

    });
  }

  modalHeroUpdate() {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { user: this.hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.user) this.hero = data.user;
    });
  }

  deleteUser(){
    let response = {user: this.hero}
    this.onDeleted.emit(JSON.stringify(response));
  }

}
