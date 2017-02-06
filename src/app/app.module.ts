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
import {NewGamesComponent} from './components/games.component/new-games.component/new-games.component';
import {FilterComponent} from './components/filter.component/filter.component';
import {DetailMovieComponent} from './components/movies.component/detail-movie.component/detail-movie.component';
import {DetailGameComponent} from './components/games.component/detail-game.component/detail-game.component';
import {AUTH_PROVIDERS} from "angular2-jwt";



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
    NewGamesComponent,
    DetailGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
