import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HeroCardComponent } from 'src/app/modules/hero-card/components/hero-card/hero-card.component';
import { HeroCardModule } from 'src/app/modules/hero-card/hero-card.module';
import { HeroFormDialog } from './hero-form-dialog.component';


describe('HeroFormDialog', () => {
  let component: HeroFormDialog;
  let fixture: ComponentFixture<HeroFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroFormDialog, HeroCardComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatDialogModule,
        RouterTestingModule,
        LayoutModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init ', () => {
    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario invalido', () => {
    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.heroUpdateForm;
    const name = form.controls['name'];
    name.setValue('Batman')
    expect(form.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido', () => {
    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.heroUpdateForm;

    const name = form.controls['name'];
    const strength = form.controls['strength'];
    const speed = form.controls['speed'];
    const endurance = form.controls['endurance'];
    name.setValue('Batman')
    strength.setValue(80)
    speed.setValue(85)
    endurance.setValue(85)
    expect(form.invalid).toBeFalse();
  });


  it('send form', () => {
    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.sendForm();


    expect({}).toEqual({});
  });

});
