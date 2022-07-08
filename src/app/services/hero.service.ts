import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public url:string = 'https://hiberus-test-api.up.railway.app/users/';
  public users:any[] = [
    {
      _id: '1',
      email: 'email1@gmail.com',
      password: 'root',
      name: 'Heroe 1',
      surname: 'Heroe 1',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '2',
      email: 'email2@gmail.com',
      password: 'root',
      name: 'Heroe 2',
      surname: 'Heroe 2',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '3',
      email: 'email3@gmail.com',
      password: 'root',
      name: 'Heroe 3',
      surname: 'Heroe 3',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '4',
      email: 'email4@gmail.com',
      password: 'root',
      name: 'Heroe 4',
      surname: 'Heroe 4',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '5',
      email: 'email5@gmail.com',
      password: 'root',
      name: 'Heroe 5',
      surname: 'Heroe 5',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '6',
      email: 'email6@gmail.com',
      password: 'root',
      name: 'Heroe 6',
      surname: 'Heroe 6',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '7',
      email: 'email7@gmail.com',
      password: 'root',
      name: 'Heroe 7',
      surname: 'Heroe 7',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '8',
      email: 'email8@gmail.com',
      password: 'root',
      name: 'Heroe 8',
      surname: 'Heroe 8',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '9',
      email: 'email8@gmail.com',
      password: 'root',
      name: 'Heroe 8',
      surname: 'Heroe 8',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    },
    {
      _id: '10',
      email: 'email8@gmail.com',
      password: 'root',
      name: 'Heroe 8',
      surname: 'Heroe 8',
      role: '',
      createdAt: '1234',
      updatedAt: '1234',
    }
  ];



  public ELEMENT_DATA: Hero[] = [
    {position: 1, name: 'Hydrogen', strength:55, speed: 66, endurance: 60},
    {position: 2, name: 'Helium', strength: 45, speed: 40, endurance: 60},
    {position: 3, name: 'Lithium', strength: 60, speed: 40, endurance: 60},
    {position: 4, name: 'Beryllium', strength: 90, speed: 40, endurance: 60},
    {position: 5, name: 'Boron', strength: 40, speed: 66, endurance: 60},
    {position: 6, name: 'Carbon', strength: 70, speed: 66, endurance: 60},
    {position: 7, name: 'Nitrogen', strength: 30, speed: 66, endurance: 60},
    {position: 8, name: 'Oxygen', strength: 90, speed: 66, endurance: 60},
    {position: 9, name: 'Fluorine', strength: 35, speed: 66, endurance: 60},
    {position: 10, name: 'Hulk', strength: 99, speed: 40, endurance: 65},
    {position: 11, name: 'Sodium', strength: 30, speed: 40, endurance: 60},
    {position: 12, name: 'Magnesium', strength: 84, speed: 40, endurance: 60},
    {position: 13, name: 'Aluminum', strength: 46, speed: 40, endurance: 60},
    {position: 14, name: 'Silicon', strength: 49, speed: 40, endurance: 60},
    {position: 15, name: 'Phosphorus', strength: 30, speed: 66, endurance: 60},
    {position: 16, name: 'Sulfur', strength: 62, speed: 66, endurance: 60},
    {position: 17, name: 'Chlorine', strength: 35, speed: 40, endurance: 60},
    {position: 18, name: 'Argon', strength: 88, speed: 40, endurance: 60},
    {position: 19, name: 'Potassium', strength: 93, speed: 66, endurance: 60},
    {position: 20, name: 'Calcium', strength: 44, speed: 40, endurance: 60},
  ];

  constructor(
    public _http: HttpClient,
	  public cookieService: CookieService
  ) { }

  getHeroes(limit:number = 5, page:number = 1){
		return this.ELEMENT_DATA;
	}

	getHero(id:number){
    const user = this.ELEMENT_DATA.find(e => e.position === id);
    return user;
	}

  searchHeroes(query:string){
    const heroes = this.ELEMENT_DATA.filter(hero => hero.name.toLowerCase().includes(query.toLocaleLowerCase()));
    return heroes;
  }

  updateHero(id:number, update:Hero){
    let index = this.ELEMENT_DATA.findIndex(hero => hero.position === id);
    this.ELEMENT_DATA[index] = update;
    return {hero: update}
	}


  deleteHero(id:number){
		let index = this.ELEMENT_DATA.findIndex(hero => hero.position === id);
    this.ELEMENT_DATA.splice(index,1)
	}


}
