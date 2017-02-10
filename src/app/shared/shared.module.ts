import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {GamesService} from "./services/games.service";
import {MoviesService} from "./services/movies.service";
import {MusicsService} from "./services/musics.service";
import {FilterComponent} from "./filter/filter.component";
import {FilterPageComponent} from "./filter-page/filter-page.component";
import {ItemComponent} from "./item/item.component";
import {Auth} from "./services/auth.service";

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
  exports: [
    FilterComponent,
    FilterPageComponent,
    ItemComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        Auth,
        GamesService,
        MoviesService,
        MusicsService
      ]
    };
  }
}

