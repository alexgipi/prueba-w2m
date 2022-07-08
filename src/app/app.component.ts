import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-w2m';

  currentRoute: string;

  public lang: string = 'es';  

  constructor(
    private router: Router,
    public translate: TranslateService
  ) {
    this.currentRoute = "Demo";

    this.router.events.subscribe((event: Event) => {

        if(event instanceof NavigationEnd) {
            this.currentRoute = event.url;
        }

    });

    const localStorageLang = localStorage.getItem('lang');
    if(localStorageLang) this.lang = localStorageLang;

    translate.setDefaultLang(this.lang);
    translate.use(this.lang);

    

  }

  ngOnInit(){

  }

  changeLang(lang: string) {
    this.lang = lang;

    localStorage.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);  
  }

}
