import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent}   from '../components/main-page.component/main-page.component';
import {MoviesComponent} from '../components/movies.component/movies.component';
import {DetailMovieComponent} from '../components/movies.component/detail-movie.component/detail-movie.component';
import {GamesComponent} from '../components/games.component/games.component';
import {StartPageComponent} from '../components/games.component/start-page.component/start-page.component';
import {SearchPageComponent} from '../components/games.component/filter-page.component/filter-page.component';
import {DetailGameComponent} from '../components/games.component/detail-game.component/detail-game.component';
import {MusicsComponent} from "../components/musics.component/musics.component";
import {DetailMusicComponent} from '../components/musics.component/detail-music.component/detail-music.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/detail/:id', component: DetailMovieComponent},
  {
    path: 'games', component: GamesComponent, children: [
    {path: '', component: StartPageComponent},
    {path: 'filter', component: SearchPageComponent}
  ]
  },
  {path: 'games/filter', component: GamesComponent},
  {path: 'games/detail/:id', component: DetailGameComponent},
  {path: 'musics', component: MusicsComponent},
  {path: 'musics/detail/:id', component: DetailMusicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
