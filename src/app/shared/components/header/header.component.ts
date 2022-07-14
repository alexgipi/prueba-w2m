import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public lang: string = 'es';
  constructor(
    public translate: TranslateService
  ) {
    const localStorageLang = localStorage.getItem('lang');
    if(localStorageLang) this.lang = localStorageLang;

    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.lang = lang;

    localStorage.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

}
