import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './modules/heroes/components/heroes-list/heroes-list.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () => import(`./modules/heroes/heroes.module`).then(
      module => module.HeroesModule
    )
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
