import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
