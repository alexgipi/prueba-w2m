import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';


import {MatTableDataSource} from '@angular/material/table';
import { Hero } from 'src/app/models/hero';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormDialog } from '../dialogs/hero-form-dialog/hero-form-dialog.component';
import { DeleteConfirmDialog } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, AfterViewInit {

  public status!:string;
  public heros!: Hero[];

  public totalElements!: number;

  public limit:number = 15;
  public page:number = 1;

  public noMoreHeros:boolean = false;

  public currentView:string;

  public heroData!: Hero[];

  public displayedColumns: string[];
  public dataSource!: MatTableDataSource<Hero>;

  public searchValue:string = '';

  constructor(
    private _heroService: HeroService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    this.displayedColumns = ['id', 'image', 'name', 'strength', 'speed', 'endurance', 'actions'];
    this.currentView = localStorage.getItem("currentView") || 'grid';
  }



  ngAfterViewInit() {

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event:any){
    this.tableResponsive();
  }

  ngOnInit(): void {
    this.getHeroes(this.limit);

    this.tableResponsive();
  }

  tableResponsive(){
    if(this.breakpointObserver.isMatched('(max-width: 850px)')){
      this.currentView = 'grid';
      localStorage.setItem("currentView", this.currentView);
    }
  }

  toggleView(){
    if(this.currentView === 'grid') this.currentView = 'table'
    else if (this.currentView === 'table')
    this.currentView = 'grid';

    localStorage.setItem("currentView", this.currentView);

  }

  getHeroes(limit?:number, page?:number, push?:boolean){
    this._heroService.getHeroes(limit, page).subscribe(
      response => {
        if(response.body){
          if(push) this.heros.push(...response.body);
          else this.heros = response.body;

          this.totalElements = response.headers.get("X-Total-Count");

          this.dataSource = new MatTableDataSource<Hero>(this.heros);
        }



      }
    )
  }

  loadMore(){
    this.page++;
    //this.getHeros(this.limit, this.page, true);
    this.getHeroes(this.limit, this.page, true);
  }

  onHeroDeleted(event:any):void{
    const heroDeleted:Hero = JSON.parse(event).hero;

    console.log(heroDeleted)

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

  modalHeroCreate() {
    const dialogRef = this.dialog.open(HeroFormDialog, {
      data: { hero: {id: '', name: '', strength: '', speed: '', endurance:'', image:'',} },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;
      if(data){

        this.heros.splice(0, 0, data.hero)

        this.dataSource = new MatTableDataSource<Hero>(this.heros);
        this.totalElements++;
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
        const index = this.heros.findIndex(hero => hero.id === data?.hero.id)

        this.heros[index] = data.hero;

        this.dataSource = new MatTableDataSource<Hero>(this.heros);
      }

    });
  }

  deleteHero(hero:Hero){
    let index = this.heros.findIndex(he => he.id === hero.id);

    this._heroService.deleteHero(hero.id).subscribe(
      response => {
        this.heros.splice(index,1);
        this.dataSource = new MatTableDataSource<Hero>(this.heros);
      }
    )
  }

  search(query:any):void{
    this.heros = this._heroService.searchHeroes(query);
    this.dataSource = new MatTableDataSource<Hero>(this.heros);

  }

  handlePage(event:any):void{
    console.log(event)
    const {pageSize, pageIndex} = event;

    this.limit = pageSize;

    this.getHeroes(pageSize, pageIndex+1);
  }

}
