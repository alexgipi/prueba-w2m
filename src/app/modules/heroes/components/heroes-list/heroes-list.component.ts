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
  public users!: Hero[];

  public limit:number = 20;
  public page:number = 1;

  public noMoreUsers:boolean = false;

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
    this.displayedColumns = ['position', 'image', 'name', 'strength', 'speed', 'endurance', 'actions'];
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
  }




  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers(this.limit, this.page);
  }

  toggleView(){
    if(this.currentView === 'grid') this.currentView = 'table'
    else if (this.currentView === 'table')
    this.currentView = 'grid';

  }

  getUsers(limit:number, page:number, push = false){
    this.users = this._heroService.getHeroes(limit, page);
  }

  loadMore(){
    this.page++;
    this.getUsers(this.limit, this.page, true);
  }

  onUserDeleted(event:any):void{
    const userDeleted:Hero = JSON.parse(event).user;

    console.log(userDeleted)

    this.deleteHero(userDeleted)

  }


  modalHeroDetail(hero:Hero) {
    const dialogRef = this.dialog.open(HeroDetailDialog, {
      data: { user: hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.openUpdateUserModal){
        this.modalHeroUpdate(hero);
      } else if(data?.deleteUser){
        this.deleteHero(hero);
      }

    });
  }

  modalHeroUpdate(hero:Hero) {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { user: hero },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      const index = this.heroData.findIndex(hero => hero.position === data?.user.position)

      this.heroData[index] = data.user;

      this.dataSource = new MatTableDataSource<Hero>(this.heroData);
    });
  }

  deleteHero(hero:Hero){
    let index = this.heroData.findIndex(he => he.position === hero.position);

    this.heroData.splice(index,1);
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
    this.dataSource.paginator = this.paginator;
  }

  search(event:any):void{
    console.log(event)
    this.heroData = this._heroService.searchHeroes(event);
    this.dataSource = new MatTableDataSource<Hero>(this.heroData);
    this.dataSource.paginator = this.paginator;
  }

}
