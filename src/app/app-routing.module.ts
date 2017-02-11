import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent}   from './main-page/main-page.component';
import {MoviesCategoryComponent} from './category/movies-category/movies-category.component';
import {MovieItemComponent} from './items/movie-item/movie-item.component';
import {FilterPageComponent} from './shared/filter-page/filter-page.component';
import {MoviesHomePageComponent} from './category/movies-category/movies-home-page.component';
import {ProfileMainPageComponent} from './profile/main-page.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileToastsComponent} from './profile/toasts.component';
import {ProfileAddressesComponent} from './profile/addresses.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'movies', component: MoviesCategoryComponent, children: [
    {path: '', component: MoviesHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
  ]
  },
  {path: 'movies/:id', component: MovieItemComponent},
  {
    path: 'profile', component: ProfileMainPageComponent, children: [
    {path: '', redirectTo: 'personal', pathMatch: 'full'},
    {path: 'personal', component: ProfileComponent},
    {path: 'toasts', component: ProfileToastsComponent},
    {path: 'addresses', component: ProfileAddressesComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
