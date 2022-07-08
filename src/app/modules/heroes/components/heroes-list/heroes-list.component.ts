import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Hero } from 'src/app/models/hero';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailDialog } from '../dialogs/hero-detail-dialog/hero-detail-dialog.component';
import { HeroFormDialog } from '../dialogs/hero-form-dialog/hero-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, AfterViewInit {

  public status!:string;
  public heros!: Hero[];

  public limit:number = 20;
  public page:number = 1;

  public noMoreHeros:boolean = false;

  public currentView:string = 'table';

  public heroData: Hero[];

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Hero>;

  public searchValue:string = '';

  constructor(
    private _heroService: HeroService,
    public dialog: MatDialog
  ) {
    this.heroData = this._heroService.ELEMENT_DATA;
    this.displayedColumns = ['id', 'image', 'name', 'strength', 'speed', 'endurance', 'actions'];
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
  }




  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getHeros(this.limit, this.page);
  }

  toggleView(){
    if(this.currentView === 'grid') this.currentView = 'table'
    else if (this.currentView === 'table')
    this.currentView = 'grid';

  }

  getHeros(limit:number, page:number, push = false){
    this.heros = this._heroService.getHeroes(limit, page);
  }

  loadMore(){
    this.page++;
    this.getHeros(this.limit, this.page, true);
  }

  onHeroDeleted(event:any):void{
    const heroDeleted:Hero = JSON.parse(event).hero;

    console.log(heroDeleted)

    this.deleteHero(heroDeleted)

  }


  modalHeroDetail(hero:Hero) {
    const dialogRef = this.dialog.open(HeroDetailDialog, {
      data: { hero: hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.openUpdateHeroModal){
        this.modalHeroUpdate(hero);
      } else if(data?.deleteHero){
        this.deleteHero(hero);
      }

    });
  }

  modalHeroCreate() {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { hero: {id: this.heroData.length+1, name: '', strength: '', speed: '', endurance:'', image:'',} },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;
      if(data){
        
        this.heroData.splice(0, 0, data.hero)

        this.dataSource = new MatTableDataSource<Hero>(this.heroData);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  modalHeroUpdate(hero:Hero) {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { edit:true,  hero: hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data){
        const index = this.heroData.findIndex(hero => hero.id === data?.hero.id)

        this.heroData[index] = data.hero;

        this.dataSource = new MatTableDataSource<Hero>(this.heroData);
      }
      
    });
  }

  deleteHero(hero:Hero){
    let index = this.heroData.findIndex(he => he.id === hero.id);

    this.heroData.splice(index,1);
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
    this.dataSource.paginator = this.paginator;
  }

  search(event:any):void{    
    this.heroData = this._heroService.searchHeroes(event);
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
    this.dataSource.paginator = this.paginator;    
  }

}
