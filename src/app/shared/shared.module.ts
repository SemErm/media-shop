import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamesService} from "./services/games.service";
import {MoviesService} from "./services/movies.service";
import {MusicsService} from "./services/musics.service";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GamesService,
    MoviesService,
    MusicsService
  ],
  exports: []
})
export class SharedModule {

}
