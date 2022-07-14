import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-w2m';
  currentRoute: string;

  constructor(
    private router: Router,
  ) {
    this.currentRoute = "Demo";

    this.router.events.subscribe((event: Event) => {

        if(event instanceof NavigationEnd) {
            this.currentRoute = event.url;
        }

    });
  }

  ngOnInit(){

  }

}
