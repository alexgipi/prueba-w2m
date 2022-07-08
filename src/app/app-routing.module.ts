import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './modules/heroes/components/heroes-list/heroes-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'heroes', pathMatch: 'full'},
  {path:'heroes', component: HeroesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
