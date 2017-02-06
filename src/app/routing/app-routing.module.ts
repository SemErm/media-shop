import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent}   from '../components/main-page.component/main-page.component';
import {MoviesComponent} from '../components/movies.component/movies.component';
import {DetailMovieComponent} from '../components/movies.component/detail-movie.component/detail-movie.component';
import {GamesComponent} from '../components/games.component/games.component';
import {DetailGameComponent} from '../components/games.component/detail-game.component/detail-game.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/detail/:id', component: DetailMovieComponent},
  {path: 'games', component: GamesComponent},
  {path: 'games/detail/:id', component: DetailGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
