import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavouritesComponent} from './favourites/favourites.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'favourites', component: FavouritesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
