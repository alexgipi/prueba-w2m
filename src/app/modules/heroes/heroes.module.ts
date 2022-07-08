import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';

import { HeroDetailDialog } from './components/dialogs/hero-detail-dialog/hero-detail-dialog.component';
import { HeroFormDialog } from './components/dialogs/hero-form-dialog/hero-form-dialog.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteConfirmDialog } from './components/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';



@NgModule({
  declarations: [
    HeroesListComponent,
    HeroCardComponent,
    HeroDetailDialog,
    HeroFormDialog,
    DeleteConfirmDialog
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,

    MatMenuModule,
    MatDialogModule,
    InfiniteScrollModule
  ],
  entryComponents: [
    HeroDetailDialog,
    HeroFormDialog
  ]
})
export class HeroesModule { }
