import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public apiUrl:string = 'http://localhost:3000/'
  public ELEMENT_DATA: Hero[] = [
    {id: 1, name: 'Deadpool', strength:55, speed: 75,  endurance: 80, image: 'https://is1-ssl.mzstatic.com/image/thumb/w-uHCvQ9CFlQ3uuzZ_1kIw/1200x675mf.jpg'},
    {id: 2, name: 'Iron Man', strength: 45, speed: 40,  endurance: 40, image: 'https://www.cinemascomics.com/wp-content/uploads/2020/12/iron-man-4.jpg'},
    {id: 3, name: 'Capitán América', strength: 60, speed: 40,  endurance: 68, image: 'https://xoandelugo.org/wp-content/uploads/2018/06/capitan-america.jpg'},
    {id: 4, name: 'Wonder Woman', strength: 90, speed: 40,  endurance: 75, image: 'https://dam.smashmexico.com.mx/wp-content/uploads/2020/10/La-historia-de-Wonder-Woman-en-numeros-cover.jpg'},
    {id: 5, name: 'Batman', strength: 40, speed: 66,  endurance: 60, image: 'https://i.pinimg.com/originals/c4/99/8e/c4998e24677d8833facb22546fb4c0c3.jpg'},
    {id: 6, name: 'Flash', strength: 60, speed: 100,  endurance: 100, image: 'https://areajugones.sport.es/wp-content/uploads/2021/05/the-flash.jpg'},
    {id: 7, name: 'Thor', strength: 30, speed: 66,  endurance: 60, image: 'https://elcomercio.pe/resizer/TO8T_FMfFjgV2g7xsWgL_ZGcjbw=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/3SAGW2TYSVD6LARR4MNIF5YEPY.jpg'},
    {id: 8, name: 'Wolverine', strength: 80, speed: 56,  endurance: 55, image: 'https://www.eltiempo.com/files/image_640_428/uploads/2018/10/20/5bcbcbd83329b.jpeg'},
    {id: 9, name: 'Spider-Man', strength: 45, speed: 94,  endurance: 80, image: 'https://blog.es.playstation.com/tachyon/sites/14/2022/06/adf0c6e3da060a9f9581c12eff047a48668fe616.jpg?resize=1088%2C612&crop_strategy=smart'},
    {id: 10, name: 'Hulk', strength: 99, speed: 40, endurance: 35, image: 'https://www.cinemascomics.com/wp-content/uploads/2021/10/world-war-hulk-marvel-studios.jpg'},
    {id: 11, name: 'Capitana MarvelL', strength: 30, speed: 70,  endurance: 60, image: 'https://areajugones.sport.es/wp-content/uploads/2021/04/capitana-marvel-2.jpg'},
    {id: 12, name: 'Super Girl', strength: 84, speed: 40,  endurance: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMhuKboLj_EutoLCAiCqFrRiAMJxvyIgcOw&usqp=CAU'},
    {id: 13, name: 'Aquaman', strength: 46, speed: 40,  endurance: 58, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5mfWTKt9hxnzKegC1NE0ViW9d3wdQPkKSpEfwwyLc2riv6cqLFKkDNY-w2wh2LIsacNg&usqp=CAU'},
    {id: 14, name: 'Black Panter', strength: 49, speed: 40,  endurance: 60, image: 'https://www.cinemascomics.com/wp-content/uploads/2020/12/black-panther-2-2022.jpg'},
    {id: 15, name: 'Superman', strength: 30, speed: 57,  endurance: 60, image: 'https://media.traveler.es/photos/61fd7d93651234bf948311ed/master/w_1600%2Cc_limit/IMG_DE272BF718E8_1.jpeg'},
    {id: 16, name: 'Daredevil', strength: 62, speed: 66,  endurance: 80, image: 'https://www.cinemascomics.com/wp-content/uploads/2022/01/daredevil-netflix-marvel-studios.jpg'},
    {id: 17, name: 'Doctor Strange', strength: 35, speed: 80,  endurance: 60, image: 'https://www.clarin.com/img/2022/05/05/benedict-cumberbatch-el-protagonista-del___zrOSKM_Xk_720x0__1.jpg'},
    {id: 18, name: 'Green Arrow', strength: 88, speed: 60,  endurance: 50, image: 'https://sm.ign.com/ign_latam/screenshot/default/green_uh2g.jpg'},
    {id: 19, name: 'Blade', strength: 90, speed: 76,  endurance: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6uhIxpoaWiNTt2o7iuzmw-NPruzwQAN3BxoLrqrflD4soSP5UXNb_zSqJVkEfi0XkrNE&usqp=CAU'},
    {id: 20, name: 'La Cosa', strength: 90, speed: 30,  endurance: 70, image: 'https://cdn.alfabetajuega.com/alfabetajuega/2018/11/56796.los_cuatro_fantasticos.jpg'},
  ];

  constructor(
    public _http: HttpClient
  ) { }

  getHeroes(limit:number = 15, page:number = 1, sort:string = 'id', order:string = 'desc'):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}heroes?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`;

    return this._http.get(url,  {observe:'response', headers:headers});
  }

  createHero(hero:Hero):Observable<any>{
    const data = JSON.stringify(hero);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.apiUrl}heroes`, data, {headers:headers});
	}

  getHero(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`${this.apiUrl}heroes/${id}`, {headers:headers});
	}

  updateHero(id:number, update:Hero):Observable<any>{
    const data = JSON.stringify(update);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.apiUrl}heroes/${id}`, data, {headers:headers});
	}

  deleteHero(id:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(`${this.apiUrl}heroes/${id}`, {headers:headers});
	}


  searchHeroes(query:string){
    const heroes = this.ELEMENT_DATA.filter(
      hero =>
        hero.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
        hero.id === Number(query)
      );
    return heroes;
  }


}
