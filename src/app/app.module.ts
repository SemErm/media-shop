import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {MoviesComponent} from './components/movies.component/movies.component';
import {GamesComponent} from './components/games.component/games.component';
import {MusicsComponent} from './components/musics.component/musics.component';
import {MainPageComponent} from './components/main-page.component/main-page.component';
import {NewMoviesComponent} from './components/movies.component/new-movies.component/new-movies.component';
import {FilterComponent} from './components/filter.component/filter.component';
import {DetailMovieComponent} from './components/movies.component/detail-movie.component/detail-movie.component';
import {DetailGameComponent} from './components/games.component/detail-game.component/detail-game.component';
import {AUTH_PROVIDERS} from "angular2-jwt";
import {NewMusicsComponent} from "./components/musics.component/new-musics.component/new-musics.component";
import {DetailMusicComponent} from "./components/musics.component/detail-music.component/detail-music.component";
import {FilterGamesComponent} from "./components/games.component/filter-games.component/filter-games.component";
import {StartPageComponent} from "./components/games.component/start-page.component/start-page.component";
import {FilterPageComponent} from "./components/games.component/filter-page.component/filter-page.component";
import {SectionGamesComponent} from "./components/games.component/section-games.component/section-games.component";



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    GamesComponent,
    MusicsComponent,
    MainPageComponent,
    NewMoviesComponent,
    FilterComponent,
    DetailMovieComponent,
    DetailGameComponent,
    NewMusicsComponent,
    DetailMusicComponent,
    FilterGamesComponent,
    StartPageComponent,
    FilterPageComponent,
    SectionGamesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
