import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Hero } from "../models/hero";
import { HeroCardComponent } from "../modules/hero-card/components/hero-card/hero-card.component";
import { asyncData} from "../testing/async-observable-helpers";
import { HeroService } from "./hero.service";

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let heroService: HeroService;


beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  heroService = new HeroService(httpClientSpy);
});

it('should heroService create', () => {
  expect(heroService).toBeTruthy();
});

it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
  const expectedHeroes: Hero[] =
    [{ id: 1, name: 'A', strength: 10, speed: 40, endurance: 80, image: '' }, { id: 2, name: 'B', strength: 10, speed: 40, endurance: 80, image: '' }];

  httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

  heroService.getHeroes().subscribe({
    next: heroes => {
      expect(heroes)
        .withContext('expected heroes')
        .toEqual(expectedHeroes);
      done();
    },
    error: done.fail
  });
  expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
});

it('should return expected hero (HttpClient called once)', (done: DoneFn) => {
  const expectedHero: Hero = { id: 1, name: 'A', strength: 10, speed: 40, endurance: 80, image: '' };

  httpClientSpy.get.and.returnValue(asyncData(expectedHero));

  heroService.getHero(1).subscribe({
    next: hero => {
      expect(hero)
        .withContext('expected hero')
        .toEqual(expectedHero);
      done();
    },
    error: done.fail
  });
  expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
});
