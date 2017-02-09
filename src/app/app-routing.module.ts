import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent}   from './main-page/main-page.component';
import {MoviesCategoryComponent} from './category/movies-category/movies-category.component';
import {MovieItemComponent} from './items/movie-item/movie-item.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'movies', component: MoviesCategoryComponent},
  {path: 'movies/:id', component: MovieItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
