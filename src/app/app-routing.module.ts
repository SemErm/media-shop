import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent}   from './main-page/main-page.component';
import {MoviesCategoryComponent} from './category/movies-category/movies-category.component';
import {MovieItemComponent} from './items/movie-item/movie-item.component';
import {FilterPageComponent} from './shared/filter-page/filter-page.component';
import {MoviesHomePageComponent} from './category/movies-category/movies-home-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'movies', component: MoviesCategoryComponent, children:[
    {path: '', component: MoviesHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
    ]},
  {path: 'movies/:id', component: MovieItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
