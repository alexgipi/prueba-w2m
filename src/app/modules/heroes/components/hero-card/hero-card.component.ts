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
      data: { hero: this.hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.openUpdateHeroModal){
        this.modalHeroUpdate();
      } else if(data?.deleteHero){
        this.deleteHero();
      }

    });
  }

  modalHeroUpdate() {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { hero: this.hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.hero) this.hero = data.hero;
    });
  }

  deleteHero(){
    let response = {hero: this.hero}
    this.onDeleted.emit(JSON.stringify(response));
  }

}
