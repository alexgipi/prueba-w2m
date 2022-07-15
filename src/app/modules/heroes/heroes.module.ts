import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesListComponent } from './components/heroes-list/heroes-list.component';

import { HeroFormDialog } from './components/dialogs/hero-form-dialog/hero-form-dialog.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteConfirmDialog } from './components/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { HeroCardModule } from '../hero-card/hero-card.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    HeroesListComponent,
    HeroFormDialog,
    DeleteConfirmDialog,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    HeroCardModule,
    RouterModule,
    LayoutModule
  ],
  entryComponents: [
    HeroFormDialog,
  ]
})
export class HeroesModule { }
