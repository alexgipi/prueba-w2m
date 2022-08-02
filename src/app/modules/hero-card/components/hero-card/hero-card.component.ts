import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormDialog } from '../../../heroes/components/dialogs/hero-form-dialog/hero-form-dialog.component';
import { Hero } from 'src/app/models/hero';


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero!: Hero;
  @Input() cardStyle!: string;
  @Output() onDeleted = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

  }

  modalHeroUpdate() {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: {edit:true, hero: this.hero },
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
