import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { DeleteConfirmDialog } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  public hero!:Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _heroService: HeroService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    const paramId:number = Number(this.route.snapshot.paramMap.get('id'));

    this._heroService.getHero(paramId).subscribe(
      response => {
        this.hero = response;
      }
    )
  }


  onHeroDeleted(event:any):void{
    const heroDeleted:Hero = JSON.parse(event).hero;

    console.log(heroDeleted)

    // this.deleteHero(heroDeleted)

    this.modalHeroDelete(heroDeleted)

  }

  modalHeroDelete(hero:Hero) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      data: { hero: hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.deleteHero){
        this.deleteHero(hero);
      }

    });
  }


  deleteHero(hero:Hero){

    this._heroService.deleteHero(hero.id).subscribe(
      response => {
        this.router.navigateByUrl('/heroes');
      }
    )
  }

}
