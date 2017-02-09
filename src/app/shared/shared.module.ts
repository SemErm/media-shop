import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamesService} from "./services/games.service";
import {MoviesService} from "./services/movies.service";
import {MusicsService} from "./services/musics.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterComponent} from "./filter/filter.component";
import {FilterPageComponent} from "./filter-page/filter-page.component";
import {ItemComponent} from "./item/item.component";

@NgModule({
  declarations: [
    FilterComponent,
    FilterPageComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GamesService,
    MoviesService,
    MusicsService
  ],
  exports: [
    FilterComponent,
    FilterPageComponent,
    ItemComponent
  ]
})
export class SharedModule {

}
