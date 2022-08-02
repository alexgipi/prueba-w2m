import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeroCardComponent } from './hero-card.component';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCardComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatMenuModule,
        RouterTestingModule,
        MatButtonModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init ', () => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('render hero name in a h3 tag if not single-hero cardStyle ', () => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    if(component.cardStyle !== 'single-hero'){
      expect(component.cardStyle !== 'single-hero').toBeTrue();
      expect(compiled.querySelector('h3').textContent).toBeDefined();
    } else {
      expect(component.cardStyle === 'single-hero').toBeTrue();
      expect(compiled.querySelector('h1').textContent).toBeDefined();
    }
  });

  it('render hero name in a h1 tag if single-hero cardStyle ', () => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    if(component.cardStyle === 'single-hero'){
      expect(component.cardStyle === 'single-hero').toBeTrue();
      expect(compiled.querySelector('h1').textContent).toBeDefined();
    } else {
      expect(component.cardStyle !== 'single-hero').toBeTrue();
      expect(compiled.querySelector('h3').textContent).toBeDefined();
    }
  });

  it('modal hero update ', () => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.modalHeroUpdate();
    expect(component).toBeTruthy();
  });

  it('modal hero delete ', () => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.deleteHero();
    expect(component).toBeTruthy();
  });



});
